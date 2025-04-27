import { taskService } from '@/services/task.service'
import { TypeTaskFormState } from '@/types/task.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteTask = () => {
  const queryClient = useQueryClient()

  const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete task'],
    mutationFn: ( id: string ) => taskService.deleteTask(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    }
  })
  
  return { deleteTask, isDeletePending }
}



export default useDeleteTask
