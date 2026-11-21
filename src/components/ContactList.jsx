import React, { useContext } from 'react';
import ContactItem from './ContactItem.jsx';
import PhonebookContext from '../context/PhonebookContext.jsx';

export default function ContactList() {
  const { contacts, deleteContact } = useContext(PhonebookContext);

  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={deleteContact}
        />
      ))}
    </ul>
  );
}
