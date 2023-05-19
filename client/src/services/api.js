import axios from 'axios';

const url = 'http://localhost:8081';
let headers = {};

export const UpdateToken = async()=>{
   const token = JSON.parse(localStorage.getItem('token'));
   headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.token}`,
    };
    
}

export const userSignup = async (data) => {
  try {
    const res = await axios.post(`${url}/users/register`, data);
    return res.data;
  } catch (error) {
    console.log('Add user API', error);
  }
};

export const userLogin = async (data) => {
  try {
    const res = await axios.post(`${url}/users/login`, data);
    return res.data;
  } catch (error) {
    console.log('Add user API', error);
  }
};

export const getTodo = async () => {
    console.log(headers)
  try {
    const res = await axios.get(`${url}/todos`,{ headers });
    return res;
  } catch (error) {
    console.log('get todo', error);
  }
};
export const addTodo = async (data) => {
    console.log(headers)
  try {
    const res = await axios.post(`${url}/todos/add`, data, { headers });
    return res;
  } catch (error) {
    console.log('Add todo', error);
  }
};

export const delTodo = async (id) => {
  try {
    await axios.delete(`${url}/todos/delete/${id}`, { headers });
    // return res;
  } catch (error) {
    console.log('Delete todo', error);
  }
};

export const todoUpdate = async (id, data) => {
  try {
    await axios.patch(`${url}/todos/edit/${id}`, data, { headers });
    // return res;
  } catch (error) {
    console.log('Update todo', error);
  }
};
