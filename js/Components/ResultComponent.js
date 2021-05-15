const percent = {
    "ISTJ": 25,
    "ESTJ": 15,
    "ISTP": 9,
    "ISFJ": 8,
    "ISFP": 7,
    "ESTP": 6,
    "ESFJ": 5,
    "ESFP": 5,
    "INTJ": 4,
    "ENFP": 4,
    "INTP": 3,
    "INFP": 3,
    "INFJ": 2,
    "ENTP": 2,
    "ENTJ": 2,
    "ENFJ": 1,

}

// resultResponse.json
//{
//"INFP":{
//    "id":"1",
//    "value":"INFP",
//    "title":"\ucca0\ubcbd \uae08\uc0ac\ube60 \ud1a0\ub07c",
//    "text":"\uc774\uc131\uc8fc\uc758\uc790\uc774\uc790 \uc644\ubcbd\uc8fc\uc758\uc790\uba74\uc11c \uc5c4\uccad\ub09c \ub9dd\uc0c1\uac00\uc5d0\uc694. \uc628\uc885\uc77c \ub9dd\uc0c1\uc5d0 \ube60\uc838\uc788\uae30\ub3c4 \ud574\uc694. \uac00\ub054\uc740 \uc6b0\uc6b8\ud55c \uc0dd\uac01\uc5d0 \ube60\uc838\uc788\uae30\ub3c4 \ud55c\ub370, \uadf8\ub7f0 \ub0b4\uac00 \uad49\uc7a5\ud788 \uace0\ub3c5\ud574 \ubcf4\uc774\uace0 \uba4b\uc9c0\ub2e4\uace0 \uc0dd\uac01\ud574\uc694. \uc5f0\uc560\uc5d0\uc11c\ub3c4 \ud63c\uc790\uc11c \uc624\ub9cc\uac00\uc9c0 \uc0dd\uac01\uc744 \ud558\ub2e4\uac00 \uae08\uc138 \uc0c1\ub300\ubc29\uc5d0\uac8c \ub9c8\uc74c\uc744 \ub2e4 \uc918\ubc84\ub9ac\ub294 \uacbd\uc6b0\uac00 \ub9ce\uc544\uc694. \uba40\ud2f0\uac00 \uc798\ub418\uc9c0 \uc54a\uc544 \uc5f0\ub77d\uc774 \uc548 \ub418\ub294 \uacbd\uc6b0\uac00 \uc788\uc5b4 \uc0c1\ub300\ubc29\uc774 \ub2f5\ub2f5\ud574\ud558\uae30\ub3c4 \ud574\uc694. \ubb38\uc81c\ub294 \uc0c1\ub300\ubc29\uc774 \ub2f5\ub2f5\ud574\ud558\ub294 \uac70\uc5d0 \ubcc4\ub85c \uc2e0\uacbd \uc4f0\uc9c0 \uc54a\uc544\uc11c \uc885\uc885 \ub2e4\ud234 \ub54c\uac00 \uc788\uc5b4\uc694. \uc790\uae30\uc560\uac00 \uac15\ud55c \uc131\uaca9\uc774\ub77c \uc0c1\ub300\ubc29\uc774 \uc790\uae30\uc5d0 \ub300\ud574 \uc548 \uc88b\uac8c \uc0dd\uac01\ud558\ub294 \uac83 \uac19\ub2e4\uace0 \ub290\ub07c\uba74, \uc0dd\uac01\uc774 \ub9ce\uc544\uc9c0\uace0, \uadf8\ub7ec\ub2e4 \ubcf4\uba74 \ub9c8\uc74c\uc774 \ud655 \uc2dd\uc5b4\ubc84\ub9ac\uac8c \ub3fc\uc694. \ub098\uc5d0\uac8c \ub04a\uc784\uc5c6\uc774 \ubbff\uc74c\uc744 \uc8fc\ub824 \ub178\ub825\ud558\uace0, \ub098\uc5d0\uac8c \uc5f4\uc815\uc801\uc778 \uc0ac\ub78c\uc744 \ub9cc\ub098\uba74 \ud589\ubcf5\uc9c0\uc218\uac00 \ubb34\ud55c\ud788 \uc0c1\uc2b9\ud574\uc694!",
//    "img_path":"\/img\/INFP.png",
//    "positive":{
//       "value":"ENFJ",
//       "title":"\uc5f0\uc778\ub9cc \ubc14\ub77c\ubcf4\ub294 \ud575\uc778\uc2f8 \uac15\uc544\uc9c0",
//       "img_path":"\/img\/ENFJ.png"
//    },
//    "negative":{
//       "value":"ISFP",
//       "title":"\uc628\ud654\ud55c \uc0ac\ub791\uafbc \uc591",
//       "img_path":"\/img\/ISFP.png"
//    }
// },
// }

export default function ResultComponent({ $app, state, onClick}) {
    // Object{id, value, title, text, img_path, positive, negative}
    this.state = state   
    this.onClick = onClick
    
    this.$target = document.createElement('div')
    this.$target.className = 'result'

    this.setState = (nextState) =>{
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if (this.state) {
            $app.innerHTML = ''            
            $app.appendChild(this.$target)            
            this.$target.addEventListener('click', this.onClick)
        }        
        
        this.$target.innerHTML = /*html*/
        `            
            
            <div class="my-type">나의 연애 유형은</div>
            <div class="title">${this.state.title}</div>
            <div class="value">${this.state.value}</div>            
            <img class="image" src="${this.state.img_path}">
            <div class="tags">
                #한국 분포율 ${percent[this.state.value]}%
            </div>
            <div class="text">${this.state.text}</div>           

            <div class="recommend">            
                <div class="card" data-value="${this.state.positive.value}">
                    <div class="type">환상의 케미</div>
                    <div class="inner">                        
                        <div class="value">${this.state.positive.value}</div>
                        <div class="title">${this.state.positive.title}</div>
                        <div><img src="${this.state.positive.img_path}"></div>                    
                    </div>
                </div>

                <div class="card" data-value="${this.state.negative.value}">
                    <div class="type">환장의 케미</div>
                    <div class="inner">                        
                        <div class="value">${this.state.negative.value}</div>
                        <div class="title">${this.state.negative.title}</div>
                        <div><img src="${this.state.negative.img_path}"></div>
                    </div>
                </div>
            </div>
            
        `

    }
    
    
}


