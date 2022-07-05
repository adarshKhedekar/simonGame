var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var istrue = true;
function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    addAnimation(randomChosenColour);
    level++;
    increaseLevel(level);
}
function checkAnswer(currLevel){
    if(gamePattern[currLevel] === userClickedPattern[currLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else{
        audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function startOver(){
    gamePattern = [];
    istrue = true;
    level = 0;
}
function increaseLevel(n){
    $("#level-title").text("Level " + n);
}
function addAnimation(randomChosenColour){
    $("#"+randomChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+randomChosenColour).removeClass("pressed");
    },100);
}
$(document).keypress(function(){
    if(istrue === true){
        istrue = false;
        nextSequence();
    }
})
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    addAnimation(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
