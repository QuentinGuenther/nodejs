const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('eh oh mate!')
    //resolve([7,4,6])
  }, 2000)
})

doWorkPromise.then((result) => {
  console.log('Success!', result)
}).catch((error) => {
  console.log('Error', error)
})