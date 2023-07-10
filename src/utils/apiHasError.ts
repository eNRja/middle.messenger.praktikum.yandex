import { TAPIError } from "../types";

export function hasError(response: any): response is TAPIError {
  return response && response.reason;
}
