const bodyParser = require("body-parser");
const express = require("express");
const sqlite3 = require("sqlite3");
const session = require("express-session");

const PORT = 8000; // Porta do servidor HTTP da aplicação

const app = express(); // Instancia para uso do express

// Cria conexão com o banco de dados
const db = new sqlite3.Database("user.db"); // Instancia para uso do sqlite3

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT) "
  );
});

// Configuração para uso de sessão (cookies)com   Express
app.use(
  session({
    secret: "qualquersenha",
    resave: true,
    saveUnitialized: true,
  })
);

// Aqui sera acrescentado uma rota "/static", para a pasta __dirname + "/static"
// O app.use é usado para acrescentar rotas novas para o Express gerenciar e pode usar
// Middleware para isto, que neste caso é o express.static, que grencia rotas estaticas
app.use("/static", express.static(__dirname + "/static"));

// Middleware para processar as requisições do Body Parameters dp cliente
app.use(bodyParser.urlencoded({ extented: true }));

// Configurar EJS como o motor de visualização
app.set("view engine", "ejs");

// Cria conexão com banco de dados

const index =
  "<a href='/sobre'>Sobre</a><a href='/Login'>Login</a><a href='/cadastro'>Cadastro </a>";
const sobre = 'Voce esta na pagina "sobre"<br><a href="/">sobre</a>';
const Login = 'Voce esta na pagina "Login"<br><a href="/">Login</a>';
const Cadastro = 'Voce esta na pagina "Cadastro"<br><a href="/">Cadastro</a>';

let config = { titulo: "", rodape: "" };

/* Método express.get necessita de dois parametros
Na ARROW FUNCTION, o primeiro são os dados do servidor (REQUISITION - `req`)
o segundo, são os dados que serão enviados ao cliente (RESULT - `res`)*/

app.get("/", (req, res) => {
  console.log("GET /index");
  //res.send(index);
  // res.redirect("/cadastro"); // Redireciona para a ROTA cadastro
  // res.render("pages/cadastro", { titulo: "Título da página" });

  config = { titulo: "Blog", rodape: "" };
  res.render("pages/index", config);
});

app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM users";
  db.all(query, (err, row) => {
    console.log(`GET /usuarios ${JSON.stringify(row)}`);
    res.send("pages/usuarios", config);
  });
});

app.get("/cadastro", (req, res) => {
  console.log("GET /cadastro");
  res.render("pages/cadastro", {
    titulo: "Titulo da pagina",
    config,
  });
});

app.post("/cadastro", (req, res) => {
  !req.body
    ? console.log(JSON.stringify(req.body))
    : console.log(`Body vazio: ${req.body}`);

  const { username, password, email, celular, cpf, rg } = req.body;
  // Colocar aqui as validações e inclusão no banco de dados do cadastro do usuario
  // 1. Validar dados do usuario
  // 2. saber se ele ja existe no banco
  const query =
    "SELECT * FROM users WHERE email=? OR cpf=? OR rg=? OR usernmae=?";
  db.get(query, [email, cpf, rg, username], (err, row) => {
    if (err) throw err;

    if (row) {
      // A variavel `row` irá retornar os dados do banco de dados,
      // executado atraves do SQL, variavel query
      res.send("Usuario já cadastrado, refaça o cadastro");
    } else {
      // 3. Se usuario não existe no banco cadastrar
      const insertQuery =
        "INSERT INTO users (username, password, email, celular, cpf, rg) VALUES (?,?,?,?,?,?)";
      db.run(
        insertQuery,
        [username, password, email, celular, cpf, rg],
        (err) => {
          // Inserir a logica do INSERT
          res.send("Usuario cadastrado com sucesso");
        }
      );
    }
  });

  console.log("POST /cadastro");
  res.send(
    `Bem vindo usuario: ${req.body.username}, seu email é ${req.body.email}`
  );
});

app.get("/sobre", (req, res) => {
  console.log("GET /sobre");
  res.render("pages/sobre", {
    titulo: "Titulo da pagina",
  });
});
app.get("/login", (req, res) => {
  console.log("GET /login");
  // Rota raiz  do meu servidor
  res.render("pages/login", {
    titulo: "Titulo da pagina",
  });
});

app.post("/login", (req, res) => {
  console.log("POST /login");
  const { username, password } = req.body;

  // Consultar o usuario no banco de dados
  // const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.get(query, [username, password], (err, row) => {
    if (err) throw err;

    // Se usuario valido -> registra a sessão e redireciona para o dashboard
    if (row) {
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect("/dashboard");
    } // Se não, envia mensagem de erro (Usuario invalido)
    else {
      res.send("Usario invalido.");
    }
  });
});

app.get("/dashboard", (req, res) => {
  console.log("GET/ dashboard");
  res.render("pages/dashboard", {
    titulo: "Titulo da pagina",
  });
});

//app.listen() deve ser o último comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}!`);
});
