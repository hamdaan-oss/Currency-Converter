const API_KEY = "cur_live_OnazRTSLUcQUM0gsjhLswsnepyZ3ci9RlYMJiCHW";
const BASE_URL = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"; 
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const fromCurrency = fromCurr.value;
    const toCurrency = toCurr.value;

    fetch(`${BASE_URL}&base_currency=${fromCurrency}&currencies=${toCurrency}`)
        .then(response => response.json())
        .then(data => {
            let exchangeRate = data.data[toCurrency].value;
            let convertedAmount = (amtVal * exchangeRate).toFixed(2);
            msg.innerText = `${amtVal} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => {
            msg.innerText = "Error fetching exchange rate.";
            console.error("Error:", error);
        });
});
