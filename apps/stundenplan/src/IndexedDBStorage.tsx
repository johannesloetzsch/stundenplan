// can be used like localStorage or sessionStorage but doesn't suffer from small quota

export default class IndexedDBStorage {
    private dbName: string;
    private storeName: string;
    private db: IDBDatabase | null = null;
    initPromise: Promise<void>;

    constructor(dbName: string = 'myDatabase', storeName: string = 'myStore') {
        this.dbName = dbName;
        this.storeName = storeName;
        this.initPromise = this.init();
    }

    private async init() {
        return new Promise<void>((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                db.createObjectStore(this.storeName);
            };

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve();
            };

            request.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
        });
    }

    async ensureInitialized() {
        if (this && !this.db) {
            await this.initPromise;
        }
    }

    private async withTransaction<T>(callback: (store: IDBObjectStore) => T | Promise<T>): Promise<T> {
        await this.ensureInitialized();

        return new Promise<T>((resolve, reject) => {
            const transaction = this?.db?.transaction(this.storeName, 'readwrite');
            if(transaction) {
              const store = transaction.objectStore(this.storeName);
  
              const result = callback(store);
              transaction.oncomplete = () => resolve(result);
              transaction.onerror = (event) => reject((event.target as IDBTransaction).error);
            }
        });
    }

    public async setItem(key: string, value: any): Promise<void> {
        await this.withTransaction(store => {
            store.put(value, key);
        });
    }

    public async getItem(key: string): Promise<any> {
        return this.withTransaction(store => {
            return new Promise((resolve) => {
                const request = store.get(key);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => resolve(null);
            });
        });
    }

    public async removeItem(key: string): Promise<void> {
        await this.withTransaction(store => {
            store.delete(key);
        });
    }

    public async clear(): Promise<void> {
        await this.withTransaction(store => {
            return new Promise((resolve) => {
                const request = store.clear();
                request.onsuccess = () => resolve(null);
            });
        });
    }

    public async keys(): Promise<string[]> {
        return this.withTransaction(store => {
            return new Promise((resolve) => {
                const keys: string[] = [];
                const request = store.openCursor();

                request.onsuccess = (event) => {
                    const cursor = (event.target as IDBRequest<IDBCursor>).result;
                    if (cursor) {
                        keys.push(cursor.key as string);
                        cursor.continue();
                    } else {
                        resolve(keys);
                    }
                };
            });
        });
    }
}
