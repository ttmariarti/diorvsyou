import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';
import Filter from './components/Filter.jsx';
import PhonebookContext from './context/PhonebookContext.jsx';
import useLocalStorage from './hooks/useLocalStorage.js';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const normalizedName = name.trim().toLocaleLowerCase();
    const isDuplicate = contacts.some(
      contact => contact.name.trim().toLocaleLowerCase() === normalizedName,
    );

    if (isDuplicate) {
      window.alert(`${name} is already in contacts.`);
      return false;
    }

    setContacts(currentContacts => [
      ...currentContacts,
      { id: nanoid(), name: name.trim(), number: number.trim() },
    ]);
    return true;
  };

  const deleteContact = contactId => {
    setContacts(currentContacts =>
      currentContacts.filter(contact => contact.id !== contactId),
    );
  };

  const normalizedFilter = filter.trim().toLocaleLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(normalizedFilter),
  );

  return (
    <PhonebookContext.Provider
      value={{
        contacts: visibleContacts,
        addContact,
        deleteContact,
        filter,
        setFilter,
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <ContactForm />

        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </PhonebookContext.Provider>
  );
}
