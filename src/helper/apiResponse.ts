// Type for the success response
export type SuccessResponse<T> = {
    data: T;
}

// Type for the failure response
export type ErrorResponse = {
    code: string;
    error: string;
};

// Main API Response
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export default ApiResponse;