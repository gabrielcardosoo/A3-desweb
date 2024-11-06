import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import fs from 'fs';

dotenv.config({ path: './.env' });

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

// Endpoint GET /pergunte-ao-chatgpt
app.get('/pergunte-ao-chatgpt', (req, res) => {
    res.send('Hello World');
});

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor em execução na porta ${PORT}`));
