const endPoint ="latest";
const apiKey = "39ff926bc47e05dc164e3093ecc7bf9d";
const url ="http://data.fixer.io/api/";
const urlInit = url + endPoint +'?access_key=' + apiKey;

updateCountry = (str) => {
    return "<option value=" + str + ">" + str + "</option>";
}
addDot = (str) => {
    let tempSplit = str.split(".");
    let temp = tempSplit.join("");
    for (let i = temp.length; i > 0; i = i-3){
        if( i !== temp.length && i !== 0){
            temp = temp.slice(0, i) + '.' + temp.slice(i, temp.length);
        }
    }
    return temp;
}

getAmount = (str) => {
    let tempSplit = str.split(".");
    let temp = tempSplit.join("");
    return Number(temp);
}

exchangeMoney = (moneyFrom, moneyTo, moneyAmount) => {
    return (moneyTo/moneyFrom) * moneyAmount;
}

$(document).ready( () => {
    fetch(urlInit).then( (response) => {
        if (response.ok) {
            return response.json();
        } else {
            console.log('Request failed');
        }
    }).then( (data) => {
        const {date, rates} = data;
        let country=[];
        let amount;
        for (let i in rates){
            country.push(i);
        };

        $('#currency-from').empty();
        $('#currency-to').empty();
        for (let i of country){
            $('#currency-from').append(updateCountry(i));
        };
        for (let i of country){
            $('#currency-to').append(updateCountry(i));
        };
        $('#date').text(date);

        $('#amount').keyup( () => {
            amount = getAmount($('#amount').val());
            $('#amount').val(addDot( $('#amount').val()));
        });

        $('#converter').click( () => {
            let moneyFrom = $('#currency-from').val();
            let moneyTo = $('#currency-to').val();
            let result = exchangeMoney(rates[moneyFrom], rates[moneyTo], amount);
           $('#result').text(result);
        });

    }).catch( (e) =>{
        console.log(e);
    });

});


