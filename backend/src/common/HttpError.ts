import { STATUS_CODES } from "http";

export default class HttpError extends Error {
  public errors?: Record<string, unknown>;

  public status: HttpErrorCode;

  constructor(statusCode: HttpErrorCode, errors?: Record<string, unknown>) {
    super(STATUS_CODES[statusCode]);

    const errorSide =
      statusCode >= 400 && statusCode < 500 ? "Client" : "Server";

    this.name = `${errorSide} HTTP Error`;
    this.status = statusCode;

    Error.captureStackTrace(this, this.constructor);

    this.errors = errors;
  }
}

export type HttpErrorCode = ClientHttpErrorCode | ServerHttpErrorCode;

export type ClientHttpErrorCode =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451;

export type ServerHttpErrorCode =
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;
