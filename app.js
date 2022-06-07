const express = require('express')

const app = express()

app.use((req, res, next) => {
    res.send('<h1>Hello World 2</h1>')
})

app.listen(3000)