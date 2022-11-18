import { customersRouters } from './src/routes/customers-routes';
import { usersRouters } from './src/routes/users-routes';
import bodyParser from 'body-parser';
import express from 'express';
export const app = express();
const port = process.env.PORT || 3002;

const jsonBodyMiddleWare = express.json();
app.use(jsonBodyMiddleWare);
app.use(bodyParser());

app.use('/customers', customersRouters);
app.use('/users', usersRouters);

app.get('/', (req: any, res: any) => {
    res.send('hello word');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

/* fetch('http://localhost:3000/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({name: 'asa'}),
}).then(res => res.json())
    .then(res => console.log(res))*/
