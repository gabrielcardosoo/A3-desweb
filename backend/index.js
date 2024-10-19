import dotenv from 'dotenv';
dotenv.config();

// Importamos o express
import express from 'express';

// Construímos o objeto que viabiliza a especificação de endpoints
const app = express();

// Aplicamos o middleware de transformação JSON
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Especificamos o endpoint de interesse
// POST /pergunte-ao-chatgpt
app.get('/pergunte-ao-chatgpt', (req, res) => {
    // Respondemos um 'ok' só para testar
    res.send('Hello World');
});

// Colocamos o servidor em execução na porta 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Em execução na porta ${PORT}`));
