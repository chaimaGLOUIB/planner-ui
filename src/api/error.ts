//✅ Equivalent Named Function:
export function catchError(error: any): string {
    return error?.response?.data?.message || "Something went wrong!";
}


//errorCatch is a constant variable that holds an arrow function.
//It is anonymous because it has no function name.
export const errorCatch = (error: any): string => {
    const message = error?.response?.data?.message

    return message
        ? typeof error.response.data.message === 'object'
            ? message[0]
            : message
        : error.message
}