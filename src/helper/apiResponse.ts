// Type for the success response
export type SuccessResponse<T> = {
    status: statusResponse.SUCCESS;
    data: T;
}

// Type for the failure response
export type ErrorResponse = {
    status: statusResponse.ERROR;
    code: string;
    error: string;
};

export enum statusResponse { 
    SUCCESS = 'success',
    ERROR = 'error'
}

// Main API Response
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export default ApiResponse;

/**
 * USAGE:
 
function handleResponse(response: ApiResponse<any>) {
  if (response.status === statusResponse.SUCCESS) {
    console.log('Data:', response.data);
  } else {
    console.error('Error:', response.error);
  }
}
 
*/