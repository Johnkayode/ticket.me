interface IApiError {
    message: string;
    status_code?: number;
}

export default class ApiError extends Error {
    message: string;
    status_code?: number;

    constructor(props: IApiError) {
        super();
        this.message = props.message,
        this.status_code = props.status_code
    }
}