require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const projectRoutes = require('./routes/projects')

const app = express();

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes - sample -direct
// app.get('/', (req, res) => {
//     res.json({ msg: 'Wellcome' })
// })

//Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/projects', projectRoutes)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db &listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


