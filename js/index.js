import App from './App.js'
const $app = document.querySelector('.app')

$app.querySelector('.start-btn').addEventListener('click', e => {
    init()
    new App($app)
})

function init() {
    $app.innerHTML = ''
       
}




const url = location.protocol + "//" + location.host;

    //==body==//
    const body = $("#body");
    $("#body-container").fadeIn(1000);

    let choices;
    let questions;

    //==percent==//
    

    //==start==//
    let recorded = false;

    

    


    function appendShareButtonTo(target) {

        if ($(".share-container")) {
            $(".share-container").remove();

        }


        $("<div>").addClass("share-container")
            .append("연애유형 테스트 공유하기")
            .append(
                $("<div>")
                    .addClass("share-btns")
                    .append(
                        $("<a>")
                            .addClass("kakao-share-button")
                            .attr("href", "javascript:sendLink()")
                            .append(
                                $("<img>")
                                    .attr("src", "https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png")
                            )
                    )
                    .append(
                        $("<a>")
                            .addClass("link-share-button")
                            .attr("href", "javascript:copyLink()")
                            .append(
                                $("<img>")
                                    .attr("src", "/img/url.png")
                            )

                    )
            )
            .appendTo(target);
    }

    function copyLink() {            

        $("<input>")            
            .addClass("link")
            .attr("value", url)
            .appendTo(body) 
            
        $(".link").select();
        document.execCommand("copy");

        $(".link").remove();           
        
        alert("URL이 복사 되었습니다. 원하시는 곳에 붙여넣기 해주세요.");
    }


  
    

    //==kakao-share==//
    Kakao.init('0a56bd6a7b51f46065488a7b94ba2d5f');
    function sendLink() {
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: '동물로 알아보는 MBTI!',
                description: '#내 MBTI는? #귀여운 #동물로 #알아보는 #mbti ',
                imageUrl:
                    url + '/img/title.png',
                link: {
                    mobileWebUrl: url,
                    webUrl: url,
                },
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: url,
                        webUrl: url,
                    },
                }
            ],
        })
    }