import { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRequestHandler<TP, TResBody, TReqBody> = (
  ...params: Parameters<RequestHandler<TP, TResBody, TReqBody>>
) => Promise<void>;

export const asyncMiddlewareWrapper = <TP, TResBody, TReqBody>(
  fn: AsyncRequestHandler<TP, TResBody, TReqBody>,
): RequestHandler<TP, TResBody, TReqBody> => (
  req: Request<TP, TResBody, TReqBody>,
  res: Response,
  next: NextFunction,
) => fn(req, res, next).catch(next);
