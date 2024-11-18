import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { executeQuery } from './db.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Função para registrar log
async function registrarLog(requestId, userInput, response, logLevel = 'INFO') {
    const query = `
        INSERT INTO chatgpt_logs (request_id, user_input, response, log_level)
        VALUES (?, ?, ?, ?)
    `;
    
    try {
        await executeQuery(query, [requestId, userInput, response, logLevel]);
        return true;
    } catch (error) {
        console.error('Erro ao registrar log:', error);
        return false;
    }
}

// Middleware de autenticação
const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await executeQuery(
            'SELECT id, name, email FROM users WHERE id = ? AND current_token = ?',
            [decoded.userId, token]
        );

        if (!user[0]) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = user[0];
        next();
    } catch (error) {
        console.error('Erro na autenticação:', error);
        res.status(403).json({ message: 'Token inválido ou expirado' });
    }
};

// Rota de criação de usuário
app.post('/create-user', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Dados incompletos' });
        }

        const existingUser = await executeQuery(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await executeQuery(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        const token = jwt.sign(
            { userId: result.insertId },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        await executeQuery(
            'UPDATE users SET current_token = ? WHERE id = ?',
            [token, result.insertId]
        );

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: { id: result.insertId, name, email },
            token
        });

    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const users = await executeQuery(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        console.log(users);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Usuario não encontrado' });
        }
        const user = users[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        await executeQuery(
            'UPDATE users SET current_token = ? WHERE id = ?',
            [token, user.id]
        );

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota de logout
app.post('/logout', authenticateToken, async (req, res) => {
    try {
        await executeQuery(
            'UPDATE users SET current_token = NULL WHERE id = ?',
            [req.user.id]
        );
        
        res.json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        res.status(500).json({ message: 'Erro ao fazer logout' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});