const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// console.log(currCode, countryList[currCode]);
// }

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOPtion = document.createElement("option");
        newOPtion.innerText = currCode;
        newOPtion.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOPtion.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOPtion.selected = "selected";
        }
        select.append(newOPtion);
    }

    select.addEventListener("change", (evt) => {
        updateFLG(evt.target);
    });
}

const updateFLG = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newScr = "https://flagsapi.com/${countryCode}/flat/64.png";
    let img = element.parentElement.querySelector("img");
    img.src = newScr;
}

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());
    const URL = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const responce = await fetch(URL);
    let data = await responce.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});