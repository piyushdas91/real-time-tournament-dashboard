'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { createSyncStoragePersister } from "./lib/storagePersister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { queryClient } from "./lib/queryClient";

export function ReactQueryProviders({children} : {children: ReactNode}) {
    const [clientReady, setClientReady] = useState(false);
    const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const persister = createSyncStoragePersister(
      window.localStorage,
    );

    import("@tanstack/react-query-persist-client").then(({ persistQueryClient }) => {
      persistQueryClient({
        queryClient,
        persister,
        maxAge: 1000 * 60 * 60 * 24, // 24h
      });
      setClientReady(true);
    });
  }, [queryClient]);

  if (!clientReady) return null;
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}