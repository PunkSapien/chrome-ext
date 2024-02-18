import React, { useState, useEffect, useRef } from 'react';
import { BookmarkPlus } from 'lucide-react';
import { readAllLists, upsertList } from '../../utils/db';

export default function Header({ navigateToPage, activePage, getActionGlobal, setSelectedListId, listsProp }) {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownButtonRef = useRef(null);
  const dropdownModalRef = useRef(null);

  const fetchLists = async () => {
    const allLists = await readAllLists();
    setLists(allLists);
    if (!selectedList) setSelectedList(allLists[0]?.id || null); // set only if not already set
  };

  useEffect(() => {
    fetchLists();

    const handleClickOutside = (event) => {
      if (dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target) &&
          dropdownModalRef.current && !dropdownModalRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddToSelectedList = async () => {
    if (!selectedList || !getActionGlobal) return;

    const listToUpdate = lists.find(list => list.id === selectedList);
    if (!listToUpdate) return;

    const itemIndex = listToUpdate.items.findIndex(item => item.userid === getActionGlobal.userid);

    let updatedItems;
    if (itemIndex > -1) {
      updatedItems = [...listToUpdate.items];
      updatedItems[itemIndex] = getActionGlobal;
    } else {
      updatedItems = [...listToUpdate.items, getActionGlobal];
    }

    const updatedList = {
      ...listToUpdate,
      items: updatedItems,
    };

    await upsertList(updatedList);
    fetchLists();
    setShowDropdown(false);
  };

  const handleListSelection = (id) => {
    setSelectedListId(id);
    setShowDropdown(false);
  };

  const getButtonText = () => {
    if (selectedList) return lists.find(list => list.id === selectedList)?.name;
    return lists.length ? 'Select a list' : 'Create a list';
  };

  // Function to navigate to the imports page
  const navigateToImports = () => {
    navigateToPage('import');
  };

  return (
    <header className="w-100 px-4 py-2 flex justify-between items-center bg-gray-100">
      {activePage !== 'index' ? (
        <button className="text-blue-500 hover:text-blue-700" onClick={() => navigateToPage('index')}>
          Go back to home
        </button>
      ) : (
        <div>
          <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => navigateToPage('lists')}>
            View all lists
          </button>
          <button className="text-blue-500 hover:text-blue-700" onClick={navigateToImports}>
            Import
          </button>
        </div>
      )}

      <div className="relative flex items-center">
        <button
          ref={dropdownButtonRef}
          onClick={() => setShowDropdown(!showDropdown)}
          className="border rounded mr-2 p-2 cursor-pointer hover:bg-gray-200"
        >
          {getButtonText()}
        </button>

        {showDropdown && (
          <div
            ref={dropdownModalRef}
            className="absolute top-full mt-2 w-64 border rounded shadow-md bg-white z-10"
          >
            {lists.length ? (
              lists.map(list => (
                <div
                  key={list.id}
                  onClick={() => handleListSelection(list.id)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {list.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-600">No lists available</div>
            )}
          </div>
        )}

        <button
          onClick={handleAddToSelectedList}
          className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          <BookmarkPlus className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
