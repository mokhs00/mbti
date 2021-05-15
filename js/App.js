import QuestionComponent from './Components/QuestionComponent.js'
import ResultComponent from './Components/ResultComponent.js'
import { getQuestions, getResults } from './api.js'

export default function App($app) {

    // index, questions: [], value: [], 

  this.state = {
    index: 0,
    questions: [],
    value: [],
    results: null,
    result: null
  }

  const questionComponent = new QuestionComponent({
      $app,
      state: {
          index: this.index,
          questions: this.questions
      },
      onClick: (value) => {        
        this.state.value.push(value)
        // 마지막 질문지를 선택완료 했다면, 테스트 종료 
        if(this.state.value.length == this.state.questions.length){            
            this.testEnd(this.state.value)           
            return            
        }
        this.setState({
            ...this.state,
            index: this.state.index + 1
        })
      }
  })

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



  this.setState = (nextState) => {   
    this.state = nextState

    if (this.state.result) {
        resultComponent.setState(this.state.result)
        return
    }

    questionComponent.setState({
        index: this.state.index,
        questions: this.state.questions
    })
    
  }

  this.testEnd = async (values) => {
    // 계산하는 동안 로딩처리    
    const calValue = await this.calculateResult(values)       
    

    this.setState({
        ...this.state,
        result: this.state.results[calValue]
    })
    

  }

  this.calculateResult = async (values) => {
      const map = {}
      values.reduce(value => {
          if (map.value){
            map.value = 1
          } else {
            map.value += 1
          }
      })

      let calValue = ''

      calValue += map.E > map.I ? 'E'  : 'I'
      calValue += map.S > map.N ? 'S'  : 'N'
      calValue += map.T > map.F ? 'T'  : 'F'
      calValue += map.J > map.P ? 'J'  : 'P'

      return calValue      
    }
  

  this.init = async () => {

    // TODO: loading 처리

    // request해서 받아온 초기 값 설정해주기
    const questions = await getQuestions()
    const results = await getResults()
    
    this.setState({
      ...this.state,
      questions,
      results
    })
    
    
  }

  this.init()
}
