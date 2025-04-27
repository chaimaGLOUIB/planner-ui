'use client'

import { QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren, useState } from "react";

export function Providers({ children }: PropsWithChildren) {
    //Storing the QueryClient in State:
    const [client] = useState(
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,//When I move between pages didn't refresh data
              //retry: 3,//request again
              //cacheTime: 300000, //Determines how long unused data stays in the cache before being removed (garbage-collected).
              //staleTime: 5 * 60 * 1000, //after which the data will be considered "stale" and a new request will be made(request to the api).
                                                                                        // ✅ staleTime controls how long data remains fresh before React Query considers refetching it.
                                                                                        // ✅ staleTime = 0 means data is always stale and will refetch on every mount.
                                                                                        // ✅ staleTime > 0 helps avoid unnecessary refetching and improves performance.

            },
          },
        })
      );//The client instance is created once and used consistently across re-renders.
    //is used to persist the QueryClient instance across re-renders of the component, 
    // ensuring that React Query manages the cache and queries properly without recreating the client on every render.

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}