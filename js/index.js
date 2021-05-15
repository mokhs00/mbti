import App from './App.js'
const $app = document.querySelector('.app')

$app.querySelector('.start-btn').addEventListener('click', e => {
    init()
    new App($app)
})

function init() {
    $app.innerHTML = ''
       
}