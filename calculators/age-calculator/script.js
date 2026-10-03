const birthDate = document.getElementById("birthDate");
const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");
const ageText = document.getElementById("ageText");

calculateBtn.addEventListener("click", calculateAge);

clearBtn.addEventListener("click", () => {
    birthDate.value = "";

    ageText.textContent = "Enter your date of birth.";
});

function calculateAge() {

    if (!birthDate.value) {
        ageText.textContent = "Please select your date of birth.";
        return;
    }

    const dob = new Date(birthDate.value + "T00:00:00");
    const today = new Date();

    if (dob > today) {
        ageText.textContent = "Date of birth cannot be in the future.";
        return;
    }

    let years = today.getFullYear() - dob.getFullYear();

    let months = today.getMonth() - dob.getMonth();

    let days = today.getDate() - dob.getDate();

    if (days < 0) {

        months--;

        const previousMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );

        days += previousMonth.getDate();
    }

    if (months < 0) {

        years--;

        months += 12;
    }

    ageText.textContent =
        `${years} Years, ${months} Months, ${days} Days`;
}