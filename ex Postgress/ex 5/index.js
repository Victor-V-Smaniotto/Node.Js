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

        const id = Number(prompt("\nInsira o ID do jogo para remover: "));
        if (isNaN(id) || id < 0 || id > resultado.rows.length) {
            console.log("Erro: ID do jogo inválido.");
            return;
        }

        const verificacao = Number(prompt("\nTem certeza que deseja remover o jogo? (1 - Sim / 2 - Não): "));

        if (verificacao === 1) {
            const jogoRemovido = await client.query(
                "DELETE FROM jogos WHERE id = $1 RETURNING *",
                [id]
            );
        } else {
            console.log("Operação cancelada.");
        }

    } catch (erro) {
        console.error("Erro:", erro.message);
    } finally {
        await client.end();
    }
}

listarJogos();