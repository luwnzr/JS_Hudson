const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

//configurações
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//rota da tela de login
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/login.html');
});

//rota para autenticar usuário
app.post('/', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE usarname = ? AND password = ?';

    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            res.status(500).send('Falha ao autenticar usuário');
        }

        if (result.length > 0) {
            //Redireciona para o GitHub após login bem-sucedido
            console.log('Login bem-sucedido:', usename);
            res.redirect('https://github.com/');
        }
        else{
            //exibe mensagem de erro
            console.log('Credenciais inválidas:', usename);
            res.send(`
               <h1>Usuário ou senha inválidas! </h1>
               <a href="/">Voltar</a>
               `);
        }
    });
});
//Inicia o servidor 
app.listen(PORT,() => {
    console.log('Servidor rodando em http://localhost:${PORT}');
});
