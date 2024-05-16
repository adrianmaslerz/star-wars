import {ErrorsDTO} from "../dto/errors.dto";

export const parseStringError = (message: string, field = 'general'): ErrorsDTO => {
    return {
        errors: [
            {
                field: field,
                message: message,
            },
        ],
    };
};