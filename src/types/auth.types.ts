export interface IAuthForm {
    email: string;
    password: string
}

export interface IUser {
    id: string;
    name?: string
    email: string

    workInterval?: number
    breakInterval?: number
    intervalsCount?: number
}

export interface IAuthResponse {
    accessToken: string;
    user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string } // remove id

//also used in interface  (but the output is type):

// Omit<T, K>	Removes specific keys from a type	Omit<User, "password">
// Pick<T, K>	Keeps only specific keys from a type	'Pick<User, "id">' choose
// Partial<T>	Makes all properties optional	Partial<User>
// Required<T>	Makes all properties required	Required<PartialUser>
// Readonly<T>	Makes all properties read-only	Readonly<User>
// Record<K, T>	Defines an object type with fixed keys	Record<Role, string[]> example:
/**type Role = "admin" | "user" | "guest";
type RolePermissions = Record<Role, string[]>;

const permissions: RolePermissions = {
    admin: ["create", "read", "update", "delete"],
    user: ["read"],
    guest: ["read"],
}; */

