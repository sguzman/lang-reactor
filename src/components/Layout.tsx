
import React from 'react';

interface Props {
  header: React.ReactNode;
  mainContent: React.ReactNode;
  sidebar: React.ReactNode;
}

const Layout: React.FC<Props> = ({ header, mainContent, sidebar }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">{header}</header>
      <main className="layout-main">
        <div className="layout-content">{mainContent}</div>
        <aside className="layout-sidebar">{sidebar}</aside>
      </main>
    </div>
  );
};

export default Layout;
