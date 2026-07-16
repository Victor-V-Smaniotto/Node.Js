import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'ecommerce_db'
});

// async function verProdutos() {
//     try {
//         await client.connect();
    
//         const produtos = await client.query(
//             `SELECT produto.nome, produto.preco, produto.estoque, categoria.nome AS categoria
//             FROM produtos produto
//             INNER JOIN categorias categoria ON produto.categoria_id = categoria.id
//             ORDER BY categoria.nome, produto.nome`);
        
//         console.log(produtos.rows);
        
//     } catch (error) {
//         console.error('Error occurred while fetching products:', error);
//     } finally {
//         await client.end();
//     }
// }
// verProdutos();

// async function verHistorico(){
//         try {
//             await client.connect();
//             const nome = prompt('Digite o nome do cliente: ');
//             const historico = await client.query(`
//                 SELECT produto.nome AS produto,
//                 pedido.quantidade,
//                 produto.preco,
//                 (produto.preco * pedido.quantidade) AS total
//                 FROM pedidos pedido
//                 INNER JOIN clientes cliente ON pedido.cliente_id = cliente.id
//                 INNER JOIN produtos produto ON pedido.produto_id = produto.id
//                 WHERE cliente.nome ILIKE $1;
//                 `, [nome]);
//             console.log(historico.rows);

//             let totalCompra = 0;
//             historico.rows.forEach(item => {
//                 totalCompra += Number(item.total);
//             });

//             console.log(`Total da compra: ${totalCompra}`);

//             if (historico.rows.length === 0) {
//                 console.log('Nenhum histórico encontrado para o cliente informado.');
//             }
//     } catch (error) {
//             console.error('Error occurred while connecting to the database:', error.message);

//     } finally {
//             await client.end();

//     }
// }
// verHistorico();


// async function cadastrarPedido() {
//     try {
//         await client.connect()
//         const clientes = await client.query('SELECT id, nome FROM clientes ORDER BY id ASC');
//         console.log("Clientes" )
//         clientes.rows.forEach(cliente => {
//             console.log(`Id: ${cliente.id} || Nome: ${cliente.nome}`);
//         });
//         const clienteId = Number(prompt("Insira o Id do cliente para cadastrar o pedido: "));
//         const produtos = await client.query('SELECT id, nome, estoque FROM produtos WHERE estoque > 0 ORDER BY id ASC');
//         produtos.rows.forEach(produto => {
//             console.log(`Id: ${produto.id} || Nome: ${produto.nome} || Estoque: ${produto.estoque}`);
//         });
//         const produtoId = Number(prompt("Insira o Id do produto para cadastrar o pedido: "));
//         const quantidade = Number(prompt("Qual a quantidade desejada? "));
//         const resultado = await client.query('SELECT * FROM produtos WHERE id = $1', [produtoId]);
//         const produto = resultado.rows[0];
//         if (quantidade <= produto.estoque) {
//             produto.estoque -= quantidade;
//             console.log("Pedido cadastrado com sucesso!");
//             await client.query(
//             `INSERT INTO pedidos (cliente_id, produto_id, quantidade)
//                 VALUES ($1, $2, $3)`,
//             [clienteId, produtoId, quantidade]
//             );
//             await client.query(
//                 `UPDATE produtos
//                 SET estoque = $1
//                 WHERE id = $2`,
//                 [produto.estoque, produtoId]
//             );           
//         } else {
//             console.log("Quantidade indisponível em estoque.");
//         }
//         console.log(`\nPedido registrado com sucesso!`);
//         console.log(`\nCliente ID: ${clienteId}`);
//         console.log(`\nProduto: ${produto.nome}`);
//         console.log(`\nQuantidade: ${quantidade}`);
//         console.log(`\nEstoque restante: ${produto.estoque}`);
//     } catch (error) {
//         console.error('Error occurred while connecting to the database:', error.message);
//         return;
//     } finally {
//         await client.end();
//     }
// }
// cadastrarPedido();


// async function  relatorioVenda(){
//     try{
//         await client.connect();
//         const cidades = await client.query(`SELECT cl.cidade,
//         COUNT(pd.id)                        AS total_pedidos,
//         SUM(pr.preco * pd.quantidade)       AS valor_total
//             FROM pedidos pd
//             INNER JOIN clientes cl ON pd.cliente_id = cl.id
//             INNER JOIN produtos pr ON pd.produto_id  = pr.id
//             GROUP BY cl.cidade
//             ORDER BY valor_total DESC;
//         `)   
//         console.log(cidades.rows);
//     } catch {
//         console.error('Erro', error.menssage);
//         return;
//     } finally {
//         await client.end();
//     }
// }
// relatorioVenda();