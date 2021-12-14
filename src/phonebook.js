import React from "react";
import Person from "./person";

const Phonebook = ({ ppl, onDelete, filter }) => {
  if (typeof ppl !== "undefined" && ppl !== null && ppl.length > 0) {
    var persons = ppl;
    if (typeof filter !== "undefined" && filter !== "") {
      console.log("filter: " + filter);
      persons = ppl.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    console.log("rendering : " + persons.length + " persons");

    return (
      <div>
        <h2>Numbers</h2>
        {ppl.map((blog) => (
          <Person person={blog} onPersonDelete={onDelete} />
        ))}
      </div>
    );
  }
  return (
    <div>
      <h2>Numbers:</h2>
      <br />
      none to render
    </div>
  );
};

export default Phonebook;
