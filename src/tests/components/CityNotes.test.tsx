import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CityNotes from '../../components/CityNotes';

let container: Element;

describe('CityNotes', () => {
  beforeEach(() => {
    const component = render(<CityNotes cityName="Madrid" />);
    container = component.container;
  });

  test('it renders an add note button', () => {
    screen.getByText('Add note');
  });

  describe('clicking on add note button', () => {
    beforeEach(() => {
      const addNoteBtn = screen.getByText('Add note');
      fireEvent.click(addNoteBtn);
    });

    test('adds a text are', () => {
      screen.findAllByPlaceholderText('Enter your notes');
    });
  });

  describe('clicking on delete note icon after adding one', () => {
    beforeEach(() => {
      const deleteNoteBtn = container.querySelector('.button-delete-note')!;
      fireEvent.click(deleteNoteBtn);
    });

    test('deletes the note', () => {
      const notes = screen.queryAllByPlaceholderText('Enter your notes');
      expect(notes.length).toBe(0);
    });
  });
});
