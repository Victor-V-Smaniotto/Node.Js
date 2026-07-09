CREATE TABLE alunos (
    id       SERIAL PRIMARY KEY,
    nome     VARCHAR(100) NOT NULL,
    turma    VARCHAR(10)  NOT NULL,
    nota     DECIMAL(4,2),
    presente BOOLEAN DEFAULT true
);

INSERT INTO alunos (nome, turma, nota, presente) VALUES
    ('Ana Souza',      '3DS', 8.5,  true),
    ('Bruno Lima',     '3DS', 6.0,  true),
    ('Carla Matos',    '3DS', 9.2,  false),
    ('Diego Ferreira', '3DS', 4.5,  true),
    ('Elena Costa',    '3DS', 7.8,  true);

CREATE TABLE jogos (
    id         SERIAL PRIMARY KEY,
    titulo     VARCHAR(100) NOT NULL,
    genero     VARCHAR(50),
    nota       DECIMAL(3,1),
    lancamento INTEGER
);

INSERT INTO jogos (titulo, genero, nota, lancamento) VALUES
    ('Elden Ring',            'RPG',          9.5, 2022),
    ('God of War Ragnarok',   'Acao',          9.0, 2022),
    ('Hollow Knight',         'Metroidvania',  9.2, 2017),
    ('Celeste',               'Plataforma',    9.0, 2018),
    ('Cyberpunk 2077',        'RPG',           7.5, 2020),
    ('Red Dead Redemption 2', 'Acao',          9.7, 2018),
    ('Hades',                 'Roguelike',     9.3, 2020),
    ('Stardew Valley',        'Simulacao',     9.4, 2016);

SELECT
SELECT COUNT(*) FROM alunos;
SELECT AVG(nota) FROM alunos;
