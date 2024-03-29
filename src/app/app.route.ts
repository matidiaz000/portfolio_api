import { Router, Request, Response, NextFunction } from "express";
import { CustomError } from "./error/error.model";
import AuthRouting from "./auth/auth.route";
import SwaggerRouting from "./swagger/swagger.route";

const router = Router();

router.use('/auth', AuthRouting);
router.use('/swagger', SwaggerRouting);
router.use('*', (request: Request, response: Response, next: NextFunction): void => { 
    const err = new CustomError(404, 'No se encontro la ruta a la que llamaste.');
    next(err);
});

export default router;