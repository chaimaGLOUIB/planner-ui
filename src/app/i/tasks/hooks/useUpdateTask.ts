import { taskService } from '@/services/task.service'
import { TypeTaskFormState } from '@/types/task.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUpdateTask = (key?: string) => {
  const queryClient = useQueryClient()

  const { mutate: updateTask } = useMutation({
    mutationKey: ['update task', key],
    mutationFn: ({ id, data }: { id: string; data: TypeTaskFormState }) =>
      taskService.updateTask(id, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['tasks']// Refresh tasks list
      })
    }
  })
  return { updateTask }
}



export default useUpdateTask

//Fetch Data with useQuery
//Mutations (POST, PUT, DELETE)

// How Does This Compare to Other Caching Methods?
// LocalStorage/SessionStorage: Data is stored in the browser’s persistent storage (not RAM), which survives page reloads or closing the browser tab. However, accessing data from localStorage is slower than from RAM.

