const express = require('express');
const axios = require('axios');
const mysql = require('mysql');

const app = express();
app.use(express.json());
const port = 5000;

// Configurações do banco de dados
const dbConfig = {
  host: 'db',  // Nome do serviço do MySQL no docker-compose, ou endereço IP/host do servidor MySQL
  user: 'root',
  password: 'senha_teste',
  database: 'node_docker'
};

// Cria a conexão com o banco de dados
const db = mysql.createConnection(dbConfig);

db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// Rota principal que retorna dados de um usuário aleatório
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://randomuser.me/api');
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Rota para inserir um novo usuário no banco de dados
app.post('/inserthost', async (req, res) => {
  try {
    const { data } = await axios.get('https://randomuser.me/api');
    const username = data.results[0].name.first;

    const query = 'INSERT INTO users(name) VALUES(?)';
    db.query(query, [username], (error, results) => {
      if (error) throw error;
      res.send(`User added with name: ${username}`);
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
