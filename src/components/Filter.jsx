import React, { useContext } from 'react';
import PhonebookContext from '../context/PhonebookContext.jsx';

export default function Filter() {
  const { filter, setFilter } = useContext(PhonebookContext);

  return (
    <label>
      Find contacts by name
      <input
        type="text"
        value={filter}
        onChange={event => setFilter(event.target.value)}
      />
    </label>
  );
}
