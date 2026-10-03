const categoryInput = document.getElementById("category");

const valueInput = document.getElementById("value");

const fromUnitInput = document.getElementById("fromUnit");

const toUnitInput = document.getElementById("toUnit");

const convertBtn = document.getElementById("convertBtn");

const swapBtn = document.getElementById("swapBtn");

const clearBtn = document.getElementById("clearBtn");

const error = document.getElementById("error");

const result = document.getElementById("result");

const fromResult = document.getElementById("fromResult");

const toResult = document.getElementById("toResult");


const units = {

    length: {

        meter: {
            name: "Meter (m)",
            factor: 1
        },

        kilometer: {
            name: "Kilometer (km)",
            factor: 1000
        },

        centimeter: {
            name: "Centimeter (cm)",
            factor: 0.01
        },

        millimeter: {
            name: "Millimeter (mm)",
            factor: 0.001
        },

        mile: {
            name: "Mile (mi)",
            factor: 1609.344
        },

        yard: {
            name: "Yard (yd)",
            factor: 0.9144
        },

        foot: {
            name: "Foot (ft)",
            factor: 0.3048
        },

        inch: {
            name: "Inch (in)",
            factor: 0.0254
        }
    },


    weight: {

        kilogram: {
            name: "Kilogram (kg)",
            factor: 1
        },

        gram: {
            name: "Gram (g)",
            factor: 0.001
        },

        milligram: {
            name: "Milligram (mg)",
            factor: 0.000001
        },

        pound: {
            name: "Pound (lb)",
            factor: 0.45359237
        },

        ounce: {
            name: "Ounce (oz)",
            factor: 0.028349523125
        }
    },


    temperature: {

        celsius: {
            name: "Celsius (°C)"
        },

        fahrenheit: {
            name: "Fahrenheit (°F)"
        },

        kelvin: {
            name: "Kelvin (K)"
        }
    },


    area: {

        squareMeter: {
            name: "Square Meter (m²)",
            factor: 1
        },

        squareKilometer: {
            name: "Square Kilometer (km²)",
            factor: 1000000
        },

        squareFoot: {
            name: "Square Foot (ft²)",
            factor: 0.09290304
        },

        squareYard: {
            name: "Square Yard (yd²)",
            factor: 0.83612736
        },

        acre: {
            name: "Acre",
            factor: 4046.8564224
        },

        hectare: {
            name: "Hectare",
            factor: 10000
        }
    },


    volume: {

        liter: {
            name: "Liter (L)",
            factor: 1
        },

        milliliter: {
            name: "Milliliter (mL)",
            factor: 0.001
        },

        cubicMeter: {
            name: "Cubic Meter (m³)",
            factor: 1000
        },

        gallon: {
            name: "US Gallon",
            factor: 3.785411784
        },

        quart: {
            name: "US Quart",
            factor: 0.946352946
        },

        pint: {
            name: "US Pint",
            factor: 0.473176473
        },

        cup: {
            name: "US Cup",
            factor: 0.2365882365
        }
    },


    speed: {

        meterPerSecond: {
            name: "Meter/Second (m/s)",
            factor: 1
        },

        kilometerPerHour: {
            name: "Kilometer/Hour (km/h)",
            factor: 0.2777777778
        },

        milePerHour: {
            name: "Mile/Hour (mph)",
            factor: 0.44704
        },

        knot: {
            name: "Knot",
            factor: 0.5144444444
        }
    },


    time: {

        second: {
            name: "Second",
            factor: 1
        },

        minute: {
            name: "Minute",
            factor: 60
        },

        hour: {
            name: "Hour",
            factor: 3600
        },

        day: {
            name: "Day",
            factor: 86400
        },

        week: {
            name: "Week",
            factor: 604800
        }
    }

};


function loadUnits() {

    const category = categoryInput.value;

    const categoryUnits = units[category];

    fromUnitInput.innerHTML = "";

    toUnitInput.innerHTML = "";


    Object.keys(categoryUnits).forEach((key) => {

        const option1 = document.createElement("option");

        option1.value = key;

        option1.textContent =
            categoryUnits[key].name;

        fromUnitInput.appendChild(option1);


        const option2 = document.createElement("option");

        option2.value = key;

        option2.textContent =
            categoryUnits[key].name;

        toUnitInput.appendChild(option2);

    });


    const availableUnits =
        Object.keys(categoryUnits);


    if (availableUnits.length > 1) {

        fromUnitInput.value =
            availableUnits[0];

        toUnitInput.value =
            availableUnits[1];

    }

    clearResult();
}


function convertTemperature(value, from, to) {

    let celsius;


    if (from === "celsius") {

        celsius = value;

    } else if (from === "fahrenheit") {

        celsius =
            (value - 32) * 5 / 9;

    } else if (from === "kelvin") {

        celsius =
            value - 273.15;
    }


    if (to === "celsius") {

        return celsius;

    } else if (to === "fahrenheit") {

        return (
            celsius * 9 / 5
        ) + 32;

    } else if (to === "kelvin") {

        return celsius + 273.15;
    }


    return value;
}


function formatNumber(value) {

    if (!Number.isFinite(value)) {
        return "Invalid";
    }


    if (Math.abs(value) >= 1000000000) {

        return value.toExponential(8);
    }


    return Number(
        value.toFixed(10)
    ).toLocaleString("en-IN");
}


function convert() {

    error.textContent = "";


    if (valueInput.value.trim() === "") {

        error.textContent =
            "Please enter a value.";

        return;
    }


    const value =
        Number(valueInput.value);


    if (!Number.isFinite(value)) {

        error.textContent =
            "Please enter a valid number.";

        return;
    }


    const category =
        categoryInput.value;

    const from =
        fromUnitInput.value;

    const to =
        toUnitInput.value;


    let converted;


    if (category === "temperature") {

        converted =
            convertTemperature(
                value,
                from,
                to
            );

    } else {

        const categoryUnits =
            units[category];

        const baseValue =
            value *
            categoryUnits[from].factor;

        converted =
            baseValue /
            categoryUnits[to].factor;
    }


    result.textContent =
        formatNumber(converted);


    fromResult.textContent =
        units[category][from].name;


    toResult.textContent =
        units[category][to].name;
}


function swapUnits() {

    const currentFrom =
        fromUnitInput.value;

    const currentTo =
        toUnitInput.value;


    fromUnitInput.value =
        currentTo;

    toUnitInput.value =
        currentFrom;


    if (valueInput.value.trim() !== "") {

        convert();
    }
}


function clearResult() {

    result.textContent = "0";

    fromResult.textContent = "—";

    toResult.textContent = "—";

    error.textContent = "";
}


function clearCalculator() {

    valueInput.value = "";

    clearResult();
}


categoryInput.addEventListener(
    "change",
    loadUnits
);


convertBtn.addEventListener(
    "click",
    convert
);


swapBtn.addEventListener(
    "click",
    swapUnits
);


clearBtn.addEventListener(
    "click",
    clearCalculator
);


loadUnits();