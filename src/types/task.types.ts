import { type IBase } from "./root.types";

export enum EnumTaskPriority {
    low = 'low',
    meduim = 'meduim',
    high = ' high',
}

export interface ITaskResponse extends IBase{
   
    name: string
    priority?: EnumTaskPriority
   isCompleted: boolean
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>> // Partial<T>	Makes all properties optional	Partial<User>

