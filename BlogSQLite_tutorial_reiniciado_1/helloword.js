// const express = require("express");

// const PORT = 8000;

// const app = express();

// app.get("/", (req, res) => {
//   res.send("ola sesi!");
// });

// app.get("/sobre", (req,res) => {
//    res.send("Voce esta na pagina sobre");
// } );

// // app.listen() deve ser o ultimo comando da aplicação (app.js)
// app.listen(PORT, () => {
//   console.log(`Servidor sendo executado na porta ${PORT}!`);
// });

const express = require("express");

const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
  res.send("ola pessoas!");
});

app.get("/info", (req, res) => {
  res.send("Voce esta na pagina info");
});

// app.listen() deve ser o ultimo comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}!`);
});
