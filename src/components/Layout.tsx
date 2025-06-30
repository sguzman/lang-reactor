
import React from 'react';

interface Props {
  header: React.ReactNode;
  mainContent: React.ReactNode;
  sidebar: React.ReactNode;
  onExportVocabulary: () => void;
  onDeleteAllData: () => void;
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const Layout: React.FC<Props> = ({ header, mainContent, sidebar, onExportVocabulary, onDeleteAllData, currentPage, totalPages, onPreviousPage, onNextPage }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        {header}
        <button onClick={onExportVocabulary}>Export Vocabulary</button>
        <button onClick={onDeleteAllData} style={{ backgroundColor: 'red', color: 'white' }}>Delete All Data</button>
        <div className="pagination-controls">
          <button onClick={onPreviousPage} disabled={currentPage === 0}>Previous</button>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <button onClick={onNextPage} disabled={currentPage === totalPages - 1}>Next</button>
        </div>
      </header>
      <main className="layout-main">
        <div className="layout-content">{mainContent}</div>
        <aside className="layout-sidebar">{sidebar}</aside>
      </main>
    </div>
  );
};

export default Layout;
