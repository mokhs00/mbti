import QuestionComponent from './QuestionComponent.js'
import { getQuestions }  from '../api.js'

export default function QuestionPage({ $app , $route }) {

    // index, questions: [], value: [], 

  this.state = {
    index: 0,
    questions: [],
    value: []    
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

  



  this.setState = (nextState) => {   
    this.state = nextState
    questionComponent.setState({
        index: this.state.index,
        questions: this.state.questions
    })
    
  }

  this.testEnd = async (values) => {
    // 계산하는 동안 로딩처리    
    const calValue = await this.calculateResult(values)

    $route.push(`result/${calValue}`)
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
    
    this.setState({
      ...this.state,
      questions,
    })
    
    
  }

  this.init()
}
