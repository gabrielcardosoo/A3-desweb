import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import fs from 'fs';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: './.env' });

import fetch, { Headers } from 'node-fetch';
global.fetch = fetch;
global.Headers = Headers;

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor em execução na porta ${PORT}`));

// Configuração do pool de conexões do MySQL com SSL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync('./certs/ca.pem') // Verifique se o arquivo ca.pem está no caminho correto
    }
});

// Endpoint POST /consultar
app.post('/consultar', (req, res) => {
    pool.query('SELECT 1', (pingErr) => {
        if (pingErr) {
            console.error('Conexão perdida. Erro ao executar ping:', pingErr);
            return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
        }
        registrarLog(res);
    });
});

// Função para registrar log
function registrarLog(res) {
    const logQuery = `
        INSERT INTO chatgpt_logs (request_id, user_input, response, log_level)
        VALUES (?, ?, ?, ?)
    `;

    const requestId = 'req-' + Date.now();
    const userInput = '/consultar';
    const response = 'Consulta executada com sucesso';
    const logLevel = 'INFO';

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Erro ao obter conexão do pool:', err);
            return res.status(500).json({ error: 'Erro ao registrar log' });
        }

        connection.query(logQuery, [requestId, userInput, response, logLevel], (queryErr) => {
            connection.release();

            if (queryErr) {
                console.error('Erro ao registrar log:', queryErr);
                return res.status(500).json({ error: 'Erro ao registrar log' });
            }

            res.status(200).json({ message: 'Consulta executada com sucesso', requestId });
        });
    });
}

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Endpoint GET /pergunte-ao-chatgpt
app.post('/pergunte-ao-gemini', async (req, res) => {
    const { image, prompt } = req.body;

    if (!image || !prompt) {
        return res.status(400).json({ result: 0, error: 'Imagem ou prompt não fornecidos' });
    }

    try {
        // Validação e limpeza do Base64
        const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, '');
        
        // //Salvar imagens localmente no nosso projeto
        // const buffer = Buffer.from(cleanBase64, 'base64');
        // if (!buffer || buffer.length === 0) {
        //     return res.status(400).json({ error: 'Base64 inválido ou vazio' });
        // }

        // fs.writeFileSync('./food.png', buffer);
        
        const imagePart = {
            inlineData: {
              data: cleanBase64,
              mimeType: "image/png",
            },
        };
        
        const result = await model.generateContent([prompt,imagePart]);

        res.json({result: 1, completion: result.response.text()})
    } catch (error) {
        console.error('Erro ao gerar conteúdo:', error);
        res.status(500).json({result: 0, error: 'Erro ao gerar conteúdo', details: error.message });
    }
});

app.post('/calcular-calorias', async (req, res) => {
    const { prompt } = req.body;

    try {
        const result = await model.generateContent(prompt);

        console.log(result);
        res.json({result: 1, response: result.response.text()})
    } catch (error) {
        return res.status(500).json({result: 0, error: 'Erro ao processar calculo pela IA', details: error.message})
    }
});

