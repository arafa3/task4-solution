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
                $(".answer").addClass("disableAnswer")
                $(".answer").removeClass("answer")
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
                $(this).children().show()
                $(this).children().html("&nbsp;")
                $(".wrong-mark").remove()
            }, 700);




        }
    }
});