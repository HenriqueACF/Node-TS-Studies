import request from 'supertest'
import {app} from "../app";
import createConnection from '../database'

describe("Surveys",  ()=>{
    beforeAll(async () => {
        const conncection = await createConnection()
        await conncection.runMigrations()
    })
    it("should be able to create a new survey", async () =>{
        const response = await request(app).post('/surveys').send({
            title:'Title example',
            description: 'description example'
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
    })
    it('should be ablre to get all surveys', async () =>{
        await request(app).post('/surveys').send({
            title:'Title example2',
            description: 'description example2'
        })
        const response = await request(app).get('/surveys')
        expect(response.body.length).toBe(2)
    })
})

