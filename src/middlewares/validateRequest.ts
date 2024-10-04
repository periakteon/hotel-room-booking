import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { fromError } from "zod-validation-error";

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
        return res.status(400).send({ errors: fromError(e).message });
      }

      if (e instanceof Error) {
        return res.status(400).send({ error: e.message });
      }

      return res.status(400).send({ error: "Unknown error occurred" });
    }
  };
}

export default validateRequest;
