// Para usar o prompt no nodejs é preciso instalar essa lib 'prompt-sync'

let prompt = require("prompt-sync");
prompt = prompt();

// Exercicio 1.1 - Calcular Desconto
let preco = parseFloat(prompt("Digite o valor do preço do Produto: "));
let desconto = parseFloat(prompt("Digite o desconto:"));

function calcularDesconto(preco, desconto) {
  const resultado = preco - (preco * desconto) / 100; // Calcula o valor com desconto
  console.log("O valor com desconto é:", resultado); // Exibe o resultado na tela
}

calcularDesconto(preco, desconto);
