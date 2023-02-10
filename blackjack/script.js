var sectionGame = document.getElementById('sectionGame');
var sectionStart = document.getElementById('sectionStart');
var stand_hit = document.getElementById('stand_hit');
var btn_deal = document.getElementById('btn_deal');
var place_bet = document.getElementById('place_bet');
var input_amount = document.getElementById('input_amount');
var bet_input = document.getElementById('bet_input');
var amount_output = document.getElementById('amount_output');
var dealer_sum = document.getElementById('dealer_sum');
var player_sum = document.getElementById('player_sum');
var stand_btn = document.getElementById('stand_btn');
var amount = parseFloat(input_amount.value);
var end_msg = document.getElementById('end_msg');
var card_back = document.getElementById('card_back');
var bet = parseFloat(bet_input.value);
var dealer_deck = document.getElementById('dealer_deck');
var player_deck = document.getElementById('player_deck');
var is_done;

class card {
    constructor(name, val) {
        this.name = name;
        this.val = val;
        this.logos = [];
    }
    addC(srct, srcp, srcc, srcd) {
        this.logos.push(srct, srcp, srcc, srcd);
    }
}
var ca = new card("A",11);
ca.addC("assets/ka", "assets/la", "assets/pa", "assets/sa");
var c2 = new card("2",2);
c2.addC("assets/k2", "assets/l2", "assets/p2", "assets/s2");
var c3 = new card("3",3);
c3.addC("assets/k3", "assets/l3", "assets/p3", "assets/s3");
var c4 = new card("4",4);
c4.addC("assets/k4", "assets/l4", "assets/p4", "assets/s4");
var c5 = new card("5",5);
c5.addC("assets/k5", "assets/l5", "assets/p5", "assets/s5");
var c6 = new card("6",6);
c6.addC("assets/k6", "assets/l6", "assets/p6", "assets/s6");
var c7 = new card("7",7);
c7.addC("assets/k7", "assets/l7", "assets/p7", "assets/s7");
var c8 = new card("8",8);
c8.addC("assets/k8", "assets/l8", "assets/p8", "assets/s8");
var c9 = new card("9",9);
c9.addC("assets/k9", "assets/l9", "assets/p9", "assets/s9");
var c10 = new card("10",10);
c10.addC("assets/k10", "assets/l10", "assets/p10", "assets/s10");
var cj = new card("J",10);
cj.addC("assets/kj", "assets/lj", "assets/pj", "assets/sj");
var cq = new card("Q",10);
cq.addC("assets/kq", "assets/lq", "assets/pq", "assets/sq");
var ck = new card("K",10);
ck.addC("assets/kk", "assets/lk", "assets/pk", "assets/sk");
const cards = [ca, c2, c3, c4, c5, c6, c7, c8, c9, c10, cj, cq, ck];
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

