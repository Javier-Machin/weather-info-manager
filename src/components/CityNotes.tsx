import React, { Fragment, useState } from 'react';
import debounce from 'lodash/debounce';
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { saveDataToLocal, localAvailable, getDataFromLocal } from '../util';
import TextArea from './TextArea';
import '../styles/CityNotes.scss';
import Button from './Button';
import { Note } from '../models';

interface CityNotesProps {
  cityName: string;
}

const CityNotes: React.FC<CityNotesProps> = (props) => {
  const { cityName } = props;
  const [notes, setNotes] = useState<Note[] | null>(getDataFromLocal('notes'));
  let notesToRender: Note[] = [];

  const handleAddNote = () => {
    const newNote = { id: uuidv4(), value: '', location: cityName };

    const updatedNotes = notes ? [newNote, ...notes] : [newNote];

    if (localAvailable) saveDataToLocal('notes', updatedNotes);
    setNotes(updatedNotes);
  };

  const handleUpdateLocalNotes = debounce((id: string, value: string) => {
    const updatedNotes = [...notes!];
    const noteIndex = notes!.findIndex((note) => note.id === id);
    updatedNotes[noteIndex].value = value;
    if (localAvailable) saveDataToLocal('notes', updatedNotes);
  }, 150);

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes!.filter((note) => note.id !== id);
    if (localAvailable) saveDataToLocal('notes', updatedNotes);
    setNotes(updatedNotes);
  };

  if (notes) notesToRender = notes.filter((note) => note.location === cityName);

  const addNoteBtnContent = (
    <Fragment>
      <FaPlusCircle />
      <span>Add note</span>
    </Fragment>
  );

  return (
    <section className="city-notes">
      <Button
        onClick={handleAddNote}
        btnType="button"
        text={addNoteBtnContent}
        btnClasses="button-add-note"
      />
      {notesToRender.map((note: Note) => (
        <Fragment key={uuidv4()}>
          <TextArea
            id={note.id}
            key={uuidv4()}
            initialValue={note.value}
            handleUpdateLocalNotes={handleUpdateLocalNotes}
            placeholder="Enter your notes"
          />
          <Button
            onClick={handleDeleteNote.bind(null, note.id)}
            btnType="button"
            text={<FaTrashAlt />}
            btnClasses="button-delete-note"
          />
        </Fragment>
      ))}
    </section>
  );
};

export default CityNotes;
