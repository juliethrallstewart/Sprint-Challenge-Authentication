const request = require('supertest');
const Users = require('../users/users-model')
const db = require('../database/dbConfig')
const bcrypt = require('bcryptjs');
const server = require('../api/server.js');

describe('users model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })


    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })

    describe('insert()', () => {
        it('should insert user record into the db', async () => {
            await Users.add({username: 'Jack', password: bcrypt.hashSync('icecream', 2)}
            );

            let users = await db('users')
            expect(users).toHaveLength(1)
        })

        it('should insert user record into the db', async () => {
            let { id } = await Users.add({username: 'Chris', password: bcrypt.hashSync('friedchicken', 2)}
            );
           
            let user = await db('users').where({id}).first()
            expect(user.username).toBe('Chris')
          

        })

        it('should add a user and login the user into the db', async () => {
            let { id } = await Users.add({username: 'Chris', password: bcrypt.hashSync('friedchicken', 2)}
            );
            let user = await Users.findBy({username: 'Chris'}).first()
            expect(user.username).toBe('Chris')
          

        })

        it('should add a user, login a user, return a list of users from db and check length', async () => {
            await Users.add({username: 'Chris', password: bcrypt.hashSync('friedchicken', 2)})
            await Users.add({username: 'Jack', password: bcrypt.hashSync('icecream', 2)})
            await Users.add({username: 'Julie', password: bcrypt.hashSync('chocolate', 2)})

            let users = await Users.find()
            expect(users).toHaveLength(3)

        })

        it('should add a user, login a user, return a list of users from db and assert usernames', async () => {
            await Users.add({username: 'Chris', password: bcrypt.hashSync('friedchicken', 2)})
            await Users.add({username: 'Jack', password: bcrypt.hashSync('icecream', 2)})
            await Users.add({username: 'Julie', password: bcrypt.hashSync('chocolate', 2)})

            let users = await Users.find()
            expect(users[0].username).toEqual('Chris')
            expect(users[1].username).toEqual('Jack')
            expect(users[2].username).toEqual('Julie')


        })
    })
})

