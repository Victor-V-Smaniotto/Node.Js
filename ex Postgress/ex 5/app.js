import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'escola_db'
});

async function alunosContagem(){
    try {
        await client.connect();

        const alunos = await client.query('SELECT COUNT(*) FROM alunos;');
        console.log(`Listar alunos: ${alunos.rows[0].count}`);

        const notas = await client.query('SELECT AVG(nota) AS media FROM alunos;');
        console.log(`Média geral da turma: ${Number(notas.rows[0].media)}`);

    } catch (erro) {
        console.log('❌ Erro no sistema:', erro.message);

    } finally {
        await client.end();
    }
}


alunosContagem();