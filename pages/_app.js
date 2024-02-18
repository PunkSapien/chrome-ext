import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Index from '../components/Index';
import Lists from '../components/Lists';
import Import from '../components/Import';
import '../styles/globals.css';

export default function App() {
  const [activePage, setActivePage] = useState('index');
  const [getActionGlobal, setActionGlobal] = useState(null);

  const navigateToPage = (page) => {
    console.log('Navigating to page:', page);
    setActivePage(page);
  };

  useEffect(() => {
    if (getActionGlobal) {
      console.log('ActionGlobal has been set:', getActionGlobal);
    }
  }, [getActionGlobal]);

  let ActiveComponent;
  switch (activePage) {
    case 'index':
      ActiveComponent = <Index navigateToPage={navigateToPage} setActionGlobal={setActionGlobal} />;
      break;
    case 'lists':
      ActiveComponent = <Lists navigateToPage={navigateToPage} />;
      break;
    case 'import':
      ActiveComponent = <Import navigateToPage={navigateToPage} setActionGlobal={setActionGlobal} />;
      break;
    default:
      ActiveComponent = <Index navigateToPage={navigateToPage} setActionGlobal={setActionGlobal} />;
      break;
  }

  return (
    <>
      <Header navigateToPage={navigateToPage} activePage={activePage} getActionGlobal={getActionGlobal} />
      {ActiveComponent}
      <Footer />
    </>
  );
}
