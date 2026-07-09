import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();


// Configurações de conexão
// São as mesmas informações que você usa no pgAdmin!
const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'loja_db'
    //database: 'rpg_db'
});

// ─────────────────────────────────────────
// FUNÇÕES DE BANCO
// ─────────────────────────────────────────

async function listar() {
    const r = await client.query('SELECT * FROM produtos ORDER BY id');
    console.log('\n📦 PRODUTOS\n');
    r.rows.forEach(p => {
        console.log(`[${p.id}] ${p.nome.padEnd(20)} R$${p.preco}  Estoque: ${p.estoque}  (${p.categoria})`);
    });
}

async function cadastrar() {
    const nome      = prompt('Nome: ');
    const preco     = Number(prompt('Preço: '));
    const estoque   = Number(prompt('Estoque: '));
    const categoria = prompt('Categoria: ');

    await client.query(
        'INSERT INTO produtos (nome, preco, estoque, categoria) VALUES ($1,$2,$3,$4)',
        [nome, preco, estoque, categoria]
    );
    console.log('\n✅ Produto cadastrado!');
}

async function atualizar() {
    await listar();
    const id    = Number(prompt('\nID do produto: '));
    const preco = Number(prompt('Novo preço: '));

    const r = await client.query(
        'UPDATE produtos SET preco = $1 WHERE id = $2 RETURNING nome',
        [preco, id]
    );
    if (r.rows.length === 0) {
        console.log('❌ Produto não encontrado.');
    } else {
        console.log(`\n✅ Preço de "${r.rows[0].nome}" atualizado!`);
    }
}

async function remover() {
    await listar();
    const id = Number(prompt('\nID do produto a remover: '));
    const ok = prompt('Confirmar remoção? (s/n): ');

    if (ok.toLowerCase() !== 's') { console.log('Cancelado.'); return; }

    const r = await client.query(
        'DELETE FROM produtos WHERE id = $1 RETURNING nome',
        [id]
    );
    if (r.rows.length === 0) {
        console.log('❌ Produto não encontrado.');
    } else {
        console.log(`\n✅ "${r.rows[0].nome}" removido.`);
    }
}

// ─────────────────────────────────────────
// MENU PRINCIPAL
// ─────────────────────────────────────────

async function menu() {

    try {
        await client.connect();
        console.log('✅ Conectado ao banco de dados!\n');

        let rodando = true;

        while (rodando) {

            console.log('\n══════════════════════════════');
            console.log('       🛒 LOJA - MENU         ');
            console.log('══════════════════════════════');
            console.log('1 - Listar produtos');
            console.log('2 - Cadastrar produto');
            console.log('3 - Atualizar preço');
            console.log('4 - Remover produto');
            console.log('0 - Sair');
            console.log('══════════════════════════════');

            const opcao = prompt('\nEscolha uma opção: ');

            switch (opcao) {
                case '1': await listar();    break;
                case '2': await cadastrar(); break;
                case '3': await atualizar(); break;
                case '4': await remover();   break;
                case '0': rodando = false;   break;
                default: console.log('❌ Opção inválida.');
            }
        }

    } catch (erro) {
        console.log('❌ Erro no sistema:', erro.message);

    } finally {
        await client.end();
        console.log('\n👋 Até logo!');
    }
}

menu();