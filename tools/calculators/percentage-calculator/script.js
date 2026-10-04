function calculatePercentOf() {

    const percentage =
        Number(document.getElementById("percentOf").value);

    const number =
        Number(document.getElementById("numberOf").value);

    const result =
        document.getElementById("result1");


    if (
        document.getElementById("percentOf").value === "" ||
        document.getElementById("numberOf").value === ""
    ) {
        result.textContent = "Please enter both values.";
        return;
    }


    const answer = (percentage / 100) * number;


    result.textContent =
        `${percentage}% of ${number} = ${formatNumber(answer)}`;
}



function calculateWhatPercent() {

    const part =
        Number(document.getElementById("part").value);

    const whole =
        Number(document.getElementById("whole").value);

    const result =
        document.getElementById("result2");


    if (
        document.getElementById("part").value === "" ||
        document.getElementById("whole").value === ""
    ) {
        result.textContent = "Please enter both values.";
        return;
    }


    if (whole === 0) {
        result.textContent = "Whole value cannot be zero.";
        return;
    }


    const answer = (part / whole) * 100;


    result.textContent =
        `${part} is ${formatNumber(answer)}% of ${whole}`;
}



function calculateChange() {

    const oldValue =
        Number(document.getElementById("oldValue").value);

    const newValue =
        Number(document.getElementById("newValue").value);

    const result =
        document.getElementById("result3");


    if (
        document.getElementById("oldValue").value === "" ||
        document.getElementById("newValue").value === ""
    ) {
        result.textContent = "Please enter both values.";
        return;
    }


    if (oldValue === 0) {
        result.textContent = "Original value cannot be zero.";
        return;
    }


    const change =
        ((newValue - oldValue) / oldValue) * 100;


    if (change > 0) {

        result.textContent =
            `Increased by ${formatNumber(change)}%`;

    } else if (change < 0) {

        result.textContent =
            `Decreased by ${formatNumber(Math.abs(change))}%`;

    } else {

        result.textContent =
            "No percentage change.";
    }
}



function formatNumber(number) {

    return Number(
        number.toFixed(6)
    ).toLocaleString();
}



function clearAll() {

    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });


    document.getElementById("result1").textContent =
        "Result will appear here.";

    document.getElementById("result2").textContent =
        "Result will appear here.";

    document.getElementById("result3").textContent =
        "Result will appear here.";
}