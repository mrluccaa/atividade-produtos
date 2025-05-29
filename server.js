const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Para servir arquivos estáticos (JS, CSS) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Para servir os arquivos HTML em / e /cadastro
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/cadastro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
