var card = {point: 5, suit: 'diamonds'};

var deck = [
  { point: 9, suit: 'diamonds' },
  { point: 1, suit: 'spades' },
  { point: 5, suit: 'clubs' },
  { point: 10, suit: 'hearts' },
  { point: 2, suit: 'diamonds' },
  { point: 6, suit: 'clubs' },
  { point: 3, suit: 'hearts' },
  { point: 9, suit: 'spades' }
];

var dealerHand = [];
var playerHand = [];

//takes playerHand or dealerHand and element for appending HTML
function dealCard(hand, element) {
  var card;
  //takes card from deck
  card = deck.pop();
  //adds card to hand
  hand.push(card);
  //adds card to HTML
  var cardHTML = '<img class="card" src="' + getCardImageUrl(card) + '"/>';
  $(element).append(cardHTML);
};

//calculate points - takes hand (array of cards) and returns point value
//of that hand
function calculatePoints(hand) {
  var points = 0;
  for(var i = 0; i < hand.length; i++) {
    var card = hand[i];
  if (card.point >= 10) {
      points = points + 10;
    } else {
      points = points + card.point;
    }
  }
  return points;
};
//calculate the Points using calculatePoints for both the dealer
//and player and will update the display with the Points
function displayPoints() {
  var dealerPoints = calculatePoints(dealerHand);
  $('#dealer-points').text(dealerPoints);
  var playerPoints = calculatePoints(playerHand);
  $('#player-points').text(playerPoints);
};
//calculatePoints to get points for both dealer and player and display
//message when someone busts. Returns true if there was a bust
function checkForBusts() {
  var playerPoints = calculatePoints(playerHand);
  if (playerPoints > 21) {
    $('#messages').text("You busted. Better luck next time!");
    return true;
  }
  var dealerPoints = calculatePoints(dealerHand);
  if (dealerPoints > 21) {
    $('#messages').text("Dealer busted. Better luck next time!");
    return true;
  }
  return false;
};

function resetGame() {
  deck = [
    { point: 9, suit: 'diamonds' },
    { point: 1, suit: 'spades' },
    { point: 5, suit: 'clubs' },
    { point: 10, suit: 'hearts' },
    { point: 2, suit: 'diamonds' },
    { point: 6, suit: 'clubs' },
    { point: 3, suit: 'hearts' },
    { point: 9, suit: 'spades' }
  ];
  dealerHand = [];
  playerHand = [];
  $('#player-points').text('');
  $('#dealer-points').text('');
  $('#message').text('');
  $('#player-hand').html('');
  $('#dealer-hand').html('');
}
//function that diplays dynamtically the card img for the card
function getCardImageUrl(card) {
  var cardName;
  if(card.point === 1) {
    cardName = 'ace';
  } else if(card.point === 2){
    cardName = '2';
  } else if(card.point === 3) {
    cardName = '3';
  } else if(card.point === 4) {
    cardName = '4';
  } else if(card.point === 5) {
    cardName = '5';
  } else if(card.point === 6) {
    cardName = '6';
  } else if(card.point === 7) {
    cardName = '7';
  } else if(card.point === 8) {
    cardName = '8';
  } else if(card.point === 9) {
    cardName = '9';
  } else if(card.point === 10) {
    cardName = '10';
  } else if(card.point === 11) {
    cardName = 'jack';
  } else if (card.point === 12) {
    cardName = 'queen';
  } else if (card.point === 13) {
    cardName = 'king';
  }
  var result = 'images/' + cardName + '_of_' + card.suit + '.png';
  return result;
};

  $(function() {
    $('#deal-button').click(function() {
      resetGame();
      dealCard(playerHand, '#player-hand');
      dealCard(dealerHand, '#dealer-hand');
      dealCard(playerHand, '#player-hand');
      dealCard(dealerHand, '#dealer-hand');
      displayPoints();
      checkForBusts();

    });

    //hit deals one card
    $('#hit-button').click(function() {
      dealCard(playerHand, '#player-hand');
      displayPoints();
      checkForBusts();
    });
    //will continue to deal to the dealer until hits 17
    $('#stand-button').click(function() {
      var dealerPoints = calculatePoints(dealerHand);
      while(dealerPoints < 17) {
        dealCard(dealerHand, '#dealer-hand');
        dealerPoints = calculatePoints(dealerHand);
      }
      displayPoints();
      if (!checkForBusts()) {
        //determine winner
        var playerPoints = calculatePoints(playerHand);
        var dealerPoints = calculatePoints(dealerHand);
        if (playerPoints > dealerPoints) {
          $('#messages').text('YOU WON!');
        } else if (playerPoints === dealerPoints) {
          $('#messages').text('Push');
        } else {
          $('#messages').text('Sorry, You lose!');
        }
      }
    });
    });
