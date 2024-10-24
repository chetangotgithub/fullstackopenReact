import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import PersonForm from "./createPerson";
export const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

const Persons = ({ persons, unshow }) => {
  console.log("Persons ", persons);
  return (
    <div>
      <h2>Persons</h2>

      <div key={persons.name}>
        {persons.name} {persons.phone}
      </div>
      <button onClick={() => unshow()}> Un Show</button>
    </div>
  );
};

const App = () => {
  const [show, setshow] = useState(null);

  const result = useQuery(ALL_PERSONS, {
    skip: !show,
  });

  if (result.loading) {
    return <div>loading...</div>;
  }
  console.log("Result ", result.data);

  if (show && result.data) {
    return (
      <>
        {result.data.allPersons.map((obj) => {
          return <Persons persons={obj} unshow={() => setshow(false)} />;
        })}

        <PersonForm />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setshow(true);
        }}
      >
        Show
      </button>
    </>
  );
};

export default App;
