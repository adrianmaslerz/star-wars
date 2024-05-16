import {ErrorsDTO} from "../dto/errors.dto";

export const parseValidatorErrors = (error: {
    errors: { message: string; path: string }[];
}): ErrorsDTO => {
    const errorMessages = [];
    if (error) {
        const errors = error.errors;
        for (const key in errors) {
            let message = errors[key].message;
            if (message && errors[key].path) {
                message = (message.charAt(0).toUpperCase() + message.slice(1)).replace(
                    /_|\./g,
                    ' ',
                );
                message = message.slice(0, message.lastIndexOf(' ')) + '.';
                errorMessages.push({
                    field: key,
                    message: message,
                });
            }
        }
    }

    return { errors: errorMessages };
};