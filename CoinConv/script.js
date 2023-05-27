var amount_coin = document.getElementById('inputGroupSelect01')
var toconv_coin = document.getElementById('inputGroupSelect02');
var coin_symbol = document.getElementById('coin_symbol');
var amount = document.getElementById('amount');
var result_body = document.getElementById('result_body');
document.getElementById('polite_msg').style.display = "none";
document.getElementById('conv_result').style.display = "none";
function modify_symbol() {
    if (amount_coin.value == 1)
        coin_symbol.innerText = "$";
    else if (amount_coin.value == 2)
        coin_symbol.innerText = "€";
    else if (amount_coin.value == 3)
        coin_symbol.innerText = "TND";
    else if (amount_coin.value == 4)
        coin_symbol.innerText = "BTC";
    console.log(coin_symbol.value);
}

function convert() {
    if (!amount.value)
        document.getElementById('polite_msg').style.display = "block";
    else {
        var a = parseFloat(amount.value);
        document.getElementById('polite_msg').style.display = "none";
        if (amount_coin.value == 1) {
            if (toconv_coin.value == 2) 
                result_body.innerText = a + " Dollars = " + (a*0.92064444).toFixed(3)  + " Euro";
            
            else if (toconv_coin.value == 3) 
                result_body.innerText = a + " Dollars = " + (a*3.0544287).toFixed(3) + " TND";
            
            else if (toconv_coin.value == 4) 
                result_body.innerText = a + " Dollars = " + (a*0.0000425703).toFixed(3) + " BITCOIN";
            
            else 
                result_body.innerText = a + " Dollars = " + a + " Dollar";
            
            document.getElementById('conv_result').style.display = "block";
        }
        else if (amount_coin.value == 2) {
            if (toconv_coin.value == 1) 
                result_body.innerText = a + " Euro = " + (a*1.087031).toFixed(3) + " Dollar";
            else if (toconv_coin.value == 3)
                result_body.innerText = a + " Euro = " + (a*3.3190343).toFixed(3) + " TND";
            else if (toconv_coin.value == 4)
                result_body.innerText = a + " Euro = " + (a*0.000047315741).toFixed(3) + " BITCOIN";
            else
                result_body.innerText = a + " Euro = " + a + " Euro";
            document.getElementById('conv_result').style.display = "block";
        }
        else if (amount_coin.value == 3) {
            if (toconv_coin.value == 1)
                result_body.innerText = a + " TND = " + (a*0.32751424).toFixed(3) + " Dollar";
            else if (toconv_coin.value == 2)
                result_body.innerText = a + " TND = " + (a*0.30135806).toFixed(3) + " Euro";
            else if (toconv_coin.value == 4)
                result_body.innerText = a + " TND = " + (a*0.000014257).toFixed(3) + " BITCOIN";
            else
                result_body.innerText = a + " TND = " + a + " TND";
            document.getElementById('conv_result').style.display = "block";
        }
        else if (amount_coin.value == 4) {
            if (toconv_coin.value == 1)
                result_body.innerText = a + " BITCOIN = " + (a*22969.76).toFixed(3) + " Dollar";
            else if (toconv_coin.value == 2)
                result_body.innerText = a + " BITCOIN = " + (a*21134.071).toFixed(3) + " Euro";
            else if (toconv_coin.value == 3)
                result_body.innerText = a + " BITCOIN = " + (a*70129.436).toFixed(3) + " TND";
            else
                result_body.innerText = a + " BITCOIN = " + a + " BITCOIN";
            document.getElementById('conv_result').style.display = "block";
        }
        else {
            document.getElementById('polite_msg').innerText = "Please choose coins.";
            document.getElementById('polite_msg').style.display = "block";
        }
    }
};