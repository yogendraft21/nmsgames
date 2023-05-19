import React, { useState, useEffect } from 'react';
import {
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from '@mui/material';
import { Add, Delete, Edit, Save } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';
import { UpdateToken, addTodo, delTodo, getTodo, todoUpdate } from '../services/api';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
});

const TodoApp = ({onLogout}) => {
    const [inputTitle, setInputTitle] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => { 
       const token =   JSON.parse(localStorage.getItem("token"))
        console.log(token + "uaseeff")
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
          await UpdateToken();
        try {
            const response = await getTodo();
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleTitleChange = (e) => {
        setInputTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setInputDescription(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputTitle.trim() && inputDescription.trim()) {
            createTodo();
        }
    };

    const createTodo = async () => {
        const newTodo = {
            title: inputTitle,
            description: inputDescription,
        };

        try {
            const response = await addTodo(newTodo);
            setTodos([...todos, response.data]);
            setInputTitle('');
            setInputDescription('');
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const handleDeleteTodo = (id) => {
        deleteTodo(id);
    };

    const deleteTodo = async (id) => {
        try {
            await delTodo(id);
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEditTodo = (id) => {
        const updatedTodos = [...todos];
        const index = updatedTodos.findIndex((todo) => todo.id === id);
        updatedTodos[index].editable = !updatedTodos[index].editable;
        setTodos(updatedTodos);
    };

    const handleSaveTodo = (id) => {
        const updatedTodo = todos.find((todo) => todo.id === id);
        updateTodo(id, updatedTodo);
    };

    const updateTodo = async (id, updatedTodo) => {
        try {
            await todoUpdate(id, updatedTodo);
            const updatedTodos = [...todos];
            const index = updatedTodos.findIndex((todo) => todo.id === id);
            updatedTodos[index].editable = false;
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };
    const handleLogout = () => {
       
        window.location.reload();
        // onLogout();
        window.location.replace('/login');
    };
    return (
        <Container>
            <Button variant="outlined"
                onClick={handleLogout}
                sx={{ alignSelf: 'flex-end', marginBottom: '16px' }}>
                Logout
            </Button>
            <Typography variant="h4" component="h1" gutterBottom>
                Todo App
            </Typography>
            <TextField
                label="Title"
                variant="outlined"
                value={inputTitle}
                onChange={handleTitleChange}
                fullWidth
                sx={{ marginBottom: '16px', width: '300px', height: '50px' }}
            />
            <TextField
                label="Description"
                variant="outlined"
                value={inputDescription}
                onChange={handleDescriptionChange}
                fullWidth
                sx={{ marginBottom: '16px', width: '300px', height: '50px' }}
            />
            <Button variant="contained" startIcon={<Add />} onClick={handleAddTodo}>
                Add
            </Button>
            {todos.length > 0 ? (
                <TableContainer sx={{ marginTop: '16px', maxWidth: '800px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos.map((todo) => (
                                <TableRow key={todo.id}>
                                    <TableCell>
                                        {todo.editable ? (
                                            <TextField
                                                value={todo.title}
                                                onChange={(e) => {
                                                    const updatedTodos = [...todos];
                                                    const index = updatedTodos.findIndex((t) => t.id === todo.id);
                                                    updatedTodos[index].title = e.target.value;
                                                    setTodos(updatedTodos);
                                                }}
                                                inputProps={{
                                                    style: {
                                                        padding: '8px 12px',
                                                    },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                            />
                                        ) : (
                                            <Typography>{todo.title}</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: '200px', overflowX: 'auto' }}>
                                        {todo.editable ? (
                                            <TextField
                                                value={todo.description}
                                                onChange={(e) => {
                                                    const updatedTodos = [...todos];
                                                    const index = updatedTodos.findIndex((t) => t.id === todo.id);
                                                    updatedTodos[index].description = e.target.value;
                                                    setTodos(updatedTodos);
                                                }}
                                                inputProps={{
                                                    style: {
                                                        padding: '8px 12px',
                                                    },
                                                }}
                                                sx={{ maxWidth: '200px' }}
                                            />
                                        ) : (
                                            <Typography>{todo.description}</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>{todo.createdAt}</TableCell>
                                    <TableCell>
                                        {todo.editable ? (
                                            <IconButton
                                                edge="end"
                                                aria-label="save"
                                                onClick={() => handleSaveTodo(todo.id)}
                                            >
                                                <Save />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                edge="end"
                                                aria-label="edit"
                                                onClick={() => handleEditTodo(todo.id)}
                                            >
                                                <Edit />
                                            </IconButton>
                                        )}
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteTodo(todo.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1" sx={{ marginTop: '32px' }}>
                    No todos yet. Add some!
                </Typography>
            )}
        </Container>
    );
};

export default TodoApp;
