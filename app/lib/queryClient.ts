// queryClient.ts
'use client';

import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from './storagePersister';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

// Only run persistence on the client
if (typeof window !== 'undefined') {
  const persister = createSyncStoragePersister(
    window.localStorage,
  );

  persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  });
}
