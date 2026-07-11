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

async function tudinho(){

    try{
        await client.connect();
    
        const mediaG = await client.query("SELECT AVG(nota) AS media FROM alunos;");
        console.log(`Média geral da turma: ${Number(mediaG.rows[0].media).toFixed(2)}`);
    
        const alunosM = await client.query("SELECT nome, nota FROM alunos WHERE nota > 7;");
        alunosM.rows.forEach(aluno => {
            console.log(`Alunos: ${aluno.nome}  Nota: ${Number(aluno.nota)}`);
        });
        console.log(`Tem ${alunosM.rows.length} alunos com nota acima de 7`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

tudinho();