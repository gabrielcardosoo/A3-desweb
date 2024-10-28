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

describe chatgpt_logs;