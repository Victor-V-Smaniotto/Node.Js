import pg from "pg";
import promptSync from "prompt-sync";
import chalk from "chalk";

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
    const resultado = await client.query(
        "SELECT * FROM jogos ORDER BY id ASC"
    );
    console.log("\nLista de jogos:\n");
    console.log(`${chalk.bold("Título".padEnd(25))} -- ${chalk.bold("Gênero".padEnd(15))} -- ${chalk.bold("Nota".padEnd(4))} -- ${chalk.bold("Ano")}`);
    resultado.rows.forEach(jogo => {
        console.log(
            `${chalk.green(jogo.titulo.padEnd(25))} -- ${chalk.yellow(jogo.genero.padEnd(15))} -- ${chalk.blue(jogo.nota.padEnd(4))} -- ${chalk.magenta(jogo.lancamento)}`
        );
    });
}

async function listarTop(){
    const top = await client.query(
        "SELECT * FROM jogos ORDER BY NOTA DESC LIMIT 3"
    );
    console.log(`${chalk.bold("\nTop 3 jogos:\n")}`);
    let i = 0;
    top.rows.forEach(jogo => {
         i++;
        console.log(
            `${chalk.green(`${i}°: ${jogo.titulo.padEnd(25)}`)} -- ${chalk.yellow(jogo.genero.padEnd(15))} -- ${chalk.blue(jogo.nota.padEnd(4))} -- ${chalk.magenta(jogo.lancamento)}`
        );
    })
}

async function buscarJogos() {
 
    const genero = prompt("Digite o gênero do jogo: ");

    const jogos = await client.query(
        `
        SELECT titulo, nota FROM jogos
        WHERE genero ILIKE $1
        ORDER BY id ASC
        `,
        [genero]
    );

    if (jogos.rows.length === 0) {

        console.log(`${chalk.red("Nenhum jogo encontrado para o gênero informado.\n")}`);
        return;
    }

    console.log(`${chalk.bold("\nJogos encontrados:\n")}`);
    console.log(`${chalk.bold("Título".padEnd(25))} -- ${chalk.bold("Nota".padEnd(4))}`);
    jogos.rows.forEach(jogo => {
        console.log(`${chalk.green(jogo.titulo.padEnd(25))} -- ${chalk.blue(jogo.nota.padEnd(4))}`);
    });
}

