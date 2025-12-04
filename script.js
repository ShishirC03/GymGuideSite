function calculate() {
    const gender = document.getElementById("gender").value;
    const ageVal = parseFloat(document.getElementById("age").value);
    const heightVal = parseFloat(document.getElementById("height").value);
    const weightVal = parseFloat(document.getElementById("weight").value);
    const activityVal = parseFloat(document.getElementById("activity").value);
    const goalVal = document.getElementById("goal").value;

    const resultEl = document.getElementById("result");
    const bmiBox = document.getElementById("bmiBox");
    const nutritionBox = document.getElementById("nutritionBox");

    if (!gender || !ageVal || !heightVal || !weightVal || !activityVal || !goalVal) {
        resultEl.innerHTML =
            `<div class="alert alert-danger">Please fill all fields.</div>`;
        return;
    }

    // BMR calculation
    let bmr;
    if (gender === "Male") {
        bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal + 5;
    } else {
        bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal - 161;
    }

    const maintenance = bmr * activityVal;
    let finalCalories;

    if (goalVal === "gain") finalCalories = maintenance + 400;
    else if (goalVal === "lose") finalCalories = maintenance - 400;
    else finalCalories = maintenance;

    resultEl.innerHTML = `
        <div class="alert alert-success">
            <strong>BMR (Basal Metabolic Rate):</strong> ${Math.round(bmr)} kcal/day <br>
            <strong>Maintenance:</strong> ${Math.round(maintenance)} kcal/day <br>
            <strong>Target for your goal:</strong> ${Math.round(finalCalories)} kcal/day
        </div>`;

    // BMI calculation
    const heightM = heightVal / 100;
    const bmi = weightVal / (heightM * heightM);
    let bmiCategory = "";
    let bmiClass = "";

    if (bmi < 18.5) {
        bmiCategory = "Underweight – focus on slow, healthy weight gain with more calories and protein.";
        bmiClass = "bmi-under";
    } else if (bmi < 25) {
        bmiCategory = "Normal – great place to build muscle and strength.";
        bmiClass = "bmi-normal";
    } else if (bmi < 30) {
        bmiCategory = "Overweight – slight calorie deficit + training can lean you out.";
        bmiClass = "bmi-over";
    } else {
        bmiCategory = "Obese – aim for steady, sustainable fat loss with gentle deficit and movement.";
        bmiClass = "bmi-obese";
    }

    bmiBox.innerHTML = `
        <p class="mb-1">Your BMI: <strong>${bmi.toFixed(1)}</strong></p>
        <p class="mb-1"><span class="bmi-pill ${bmiClass}">${bmiCategory}</span></p>
        <small class="info-gray">Note: BMI is a rough guide and doesn’t perfectly reflect muscle mass.</small>
    `;

    // Nutrition suggestion
    const proteinMin = (weightVal * 1.6).toFixed(0);
    const proteinMax = (weightVal * 2.0).toFixed(0);

    let goalText = "";
    if (goalVal === "gain") {
        goalText = `
            • Eat a small surplus of about <strong>+300–500 kcal</strong> above maintenance.<br>
            • Focus on high-protein, calorie-dense foods: dal, rajma, chole, paneer, tofu/soya, curd, nuts, peanut butter, ghee in moderation, rice, roti, bananas, oats.
        `;
    } else if (goalVal === "lose") {
        goalText = `
            • Aim for a small deficit of about <strong>-300–500 kcal</strong> below maintenance.<br>
            • Choose filling, lower-calorie foods: salads, vegetables, fruits, toned milk, sprouts, lentils, bhakri/roti in moderation, avoid sugary drinks & junk.
        `;
    } else {
        goalText = `
            • Eat around your maintenance calories and keep protein high.<br>
            • Balance each plate: some protein (dal/paneer/curd), some carbs (rice/roti), some healthy fats (nuts/ghee), and vegetables.
        `;
    }

    nutritionBox.innerHTML = `
        <p class="mb-1"><strong>Approximate daily protein target:</strong> ${proteinMin}–${proteinMax} g</p>
        <p class="small mb-2 info-gray">Try to include protein in every meal (especially breakfast and post-workout).</p>
        <p class="small mb-0">
            ${goalText}
            <br><br>
            • Try to eat mostly home-cooked food.<br>
            • Include colourful veggies for vitamins & minerals.<br>
            • Sip water through the day, not only during workouts.
        </p>
    `;
}
