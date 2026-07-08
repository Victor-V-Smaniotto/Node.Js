import promptSync from 'prompt-sync';
import chalk from 'chalk';

const prompt = promptSync();
let rank;

const nome = prompt('Insira seu nome: ');
const classe = prompt('Qual sua classe? ');
const nivel = Number(prompt('Qual seu nível? '));
let hp = nivel * 10;

if(nivel < 10){
    rank = "Novato betinha";
} else if(nivel >= 10 && nivel < 20){
    rank = "normal mediana dos estremos";
} else{
    rank = "Lendario sigma da bahia";
}

console.log("========================");
console.log("====Ficha do Usuario====");
console.log("========================");
console.log(chalk.blue("Nome:", nome));
console.log(chalk.magenta("Classe:", classe));
console.log(chalk.green("Nivel:", nivel));
console.log(chalk.red("Rank:", rank));
console.log(chalk.cyan("Hp:", hp));
console.log("========================");