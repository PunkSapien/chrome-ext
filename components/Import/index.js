import React, { useState, useEffect } from 'react';
import { ActionClass } from '../Index/content-script'; // Ensure this path is correct
import { readAllLists, upsertList } from '../../utils/db'; // Ensure this path is correct

export default function Import({ setActionGlobal }) {
  const [urlList, setUrlList] = useState('');
  const [timeRange, setTimeRange] = useState({ from: 0, to: 10 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      const allLists = await readAllLists();
      setLists(allLists);
      if (allLists.length > 0) {
        setSelectedListId(allLists[0].id); // Select the first list by default
      }
    };

    fetchLists();
  }, []);

  const saveToList = async (actionInstance) => {
    const allLists = await readAllLists();
    const selectedList = allLists.find(list => list.id === selectedListId);

    if (!selectedList) {
      console.error("No list selected");
      return;
    }

    const updatedList = {
      ...selectedList,
      items: [...selectedList.items, actionInstance],
      updatedAt: Date.now(),
    };

    await upsertList(updatedList);
    // Update the local lists state with the new list data
    setLists(allLists.map(list => list.id === selectedListId ? updatedList : list));
  };

  const openUrlInCurrentTab = (url) => {
    // Query for the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Update the URL of the active tab
      chrome.tabs.update(tabs[0].id, { url });
    });
  };

  const processUrls = async () => {
    setIsProcessing(true);
    const urls = urlList.split('\n').filter(url => url.trim() !== '');

    for (const url of urls) {
      const delay = Math.random() * (timeRange.to - timeRange.from) + timeRange.from;
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
      openUrlInCurrentTab(url); // Open each URL in the current tab
      let username = extractUsernameFromUrl(url);
      if (!username) continue;

      let actionInstance = new ActionClass(username);
      await actionInstance.solve();
      setActionGlobal(actionInstance);

      await saveToList(actionInstance);
    }

    setIsProcessing(false);
  };

  const extractUsernameFromUrl = (url) => {
    try {
      let urlObj = new URL(url);
      let pathParts = urlObj.pathname.split('/').filter(Boolean);
      return pathParts[0];
    } catch (error) {
      console.error('Invalid URL:', url);
      return null;
    }
  };

  const handleUrlListChange = (event) => {
    setUrlList(event.target.value);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange({ ...timeRange, [event.target.name]: parseInt(event.target.value) });
  };

  const handleListSelection = (event) => {
    setSelectedListId(event.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="my-4">
        <div className="mb-4">
          <select
            className="border p-2 rounded"
            value={selectedListId}
            onChange={handleListSelection}
          >
            {lists.map(list => (
              <option key={list.id} value={list.id}>{list.name}</option>
            ))}
          </select>
        </div>

        <textarea
          className="w-full border rounded p-2"
          rows="10"
          placeholder="Enter Instagram URLs (one per line)"
          value={urlList}
          onChange={handleUrlListChange}
        ></textarea>

        <div className="flex gap-4 mb-4">
          <input
            type="number"
            name="from"
            placeholder="Time range from (seconds)"
            className="border p-2 rounded w-1/2"
            value={timeRange.from}
            onChange={handleTimeRangeChange}
          />
          <input
            type="number"
            name="to"
            placeholder="Time range to (seconds)"
            className="border p-2 rounded w-1/2"
            value={timeRange.to}
            onChange={handleTimeRangeChange}
          />
        </div>

        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={processUrls}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Start Import'}
        </button>
      </div>
    </div>
  );
}
