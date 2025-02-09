const unit1 = document.querySelector('.unit1');
const selectedUnit1 = document.querySelector('.selectedunit1');
const unit2 = document.querySelector('.unit2');
const selectedUnit2 = document.querySelector('.selectedunit2');
const celsius1 = document.querySelector('.c1');
const fahrenheit1 = document.querySelector('.f1');
const kelvin1 = document.querySelector('.k1');
const celsius2 = document.querySelector('.c2');
const fahrenheit2 = document.querySelector('.f2');
const kelvin2 = document.querySelector('.k2');
const heading1 = document.querySelector('.heading1');
const heading2 = document.querySelector('.heading2');
const input = document.querySelector('.input');
const button = document.querySelector('.mainBtn');
const answer = document.querySelector('.answer');
const darkMode = document.querySelector('.darkMode');
const darkSwitch = document.querySelector('.switch');
const mainDark = document.querySelector('.mainDark');
const darkFooter = document.querySelector('.darkFooter');
const darkHead = document.querySelector('.darkHead');
const topHead = document.querySelector('.topHead');
const result = document.getElementById('result')
const foot = document.querySelector('.foot');
const unit1dark = document.querySelector('.unit1dark')
const units1dark = document.querySelector('.units1dark')
const unit2dark = document.querySelector('.unit2dark')
const units2dark = document.querySelector('.units2dark')

// Toggle for dark mode 
darkMode.addEventListener('click',()=>{
    darkSwitch.classList.toggle('dark');
    topHead.classList.toggle('darked1')
    mainDark.classList.toggle('darked1');
    darkFooter.classList.toggle('darked2');
    darkHead.classList.toggle('darked1');
    result.classList.toggle("darked1");
    foot.classList.toggle("footcolor");
    unit1dark.classList.toggle('darked2')
    units1dark.classList.toggle('darked2')
    unit2dark.classList.toggle('darked2')
    units2dark.classList.toggle('darked2')

})


// Toggle unit selection
unit1.addEventListener('click', () => {
    selectedUnit1.classList.toggle('hide');
    selectedUnit2.classList.add('hide');
});
unit2.addEventListener('click', () => {
    selectedUnit2.classList.toggle('hide');
    selectedUnit1.classList.add('hide');
});

// Function to set unit text
const setUnit = (heading, selectedUnit, text) => {
    heading.innerText = text;
    selectedUnit.classList.toggle('hide');
};

// Event listeners for unit selection
celsius1.addEventListener('click', () => setUnit(heading1, selectedUnit1, 'Celsius (°C)'));
fahrenheit1.addEventListener('click', () => setUnit(heading1, selectedUnit1, 'Fahrenheit (°F)'));
kelvin1.addEventListener('click', () => setUnit(heading1, selectedUnit1, 'Kelvin (K)'));

celsius2.addEventListener('click', () => setUnit(heading2, selectedUnit2, 'Celsius (°C)'));
fahrenheit2.addEventListener('click', () => setUnit(heading2, selectedUnit2, 'Fahrenheit (°F)'));
kelvin2.addEventListener('click', () => setUnit(heading2, selectedUnit2, 'Kelvin (K)'));

// Function to enable or disable the button
const updateButtonState = () => {
    if (input.value && heading1.innerText !== "Select Unit" && heading2.innerText !== "Select Unit") {
        button.classList.add("onButton");
        button.disabled = false;
    } else {
        button.classList.remove("onButton");
        button.disabled = true;
    }
};

// Listen for input changes
input.addEventListener('input', updateButtonState);

// Observe changes in headings
const observer = new MutationObserver(updateButtonState);
observer.observe(heading1, { childList: true });
observer.observe(heading2, { childList: true });

// Convert button event listener
button.addEventListener('click', () => {
    let value = parseFloat(input.value);
    if (isNaN(value)) return; // Prevent NaN errors

    let unit = unitFind(heading1.innerText, heading2.innerText);
    let temperature = temp_convert(value, unit);
    
    answer.innerText = `${value} ${heading1.innerText} is ${temperature} ${heading2.innerText}`;
    answer.style.color = '#16a34a';

    input.value = ""; // Clear input after conversion
    updateButtonState();
});

// Function to find conversion type
const unitFind = (from, to) => {
    const units = {
        "Celsius (°C)": "C",
        "Fahrenheit (°F)": "F",
        "Kelvin (K)": "K"
    };
    return `${units[from]}to${units[to]}`;
};

// Conversion functions
const temp_convert = (value, unit) => {
    const conversions = {
        "CtoF": (c) => (c * 9/5) + 32,
        "CtoK": (c) => c + 273.15,
        "FtoC": (f) => (f - 32) * 5/9,
        "FtoK": (f) => (f + 459.67) * 5/9,
        "KtoC": (k) => k - 273.15,
        "KtoF": (k) => (k * 9/5) - 459.67,
        "CtoC": (c) => c,
        "FtoF": (f) => f,
        "KtoK": (k) => k
    };
    return conversions[unit] ? conversions[unit](value).toFixed(2) : "Invalid conversion";
};
