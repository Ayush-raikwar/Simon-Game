/* Made by ASR */

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

      console.log("success!");

      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);
      }

    } else {

      console.log("wrong");

      var audio = new Audio("https://iil.ililllliliillilliliil.li/partial/0s_to_4s_Mario_Dead_%7C_Sound_Effects.mp3");
      audio.play();
      $(".container").append("<img class='gif'/>");
      $(".gif").attr("src", "https://media1.tenor.com/images/dbe9188a803e3d3c7d93ecfc51f88942/tenor.gif?itemid=17332070");


      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      $("#level-title").text("Game Over! Press any key to Restart.");


      startOver();
    }

}

function nextSequence() {

  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour)  {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}




function startOver(){


  level = 0;
  gamePattern=[];
  started = false;
  setTimeout(function(){
    $(".gif").remove();
  },4000);

}
