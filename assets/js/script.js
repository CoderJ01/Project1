const dropDown = document.querySelectorAll("form select"),
fromCountry = document.querySelector(".from select"),
toCountry = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropDown.length; i++) {
    for(let currency_code in country_all){
        let selected = i == 0 ? currency_code == "EUR"? "selected" : "" : currency_code == "USD" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropDown[i].insertAdjacentHTML("beforeend", optionTag);
    }

    };

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});


function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "...";
    let api = `https://v6.exchangerate-api.com/v6/df26a036764bc6608585004b/latest/${fromCountry.value}`;
    fetch(api).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCountry.value]; 
        let finalExRate = (amountVal * exchangeRate).toFixed(2); 
        exchangeRateTxt.innerText = `${amountVal} ${fromCountry.value} = ${finalExRate} ${toCountry.value}`;
        console.log(finalExRate);

    });
}

