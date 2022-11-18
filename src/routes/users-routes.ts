import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
} from '../types/appTypes';
import { Router } from 'express';

export const usersRouters = Router();

usersRouters.get('/', (req: RequestWithQuery<{ name: string }>, res: any) => {
    if (req.query?.name) {
        const customers = bd.customers.filter((customer) => {
            return customer.name.indexOf(req.query?.name) > -1;
        });
        res.json(customers);

        return;
    }
    res.json(bd.customers);
});

usersRouters.get('/:id', (req: RequestWithParams<{ id: string }>, res: any) => {
    const currentCustomer = bd.customers.find(
        (t) => t.id === Number(req.params.id),
    );
    if (!currentCustomer) {
        res.statusCode(404);

        return;
    }

    res.json(currentCustomer);
});

usersRouters.post('/', (req: RequestWithBody<{ name: string }>, res: any) => {
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
});

usersRouters.delete(
    '/:id',
    (req: RequestWithParams<{ id: string }>, res: any) => {
        bd.customers = bd.customers.filter((t) => t.id !== +req.params.id);

        res.sendStatus(204);
    },
);

usersRouters.put(
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
    },
);

const bd = {
    customers: [
        { name: 'user 1', id: 1 },
        { name: 'user 2', id: 2 },
        { name: 'user 3', id: 3 },
        { name: 'user 4', id: 4 },
        { name: 'user 5', id: 5 },
    ],
};
