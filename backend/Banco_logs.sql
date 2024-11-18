create database infoSearch;
use infoSearch;

create table chatgpt_logs (
id SERIAL PRIMARY KEY,                       -- ID único para cada log
request_id VARCHAR(255) NOT NULL,           -- ID da solicitação da API
user_input TEXT NOT NULL,                    -- Entrada do usuário
response TEXT NOT NULL,                       -- Resposta da API
log_level VARCHAR(50),                       -- Nível do log (ex: INFO, ERROR)
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Data e hora de criação do log
error_message TEXT                           -- Mensagem de erro (se houver)
);

show tables;
SELECT DATABASE();
describe chatgpt_logs;
SELECT * FROM chatgpt_logs;

-- Criação da tabela de usuários
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    current_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_current_token ON users(current_token(255));