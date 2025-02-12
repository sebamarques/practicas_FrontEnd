const billToPay = document.getElementById("bill");
const customTip = document.getElementById("customTip");
const numberOfClients = document.getElementById("numberClients");
const tipButtons = document.querySelectorAll("button[data-tip]");
const tipAmountElement = document.querySelector(".tip-amount");
const totalAmountElement = document.querySelector(".total-amount");
const rstbtn = document.getElementById("resetbtn");

let billValue = 0;
let tipValue = 0;
let clientsValue = 0;

let totalToPay = 0;
let totalTip = 0;

document.addEventListener("DOMContentLoaded", function () {

    billToPay.addEventListener("input", function () {
        calculateTip();
    });

    customTip.addEventListener("input", function () {
        tipValue = parseFloat(customTip.value) || 0;
        tipButtons.forEach(btn => btn.classList.remove('active'));
        calculateTip();
    });

    numberOfClients.addEventListener("input", function () {
        calculateTip();
    });

    tipButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            tipButtons.forEach(btn => btn.classList.remove('active')); 
            button.classList.add('active');
            event.preventDefault();
            tipValue = parseFloat(button.getAttribute("data-tip"));
            customTip.value = "";  
            calculateTip();  
        });
    });

    rstbtn.addEventListener("click", reset);
});

function calculateTip() {
    billValue = parseFloat(billToPay.value) || 0;
    clientsValue = parseInt(numberOfClients.value) || 1;

    totalTip = (billValue * tipValue / 100) / clientsValue;
    totalToPay = (billValue / clientsValue) + totalTip;

    updateUi();
}

function updateUi() {
    if (billValue && clientsValue && tipValue) {
        tipAmountElement.textContent = `$${(totalTip.toFixed(2))}`;
        totalAmountElement.textContent = `$${(totalToPay.toFixed(2))}`;
        
        rstbtn.disabled = false;
        rstbtn.classList.add("click");
    } else {
        rstbtn.disabled = true;
        rstbtn.classList.remove("click");
    }
}

function reset() {
    billToPay.value = "";
    customTip.value = "";
    numberOfClients.value = "";

    tipAmountElement.textContent = "$0.00";
    totalAmountElement.textContent = "$0.00";

    tipButtons.forEach(btn => btn.classList.remove('active'));
    rstbtn.disabled = true;

    calculateTip();
}
