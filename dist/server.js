"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const express = require('express');
const app = express();
//middleware configuration
app.use(express.json());
const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send("Hello, world!");
});
app.listen(PORT, () => console.log(`listening on Port: ${PORT}`));

