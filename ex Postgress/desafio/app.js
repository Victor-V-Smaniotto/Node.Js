import pg from 'pg';
import promptSync from 'prompt-sync';
import chalk from 'chalk';

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'escola_db'
});

async function verAlunos(){

    const alunos = await client.query('SELECT * FROM alunos ORDER BY id ASC;');
    console.log(`||${chalk.bold("Turma".padEnd(10))}||${chalk.bold("Nome".padEnd(25))}|| ${chalk.bold("Presente".padEnd(10))}||`);

    alunos.rows.forEach(aluno => {
        console.log(`||${chalk.magenta(aluno.turma.padEnd(10))}||${chalk.green(aluno.nome.padEnd(25))}|| ${chalk.blue(aluno.presente ? "Sim".padEnd(10) : "Não".padEnd(10))}||`);
    });
}

async function situacaoDaTurma() {
    const alunos = await client.query('SELECT * FROM alunos ORDER BY nota DESC');

    console.log(`Situação da turma:\n`);
    console.log(`${chalk.bold("Nome".padEnd(25))} || ${chalk.bold("Turma".padEnd(10))} || ${chalk.bold("Nota".padEnd(4))} || ${chalk.bold("Situação")}\n`);

    alunos.rows.forEach(aluno => {

        if (aluno.nota >= 7) {
            console.log(`${chalk.green(aluno.nome.padEnd(25))} || ${chalk.magenta(aluno.turma.padEnd(10))} || ${chalk.blue(aluno.nota.padEnd(4))} || ${chalk.green("Aprovado")}`);
        } else if (aluno.nota >= 5) {
            console.log(`${chalk.yellow(aluno.nome.padEnd(25))} || ${chalk.magenta(aluno.turma.padEnd(10))} || ${chalk.blue(aluno.nota.padEnd(4))} || ${chalk.yellow("Exame")}`);
        } else {
            console.log(`${chalk.red(aluno.nome.padEnd(25))} || ${chalk.magenta(aluno.turma.padEnd(10))} || ${chalk.blue(aluno.nota.padEnd(4))} || ${chalk.red("Reprovado")}`);
        }
    });
}

async function cadastrarAluno(){

    const nome = prompt("Nome: ");
    const nota = Number(prompt("Nota (0 a 10): "));
    const turma = ("3DS");

    if (nome.trim() === "") {
        console.log(`${chalk.red("Erro: nome não pode estar vazio.")}`);
        return;
    }

    if (isNaN(nota) || nota < 0 || nota > 10) {
        console.log(`${chalk.red("Erro: nota deve estar entre 0 e 10.")}`);
        return;
    }

    const cadastro = await client.query(
        "INSERT INTO alunos (nome, nota, turma) VALUES ($1, $2, $3) RETURNING *",
        [nome, nota, turma]
    );

    console.log(`${chalk.green("\nAluno cadastrado com sucesso:")}`);
    console.log(cadastro.rows[0]);
}

async function lancarNota() {
    const alunos = await client.query('SELECT * FROM alunos ORDER BY id ASC');

    console.log(`${chalk.bold("ID".padEnd(2))} || ${chalk.bold("Nome".padEnd(25))}||`);

    alunos.rows.forEach(aluno => {
        console.log(`${chalk.green(aluno.id.toString().padEnd(2))} || ${chalk.green(aluno.nome.padEnd(25))}||`);
    });
    
    const id = Number(prompt("Insira o ID do aluno para lançar a nota: "));
    const aluno = alunos.rows.find(aluno => aluno.id === id);

    if (isNaN(id) || !aluno) {
        console.log(`${chalk.red("Erro: ID do aluno inválido.")}`);
        return;
    }

    const entrada = prompt("Nota (0 a 10): ");
    if(entrada.trim() === '') {
        console.log(`${chalk.red('Digite um número')}`);
        return;
    }
    const nota = Number(entrada);

    if(isNaN(nota)) {
        console.log(`${chalk.red('Digite apenas números.')}`);
        return;
    }
    
    if (nota < 0 || nota > 10) {
        console.log(`${chalk.red("Erro: nota deve estar entre 0 e 10.")}`);
        return;
    }

    const novaNota = await client.query(
        "UPDATE alunos SET nota = $1 WHERE id = $2 RETURNING *",
        [nota, id]
    );


    console.log(`${chalk.green("\nNota lançada com sucesso:")}`);
    console.log(novaNota.rows[0]);
}

async function removerAluno() { 
    
    const resultado = await client.query(
        "SELECT * FROM alunos ORDER BY id ASC"
    );

    console.log(`${chalk.bold("ID".padEnd(2))} ${chalk.bold("Nome".padEnd(25))}`);

    resultado.rows.forEach(aluno => {
        console.log(
            `${chalk.cyan(aluno.id.toString().padEnd(2))} - ${chalk.green(aluno.nome.padEnd(25))}`
        );
    });

    const id = Number(prompt("Insira o ID do aluno para remover: "));
    const alunos = resultado.rows.find(aluno => aluno.id === id);

    
    if (isNaN(id) || !alunos) {
        console.log(`${chalk.red("Erro: ID do aluno inválido.")}`);
        return;
    }

    const verificacao = Number(prompt(`${chalk.yellow("Tem certeza que deseja remover o aluno? (1 - Sim / 2 - Não): ")}`));

    if (verificacao === 1) {
        const alunoRemovido = await client.query(
            "DELETE FROM alunos WHERE id = $1 RETURNING *",
            [id]
        );
        console.log(`${chalk.green("Aluno removido com sucesso!")}`);
        console.log(alunoRemovido.rows[0]);
    } else {
        console.log(`${chalk.yellow("Operação cancelada.")}`);
    }
}

async function main(){
    await client.connect();
    
    try {
        let opcao;

        do {
            console.log('\n============================');
            console.log('====== Menu de Alunos =======');
            console.log('----------------------------');
            console.log('-- 1 - Ver todos os alunos --');
            console.log('-- 2 - Situação da turma   --');
            console.log('-- 3 - Adicionar aluno     --');
            console.log('-- 4 - Lançar nota         --');
            console.log('-- 5 - Remover aluno       --');
            console.log('-- 0 - Sair                --');
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
                    await verAlunos();
                    break;
                case 2:
                    await situacaoDaTurma();
                    break;
                case 3:
                    await cadastrarAluno();
                    break;
                case 4:
                    await lancarNota();
                    break;
                case 5:
                    await removerAluno();
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