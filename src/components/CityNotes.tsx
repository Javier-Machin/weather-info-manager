import React from 'react';
import '../styles/CityNotes.scss';
import TextArea from './TextArea';

interface CityNotesProps {
  cityName?: string;
}

const CityNotes: React.FC<CityNotesProps> = (props) => {
  const { cityName } = props;
  if (!cityName) return null;

  // get notes here and map through them in render

  // handler to update notes debounced, id and value

  // handler to add new note, notes need unique id

  // handler to remove a note, id

  return (
    <section className="city-notes">
      <TextArea initialValue={'Some value'} />
    </section>
  );
};

export default CityNotes;
