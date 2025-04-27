import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

//alredady have "InputFieldProps".
// wants to extend InputFieldProps(Declaration Merging) in type didn't have merging.
//interface cannot be used for unions.

//1.type is better when defining a set of possible values. type Status = "loading" | "success" | "error";(Union Types)

/** 2. Mapped Types (Dynamic Property Creation)
Mapped types allow you to create new type dynamically based on an existing one.

type APIResponse<T> = {
    [K in keyof T]: T[K] | null; // Make all properties nullable
};
this is bellow is a Object Shape
type User = {
    id: number;
    name: string;
    email: string;
};

type NullableUser = APIResponse<User>;

/* Equivalent to:
type NullableUser = {
    id: number | null;
    name: string | null;
    email: string | null;
};
 */

//3.type works well with utility types like Pick, Omit, and Extract.
/** type User = {
    id: number;
    name: string;
    email: string;
    age: number;
};

// Extract only name and email fields
type UserPreview = Pick<User, "name" | "email">;

/* Equivalent to:
type UserPreview = {
    name: string;
    email: string;
};
*/

//A function type can define a function signature as a variable or property .

//✅ Use method signatures (makeSound(): void;) when working with objects or classes that require this.
//✅ Use function types (makeSound: () => void;) when working with functional programming or higher-order functions. ❌ Function Type ('this' is Undefined).
/** 
type Animal = {
    makeSound(): void; // or makeSound: () => void; // Function type
}; 

interface Animal = {
    makeSound(): void; // Method signature, no implementation
}
*/

// interface Person {
//     name: string;
//     age: number;
//     greet(): void; // Method
// }

// const person: Person = {
//     name: "Alice",
//     age: 25,
//     greet() {
//         console.log(`Hello, my name is ${this.name}`);
//     },
// };

// person.greet();

interface InputFieldProps {
	id: string
	label: string
	extra?: string
	placeholder: string
	variant?: string
	state?: 'error' | 'success'
	disabled?: boolean
	type?: string
	isNumber?: boolean
	error: FieldError | undefined
}
// interface User1 {
//     name: string;
//     age?: number; // 'age' is optional
//   }

//   interface User2 {
//     name: string;
//     age: number | undefined; // 'age' must exist but can be 'undefined'
//   }

//   const user1: User1 = { name: "Alice" }; // Valid: 'age' is optional
//   const user2: User2 = { name: "Bob", age: undefined }; // Valid: 'age' is explicitly 'undefined'

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{
			label,
			id,
			extra,
			type,
			placeholder,
			state,
			disabled,
			isNumber,
			error,
			...rest
		},
		ref
	) => {
		return (
			<div className={`${extra}`}>
				<label
					htmlFor={id}
					className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
				>
					{label}
				</label>
				<input
					ref={ref}
					disabled={disabled}
					type={type}
					id={id}
					placeholder={placeholder}
					className={`
                        mt-2
                        flex
                        w-full
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-border
                        bg-white/0
                        p-3
                        text-base
                        outline-none
                        placeholder:text-white/30
                        placeholder:font-normal
                        duration-500
                        transition-colors
                        focus:border-primary
                        ${
													disabled === true
														? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255, 255, 255, 0.15)]'
														: state === 'error'
															? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
															: state === 'success'
																? 'border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400'
																: ''
												}
                    `}
					onKeyDown={event => {
						if (
							isNumber &&
							!/[0-9]/.test(event.key) &&
							event.key !== 'Backspace' &&
							event.key !== 'Tab' &&
							event.key !== 'Enter' &&
							event.key !== 'ArrowLeft' &&
							event.key !== 'ArrowRight'
						) {
							event.preventDefault()
						}
					}}
					{...rest}
				/>
				<p className='text-red-500'>{error?.message}</p>{' '}
				{/* Displaying error */}
			</div>
		)
	}
)

Field.displayName = 'field'
