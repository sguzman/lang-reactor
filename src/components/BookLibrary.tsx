
import React from 'react';
import ePub from 'epubjs';
import { Book } from './types';

interface Props {
  books: Book[];
  onBookUpload: (book: Book) => void;
  onBookSelect: (bookId: string) => void;
}

const BookLibrary: React.FC<Props> = ({ books, onBookUpload, onBookSelect }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newBookId = Date.now().toString(); // Generate a unique ID

    if (file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onBookUpload({ id: newBookId, title: file.name, content });
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.epub')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const book = ePub(e.target?.result as ArrayBuffer);
        book.loaded.navigation.then((nav) => {
          const promises = nav.toc.map((item) => book.load(item.href).then(chapter => chapter.text()));
          Promise.all(promises).then((chapters) => {
            onBookUpload({ id: newBookId, title: file.name, content: chapters.join('\n') });
          });
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h3>Your Library</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} <button onClick={() => onBookSelect(book.id)}>Read</button>
          </li>
        ))}
      </ul>
      <h3>Upload New Book</h3>
      <input type="file" onChange={handleFileUpload} accept=".txt,.epub" />
    </div>
  );
};

export default BookLibrary;

