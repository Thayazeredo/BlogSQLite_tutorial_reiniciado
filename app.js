const express = require("express");
const sqlite3 = require("sqlite3");

const PORT = 8000; // Porta do servidor HTTP da aplicação

const app = express(); // Instancia para uso do express

// Cria conexão com o banco de dados
const db = new sqlite3.Database("user.db"); // Instancia para uso do sqlite3

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT) "
  );
});

app.use("/static", express.static(__dirname + "/static"));

// Configurar EJS como o motor de visualização
app.set("view engine", "ejs");

// Cria conexão com banco de dados

const index =
  "<a href='/sobre'>Sobre</a><a href='/Login'>Login</a><a href='/cadastro'>Cadastro </a>";
const sobre = 'Voce esta na pagina "sobre"<br><a href="/">sobre</a>';
const Login = 'Voce esta na pagina "Login"<br><a href="/">Login</a>';
const Cadastro = 'Voce esta na pagina "Cadastro"<br><a href="/">Cadastro</a>';

app.get("/", (req, res) => {
  // res.send(home);
  res.render("index");
});

app.get("/sobre", (req, res) => {
  res.send(sobre);
});

app.get("/login", (req, res) => {
  res.render(login);
});

app.post("/login", (req, res) => {
  res.send("Login ainda não implementado.");
});

app.get("/cadastro", (req, res) => {
  res.send(Cadastro);
});

// app.listen() deve ser o ultimo comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}!`);
});
//teste
