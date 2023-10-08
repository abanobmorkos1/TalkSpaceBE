import {Prisma , PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
const prisma = new PrismaClient()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT

//middleware configuration
app.use(express.json())
app.use(morgan('dev'))



app.get('/', async (req: Request, res: Response) => {
    try {
        const discussions = await prisma.discussion.findMany()
        res.status(200).json(discussions)
    } catch (err) {
        console.error('error fetching discussion', err)
        res.status(500).json({error: err})
    }
});

app.post('/discussions', async (req: Request, res: Response) => {
    try{
        const {topic ,  discussion} = req.body
        const newDiscussion = await prisma.discussion.create({
            data: {
                topic,
                discussion,
            },
        })
        res.json(newDiscussion)
    } catch (error) {
        console.error('error updating' , error)
        res.status(500).json({error: 'error with connection'})
    }
})

// ID 
app.get('/discussions/:id', async (req: Request, res: Response) =>{
    const {id} = req.params
    const findDiscussion = await prisma.discussion.findUnique({
        where: {id}
    }) 
    res.json(findDiscussion)
})

app.put('/discussions/:id', async (req: Request , res: Response) => {
        const {id} = req.params
        const {topic , discussion} = req.body
        const updatedDiscussion = await prisma.discussion.update({
            where: {id},
            data: {
                topic,
                discussion
            }
        })
        res.status(200).json(updatedDiscussion)
})

app.delete('/discussions/:id' , async (req: Request , res: Response) => {
    const {id} = req.params
    const {topic , discussion} = req.body
    const deleteDiscussion = await prisma.discussion.delete({
        where: {
            id,
            topic,
            discussion
        }
    })
    res.json(deleteDiscussion)
})

app.listen(PORT , () => console.log(`listening on Port: ${PORT}`));