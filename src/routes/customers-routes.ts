import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
} from '../types/appTypes';
import { Router } from 'express';

export const customersRouters = Router();

customersRouters.get(
    '/',
    (req: RequestWithQuery<{ name: string }>, res: any) => {
        if (req.query?.name) {
            const customers = bd.customers.filter((customer) => {
                return customer.name.indexOf(req.query?.name) > -1;
            });
            res.json(customers);

            return;
        }
        res.json(bd.customers);
    },
);

customersRouters.get(
    '/:id',
    (req: RequestWithParams<{ id: string }>, res: any) => {
        const currentCustomer = bd.customers.find(
            (t) => t.id === Number(req.params.id),
        );
        if (!currentCustomer) {
            res.statusCode(404);

            return;
        }

        res.json(currentCustomer);
    },
);

customersRouters.post(
    '/',
    (req: RequestWithBody<{ name: string }>, res: any) => {
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
    (
        req: RequestWithParamsAndBody<{ id: string }, { name: string }>,
        res: any,
    ) => {
        if (!req.body.name) {
            res.sendStatus(400);

            return;
        }

        const update = bd.customers.find((t) => t.id === +req.params.id);
        if (!update) {
            res.sendStatus(404);

            return;
        }
        update.name = req.body.name;
        res.sendStatus(204);

        // fetch('http://localhost:3000/customers/1', {
        //   method: 'PUT',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({name: 'aaaaaaaaaaa'}),
        // }).then(res => res.json())
        //     .then(res => console.log(res))
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
