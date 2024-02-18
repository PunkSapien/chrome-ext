// db.js
// This is a simple abstraction for IndexedDB operations

const DB_NAME = 'chromeInfluencer';
const DB_VERSION = 1;
const LISTS_STORE = 'lists';

// Open the IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(LISTS_STORE)) {
        // Object store for lists will now also include a listName and an items array
        db.createObjectStore(LISTS_STORE, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onerror = (event) => {
      reject('Database error: ' + event.target.errorCode);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}

// Read all lists from the store
export async function readAllLists() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([LISTS_STORE], 'readonly');
    const objectStore = transaction.objectStore(LISTS_STORE);
    const request = objectStore.getAll();

    request.onerror = (event) => {
      reject('Error fetching data: ' + event.target.errorCode);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}

// Insert or update a list in the store
export async function upsertList(list) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([LISTS_STORE], 'readwrite');
    const objectStore = transaction.objectStore(LISTS_STORE);
    const request = objectStore.put(list);
    console.log("Attempting to write list:", list);
    request.onerror = (event) => {
      reject('Error writing data: ' + event.target.errorCode);
    };

    request.onsuccess = () => {
      resolve();
    };
  });
}

// More functions can be added here to interact with other data in the IndexedDB
export async function deleteListFromDB(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([LISTS_STORE], 'readwrite');
      const objectStore = transaction.objectStore(LISTS_STORE);
      const request = objectStore.delete(id);

      request.onerror = (event) => {
        reject('Error deleting data: ' + event.target.errorCode);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }
