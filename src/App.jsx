import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';
import Filter from './components/Filter.jsx';
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
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}
