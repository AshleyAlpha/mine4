//Business Logic

var Player = function (name, score, status) {
    this.name = name;
    this.score = score;
    this.status = status;
}

Player.prototype.scorePlus = function () {
    this.score += roundTotal;
}

var playerOne = {};
var playerTwo = {};

//function that throws the dice
var rolled = 0;
var roundTotal = 0;
var roll = function () {
    rolled = Math.floor(Math.random() * 6) + 1;
    $("#new-dice").remove();
    $(".dice-img").prepend("<img id='new-dice' src='images/dice" + rolled + ".png' alt='Dice " + rolled + "'>");
    if (rolled != 1) {
        roundTotal += rolled
    } else {
        roundTotal = 0;
        turnPlayer();
    }
}

//function to change players turns
var turnPlayer = function () {
    if (playerOne.status == "enabled") {
        playerOne.status = "disabled";
        playerTwo.status = "enabled";
        $(".one-turn").hide();
        $(".two-turn").show();
    } else if (playerTwo.status == "enabled") {
        playerOne.status = "enabled";
        playerTwo.status = "disabled";
        $(".two-turn").hide();
        $(".one-turn").show();
    }
}

// function Winner
var winner = function () {
    if (playerOne.score >= 100) {
        $(".dice-img").text("!!!" + playerOne.name + "  WINS !!!")
        swal({
            title: "!!!" + playerOne.name + "  WINS !!!",
            icon: "success",
            button: "OK!",
        });
        $("#roll").prop("disabled", true);
        $("#hold").prop("disabled", true);
    } else if (playerTwo.score >= 100) {
        $(".dice-img").text("!!!" + playerTwo.name + "  WINS !!!")
        swal({
            title: "!!!" + playerTwo.name + "  WINS !!!",
            icon: "success",
            button: "OK!",
        });
        $("#roll").prop("disabled", true);
        $("#hold").prop("disabled", true);
    }
}

//User Interface

$(document).ready(function () {
    $(".opponnents").submit(function (event) {
        event.preventDefault();
        playerOneName = $("#player-one").val();
        playerTwoName = $("#player-two").val();
        playerTwo = new Player(playerTwoName, 0, "disabled");
        playerOne = new Player(playerOneName, 0, "enabled");

        $(".login").hide();
        $(".pig-game").show();
        $(".player-one-name").prepend(playerOne.name);
        $(".player-two-name").prepend(playerTwo.name);
        $(".two-turn").hide();
        $(".one-turn").show();

        $("#roll").click(function () {
            roll();
            $("#round-total").text(roundTotal);
        }) // end roll click

        $("#hold").click(function () {
            //must add commit remove img dice if click hold
            $("#new-dice").remove();
            if (playerOne.status == "enabled") {
                playerOne.scorePlus();
                $(".player-one-score").text(playerOne.score);
                winner();
                turnPlayer();
            } else if (playerTwo.status == "enabled") {
                playerTwo.scorePlus();
                $(".player-two-score").text(playerTwo.score);
                winner();
                turnPlayer();
            }
            roundTotal = 0;
            $("#round-total").text(roundTotal);
        }) // end hold click
    }) // end submit start

    $("#help").click(function () {
        swal({
            title: "Game Guidance!",
            text: "select a player to go first. That player throws a die and scores as many points as the total shown on the die providing the die doesn’t roll a 1. The player may continue rolling and piling up points (but risk to roll a 1) or end his turn. If the player rolls a 1 his turn is over, and he loses all points he piled up that turn even if it was the first roll, and he passes the die to the next player. Play passes from player to player until a winner is determined. The first player to pile up 100 or more points wins the game.",
            button: "Got it!",
        });
    })
}) // end ready

function reload() {
    location.reload();
}