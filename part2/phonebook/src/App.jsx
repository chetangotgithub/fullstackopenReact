import { useState, useEffect } from "react";
import axiosState from "./Axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");

  useEffect(() => {
    console.log("effect");
    axiosState.getAll().then((response) => setPersons(response.data));
  }, []);

  const addPerson = (event, person) => {
    event.preventDefault();
    const updatedata = persons.filter((per) => {
      return per.name == person.name;
    });

    if (updatedata.length > 0) {
      const a = alert(
        `${person.name} already exist, replace old number with new Number ?`
      );
      axiosState.updatePerson(person, updatedata.at(0).id).then((response) => {
        console.log(response);
        setPersons(
          persons.map((per) => {
            per.id !== response.data.id ? per : response.data;
          })
        );
      });
    } else {
      axiosState.addPerson(person).then((response) => {
        setPersons(persons.concat(response.data));
      });
    }
    setNewName("");
    setNumber("");
  };

  const deletePerson = (event, person) => {
    event.preventDefault();
    axiosState
      .deletePerson(person)
      .then((response) => {
        alert(`Delete ${response.data.name}`);

        persons.filter((per) => {
          return per.id !== response.data.id;
        });
        console.log(
          persons.filter((per) => {
            return per.id !== response.data.id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        </div>
        <div>
          Number:
          <input
            value={newNumber}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={(e) => {
              let person = {
                name: newName,
                number: newNumber,
              };
              addPerson(e, person);
            }}
          >
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div>
          <p>
            {person.name} {person.number}{" "}
            <button
              onClick={(e) => {
                deletePerson(e, person);
              }}
            >
              delete
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
