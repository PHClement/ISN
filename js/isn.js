// Paramètre du jeu

var keyTimeout = 1000;

// Game design (à modifié par la suite)

var isStarted = false;

var progress = 0;
var progressStep = 5;

var position = 0;
var positionStep = 15;

var background1 = 90;
var background2 = 75;
var background3 = 60;
var background4 = 40;
var background5 = 30;
var background6 = 20;

var lastCheck = 0;
var idleTime = 0;

// Personnage
const LEFT_BUTTON = true;
const RIGHT_BUTTON = false;
var currentStatus = LEFT_BUTTON;

// EVENTS

$(document).ready(function () {
    checkIdle();
});

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            movePersonnage(false, true);
            break;
        case 39:
            movePersonnage(true, false);
            break;
    }
};

// FUNCTIONS

function checkIdle() {
    setInterval(function () {
        var clicPerSecond = (new Date().getTime() - idleTime) / 1000;
        if (clicPerSecond > 1) {
            $('#prsg').attr("src", "img/sprite/idle.gif");
        }
    }, 500);
}

function movePersonnage(right, left) {
    if (checkStatus(right, left)) {
        if(!isStarted) chronoStart();
        isStarted = true;

        idleTime = new Date().getTime();
        var check = $('#prsg').attr('src');
        if (check.indexOf('idle')) $('#prsg').attr("src", "img/sprite/run.gif");

        // Barre de progression
        progress += progressStep;
        $('#percentage').text(Math.abs(progress) + '%');
        if (progress > 100) {
            chronoStop();
        }

        var counter = 1;
        var task = setInterval(function () {
            counter += 2;
            if (counter >= positionStep) clearInterval(task);
            else {
                position -= counter;
                $('#prsg').css('left', progress + '%');
                $('.background-1').css('background-position', (position - (position * (background1 / 100))) + 'px 0');
                $('.background-2').css('background-position', (position - (position * (background2 / 100))) + 'px 0');
                $('.background-3').css('background-position', (position - (position * (background3 / 100))) + 'px 0');
                $('.background-4').css('background-position', (position - (position * (background4 / 100))) + 'px 0');
                $('.background-5').css('background-position', (position - (position * (background5 / 100))) + 'px 0');
                $('.background-6').css('background-position', (position - (position * (background6 / 100))) + 'px 0');
            }
        }, 3);
    }
}

function checkStatus(right, left) {
    var check = (progress < 100) && (right && currentStatus == LEFT_BUTTON) || (left && currentStatus == RIGHT_BUTTON);
    if (check) updateStatus(right, left);
    return check;
}

function updateStatus(right, left) {
    if (right) currentStatus = RIGHT_BUTTON;
    else if (left) currentStatus = LEFT_BUTTON;

    var clicPerSecond = (new Date().getTime() - lastCheck) / 1000;
    $('#clickPerSecond').text(Math.abs(clicPerSecond) + "s");
    lastCheck = new Date().getTime();
}
