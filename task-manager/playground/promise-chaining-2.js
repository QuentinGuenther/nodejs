require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5d0e957fdc4b9e5d7df77c38').then((task) => {
//   console.log(task)
//   return Task.countDocuments({completed: false})
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

const deleteTaskAndCountIncomplete = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const incomplete = await Task.countDocuments({completed: false})

  return {task, incomplete}
}

deleteTaskAndCountIncomplete('5d0ea052147c345ffbc484b9').then(({task, incomplete}) => {
  console.log(task)
  console.log(incomplete)
}).catch((e) => {
  console.log(e)
})