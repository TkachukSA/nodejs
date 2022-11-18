import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
export const inputValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
};

export const titleValidation = body('name')
    .trim()
    .isLength({ max: 10, min: 2 })
    .withMessage('title length should be from 2 to 10 symbols');
