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
    //database: 'loja_db'
    database: 'rpg_db'
});

async function listar() {
    const r = await client.query('SELECT * FROM personagens ORDER BY nivel DESC');
    console.log('\n⚔️  PERSONAGENS DO REINO\n');
    r.rows.forEach(p => {
        console.log(`[${p.id}] ${p.nome.padEnd(10)} ${p.classe.padEnd(10)} Nível ${String(p.nivel).padEnd(3)} HP:${p.hp} Mana:${p.mana}`);
    });
}

async function cadastrar() {
    const nome   = prompt('Nome: ');
    const classe = prompt('Classe: ');
    const nivel  = Number(prompt('Nível: '));
    const hp     = Number(prompt('HP: '));
    const mana   = Number(prompt('Mana: '));

    await client.query(
        'INSERT INTO personagens (nome, classe, nivel, hp, mana) VALUES ($1,$2,$3,$4,$5)',
        [nome, classe, nivel, hp, mana]
    );
    console.log(`\n✅ ${nome} entrou no reino!`);
}

async function subirNivel() {
    await listar();
    const id = Number(prompt('\nID do personagem: '));

    const r = await client.query(
        'UPDATE personagens SET nivel = nivel + 1, hp = hp + 50, mana = mana + 25 WHERE id = $1 RETURNING *',
        [id]
    );
    if (r.rows.length === 0) {
        console.log('❌ Personagem não encontrado.');
    } else {
        const p = r.rows[0];
        console.log(`\n🎉 ${p.nome} alcançou o Nível ${p.nivel}! HP: ${p.hp} | Mana: ${p.mana}`);
    }
}

async function eliminar() {
    await listar();
    const id = Number(prompt('\nID do personagem: '));
    const ok = prompt('☠️  Confirmar? (s/n): ');

    if (ok.toLowerCase() !== 's') { console.log('Cancelado.'); return; }

    const r = await client.query(
        'DELETE FROM personagens WHERE id = $1 RETURNING nome',
        [id]
    );
    if (r.rows.length === 0) {
        console.log('❌ Personagem não encontrado.');
    } else {
        console.log(`\n☠️  ${r.rows[0].nome} foi eliminado do reino.`);
    }
}

async function menu() {

    try {
        await client.connect();
        console.log('✅ Conectado ao banco RPG!\n');

        let rodando = true;

        while (rodando) {

            console.log('\n══════════════════════════════');
            console.log('    ⚔️  RPG - MENU PRINCIPAL   ');
            console.log('══════════════════════════════');
            console.log('1 - Ver personagens');
            console.log('2 - Criar personagem');
            console.log('3 - Subir de nível');
            console.log('4 - Eliminar personagem');
            console.log('0 - Sair');
            console.log('══════════════════════════════');

            const opcao = prompt('\nEscolha: ');

            switch (opcao) {
                case '1': await listar();     break;
                case '2': await cadastrar();  break;
                case '3': await subirNivel(); break;
                case '4': await eliminar();   break;
                case '0': rodando = false;    break;
                default: console.log('❌ Opção inválida.');
            }
        }

    } catch (erro) {
        console.log('❌ Erro no sistema:', erro.message);

    } finally {
        await client.end();
        console.log('\n👋 Até logo, aventureiro!');
    }
}

menu();