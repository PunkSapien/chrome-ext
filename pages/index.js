import React, { useState } from 'react';
import Index from '../components/Index';
import Lists from '../components/Lists';
import Import from '../components/Import'; // Import your Import component

export default function Home() {
  const [activePage, setActivePage] = useState('index');

  const navigateToPage = (page) => {
    setActivePage(page);
  };

  return (
    <>
      {activePage === 'index' && <Index navigateToPage={navigateToPage} />}
      {activePage === 'lists' && <Lists navigateToPage={navigateToPage} />}
      {activePage === 'import' && <Import navigateToPage={navigateToPage} />} {/* New condition for rendering the Import component */}
    </>
  );
}
