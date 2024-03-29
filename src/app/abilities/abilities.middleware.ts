import { NextFunction, Response, Request } from "express";
import { CustomError } from "./../error/error.model";
import { DataModel, DataType } from "./abilities.model";
import { Result } from "runtypes";

const AbilitiesMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (typeof req.body === 'string') req.body = JSON.parse(req.body)
    if (DataModel.guard(req.body)) {
        next();
    } else {
        const err: Result<DataType> = DataModel.validate(req.body);
        const customErr = new CustomError(400, err);
        res.status(customErr.status).json(customErr);
    }
};

export default AbilitiesMiddleware