import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const addPerson = (persons) => {
  const person = {
    name: persons.name,
    number: persons.number,
  };
  return axios.post(baseUrl, person);
};

const deletePerson = (persons) => {
  return axios.delete(`${baseUrl}/${persons.id}`);
};

const updatePerson = (persons, id) => {
  console.log(persons);
  return axios.put(`${baseUrl}/${id}`, persons);
};

export default {
  getAll,
  addPerson,
  deletePerson,
  updatePerson,
};
