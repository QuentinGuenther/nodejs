const weatherForm = document.querySelector('form')
const searchInput = weatherForm.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


const fetchWeather = (address) => {
  fetch('/weather?address=' + address).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
}

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetchWeather(searchInput.value)

  searchInput.value = ''
})