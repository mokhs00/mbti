import ResultComponent from './ResultComponent.js'
import { getResults }  from '../api.js'

export default function ResultPage({ $app, $route, props}){


    // result: {}, results: []
    this.state = {
        props: props,
        results: []
    }


    const resultComponent = new ResultComponent({
        $app,
        state: this.state.results[this.state.props.value],
        onClick : (e) => {
            const node = e.target.closest('.card')
            if(node){
                const { value } = node.dataset
                
                $route.push(`/result/${value}`)
                this.setState({
                    ...this.state,
                    props: {
                        value
                    }
                })
            }
        }
    })

    this.setState = nextState => {
        this.state = nextState
        resultComponent.setState(this.state.results[this.state.props.value])
    }

    

    this.init = async () => {
        const results = await getResults()
        this.setState({
            ...this.state,
            results
        })
    }
    
    this.init()
}