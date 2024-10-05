type ErrorType = { code: number; [key: string]: unknown };

function isMongoError(e: unknown): e is ErrorType {
  return typeof e === "object" && e !== null && "code" in e;
}

export default isMongoError;
