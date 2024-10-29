import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";

const getAll = () => {
  return axios.get(baseUrl);
};

const addNote = (persons) => {
  const person = {
    name: persons.name,
    number: persons.number,
  };
  return axios.post(baseUrl, person);
};

const deleteNote = (persons) => {
  return axios.delete(`${baseUrl}/${persons.id}`);
};

const updateNote = (persons, id) => {
  console.log(persons);
  return axios.put(`${baseUrl}/${id}`, persons);
};

export default {
  getAll,
  addNote,
  deleteNote,
  updateNote,
};
