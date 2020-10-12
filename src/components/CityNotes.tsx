import React, { Fragment, useState } from 'react';
import debounce from 'lodash/debounce';
import { v4 as uuidv4 } from 'uuid';
import { getNotesFromLocal, saveDataToLocal } from '../util';
import TextArea from './TextArea';
import '../styles/CityNotes.scss';
import Button from './Button';

interface CityNotesProps {
  cityName: string;
}

const CityNotes: React.FC<CityNotesProps> = (props) => {
  const { cityName } = props;
  const [notes, setNotes] = useState<{ id: string; value: string; location: string }[] | null>(
    getNotesFromLocal()
  );
  let notesToRender: { id: string; value: string; location: string }[] = [];

  const handleAddNote = () => {
    const newNote = { id: uuidv4(), value: '', location: cityName };

    if (!notes) {
      saveDataToLocal('notes', [newNote]);
      setNotes([newNote]);
    } else {
      saveDataToLocal('notes', [newNote, ...notes]);
      setNotes([newNote, ...notes]);
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

  const addNoteBtnContent = (
    <div>
      <i className="fas fa-plus-circle">
        <span>Add note</span>
      </i>
    </div>
  );

  return (
    <section className="city-notes">
      <Button
        onClick={handleAddNote}
        btnType="button"
        text={addNoteBtnContent}
        btnClasses="button-add-note"
      />
      {notesToRender.map((note: { id: string; value: string; location: string }) => (
        <Fragment key={uuidv4()}>
          <TextArea
            id={note.id}
            key={uuidv4()}
            initialValue={note.value}
            handleUpdateLocalNotes={handleUpdateLocalNotes}
          />
          <Button
            onClick={handleDeleteNote.bind(null, note.id)}
            btnType="button"
            text={<i className="far fa-trash-alt" />}
            btnClasses="button-delete-note"
          />
        </Fragment>
      ))}
    </section>
  );
};

export default CityNotes;
