
import React from 'react';
import { Book } from './types';

interface Props {
  onBookUpload: (book: Book) => void;
}

const BookLibrary: React.FC<Props> = ({ onBookUpload }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const book: Book = { title: file.name, content };
        onBookUpload(book);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept=".txt" />
    </div>
  );
};

export default BookLibrary;