async function cadastrarJogo() {
    const titulo = prompt("Título do jogo: ");
    const genero = prompt("Gênero: ");
    const nota = Number(prompt("Nota (0 a 10): "));
    const lancamento = Number(prompt("Ano de lançamento: "));

    if (titulo.trim() === "") {
        console.log(`${chalk.red("Erro: título não pode estar vazio.")}`);
        return;
    }

    if (isNaN(nota) || nota < 0 || nota > 10) {
        console.log(`${chalk.red("Erro: nota deve estar entre 0 e 10.")}`);
        return;
    }

    if (isNaN(lancamento) || lancamento <= 1970) {
        console.log(`${chalk.red("Erro: ano deve ser maior que 1970.")}`);
        return;
    }

    const resultado = await client.query(
        `
        INSERT INTO jogos (titulo, genero, nota, lancamento)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [titulo, genero, nota, lancamento]
    );

    console.log(`${chalk.green("\nJogo cadastrado com sucesso:")}`);
    console.log(resultado.rows[0]);
}

async function reavaliarJogo() {

    const resultado = await client.query(
        "SELECT * FROM jogos ORDER BY id ASC"
    );

    console.log(`${chalk.bold("id".padEnd(2))} ${chalk.bold("Título".padEnd(25))} -- ${chalk.bold("Gênero".padEnd(15))} -- ${chalk.bold("Nota".padEnd(4))} -- ${chalk.bold("Ano")}`);
   
    resultado.rows.forEach(jogo => {
        console.log(
        `${chalk.cyan((jogo.id.toString().padEnd(2)))} - ${chalk.green(jogo.titulo.padEnd(25))} | ${chalk.yellow(jogo.genero.padEnd(15))} | ${chalk.blue(jogo.nota.padEnd(4))} | ${chalk.magenta(jogo.lancamento)}`
        );
    });

    const id = Number(prompt("Insira o ID do jogo para reavaliar: "));
    const jogos = resultado.rows.find(jogo => jogo.id === id);

    if (isNaN(id) || !jogos) {
        console.log(`${chalk.red("Erro: ID do jogo inválido.")}`);
        return;
    }

    const nota = Number(prompt("Nota (0 a 10): "));
    if (isNaN(nota) || nota < 0 || nota > 10) {
        console.log(`${chalk.red("Erro: nota deve estar entre 0 e 10.")}`);
        return;
    }

    const novaAvaliacao = await client.query(
        "UPDATE jogos SET nota = $1 WHERE id = $2 RETURNING *",
        [nota, id]
    );

    console.log(`${chalk.green("Nota atualizada com sucesso!")}`);
    console.log(novaAvaliacao.rows[0]);
}

async function removerJogos() { 
    
    const resultado = await client.query(
        "SELECT * FROM jogos ORDER BY id ASC"
    );

    console.log(`${chalk.bold("id".padEnd(2))} ${chalk.bold("Título".padEnd(25))} -- ${chalk.bold("Gênero".padEnd(15))} -- ${chalk.bold("Nota".padEnd(4))} -- ${chalk.bold("Ano")}`);

    resultado.rows.forEach(jogo => {
        console.log(
            `${chalk.cyan(jogo.id.toString().padEnd(2))} - ${chalk.green(jogo.titulo.padEnd(25))} | ${chalk.yellow(jogo.genero.padEnd(15))} | ${chalk.blue(jogo.nota.padEnd(4))} | ${chalk.magenta(jogo.lancamento)}`
        );
    });

    const id = Number(prompt("Insira o ID do jogo para remover: "));
    const jogos = resultado.rows.find(jogo => jogo.id === id);

    if (isNaN(id) || !jogos) {
        console.log(`${chalk.red("Erro: ID do jogo inválido.")}`);
        return;
    }

    const verificacao = Number(prompt(`${chalk.yellow("Tem certeza que deseja remover o jogo? (1 - Sim / 2 - Não): ")}`));

    if (verificacao === 1) {
        const jogoRemovido = await client.query(
            "DELETE FROM jogos WHERE id = $1 RETURNING *",
            [id]
        );
        console.log(`${chalk.green("Jogo removido com sucesso!")}`);
        console.log(jogoRemovido.rows[0]);
    } else {
        console.log(`${chalk.yellow("Operação cancelada.")}`);
    }
}

async function main(){
    await client.connect();
    
    try {
        let opcao;

        do {
            console.log('\n=============================');
            console.log('====== Menu de Jogos =======');
            console.log('----------------------------');
            console.log('-- 1 - Ver todos os jogos --');
            console.log('-- 2 - Buscar por gênero  --');
            console.log('-- 3 - Ver ranking        --');
            console.log('-- 4 - Adicionar jogo     --');
            console.log('-- 5 - Atualizar nota     --');
            console.log('-- 6 - Remover jogo       --');
            console.log('-- 0 - Sair               --');
            console.log('===========================\n');

            const entrada = prompt('Escolha uma opção: ');

            if(entrada.trim() === '') {
                console.log(`${chalk.red('Digite um número')}`);
                continue;
            }
            opcao = Number(entrada);

            if(isNaN(opcao)) {
                console.log(`${chalk.red('Digite apenas números.')}`);
                continue;
            }
            switch (opcao) {
                case 1:
                    await listarJogos();
                    break;
                case 2:
                    await buscarJogos();
                    break;
                case 3:
                    await listarTop();
                    break;
                case 4:
                    await cadastrarJogo();
                    break;
                case 5:
                    await reavaliarJogo();
                    break;
                case 6:
                    await removerJogos();
                    break;
                case 0:
                    console.log(`${chalk.bold('Saindo do programa...')}`);
                    break;
                default:
                    console.log(`${chalk.red('Opção inválida. Tente novamente.')}`);
            }
        } while (opcao !== 0)

    } catch (erro) {
        console.log(`${chalk.red('❌ Erro no sistema:')} ${erro.message}`);

    } finally {
        await client.end();
        console.log(`${chalk.bold('👋 Até logo!')}`);
    }
}


main();