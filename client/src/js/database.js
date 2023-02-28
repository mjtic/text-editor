import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

/*https://www.npmjs.com/package/idb

Promises & throwing
The library turns all IDBRequest objects into promises, but it doesn't know in advance which methods may return promises.
As a result, methods such as store.put may throw instead of returning a promise.
If you're using async functions, there's no observable difference.

//const db = await openDB(name, version)
//name: Name of the database.
version (optional): Schema version, or undefined to open the current version.

const tx = db.transaction('keyval', 'readwrite');
const store = tx.objectStore('keyval');
const request = store.put({ id: id, todo: content });
*/

//PUT funciton
export const putDb = async (id, content) => {
  console.log('PUT to the jateDB');
  // connect to DB and version we want to use
  const jateDb = await openDB('jate', 1);
  // tx.store - If a transaction involves a single store, the store property will reference that store.
  // since we have one store name, is 'readwrite neccesary? (question to ask)
  const tx = jateDb.transaction('jate', 'readwrite');
  // open the object to store
  /*
  If a transaction involves multiple stores, tx.store is undefined, you need to use tx.objectStore(storeName) 
  to get the stores.
  */
  const store = tx.objectStore('jate')
  //
  const request = store.put({ id: id, value: content });
  //
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
/*
export async function get(key) {
  return (await dbPromise).get('keyval', key);
}
*/
export const getDb = async () => {
  console.log('GET all from the jateDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  const request = store.getAll();
  // const request = store.get(1);
  
  const result = await request;
  console.log('result.value', result);
  return result.value;
}

initdb();
