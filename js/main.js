const url = "https://www.naver.com";

    //==body==//
    const body = $("#body");
    $("#body-container").fadeIn(1000);

    let choices;
    let questions;

    //==percent==//
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

    //==start==//
    let recorded = false;

    //==urlparams==//
    function getUrlParams() {
        var params = {};
        window.location.search
            .replace(
                /[?&]+([^=&]+)=([^&]*)/gi,
                function (str, key, value) { params[key] = value; }
            );
        return params;
    }
    const urlParams = getUrlParams();

    if (urlParams["type"]) {
        recorded = true;
        showResult(urlParams["type"]);
    }
    if (!urlParams["type"]) {
        appendRecordTo($("#body-container"));

    }


    //==getQuestions==//
    $.getJSON("/get_questions.php", function (response) {
        questions = response;

        if (choices !== undefined) {
            $("#btn_start").css("opacity", "1");
        }

    });

    $.getJSON("/get_choices.php", function (response) {
        choices = response;

        if (questions !== undefined) {
            $("#btn_start").css("opacity", "1");

        }
    });

    //==========================================================================//

    let choiced = "";
    let choicesIndex = 0;
    let questionsIndex = 0;

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



    function start() {
        body.empty();
        $(".share-container").remove();
        $(".record-count-container").remove();

        $("<h1>")
            .append("Loading. . .")
            .css("display", "none")
            .fadeIn(500)
            .appendTo(body);
        $("<div>").addClass("progress-bar-container").appendTo($("#body-container"));
        $("<div>").addClass("progress-bar").appendTo($(".progress-bar-container"));
        setTimeout(() => {
            body.empty();
            appendImg(body);
        }, 1000);


    }

    function next(value) {
        choiced += value;
        $(".progress-bar").css("width", choiced.length * 5 + "%")
        $(".choice").attr("disabled", "disabled");
        //==animation==//
        $(".q").css("animation-name", "fadeOut");
        $(".question").css("animation-name", "fadeOut");
        $(".choice").css("animation-name", "fadeOut");

        setTimeout(() => {
            body.empty();

            if (choicesIndex >= choices.length) {
                getResult(choiced);
                return;
            }
            appendImg(body);
        }, 700);



    }

    function getResult(choiced) {
        $.getJSON("/getResult.php", { choiced }, function (response) {
            recordResult(response);
            location.href = "/mbti/?type=" + response;

        });

    }

    function showResult(result) {
        body.empty();
        $(".record-count-container").remove();
        $("<h1>")
            .append("Loading . . .")
            .css("display", "none")
            .fadeIn(500)
            .appendTo(body);


        $.getJSON("/get_result.php",
            {
                result
            },
            function (response) {
                let result_title = "";
                let result_title_array = response['title'];
                let cnt = 0;
                result_title_array.split(" ")
                    .forEach(value => {
                        result_title += "#" + value + " ";
                        cnt++;
                        if (cnt == 3) {
                            result_title += "<br>";
                        }

                    });

                setTimeout(() => {

                    $(".progress-bar-container").remove();
                    body.empty();

                    let $div = $('<div></div>').addClass("result-container");

                    $('<div>')
                        .addClass("result-middle-text ")
                        .append("당신의 연애유형")
                        .appendTo($div);

                    $('<div>')
                        .addClass("result-card")
                        .append(
                            $('<img>')
                                .attr("src", response['img_path'])
                                .addClass("result-img")
                        )
                        .append(
                            $('<div>')
                                .append(response['value'])
                                .addClass("result-value result-value animate__animated animate__fadeInRight")
                        )
                        .append(
                            $('<div>')
                                .addClass("result-value-under-bar animate__animated animate__fadeInRight")
                        )
                        .append(
                            $('<div>')
                                .append(result_title + "#한국 분포율 " + percent[response['value']] + "%")
                                .addClass("result-title")
                        )
                        .appendTo($div);

                    $('<div>')
                        .addClass("result-middle-text")
                        .append("나는 좀 이런 편")
                        .appendTo($div);



                    $('<div>')
                        .append(response['text'])
                        .addClass("result-text")
                        .appendTo($div);

                    $div.appendTo(body);

                    $('<div>')
                        .addClass("result-middle-text")
                        .append("내 친구는 어떤 유형일까?")
                        .appendTo($div);

                    appendShareButtonTo($(".result-container"));



                    // let relation_div = $("<div>").addClass("result-relation-container");
                    // //==negative==//
                    // $div = $('<div></div>').addClass("result-negative-container");
                    // $("<h1>")
                    //     .append("나와 안 맞는 유형")
                    //     .appendTo($div);

                    // $("<h2>")
                    //     .append(response["negative"]["value"])
                    //     .addClass("result-negative-value")
                    //     .appendTo($div);

                    // $("<img>")
                    //     .attr("src", response["negative"]['img_path'])
                    //     .addClass("result-negative-img")
                    //     .click(function () {
                    //         showResult(response["negative"]["value"]);
                    //     })
                    //     .appendTo($div);
                    // $("<h2>")
                    //     .append(response["negative"]["title"])
                    //     .addClass("result-negative-title")
                    //     .appendTo($div);

                    // $div.appendTo(relation_div);

                    // //==positive==//
                    // $div = $('<div></div>')
                    //     .addClass("result-positive-container");
                    // $("<h1>")
                    //     .append("나와 잘 맞는 유형")
                    //     .appendTo($div);
                    // $("<h2>")
                    //     .append(response["positive"]["value"])
                    //     .addClass("result-positive-value")
                    //     .appendTo($div);
                    // $("<img>")
                    //     .attr("src", response["positive"]['img_path'])
                    //     .addClass("result-positive-img")
                    //     .click(function () {
                    //         showResult(response["positive"]["value"]);
                    //     })
                    //     .appendTo($div);
                    // $("<h2>")
                    //     .append(response["positive"]["title"])
                    //     .addClass("result-positive-title")
                    //     .appendTo($div);

                    // $div.appendTo(relation_div);

                    // relation_div.appendTo(body);


                }, 1000);



            });
    }

    function recordResult(resultValue) {
        if (!recorded) {
            recorded = true;
            $.post("/record.php", {resultValue: resultValue},function (response) {
                console.log(response);                
                
            });
        
        }
    }

    function appendRecordTo(target) {


        $.getJSON("/get_record.php", function (response) {

            let count = "";
            let cnt = 1;
            for (let index = response.length; index > 0; index--) {
                count = response[index - 1] + count;
                if (cnt < response.length && cnt % 3 == 0) {
                    count = "," + count;
                }
                cnt++;

            }
            $(".record-count-container").remove();

            $("<div>")
                .addClass("record-count-container")
                .append("연애유형 테스트를 이용한 사람")
                .append(
                    $("<div>")
                        .addClass("record-count")
                        .append(count)
                )
                .appendTo(target);

        });

    }

    function appendImg(target) {
        let $div = $('<div></div>');

        // header
        $("<h1>")
            .append("Q" + (questionsIndex + 1))
            .appendTo(target)
            .addClass("q")            
            .css("color", "gray")
            .css("display", "none")            
            .fadeIn(1450);

        $("<h1>")
            .append((questionsIndex + 1) + "/" + (questions.length))
            .appendTo(target)
            .addClass("q")
            .css("margin-top", "-10px")
            .css("padding-left", "5px")
            .css("font-size", "30px")            
            .css("display", "none")   
            .fadeIn(1450);


        // question
        $("<p>")
            .append(questions[questionsIndex++]['text'])
            .css("display", "none")
            .addClass("question")
            .appendTo(target)
            .fadeIn(1450);

        // choices

        for (let i = 0; i < 2; i++) {

            $("<button>")
                .attr("onclick", 'next("' + choices[choicesIndex]['value'] + '")')
                .append(choices[choicesIndex]['text'])
                .addClass("choice")
                .css("display", "none")
                .appendTo($div)
                .fadeIn(1000);
            choicesIndex++;
        }


        $div.appendTo(target);


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