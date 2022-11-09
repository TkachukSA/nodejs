import {Request} from "express";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from "./types/appTypes";

const express = require('express')
export const app = express()
const port = process.env.PORT || 3002
const jsonBodyMiddleWare = express.json()
app.use(jsonBodyMiddleWare)

let bd = {
    customers: [
        {name: 'Man', id: 1},
        {name: 'Woman', id: 2},
        {name: 'Sister', id: 3},
        {name: 'Brother', id: 4},
        {name: 'front', id: 5},
    ]
}

app.get('/', (req: any, res: any) => {
    res.send('hello word')
})

app.get('/customers', (req: RequestWithQuery<{ name: string }>, res: any) => {
    if (req.query?.name) {
        const customers = bd.customers
            .filter((customer) => {
                return customer.name.indexOf(req.query?.name) > -1
            })
        res.json(customers)
        return
    }
    res.json(bd.customers)
})

app.get('/customers/:id', (req: RequestWithParams<{ id: string }>, res: any) => {
    const currentCustomer = bd.customers.find((t) => t.id === Number(req.params.id))
    if (!currentCustomer) {
        res.statusCode(404)
        return
    }

    res.json(currentCustomer)
})

app.post('/customers', (req: RequestWithBody<{ name: string }>, res: any) => {
    if (!req?.body?.name) {
        res.sendStatus(400)
        return
    }

    const newCustomer = {
        id: Number(new Date()),
        name: req.body.name
    }
    bd.customers.push(newCustomer)
    res.json(newCustomer)
})

app.delete('/customers/:id', (req: RequestWithParams<{ id: string }>, res: any) => {
    bd.customers = bd.customers.filter(t => t.id !== +req.params.id)

    res.sendStatus(204)
})

app.put('/customers/:id', (req: RequestWithParamsAndBody<{ id: string }, { name: string }>, res: any) => {

    if (!req.body.name) {
        res.sendStatus(400)
        return
    }

    const update = bd.customers.find(t => t.id === +req.params.id)
    if (!update) {
        res.sendStatus(404)
        return
    }
    update.name = req.body.name
    res.sendStatus(204)

    //fetch('http://localhost:3000/customers/1', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({name: 'aaaaaaaaaaa'}),
    // }).then(res => res.json())
    //     .then(res => console.log(res))
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


/*fetch('http://localhost:3000/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({name: 'asa'}),
}).then(res => res.json())
    .then(res => console.log(res))*/

