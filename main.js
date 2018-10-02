$(document).ready(initializeApp);


var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 3;
var match_counter = 0;
var firstImage = null;
var secondImage = null;
var cardsCanBeClicked = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;


function initializeApp() {

    games_played = 0;
    createGameArea();
    addEventListener();
    $('.enter_link').click(function() {
        $(this).parent().fadeOut(1000, function() {
            $('.hiddengame').removeClass('hiddengame');
        });
    });
}


function addEventListener() {
    $(".card").click(card_clicked);
    $(".reset").click(resetButton);


}

function resetButton(newcards){

    replaceImages(newcards);
    games_played = 0;
    reset_stats();
}


function createGameArea(img){

    var images =['cards/blinkfox.png', 'cards/mal.gif', 'cards/darius.png', 'cards/genn.png', 'cards/hagatha.png', 'cards/lich.png', 'cards/silversword.png', 'cards/snapfreeze.png', 'cards/deathwing.gif'];
    var allCards = shuffleCards(images);

    for(var gameIndex = 0; gameIndex < 3; gameIndex++){
        for (var imageIndex = 0; imageIndex < 6; imageIndex++){

            var card = $("<div>").addClass('card');
            var front = $("<div>").addClass('front');
            var back = $("<div>").addClass('back');
            var frontImage = $("<img>").attr('src', allCards.pop());
            $(card).append(front, back);
            $(front).append(frontImage);
            $(back).append("<img src='cards/luxcard.gif' class='gameCards'/>");
            $('.game-area').append(card);

        }
    }

}

function card_clicked(){
    if(!cardsCanBeClicked || $(this).hasClass('reveal')){
        return;
    }
    console.log(this);
    $(this).addClass('reveal');
    if(first_card_clicked === null){
        first_card_clicked = $(this);

        return;
    } else {
        second_card_clicked = $(this);
        firstImage = first_card_clicked.find('.front img').attr('src');
        secondImage = second_card_clicked.find('.front img').attr('src');


        if (firstImage === secondImage) {
            match_counter = match_counter +1;
            first_card_clicked = null;
            second_card_clicked = null;
            cardsCanBeClicked = true;
            matches++;
            attempts++;
            $('.attempts .value').text(attempts);


            if (match_counter === total_possible_matches) { //problem area
                games_played++;
                $('.attempts .value').text(attempts);
                showModal();
                // put in new function to increase level by adding more cards

            } else {
                console.log('They match!!');
                first_card_clicked = null;
                second_card_clicked = null;

            }
        } else {
            cardsCanBeClicked = false;
            // setTimeout(resetNonMatching, 2000);

            $('.gameCards').removeClass('gameCards');
            setTimeout(resetNonMatching, 2000);
            console.log('they do not match');

            attempts++;


        }
        displayStats();
    }

}

function resetWin(newcards) {
    // $('.card').removeClass('reveal');
    removingModal();
   // $(second_card_clicked).find('.back').removeClass('reveal');
    first_card_clicked = null;
    second_card_clicked = null;
    cardsCanBeClicked = true;
    reset_stats();
    match_counter = 0;
    replaceImages(newcards);
    setTimeout(totalReset, 2000);
}


function resetNonMatching(){
    $(first_card_clicked).removeClass('reveal');
    $(second_card_clicked).removeClass('reveal');
    first_card_clicked = null;
    second_card_clicked = null;
    cardsCanBeClicked = true;
    //add gamecards back on
    $('.back img').addClass('gameCards');


}

function totalReset(){
    console.log('reset working');
    $('.game-area').empty();
    createGameArea();
    $('.card').click(card_clicked);
}



function shuffleCards(cards) {
    var tempCards = cards.concat(cards);
    var randomizedArray = [];
    while(tempCards.length){
        var newImageIndex = Math.floor(Math.random() * tempCards.length);
        var newArray = randomizedArray.push(tempCards[newImageIndex]);
        tempCards.splice(newImageIndex, 1);
    }
    return randomizedArray;
}

function replaceImages(shuffledCards) {
    var cardFronts = $('.front img');
    for (var card = 0; card < shuffledCards; card++) {
        $(cardFronts[card]).attr('src', shuffledCards[card]);
    }
}
function reset_stats(){
    accuracy = 0;
    // matches = 0;
    attempts = 0;
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy);
}

function displayStats(){
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    accuracy = ((match_counter/attempts) * 100);
    var accuracyTruncated = accuracy.toFixed();
    $('.accuracy .value').text(accuracyTruncated + '%');
    accuracy++;
}

function showModal(){
    document.querySelector("#modalShadow").style.display = "block";
    displayStats();
    setTimeout(function () {
        $('.card').removeClass('reveal');
    }, 1500);
    setTimeout(resetWin, 2000);
}

function removingModal(){
    $('#modalShadow').css("display", "none");
}



