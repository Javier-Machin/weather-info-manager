import React, { Fragment, useState } from 'react';
import debounce from 'lodash/debounce';
import { v4 as uuidv4 } from 'uuid';
import { getNotesFromLocal, saveDataToLocal } from '../util';
import TextArea from './TextArea';
import '../styles/CityNotes.scss';

interface CityNotesProps {
  cityName: string;
}

const CityNotes: React.FC<CityNotesProps> = (props) => {
  const [notes, setNotes] = useState<{ id: string; value: string; location: string }[] | null>(
    getNotesFromLocal()
  );
  const { cityName } = props;

  let notesToRender: { id: string; value: string; location: string }[] = [];

  const handleAddNote = () => {
    const newNote = { id: uuidv4(), value: '', location: cityName };

    if (!notes) {
      saveDataToLocal('notes', [newNote]);
      setNotes([newNote]);
    } else {
      saveDataToLocal('notes', [...notes, newNote]);
      setNotes([...notes, newNote]);
    }
  };

  const handleUpdateLocalNotes = debounce((id: string, value: string) => {
    const noteIndex = notes!.findIndex((note) => note.id === id);
    notes![noteIndex].value = value;
    saveDataToLocal('notes', [...notes!]);
  }, 150);

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes!.filter((note) => note.id !== id);
    saveDataToLocal('notes', updatedNotes);
    setNotes(updatedNotes);
  };

  if (notes) notesToRender = notes.filter((note) => note.location === cityName);

  return (
    <section className="city-notes">
      <button onClick={handleAddNote} type="button">
        Add new note
      </button>
      {notesToRender.map((note: { id: string; value: string; location: string }) => (
        <Fragment>
          <TextArea
            id={note.id}
            key={uuidv4()}
            initialValue={note.value}
            handleUpdateLocalNotes={handleUpdateLocalNotes}
          />
          <button onClick={handleDeleteNote.bind(null, note.id)} type="button">
            Delete note
          </button>
        </Fragment>
      ))}
    </section>
  );
};

export default CityNotes;
