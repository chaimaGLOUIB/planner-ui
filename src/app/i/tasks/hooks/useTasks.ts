// Why Does It Work Without 'use client'?
// This file (useTasks.ts) is just a hook, not a component.
// Next.js treats only components as server by default.
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ITaskResponse } from '@/types/task.types'

import { taskService } from '@/services/task.service'

//🔍 Explanation:
//When you fetch data (e.g., from an API), the data is typically cached by the library.
// This means that the data is stored temporarily in memory which makes data access
// much faster compared to re-fetching from the server. This caching behavior is temporary and will be cleared when
// the page is refreshed or when the cache expires.

export function useTasks() {
	const { data } = useQuery({
		queryKey: ['tasks'], // Identifies cached data.
		queryFn: () => taskService.getTasks()
		//refetchInterval: 5000, // Refetch every 5 seconds
		//staleTime:  2 * 60 * 1000 ,How long data is considered "fresh" before refetching is triggered.
		//cacheTime :How long unused (inactive) data stays in memory before being deleted.
	})

	const [items, setItems] = useState<ITaskResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems }
}
