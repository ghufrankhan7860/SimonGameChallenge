var buttonColors = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level=0;
var gameStarted=false;

$(document).on("keypress", function(){
    if(!gameStarted){
        gameStarted=true;
        $("h1").text("Level "+level);
        nextSequence();
    }
})


// push the user-clicked pattern in the userchosen pattern
$(".btn").click(function () {
    if(gameStarted){
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
    
        playSound(userChosenColor);
        animatePress(userChosenColor);
    
        checkAnswer(userClickedPattern.length-1);
    }

})

// to check whether the current answer is valid or not
function checkAnswer(currentLevel) {
    if((userClickedPattern[currentLevel]==gamePattern[currentLevel])){
        
        if((userClickedPattern.length===gamePattern.length)){
            setTimeout(function(){
                nextSequence();
                }, 1000);
        }
        
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);

    var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);

    animateButton(randomChosenColor);
    playSound(randomChosenColor);

}

// opacity drops and then returns to original
function animateButton(randomChosenColor) {
    $("#" + randomChosenColor).animate({ opacity: 0.5 }, 100, function () {
        $("#" + randomChosenColor).animate({ opacity: 1 }, 100)
    });
}

// playSound function
function playSound(randomChosenColor) {
    var audioToPlay = new Audio(randomChosenColor + '.mp3');
    audioToPlay.play();
}

// to animate the user keypress by adding border to the box
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    gameStarted=false;
}