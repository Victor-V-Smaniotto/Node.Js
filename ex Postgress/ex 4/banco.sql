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

SELECT COUNT(*) FROM alunos;
SELECT AVG(nota) FROM alunos;
