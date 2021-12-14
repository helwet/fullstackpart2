import React from "react";

const Person = ({ person, onPersonDelete }) => {
  console.log("rendering" + person);
  return (
    <div>
      <p key={person.id}>
        {person.name} : {person.number}{" "}
        <button onClick={() => onPersonDelete(person)}>delete</button>
      </p>
    </div>
  );
};

export default Person;
