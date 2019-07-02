const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//   if(req.method === 'GET') {
//     res.send('Get requests are disabled')
//   } else {
//     next()
//   }
// })

// app.use((req, res, next) => {
//   res.status(503).send('The site is under maintenance temporarily')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port:', port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
  // const task = await Task.findById("5d1b00e0d254d527e74ed357")
  // await task.populate('owner').execPopulate()
  // console.log(task)

  // const user = await User.findById("5d1b00cad254d527e74ed355")
  // await user.populate('tasks').execPopulate()
  // console.log(user.tasks)
}

main()