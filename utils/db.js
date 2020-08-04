import { openDB } from 'idb';

function dbPromise() {
	if (process.client) {
		return openDB('watchlistDB', 1, {
			upgrade(db) {
				const objectStore = db.createObjectStore('watchlist', { keyPath: 'id' });
				objectStore.createIndex('id', 'id', { unique: false });
			}
		});
	}
}

async function dbStore(type) {
	if (process.client) {
		const db = await dbPromise();
		const tx = db.transaction('watchlist', type);
		const store = tx.objectStore('watchlist');

		return store;
	}
}

const watchlistDB = {
	async get() {
		const store = await dbStore('readonly');
		return store.getAll();
	},
	async getById(id) {
		const store = await dbStore('readonly');
		return store.get(id);
	},
	async set(item) {
		const store = await dbStore('readwrite');
		store.add(item);
	},
	async delete(id) {
		const store = await dbStore('readwrite');
		store.delete(id);
	}
};

export default watchlistDB;
