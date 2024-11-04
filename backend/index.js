import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import fs from 'fs';

require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Configuração do pool de conexões do MySQL com SSL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync('./certs/ca.pem') // Caminho para o arquivo `ca.pem`
    }
});

// Endpoint GET /consultar
app.get('/consultar', (req, res) => {
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

    const requestId = 'req-' + Date.now(); // Gerando um ID único baseado no timestamp
    const userInput = '/consultar';         // Nome do endpoint
    const response = 'Consulta executada com sucesso'; // Mensagem de resposta
    const logLevel = 'INFO';                 // Nível de log

    // Obter uma conexão do pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Erro ao obter conexão do pool:', err);
            return res.status(500).json({ error: 'Erro ao registrar log' });
        }

        // Registrar log na tabela chatgpt_logs
        connection.query(logQuery, [requestId, userInput, response, logLevel], (queryErr) => {
            // Liberar a conexão de volta para o pool
            connection.release();

            if (queryErr) {
                console.error('Erro ao registrar log:', queryErr);
                return res.status(500).json({ error: 'Erro ao registrar log' });
            }

            // Retorna uma resposta de sucesso
            res.status(200).json({ message: 'Consulta executada com sucesso', requestId });
        });
    });
}

// Endpoint GET /pergunte-ao-chatgpt
app.get('/pergunte-ao-chatgpt', (req, res) => {
    // Respondemos um 'ok' só para testar
    res.send('Hello World');
});

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor em execução na porta ${PORT}`));

