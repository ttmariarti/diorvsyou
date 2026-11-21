import React, { useContext, useRef, useState } from 'react';
import PhonebookContext from '../context/PhonebookContext.jsx';

export default function ContactForm() {
  const { addContact } = useContext(PhonebookContext);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const nameInputRef = useRef(null);

  const handleChange = event => {
    const { name: fieldName, value } = event.target;
    if (fieldName === 'name') {
      setName(value);
    } else {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const wasAdded = addContact({ name, number });

    if (wasAdded) {
      setName('');
      setNumber('');
      nameInputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          ref={nameInputRef}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}
