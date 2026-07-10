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

async function buscarJogos() {
    try {
        const genero = prompt("Digite o gênero do jogo: ");

        const jogos = await client.query(
            `
            SELECT titulo, nota
            FROM jogos
            WHERE genero ILIKE $1
            ORDER BY nota DESC
            `,
            [genero]
        );

        if (jogos.rows.length === 0) {
            console.log(
                "Nenhum jogo encontrado para o gênero informado."
            );
            return;
        }

        console.log("\nJogos encontrados:\n");

        jogos.rows.forEach(jogo => {
            console.log(`${jogo.titulo} - Nota: ${jogo.nota}`);
        });

    } catch (erro) {
        console.error("Erro:", erro.message);
    } finally {
        await client.end();
    }
}

async function cadastrarJogo() {
    const titulo = prompt("Título do jogo: ");
    const genero = prompt("Gênero: ");
    const nota = Number(prompt("Nota (0 a 10): "));
    const lancamento = Number(prompt("Ano de lançamento: "));

    if (titulo.trim() === "") {
        console.log("Erro: título não pode estar vazio.");
        return;
    }

    if (isNaN(nota) || nota < 0 || nota > 10) {
        console.log("Erro: nota deve estar entre 0 e 10.");
        return;
    }

    if (isNaN(lancamento) || lancamento <= 1970) {
        console.log("Erro: ano deve ser maior que 1970.");
        return;
    }

    try {
        const resultado = await client.query(
            `
            INSERT INTO jogos (titulo, genero, nota, lancamento)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [titulo, genero, nota, lancamento]
        );

        console.log("\nJogo cadastrado com sucesso:");
        console.log(resultado.rows[0]);

    } catch (erro) {
        console.error("Erro ao cadastrar:", erro.message);
    } finally {
        await client.end();
    }
}

async function reavaliarJogo() {
    try {

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

async function removerJogos() {
    try {

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

async function main(){
    await client.connect();

    console.log('============================');
    console.log('====== Menu de Jogos =======');
    console.log('----------------------------');
    console.log('-- 1 - Ver todos os jogos --');
    console.log('-- 2 - Buscar por gênero  --');
    console.log('-- 3 - Ver ranking        --');
    console.log('-- 4 - Adicionar jogo     --');
    console.log('-- 5 - Atualizar nota     --');
    console.log('-- 6 - Remover jogo       --');
    console.log('-- 0 - Sair               --');
    console.log('===========================');
}


listarJogos();
cadastrarJogo();
buscarJogos();