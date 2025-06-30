
import React from 'react';
import ePub from 'epubjs';
import { Book } from './types';

interface Props {
  onBookUpload: (book: Book) => void;
}

const BookLibrary: React.FC<Props> = ({ onBookUpload }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onBookUpload({ title: file.name, content });
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.epub')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const book = ePub(e.target?.result as ArrayBuffer);
        book.loaded.navigation.then((nav) => {
          const promises = nav.toc.map((item) => book.load(item.href).then(chapter => chapter.text()));
          Promise.all(promises).then((chapters) => {
            onBookUpload({ title: file.name, content: chapters.join('\n') });
          });
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept=".txt,.epub" />
    </div>
  );
};

export default BookLibrary;
