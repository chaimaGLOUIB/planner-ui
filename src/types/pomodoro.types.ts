import { type IBase } from "./root.types"

export interface IPomodoroRoundResponse extends IBase{
   isCompleted?: boolean
   totalSeconds: number
}

export interface IPomodoroSessionResponse extends IBase{
    isCompleted?: boolean
    rounds?: IPomodoroRoundResponse[]
}


export type TypePomodoroSessionState = Partial<
Omit<IPomodoroSessionResponse,'id' | 'createdAt' | 'updatedAt'>
>

export type TypePomodoroRoundState = Partial<
Omit<IPomodoroRoundResponse, 'id' | 'createdAt' | 'updatedAt'>
>

//📁 user.ts
// export interface IUser {
//     id: number;
//     name: string;
//   }


//📁 extendedUser.ts
// import { IUser } from './user'; 

// export interface IUser {
//   email: string;
// }

//📁 main.ts
// import { IUser } from './extendedUser';

// const user: IUser = {
//   id: 1,
//   name: 'Alice',
//   email: 'alice@example.com' // ✅ The merged property is available
// };


// props if I have children 
// and using URL Parameters if I want to pass parametere from page to page

//if have not props:
// When a parent re-renders, all its children re-render (unless optimized).
// When a child re-renders, the parent does not re-render.

//if we have props in child: Parent Re-render


// If the Child does not need to re-render when Parent changes:
// Use React.memo() for functional components
// const Child = React.memo(({ updateParent }) => {
//   console.log("Child rendered!");
//   return <button onClick={updateParent}>Update Parent</button>;
// });

// Use useCallback() to prevent function recreation
// jsx
// const updateParent = React.useCallback(() => setCount(count + 1), [count])
