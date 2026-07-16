CREATE TABLE categorias (
    id   SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE produtos (
    id           SERIAL PRIMARY KEY,
    nome         VARCHAR(100) NOT NULL,
    preco        DECIMAL(10,2) NOT NULL,
    estoque      INTEGER DEFAULT 0,
    categoria_id INTEGER REFERENCES categorias(id)
);

CREATE TABLE clientes (
    id    SERIAL PRIMARY KEY,
    nome  VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cidade VARCHAR(80)
);

CREATE TABLE pedidos (
    id          SERIAL PRIMARY KEY,
    cliente_id  INTEGER REFERENCES clientes(id),
    produto_id  INTEGER REFERENCES produtos(id),
    quantidade  INTEGER NOT NULL,
    data_pedido TIMESTAMP DEFAULT NOW()
);

-- Categorias
INSERT INTO categorias (nome) VALUES
    ('Eletrônicos'), ('Livros'), ('Roupas'), ('Alimentos'), ('Games');

-- Produtos
INSERT INTO produtos (nome, preco, estoque, categoria_id) VALUES
    ('Teclado Mecânico',      299.90, 20, 1),
    ('Mouse Gamer',           189.90, 35, 1),
    ('Clean Code',             89.90, 15, 2),
    ('The Pragmatic Programmer',79.90, 10, 2),
    ('Camiseta Dev',           59.90, 50, 3),
    ('Moletom Hacker',        149.90, 25, 3),
    ('Café Especial 250g',     39.90, 60, 4),
    ('Controle PS5',          449.90, 12, 5),
    ('Headset USB',           199.90, 18, 1),
    ('Monitor 24"',          1299.90,  8, 1);

-- Clientes
INSERT INTO clientes (nome, email, cidade) VALUES
    ('Ana Souza',    'ana@email.com',    'São Paulo'),
    ('Bruno Lima',   'bruno@email.com',  'Curitiba'),
    ('Carla Matos',  'carla@email.com',  'São Paulo'),
    ('Diego Costa',  'diego@email.com',  'Porto Alegre'),
    ('Elena Ferreira','elena@email.com', 'Curitiba');

-- Pedidos
INSERT INTO pedidos (cliente_id, produto_id, quantidade) VALUES
    (1, 1, 1), (1, 3, 2), (2, 8, 1),
    (3, 2, 1), (3, 5, 3), (4, 9, 1),
    (5, 4, 1), (5, 7, 2), (1, 10, 1),
    (2, 6, 2), (4, 3, 1), (3, 8, 1);


SELECT * FROM produtos
SELECT * FROM pedidos



