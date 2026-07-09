import pg from "pg";
import promptSync from "prompt-sync";

const prompt = promptSync();
const { Client } = pg;

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "escola_db",
});

async function listarJogos() {
    try {
        await client.connect();

        const resultado = await client.query(
            "SELECT * FROM jogos"
        );

        resultado.rows.forEach(jogo => {
            console.log(
                `${jogo.id} - ${jogo.titulo} | ${jogo.genero} | Nota: ${jogo.nota} | ${jogo.lancamento}`
            );
        });

        const id = Number(prompt("\nInsira o ID do jogo para reavaliar: "));
        if (isNaN(id) || id < 0 || id > resultado.rows.length) {
            console.log("Erro: ID do jogo inválido.");
            return;
        }

        const nota = Number(prompt("\nNota (0 a 10): "));
        if (isNaN(nota) || nota < 0 || nota > 10) {
          console.log("Erro: nota deve estar entre 0 e 10.");
          return;
        }

        const novaAvaliacao = await client.query(
            "UPDATE jogos SET nota = $1 WHERE id = $2 RETURNING *",
            [nota, id]
        );

    } catch (erro) {
        console.error("Erro:", erro.message);
    } finally {
        await client.end();
    }
}

listarJogos();