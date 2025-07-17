import { Persister } from "@tanstack/react-query-persist-client";

export function createSyncStoragePersister(storage: Storage): Persister {
    return {
        persistClient: async (client) => {
            storage.setItem('REACT_QUERY_OFFLINE_CACHE', JSON.stringify(client));
          },
          restoreClient: async () => {
            const cache = storage.getItem('REACT_QUERY_OFFLINE_CACHE');
            if (!cache) return undefined;
            return JSON.parse(cache);
          },
          removeClient: async () => {
            storage.removeItem('REACT_QUERY_OFFLINE_CACHE');
          },
    };
}