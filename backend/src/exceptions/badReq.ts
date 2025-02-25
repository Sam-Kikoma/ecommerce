import { ErrorCode, HttpException } from "./root";

export class BadRequestsExceptions extends HttpException {
	constructor(message: string, errorCode: ErrorCode) {
		super(message, errorCode, 400, null);
	}
}
