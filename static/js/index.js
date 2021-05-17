import MainPage from './Components/MainPage.js'
import QuestionPage from './Components/QuestionPage.js'
import ResultPage from './Components/ResultPage.js'
import Route from './Route.js'

const $app = document.querySelector('.app')

const routes = [
    { path: '/', view: MainPage},
    { path: '/question', view: QuestionPage},
    { path: '/result/:value', view: ResultPage}  
]


const init = () => {
    new Route({ $app, routes })
}

init()