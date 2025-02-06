import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5294/api";

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('ERROR: ', error);
    return Promise.reject(error);
  }
);

export const getTasks = async () => {
  try {
    const { data } = await axios.get('/items');
    return data;
  } catch (error) {
    console.error('Failed to get tasks:', error);
    throw error;
  }
};

export const addTask = async (name) => {
  try {
    return await axios.post('/items', { name, isComplete: false });
  } catch (error) {
    console.error('Failed to add task:', error);
    throw error;
  }
};

export const setCompleted = async (id, name, isComplete) => {
  try {
    return await axios.put(`/items/${id}`, { name, isComplete });
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    return await axios.delete(`/items/${id}`);
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};