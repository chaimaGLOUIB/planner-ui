import { taskService } from '@/services/task.service'
import { TypeTaskFormState } from '@/types/task.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// import React, { useState, useEffect } from 'react';

// const MyComponent = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://api.example.com/data');//if axios status 4**/5** will throw exception
//         const result = await response.json();
//         setData(result); // Set the fetched data
//       } catch (err) {
//         setError(err.message); // Set the error if any
//       } finally {
//         setLoading(false); // Set loading to false when fetch is complete
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array means it runs once after the component mounts

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Fetched Data:</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default MyComponent;
const useCreateTask = () => {
  const queryClient = useQueryClient()

  const { mutate: createTask } = useMutation({
    mutationKey: ['create task'],//Auto caching: No need to store data manually
    mutationFn: (data: TypeTaskFormState ) => taskService.createTask(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    }
  })
  return { createTask }
}



export default useCreateTask

// 🔍 Key Differences: Redux vs. React Query
// Feature	                       Redux 🏛	                                                         React Query ⚡
// What it stores?	     Client-side state (e.g., UI state, authentication)	        Server-side state (e.g., API data, caching)
// How does it update?	 Manual updates via actions/reducers	                      Automatic updates via caching & invalidation
// Persistence?	         Must configure storage (e.g., localStorage)	              Automatically refetches data when needed
// Complexity?	         Requires setup (store, reducers, actions)	                Simpler, just hooks (useQuery, useMutation)



// React Query Caching:
// Global: The cached data is shared across all components that use the same query. This means that if another component 
// needs the same data, React Query will serve it from memory (the cache) without needing to fetch it again from the server.
// Auto-expiration: React Query allows you to configure how long the cached data stays valid. You can set a stale time 
// (e.g., 5 minutes), after which the data will be considered "stale" and a new request will be made.
// Background refetching: React Query will automatically refresh the cached data in the background when it becomes stale, 
// keeping it up-to-date.
// Automatic invalidation: If you mutate (update) the data (e.g., after creating, updating, or deleting a task), 
// React Query can invalidate the relevant cache and trigger a re-fetch of the data.