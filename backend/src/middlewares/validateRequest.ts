import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { fromError } from "zod-validation-error";
import log from "../utils/logger";

function validateRequest(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        log.error(e, "Error occurred while validating request");
        return res.status(400).send({ errors: fromError(e).message });
      }

      if (e instanceof Error) {
        log.error(e, "Unknown error occurred");
        return res.status(400).send({ error: e.message });
      }

      log.error(e, "Unknown error occurred");
      return res.status(400).send({ error: "Unknown error occurred" });
    }
  };
}

export default validateRequest;
