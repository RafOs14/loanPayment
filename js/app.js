function validateLoan () {
    let loanAmt = document.getElementById("loanamt").value;

    if(isNaN(loanAmt) || loanAmt <= 0) {
        Toastify({
            text: "Please enter a valid loan amount",
            duration: 3000,
            gravity: "bottom",
            position: 'right',
            style: {
                background: "linear-gradient(to right, #e52d27, #b31217)",
            }
        }).showToast();
        document.getElementById("loanamt").focus();
        document.getElementById("loanamt").select();
        return false;
    } else if (loanAmt > 1000000) {
        Toastify({
            text: "Please enter a loan amount less than $1,000,000",
            duration: 3000,
            gravity: "bottom",
            position: 'right',
            style: {
                background: "linear-gradient(to right, #e52d27, #b31217)",
            }
        }).showToast();
        document.getElementById("loanamt").focus();
        document.getElementById("loanamt").select();
        return false;
    }
    
}

function validateNumber () {
    let elementValue = document.getElementById("rateId").value;    
    let numbers = /^[0-9]+$/;

    if(!elementValue.match(numbers)) {
        Toastify({
            text: "Please enter a valid number",
            duration: 3000,
            gravity: "bottom",
            position: 'right',
            style: {
                background: "linear-gradient(to right, #e52d27, #b31217)",
            }
        }).showToast();
        document.getElementById("rateId").focus();
        document.getElementById("rateId").select();
        return false;
    }
}

function validatePeriod () {
    let period = document.getElementById("repayment").value;
    if (isNaN(period) || period <= 0) {
        Toastify({
            text: "Please enter a valid period",
            duration: 3000,
            gravity: "bottom",
            position: 'right',
            style: {
                background: "linear-gradient(to right, #e52d27, #b31217)",
            }
        }).showToast();
        document.getElementById("repayment").focus();
        document.getElementById("repayment").select();
        return false;
    } else if (period < 7 || period > 15) {
        Toastify({
            text: "Please enter a period between 7 and 15 years",
            duration: 3000,
            gravity: "bottom",
            position: 'right',
            style: {
                background: "linear-gradient(to right, #e52d27, #b31217)",
            }
        }).showToast();
        document.getElementById("repayment").focus();
        document.getElementById("repayment").select();
        return false;
    }
}

calculate = () => {

    let loanAmt = document.getElementById("loanamt").value;
    let rate = document.getElementById("rateId").value;
    let period = document.getElementById("repayment").value;

    //Convertimos los intereses de porcentaje a decimal
    let monthlyRate = (rate / 100) / 12;

    //Convertimos los años a meses
    let months = period * 12;

    //Calculamos el pago mensual
    let x = Math.pow(1 + monthlyRate, months);
    let monthly = (loanAmt * x * monthlyRate) / (x - 1);

    //Verificamos si el resultado es un numero finito
    if(!isNaN(monthly) && (monthly != Number.POSITIVE_INFINITY) && (monthly != Number.NEGATIVE_INFINITY)) {

        document.loanForm.monthly.value = monthly.toFixed(2);
        document.loanForm.totalPayment.value = (monthly * months).toFixed(2);
        document.loanForm.totalInterest.value = ((monthly * months) - loanAmt).toFixed(2);
        
    } else {

        //Mostramos valores vacios
        document.loanForm.monthlyPayment.value = "";
        document.loanForm.totalPayment.value = "";
        document.loanForm.totalInterest.value = "";
    }
}