//**********FUNCTIONS*******//
function check_amount() {
    if (input_amount.value && !isNaN(input_amount.value) && parseFloat(input_amount.value)>0)
        return true;
    else
        return false;
}
function check_bet() {
    if (bet_input.value && !isNaN(bet_input.value) && parseFloat(bet_input.value)>0 && parseFloat(bet_input.value)<=parseFloat(input_amount.value))
        return true;
    else
        return false;
}
function Game_display() {
    var bet = parseFloat(bet_input.value);
    var amount = parseFloat(input_amount.value);
    sectionStart.style.display = "none";
    sectionGame.style.display = "block";
    stand_hit.style.display = "none";
    dealer_sum.style.display = "none";
    player_sum.style.display = "none";
    end_msg.style.display = "none";
    document.getElementById('lose_msg').style.display = "none";
    amount_output.innerText = "AMOUNT: " + amount + "$";
}
function Start_display() {
    sectionGame.style.display = "none";
}
function Deal_display() {
    var bet = parseFloat(bet_input.value);
    var amount = parseFloat(input_amount.value);
    input_amount.value -= bet;
    amount -= bet;
    place_bet.style.display = "none";
    btn_deal.style.display = "none";
    amount_output.innerText = "AMOUNT: " + amount + "$";
}
function sum_change(card,dealer_player) {
    if (dealer_player == "dealer") {
        dealer_sum.style.display = "block";
        dealer_sum.value += card.val;
        dealer_sum.innerText = dealer_sum.value;
    }
    else if (dealer_player == "player") {
        player_sum.style.display = "block";
        player_sum.value += card.val;
        player_sum.innerText = player_sum.value;
    }
}
function Player_card(card) {
    var logo_card = card.logos.random();
    var card_img = document.createElement('img');
    card_img.src = logo_card + ".png";
    document.getElementById('player_deck').appendChild(card_img);
    card_img.classList.add("card-img");
    sum_change(card,"player");
}
function Dealer_card(card) {
    var logo_card = card.logos.random();
    var card_img = document.createElement('img');
    card_img.src = logo_card + ".png";
    document.getElementById('dealer_deck').appendChild(card_img);
    card_img.classList.add("card-img");
    sum_change(card,"dealer");
}
function Back_card() {
    var img = document.createElement('img');
    img.src = "assets/back_card.jpg";
    document.getElementById('dealer_deck').appendChild(img);
    img.setAttribute('id','b_card');
    img.classList.add("card-img");
}
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
async function hit_stand() {
    if (player_sum.value == 21) {
        var bet = parseFloat(bet_input.value);
        var amount = parseFloat(input_amount.value);
        input_amount.value = amount + bet*2.5;
        end_msg.innerText = "BLACKJACK!"
        end_msg.style.display = "block";
        amount_output.innerText = "AMOUNT: " + input_amount.value + "$";
        await delay(1000);
        Stand();
    }
    else
        stand_hit.style.display = "block";
}
async function Dealer_hit(card) {
    var img = document.getElementById('b_card');
    var logo_card = card.logos.random();
    var card_img = document.createElement('img');
    card_img.src = logo_card + ".png";
    await delay(1000);
    img.replaceWith(card_img);
    card_img.classList.add("card-img");
    sum_change(card,"dealer");
    while (dealer_sum.value<17) {
        await delay(1000);
        Dealer_card(cards.random());
    }
}
function win() {
    var bet = parseFloat(bet_input.value);
    var amount = parseFloat(input_amount.value);
    input_amount.value = amount + bet*2; 
    stand_hit.style.display = "none";
    end_msg.innerText = "YOU WIN!";
    end_msg.style.display = "block";
    amount_output.innerText = "AMOUNT: " + input_amount.value + "$";
}
function lose() {
    stand_hit.style.display = "none";
    end_msg.innerText = "BOOM YOU LOSE!";
    end_msg.style.display = "block";
}
function push() {
    var bet = parseFloat(bet_input.value);
    var amount = parseFloat(input_amount.value);
    input_amount.value = amount+bet;
    stand_hit.style.display = "none";
    end_msg.innerText = "PUSH!";
    end_msg.style.display = "block";
    amount_output.innerText = "AMOUNT: " + input_amount.value;
}
async function check_win () {
    if (end_msg.style.display == "none") {
        if (dealer_sum.value>21 || dealer_sum.value<player_sum.value) {
            win();
        }
        else if (dealer_sum.value == player_sum.value) {
            push();
        }
        else 
            lose();
    }
}
async function Replay_display() {
    var amount = parseFloat(input_amount.value);
    var dealer_cards = dealer_deck.lastElementChild;
    var player_cards = player_deck.lastElementChild;
    if (is_done) {
        await delay(3000);
        while (dealer_cards) {
            dealer_deck.removeChild(dealer_cards);
            dealer_cards = dealer_deck.lastElementChild;
        }
        while (player_cards) {
            player_deck.removeChild(player_cards);
            player_cards = player_deck.lastElementChild;
        }
        if (amount>0) {
            Game_display();
            place_bet.style.display = "block";
            btn_deal.style.display = "block";
        }
        else {
            document.getElementById('lose_msg').style.display = "block";
            player_sum.style.display = "none";
            dealer_sum.style.display = "none";
            end_msg.style.display = "none";
        }
    }
    else {
        await delay(200);
        Replay_display();
    }
    
}
/***************************************/

Start_display();
function startGame() {
    if (check_amount()) {
        Game_display();
    }
    else
        document.getElementById('amount_msg').innerText = "ENTER A VALID AMOUNT!";
}

async function startDeal() {
    is_done = false;
    if (check_bet()) {
        Deal_display();
        player_sum.value = 0;
        dealer_sum.value = 0;
        await delay(1000);
        Player_card(cards.random());
        await delay(1000);
        Back_card();
        await delay(1000);
        Player_card(cards.random());
        await delay(1000);
        Dealer_card(cards.random());
        hit_stand();
        Replay_display();
        
    }
    else
        document.getElementById('bet_msg').innerText = "ENTER A VALID BET!"; 
}
async function Hit() {
    if (player_sum.value<21) {
        await delay(1000);
        Player_card(cards.random());
    }
    if (player_sum.value == 21) 
        Stand();
    if (player_sum.value>21) {
        lose();
        Stand();
    }
}
async function Stand() {
    stand_hit.style.display = "none";
    await Dealer_hit(cards.random());
    await check_win();
    is_done = true;
}



