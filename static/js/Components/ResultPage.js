import ResultComponent from './ResultComponent.js'
import { getResults }  from '../api.js'

export default function ResultPage({ $app, $route, props}){


    // result: {}, results: []
    this.state = {
        ...props,
        results: []
    }

    const resultComponent = new ResultComponent({
        $app,
        state: this.state.result,
        onClick : (e) => {
            const node = e.target.closest('.card')
            if(node){
                const { value } = node.dataset
                this.setState({
                    ...this.state,
                    result: this.state.results[value]
                })
            }
        }
    })

    this.init = async () => {
        const results = await getResults()
        this.state.results = results

    }
    
    this.init()
}