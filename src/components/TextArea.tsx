import React, { useState } from 'react';
import '../styles/TextArea.scss';

interface TextAreaProps {
  initialValue?: string;
  placeholder?: string;
  // handleUpdateNotes: (id: string, value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const { initialValue = '', placeholder = '' } = props;
  const [value, setValue] = useState(initialValue);

  const handleOnChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const newValue = target.value;
    setValue(newValue);
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
