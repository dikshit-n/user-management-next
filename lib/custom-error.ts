// use this in any place in the app as "throw new CustomError(404)"

export class CustomError {
  public readonly statusCode: number;

  constructor(statusCode = 400) {
    this.statusCode = statusCode;
  }
}
