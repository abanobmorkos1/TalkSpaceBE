"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT;
//middleware configuration
app.use(express.json());
app.use(morgan('dev'));
app.get('/discussions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discussions = yield prisma.discussion.findMany();
        res.status(200).json(discussions);
    }
    catch (err) {
        console.error('error fetching discussion', err);
        res.status(500).json({ error: err });
    }
}));
app.post('/discussions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topic, discussion } = req.body;
        const newDiscussion = yield prisma.discussion.create({
            data: {
                topic,
                discussion,
            },
        });
        res.json(newDiscussion);
    }
    catch (error) {
        console.error('error updating', error);
        res.status(500).json({ error: 'error with connection' });
    }
}));
app.get('/discussions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const findDiscussion = yield prisma.discussion.findUnique({
        where: { id }
    });
    res.json(findDiscussion);
}));
app.put('/discussions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { topic, discussion } = req.body;
    const updatedDiscussion = yield prisma.discussion.update({
        where: { id },
        data: {
            topic,
            discussion
        }
    });
    res.status(200).json(updatedDiscussion);
}));
app.delete('/discussions/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { topic, discussion } = req.body;
    const deleteDiscussion = yield prisma.discussion.delete({
        where: {
            id,
            topic,
            discussion
        }
    });
    res.json(deleteDiscussion);
}));
app.listen(PORT, () => console.log(`listening on Port: ${PORT}`));
