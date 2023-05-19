const express = require('express');
const Todo = require('../models/Todos.model');
const Todorouter = express.Router();

// Get all todos for the current user
Todorouter.get('/', async (req, res) => {
    console.log(req.body.userId)
  try {
    const todos = await Todo.findAll({
      where: { userId: req.body.userId },
    });
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new todo for the current user
Todorouter.post('/add', async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const todo = await Todo.create({
      title,
      description,
      userId,
    });
    res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a todo for the current user
Todorouter.patch('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, userId } = req.body;
    const [rowsUpdated] = await Todo.update(
      { title, description, userId },
      {
        where: { id, userId },
      }
    );
    if (rowsUpdated === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      const updatedTodo = await Todo.findByPk(id);
      res.status(200).json(updatedTodo);
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a todo for the current user
Todorouter.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const rowsDeleted = await Todo.destroy({
      where: { id, userId },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = Todorouter;
