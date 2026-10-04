const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");

const bmiValue = document.getElementById("bmiValue");
const bmiCategory = document.getElementById("bmiCategory");
const error = document.getElementById("error");

calculateBtn.addEventListener("click", calculateBMI);

clearBtn.addEventListener("click", clearBMI);

function calculateBMI() {

    error.textContent = "";

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || height <= 0) {
        error.textContent = "Please enter a valid height.";
        return;
    }

    if (!weight || weight <= 0) {
        error.textContent = "Please enter a valid weight.";
        return;
    }

    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    bmiValue.textContent = bmi.toFixed(1);

    if (bmi < 18.5) {
        bmiCategory.textContent = "Underweight";
    } 
    else if (bmi < 25) {
        bmiCategory.textContent = "Normal";
    } 
    else if (bmi < 30) {
        bmiCategory.textContent = "Overweight";
    } 
    else {
        bmiCategory.textContent = "Obesity";
    }
}

function clearBMI() {

    heightInput.value = "";
    weightInput.value = "";

    bmiValue.textContent = "0.0";
    bmiCategory.textContent = "—";

    error.textContent = "";
}