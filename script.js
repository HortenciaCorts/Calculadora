const keyboard = document.querySelectorAll(".keyboard");
const result = document.querySelector("#input-res");
const inputCalc = document.querySelector("#input-calc");

let arrayInput = [];
let arrayCalc

const clean = document.querySelector(".keyboard-clean");
clean.addEventListener("click", function () {
    window.location.reload();
});

function addingHTML(calculation, newSignal){
    inputCalc.value = String(arrayCalc).replaceAll(',', "")
    result.value = calculation + newSignal;
    arrayInput = [];
    arrayInput.push(calculation);
}

function operation(signal, newSignal) {
    let calculation;
    if (arrayInput.length === 2) {
        switch (signal) {
            case "+":
                calculation = Number(arrayInput[0]) + Number(arrayInput[1]);
                addingHTML(calculation, newSignal)
                break;
            case "-":
                calculation = Number(arrayInput[0]) - Number(arrayInput[1]);
                addingHTML(calculation, newSignal)
                break;
            case "×":
                calculation = Number(arrayInput[0]) * Number(arrayInput[1]);
                addingHTML(calculation, newSignal)
                break;
            case "÷":
                calculation = Number(arrayInput[0]) / Number(arrayInput[1]);
                addingHTML(calculation, newSignal)
                break;
        }
    }
}

keyboard.forEach(function (item) {
    item.addEventListener("click", function () {
        let value = item.innerHTML;
        
        if (value != "=" && value != "AC") {
            if (result.value != "") {
                result.value += value;
            } else if (result.value === "" && (value === "+" || value === "-" || value === "×" || value === "÷")) {
                result.value = "0" + value;
            }
            else {
                result.value += value;
            }
        }
        //array que será necessário para remover o último valor adicionado
        arrayCalc = [...result.value]
        if (value === "AC") {
            //apaga o último valor
            arrayCalc.splice(arrayCalc.length - 1, 1)
            //Transaforma em string e remove as vírgulas
            result.value = String(arrayCalc).replaceAll(',', "")
        }

        if (value === "+" || value === "-" || value === "×" || value === "÷" || value === "=") {
            let newSignal = value;
            if (value === "=") {
                newSignal = "";
            }
            const signal = result.value.replace(/[0-9]|\./g, "").split("")[0];
            if (value === "=") {
                const equal = document.querySelector(".equal");
                equal.addEventListener("click", operation(signal, newSignal));
            } else {
                //Removendo o ultimo sinal adicionado para mostrar no primeiro input
                arrayCalc.splice(arrayCalc.length - 1, 1)
                operation(signal, newSignal);
            }
        } else {
            arrayInput = result.value.split(/\+|\-|\×|\÷/g);
        }
    });
});
