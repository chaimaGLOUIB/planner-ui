export default function Checkbox (props: {
    id?: string
    extra?: string
    color?:
      | 'red'
      | 'blue'
      | 'green'
      | 'yellow'
      | 'orange'
      | 'teal'
      | 'navy'
      | 'lime'
      | 'cyan'
      | 'pink'
      | 'purple'
      | 'amber'
      | 'indigo'
      | 'gray'
    [x: string]: any
  }) {
    const { extra = '', color = 'gray', id, ...rest } = props
  
    const colorClasses: Record<string, string> = {
      red: 'checked:bg-red-500 dark:checked:bg-red-400',
      blue: 'checked:bg-blue-500 dark:checked:bg-blue-400',
      green: 'checked:bg-green-500 dark:checked:bg-green-400',
      yellow: 'checked:bg-yellow-500 dark:checked:bg-yellow-400',
      orange: 'checked:bg-orange-500 dark:checked:bg-orange-400',
      teal: 'checked:bg-teal-500 dark:checked:bg-teal-400',
      navy: 'checked:bg-blue-900 dark:checked:bg-blue-800',
      lime: 'checked:bg-lime-500 dark:checked:bg-lime-400',
      cyan: 'checked:bg-cyan-500 dark:checked:bg-cyan-400',
      pink: 'checked:bg-pink-500 dark:checked:bg-pink-400',
      purple: 'checked:bg-purple-500 dark:checked:bg-purple-400',
      amber: 'checked:bg-amber-500 dark:checked:bg-amber-400',
      indigo: 'checked:bg-indigo-500 dark:checked:bg-indigo-400',
      gray: 'checked:bg-gray-500 dark:checked:bg-gray-400',
    }
  
    return (
      <input
        id={id}
        type="checkbox"
        className={`defaultCheckbox relative inline-flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-md border border-gray-300 text-white/0 outline-none transition ease-linear checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 ${
          colorClasses[color] || 'checked:bg-brand-500 dark:checked:bg-brand-400'
        } ${extra}`}
        name='weekly'
        {...rest}
      />
    )
  }
  