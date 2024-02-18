import React, { useEffect, useState } from 'react';
import { Plus, Download, Trash2, XCircle } from 'lucide-react';
import { deleteListFromDB, readAllLists, upsertList } from '../../utils/db';

export default function Lists() {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [currentList, setCurrentList] = useState(null); // For the modal

  useEffect(() => {
    const fetchLists = async () => {
      const allLists = await readAllLists();
      console.log('allLists:', allLists)
      console.log('currentList:', currentList)
      setLists(allLists);
    };

    fetchLists();
  }, []);

  const handleAddList = async () => {0
    const newList = {
      id: Date.now(),
      name: newListName,
      items: [],
      updatedAt: Date.now(),
    };

    const constructInstagramUrl = username => `https://www.instagram.com/${username}`;

    await upsertList(newList);
    const updatedLists = await readAllLists();
    setLists(updatedLists);
    setNewListName('');
  };

  const updateList = async (id, newName) => {
    const listToUpdate = lists.find((list) => list.id === id);
    const updatedList = {
      ...listToUpdate,
      name: newName,
      updatedAt: Date.now(),
    };

    await upsertList(updatedList);
    const updatedLists = await readAllLists();
    setLists(updatedLists);
    setCurrentList(updatedList);
  };

  const deleteList = async (id) => {
    // TODO: Implement a delete function in db.js and call it here
    await deleteListFromDB(id);
    const updatedLists = await readAllLists();
    setLists(updatedLists);
    setCurrentList(null);
  };


// Downloads the list as CSV
  const downloadListAsCSV = (list) => {
    // Map your list items to CSV format
    const csvContent = list.items.map(item =>
      [
        item.username,
        `https://instagram.com/${item.username}`,
        item.fullName,
        item.avgComments,
        item.avgLikes,
        item.avgReach,
        item.followerCount,
        item.followingCount,
        item.imageReach,
        item.imageEngagementRate,
        item.reelsViews,
        item.reelsAvgLikes,
        item.reelsEngagementRate,
        item.reelsReach,
        item.storyReach,
        item.totalComments,
        item.totalEngagement,
        item.totalLikes,
        item.totalViews,
        item.email,
        item.phoneNumber
        // Add any other item properties here
      ].join(',')
    ).join('\n');

    // Add a header row if needed
    const header = [
      'Username',
      'Instagram URL',
      'Full Name',
      'Average Comments',
      'Average Likes',
      'Average Reach',
      'Follower Count',
      'Following Count',
      'Image Reach',
      'Image Engagement Rate',
      'Reels Views',
      'Reels Average Likes',
      'Reels Engagement Rate',
      'Reels Reach',
      'Story Reach',
      'Total Comments',
      'Total Engagement',
      'Total Likes',
      'Total Views',
      'Email',
      'Phone Number'
      // Add any other headers here
    ].join(',');

    const csvFileContent = `data:text/csv;charset=utf-8,${header}\n${csvContent}`;

    // Create a link to download the csv
    const encodedUri = encodeURI(csvFileContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${list.name}.csv`);
    document.body.appendChild(link); // Required for FF

    // Trigger the download
    link.click();

    // Clean up the DOM
    document.body.removeChild(link);
  };

  // Opens the modal to display the list details
  const showListDetails = (list) => {
    console.log('showListDetails invoked ',  list);
    setCurrentList(list);
  };

  // Closes the modal
  const closeListDetails = () => {
    setCurrentList(null);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Add List Section */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="New List Name"
          className="p-2 border border-gray-200 rounded flex-grow"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleAddList}
          disabled={!newListName}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Lists Display */}
      <div>
        {lists.sort((a, b) => b.updatedAt - a.updatedAt).map((list) => (
          <div key={list.id} className="p-4 mb-2 border border-gray-200 rounded flex justify-between items-center">
            <span className="cursor-pointer" onClick={() => showListDetails(list)}>
              {list.name}
            </span>
            <div>
              <button
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => downloadListAsCSV(list)}
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => deleteList(list.id)}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* List Details Modal */}
      {currentList && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{currentList.name}</h3>
              <div className="mt-2 px-7 py-3">
                {/* Instagram Usernames */}
                <div className="space-y-3">
                  {currentList.items.length > 0
                    ? currentList.items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-500">
                          {item.username}
                        </div>
                      ))
                    : <div>Nothing to display here.</div>}
                </div>
              </div>
              <div className="items-center px-4 pb-3">
                <button
                  className="mx-auto bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  onClick={closeListDetails}
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
