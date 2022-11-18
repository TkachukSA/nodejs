import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
} from '../types/appTypes';
import { Router } from 'express';
import { CustomerRepository } from '../repositories/customer-repository';
import {
    inputValidationMiddleware,
    titleValidation,
} from '../middlewares/input-validation-middleware';

export const customersRouters = Router();

customersRouters.get(
    '/',
    (req: RequestWithQuery<{ name: string }>, res: any) => {
        const foundCustomers = CustomerRepository.getCustomers(req.query?.name);
        res.json(foundCustomers);
    },
);

customersRouters.get(
    '/:id',
    (req: RequestWithParams<{ id: string }>, res: any) => {
        const currentCustomer = CustomerRepository.getCustomer(req.params.id);
        if (!currentCustomer) {
            res.statusCode(404);

            return;
        }

        res.json(currentCustomer);
    },
);

customersRouters.post(
    '/',
    titleValidation,
    inputValidationMiddleware,
    (req: RequestWithBody<{ name: string }>, res: any) => {
        debugger;
        if (!req?.body?.name) {
            res.sendStatus(400);

            return;
        }

        const newCustomer = {
            id: Number(new Date()),
            name: req.body.name,
        };
        bd.customers.push(newCustomer);
        res.json(newCustomer);
    },
);

customersRouters.delete(
    '/:id',
    (req: RequestWithParams<{ id: string }>, res: any) => {
        bd.customers = bd.customers.filter((t) => t.id !== +req.params.id);

        res.sendStatus(204);
    },
);

customersRouters.put(
    '/:id',
    titleValidation,
    inputValidationMiddleware,
    (
        req: RequestWithParamsAndBody<{ id: string }, { name: string }>,
        res: any,
    ) => {
        const updateCustomer = CustomerRepository.updateCustomer(
            req.body.name,
            req.params.id,
        );
        if (updateCustomer === 'noName') {
            res.sendStatus(400);

            return;
        }

        if (!updateCustomer) {
            res.sendStatus(404);

            return;
        } else {
            res.sendStatus(204);
        }

        /* fetch('http://localhost:3000/customers/1', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: 'aaaaaaaaaaa'}),
        }).then(res => res.json())
            .then(res => console.log(res))*/
    },
);

const bd = {
    customers: [
        { name: 'Bred', id: 1 },
        { name: 'Woman', id: 2 },
        { name: 'Sister', id: 3 },
        { name: 'Brother', id: 4 },
        { name: 'front', id: 5 },
    ],
};
