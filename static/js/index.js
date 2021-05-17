// router를 만들고 

import App from './App.js'
// import route from './route.js'

route = route({})


const $app = document.querySelector('.app')

const $header = document.querySelector('.header')


$header.addEventListener('click', e => {
    test()
})

$app.querySelector('.start-btn').addEventListener('click', e => {
    test()    
})


function test() {
    clear()
    new App($app)
}

function clear() {
    $app.innerHTML = ''
       
}

async function route() {

    const routes = [
        { path: '/', view: App },
    ]

    // const potentialMatches

    
}


function init() {
    
}

init()