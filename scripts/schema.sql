- Criação do banco de dados
CREATE DATABASE requerimentos_academicos;
\c requerimentos_academicos

-- Tabela de cursos
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,    
    nivel VARCHAR(50)
    ano_inicio DATE,
    curso_id INT REFERENCES estudantes(id)    
);

-- Tabela de estudantes
CREATE TABLE estudantes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(30) UNIQUE NOT NULL,
    sexo VARCHAR(20),
    nascimento DATE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    curso_id INT REFERENCES curso(id)
);

-- Tabela de categorias de requerimento
CREATE TABLE categorias_requerimentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    instancia_responsavel VARCHAR(100)
);

-- Tabela de requerimentos
CREATE TABLE requerimentos (
    id SERIAL PRIMARY KEY,
    data_solicitacao DATE NOT NULL,
    observacoes TEXT,
    estado VARCHAR(30) NOT NULL,
    estudante_id INT REFERENCES estudantes(id),
    categorias_requerimento_id INT REFERENCES categorias_requerimentos(id)    
);