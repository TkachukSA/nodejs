import {app} from "../index";
import request from 'supertest'

describe('/customers', ()=>{
    it('asassasasaassasasasasa', async ()=>{
        await request(app).get('/customers/1').expect(200)
    })
})

describe('/customers', ()=>{
    it('customers post', async ()=>{
        await request(app).post('/customers').send({name: 'asa'}).expect(200)
    })

    it('customers post', async ()=>{
        await request(app).post('/customers').send({nme: 'asa'}).expect(400)
    })

})
