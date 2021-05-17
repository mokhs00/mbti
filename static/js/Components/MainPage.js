export default function MainPage({ $app, $route }) {

    this.$target = document.createElement('div')
    this.$target.className = 'main'

    $app.appendChild(this.$target)

    this.render = () => {
        this.$target.innerHTML = /*html*/
        `
            <div class="title">
                <img src="static/img/title.png" class="title-img">               
            </div>
            <button class="start-btn">
                테스트 시작
                <img class="arrow-circle" src="/static/img/arrow_circle.png">
            </button>
        `        

        this.$target.querySelector('.start-btn').addEventListener('click', e => {
            $route.push('question')
        })        
    }

    this.render()
    
    
    
}