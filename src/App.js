import React, { useState, useEffect } from "react";
//import Person from "./person";
import Phonebook from "./phonebook";
import Notification from "./notification";
import personsService from "./services/persons";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter persons by: <input value={value} onChange={onChange} />
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("testii");
  const [newNumber, setNewNumber] = useState("1230120150");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationSuccess, setNotificationSuccess] = useState(true);

  useEffect(() => {
    personsService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });

    //setPersons(personsService.get());
    //console.log(persons);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  }, [notificationMessage]);

  const handlePersonDelete = async (person) => {
    const reply = await personsService.remove(person.id);
    console.log(reply);
    if (reply.status === 200) {
      //setBlogs(blogs.filter((blog) => blog.id !== id));
      setPersons(persons.filter((p) => p.id !== person.id));
      setNotificationMessage(`Deleted ${person.name}`);
      setNotificationSuccess(true);
    } else {
      setNotificationMessage(`Could not delete ${person.name}`);
      setNotificationSuccess(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };

    console.log("adding " + newName);
    const reply = await personsService.create(newPerson);
    if (reply.status === 200) {
      setPersons(persons.concat(reply.data));
      setNotificationMessage(`Added ${reply.data.name}`);
      setNotificationSuccess(true);
      setNewName("");
      setNewNumber("");
      return;
    }
    if (reply.status === 403) {
      setNotificationMessage(`min length of name is 4 and 8 for number`);
      setNotificationSuccess(false);
      return;
    }
    if (reply.status === 409) {
      if (!window.confirm(`${newPerson.name} already exists. Update?`)) return;
      try {
        console.log("updating");
        const asd = persons.find((person) => person.name === newPerson.name);
        const reply = await personsService.update(asd.id, newPerson);
        const newpersons = persons.map((person) =>
          person.id !== reply.data.id ? person : reply.data
        );
        setPersons([...newpersons]);
        setNotificationMessage(`${newName} updated`);
        setNotificationSuccess(true);
        setNewName("");
        setNewNumber("");
        return;
      } catch {
        setNotificationMessage(`${newName} has already been deleted`);
        setNotificationSuccess(false);
        return;
      }
    }
    throw new Error("unknown error");
  };

  return (
    <div>
      <h1>Phonebook app</h1>
      <Notification
        message={notificationMessage}
        success={notificationSuccess}
      />
      <div>
        <form onSubmit={handleFormSubmit}>
          <div>
            name:{" "}
            <input
              value={newName}
              onChange={({ target }) => setNewName(target.value)}
            />
          </div>
          <div>
            number:{" "}
            <input
              value={newNumber}
              onChange={({ target }) => setNewNumber(target.value)}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      ---------------------------------------------------------------
      <Filter
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
      />
      <Phonebook
        ppl={persons}
        onDelete={handlePersonDelete}
        filtertext={filter}
      />
    </div>
  );
};

export default App;
