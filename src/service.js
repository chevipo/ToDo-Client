import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_apiUrl;

axios.interceptors.response.use(
  response => {
    "successful"
    return response;
  },
  error => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error); 
  }
);


export default {
  getTasks: async () => {
    try{
      const result = await axios.get(`/items`)    
      return result.data;
      //return Array.isArray(result.data) ? result.data : result.data.tasks || [];
    }catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
      //return [];
    }
  },

  addTask: async(name)=>{
    try {
      const result = await axios.post('/items',  { name, isComplete: false });
      console.log('Task added:', result.data);
      return result.data;
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    }
  },

  setCompleted: async(id, isComplete)=>{
    try {
      const result = await axios.put(`/items/${id}`, { isComplete });
      console.log('Task updated:', result.data);
      return result.data;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  },

  deleteTask:async(id)=>{
    try {
      const result = await axios.delete(`/items/${id}`);
      console.log('Task deleted:', result.data);
      return result.data;
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  }
}