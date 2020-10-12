import React, { useState } from 'react';
import '../styles/TextArea.scss';

interface TextAreaProps {
  id: string;
  initialValue?: string;
  placeholder?: string;
  handleUpdateLocalNotes: (id: string, value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const { initialValue = '', placeholder = '', id, handleUpdateLocalNotes } = props;
  const [value, setValue] = useState(initialValue);

  const handleOnChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const newValue = target.value;
    setValue(newValue);
    handleUpdateLocalNotes(id, newValue);
  };

  return (
    <textarea
      className="text-area"
      value={value}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  );
};

export default TextArea;
