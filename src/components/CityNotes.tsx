import React from 'react';
import '../styles/CityNotes.scss';
import TextArea from './TextArea';

interface CityNotesProps {
  cityName?: string;
}

const CityNotes: React.FC<CityNotesProps> = (props) => {
  const { cityName } = props;
  if (!cityName) return null;

  // TODO get notes here and map through them in render

  // TODO handler to add new note, notes need unique id

  // TODO handler to update notes debounced, id and value

  // TODO handler to remove a note, id

  return (
    <section className="city-notes">
      <TextArea initialValue={'Some value'} />
    </section>
  );
};

export default CityNotes;
