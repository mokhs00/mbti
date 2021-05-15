export default function QuestionComponent({ $app, state, onClick }) {
  // 현재 선택지 정보.

  /* 
        index: 1,
        questions: [
            {
                id: 1,
                text: '',            
                choices: [
                    {id: 1, text: '', value: ''}
                    {id: 2, text: '', value: ''}
                ]
            },
        ]       
  */
  this.state = state
  
  this.onClick = onClick
  this.$target = document.createElement("div")
  this.$target.className = "questions"
  
  $app.appendChild(this.$target)

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  

  this.render = () => {
    this.$target.innerHTML = `
            <div class="question-number">Q.${this.state.index + 1}</div>            
            <p class="question">${this.state.questions[this.state.index].text}</p>
            ${this.state.questions[this.state.index].choices
              .map((choice) => `<button class="choice" data-choice-value="${choice.value}">${choice.text}</button>`)
              .join('')}
            <div class="question-progress-bar" style="width: ${100 / this.state.questions.length * (this.state.index + 1) }%"></div>
        `
  }

  this.$target.addEventListener("click", (e) => {
    const $node = e.target.closest(".choice")
    if ($node) {
      const { choiceValue } = $node.dataset
      this.onClick(choiceValue)
      this.state.index += 1
    }
  })
}
