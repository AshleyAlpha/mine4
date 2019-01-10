//business logic
var firstplayer = "";
var secondplayer = "";

var throwdice = function () {
    return Math.floor(6 * Math.random()) + 1;
}

function Player(turn) {
    this.roll = 0;
    this.tempscore = 0;
    this.totalscore = 0;
    this.turn = turn;
    this.playerName;
}

// checking for 1
Player.prototype.rollone = function () {
    if (this.roll === 1) {
        this.tempscore = 0;
        alert("Sorry " + this.playerName + ", you rolled a 1! Your turn is over!")
        // this.changeturn();
    } else {
        this.tempscore += this.roll;
    }
}

// hold
Player.prototype.hold = function () {
    this.totalscore += this.tempscore;
    this.tempscore = 0;
    // this.changeturn();
    alert(this.playerName + ", your turn is over, pass the mouse!");
}

// // changing turn
// Player.prototype.changeturn = function () {
//   if (this.roll ===1) {
//     this.turn = false;
//   } else {
//     this.turn = true;
//   }
// }
// check for 100
Player.prototype.winnerCheck = function () {
    if (this.totalscore >= 100) {
        alert(this.playerName + " You are the winner!");
    }
}

Player.prototype.newGame = function () {
    //debugger;
    this.roll = 0;
    this.tempscore = 0;
    this.totalscore = 0;
    this.playerName = "";
}

var clearValues = function () {
    $(".firstplayerName").val("");
    $(".secondplayerName").val("");
}

// User Interface
$(document).ready(function () {

    $("button#start").click(function (event) {
        firstplayer = new Player(true);
        secondplayer = new Player(false);
        $(".player-console").show();
        $(".start-menu").hide();

        var firstplayerName = $(".firstplayerName").val();
        $("#first-playerName").text(firstplayerName);

        var secondplayerName = $(".secondplayerName").val();
        $("#second-playerName").text(secondplayerName);

        firstplayer.playerName = firstplayerName;
        secondplayer.playerName = secondplayerName;

    });
    $("button#new-game").click(function (event) {
        $(".player-console").hide();
        clearValues();
        firstplayer.newGame();
        secondplayer.newGame();
        $("#round-total-1").empty();
        $("#total-score-1").empty();
        $("#die-roll-1").empty();
        $("#round-total-2").empty();
        $("#total-score-2").empty();
        $("#die-roll-2").empty();

        $(".start-menu").show();
    });

    $("button#firstplayer-roll").click(function (event) {
        firstplayer.roll = throwdice();
        $("#die-roll-1").text(firstplayer.roll);
        firstplayer.rollone();
        $("#round-total-1").text(firstplayer.tempscore);
    });

    $("button#secondplayer-roll").click(function (event) {
        secondplayer.roll = throwdice();
        $("#die-roll-2").text(secondplayer.roll);
        secondplayer.rollone();
        $("#round-total-2").text(secondplayer.tempscore);
    });

    $("button#firstplayer-hold").click(function (event) {
        firstplayer.hold();
        $("#total-score-1").text(firstplayer.totalscore);
        $("#round-total-1").empty();
        $("#die-roll-1").empty();
        firstplayer.winnerCheck();
    });

    $("button#secondplayer-hold").click(function (event) {
        secondplayer.hold();
        $("#total-score-2").text(secondplayer.totalscore);
        $("#round-total-2").empty();
        $("#die-roll-2").empty();
        secondplayer.winnerCheck();
    });

});