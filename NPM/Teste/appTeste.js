import chalk from 'chalk';
import sillyname from 'sillyname';
import prompt from 'prompt-sync';

console.log(chalk.green("Mensagem colorida"));
console.log(chalk.red("Erro"));
console.log(chalk.bgYellowBright("Navios de escravos portos riquences"));

const nomeGerado = sillyname();
console.log("Nome Gerado", nomeGerado);
console.log(chalk.bgRgb(2, 55, 107)(chalk.blue(sillyname())));

const promptFn = prompt();

const nome = promptFn('Olá, diga seu nome:');
console.log("Olá,", nome);