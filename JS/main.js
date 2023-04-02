//when the page loads. remove the spinner
$(document).ready(function () {
    $(".lds-ring").fadeOut("slow");
});


//handling the two popups
$(".resource-btn").on("click", () => {
    $(".overlay").show();
    $(".resoursePopup").show();
    $(".answers-image").hide();
})
$(".close-resource").on("click", () => {
    $(".overlay").hide();
    $(".resoursePopup").hide();
    $(".answers-image").show();
})

$(".help-btn").on("click", () => {
    $(".overlay").show();
    $(".helpPopup").show();
    $(".questionPart1").css("z-index", "190");
    $(".answers-image").hide();
})
$(".close-help").on("click", () => {
    $(".overlay").hide();
    $(".helpPopup").hide();
    $(".questionPart1").css("z-index", "90");
    $(".answers-image").show();
})

var lastSelectedAnswer;
//selecting an answer
$(".answer").on("click", function () {
    if ($(this).hasClass("answer")) {
        //deselecting the active answer
        if (lastSelectedAnswer) {
            lastSelectedAnswer.removeClass("click");
        }

        //making the clicked answer active(selected)
        lastSelectedAnswer = $(this);
        lastSelectedAnswer.addClass("click");

        //activating the placeholders
        $(".empty-answer").css("cursor", "pointer");
    }

});


//cliking on an answer-placeholder
$(".empty-answer").on("click", function () {

    //if no answer is selected. do nothing
    if (lastSelectedAnswer && !$(this).hasClass("filled")) {
        //A- if right answer:
        if (lastSelectedAnswer.attr("data-Answer") === "correct") {

            //1- removing the cursor: pointer property
            $(".empty-answer").css("cursor", "unset");

            //2- filling the text html with the data from the active element.
            $(this).children().html(lastSelectedAnswer.html())

            //3- changing state: removing the class of empty-answer from the clicked box. And marking it as filled 
            $(this).addClass("filled");
            $(this).removeClass("empty-answer");

            //4- removing  the active element from screen.
            lastSelectedAnswer.css("visibility", "hidden");
            lastSelectedAnswer = undefined;

            //5- do the right answer sound.
            $(".success")[0].currentTime = 0;
            $(".success")[0].play()

            //6- do the right answer animation.
            $(this).append($("<img class='right-mark' src='Assets/images/correct.png'>"));

            //7- if all answeres filled, disable the rest of the choices
            if (!$(".empty-answer").length) {
                $(".wrong-answer").addClass("disableAnswer")
                $(".wrong-answer").removeClass("answer")
            }
        }

        //B- if wrong answer:
        else {

            //play the wrong answer sound
            $(".wrong")[0].currentTime = 0;
            $(".wrong")[0].play()

            //play the wrong answer animation
            $(this).append($("<img class='wrong-mark' src='Assets/images/wrong.png'>"))


            //fill then empty the answer box
            $(this).children().html(lastSelectedAnswer.html())
            $(this).effect("pulsate", { times: 1 }, 500)

            setTimeout(() => {
                $(this).children().html("&nbsp;")
                $(".wrong-mark").remove()
            }, 700);




        }
    }
});


//Show Answer Btn
$(".show-answer-btn").on("click", function () {
    //1- make array of answers
    let answers = $(".right-answer");
    let wrongAnswers = $(".wrong-answer")

    //2- make array of answers-holders
    let answersPlaceholders = $(".answer-placeholder")


    //3- match and hide them from dom, Also disable the wrong answer
    for (let index = 0; index < answers.length; index++) {
        $(answersPlaceholders[index]).text($(answers[index]).text())
        $(answersPlaceholders[index]).append($("<img class='right-mark' src='Assets/images/correct.png'>"));
        $(answers[index]).css('visibility', "hidden")
        wrongAnswers.addClass("disableAnswer")
        wrongAnswers.removeClass("answer")
    }
});


//Restart Btn
$(".restart-btn").on("click", function () {

    //1- make array of answers-holders
    let answersPlaceholders = $(".answer-placeholder")

    //2- reset the placeholders (removing any answer and right mark)
    for (let index = 0; index < answersPlaceholders.length; index++) {
        $(answersPlaceholders[index]).html("<span>&nbsp;</span>")
        $(answersPlaceholders[index]).addClass("empty-answer")
        $(answersPlaceholders[index]).removeClass("filled")
        $(".right-mark").remove()


    }

    //3- resetting right answers
    let answers = $(".right-answer");

    $(answers).css('visibility', "unset")
    $(answers).removeClass("click")

    //4- resetting wrong answers
    let wrongAnswers = $(".wrong-answer")
    wrongAnswers.removeClass("disableAnswer")
    wrongAnswers.addClass("answer")

});
