import React, { useState, useEffect, createContext, useContext } from 'react';
import IndexedDBStorage from './IndexedDBStorage';

const IndexedDBContext = createContext<IndexedDBStorage | null>(null);

export const IndexedDBProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [storage, setStorage] = useState<IndexedDBStorage | null>(null);

    useEffect(() => {
        const dbStorage = new IndexedDBStorage();
        dbStorage.initPromise.then(() => {
            setStorage(dbStorage);
        });
    }, []);

    return (
        <IndexedDBContext.Provider value={storage}>
            {children}
        </IndexedDBContext.Provider>
    );
};

export const useIndexedDB = () => {
    const context = useContext(IndexedDBContext);
    //if (!context) {
    //    throw new Error('useIndexedDB must be used within an IndexedDBProvider');
    //}
    return context;
};
