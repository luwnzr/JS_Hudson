const express = require('express');

const app = express();
const port = 3000;

// Middleware para interpretar JSON (não precisa do body-parser separado)
app.use(express.json());

// Base de dados fictícia
let items = [];

// Rotas CRUD

// Criar um novo item (Create)
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }
    const newItem = { id: items.length + 1, name, description };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Listar todos os itens (Read)
app.get('/items', (req, res) => {
    res.status(200).json(items);
});

// Buscar item por ID (Read)
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(i => i.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
    }
    res.status(200).json(item);
});

// Atualizar um item por ID (Update)
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const itemIndex = items.findIndex(i => i.id === parseInt(id));
    
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found.' });
    }
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }
    
    items[itemIndex] = { id: parseInt(id), name, description };
    res.status(200).json(items[itemIndex]);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
