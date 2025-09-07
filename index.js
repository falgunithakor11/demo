const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
//or
// function getRandomSymbol() {
//   const ranges = [   
//     [33, 48],
//     [58, 65],
//     [91, 97],
//     [123, 127],
//   ];

//   const [start, end] = ranges[Math.floor(Math.random() * ranges.length)];
//   return String.fromCharCode(Math.floor(Math.random() * (end - start)) + start);
// }

//initially
let password = "";
let passwordLength = 10;

handleSlider();
//ste strength circle color to grey
setIndicator("#ccc");


//set password length according to slider
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max-min) + "% 100%")
}


//set indicator
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 2px ${color}`;

    //shadow
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRandomInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 123));

}
function generateUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}
function generateSymbol() {
    const randNum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) {
        hasUpper = true;
    }
    if (lowercaseCheck.checked) {
        hasLower = true;
    }
    if (symbolsCheck.checked) {
        hasSym = true;
    }
    if (numbersCheck.checked) {
        hasNum= true;
    }

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0")
    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }

}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied!"
    } catch (e) {
        copyMsg.innerText ="error"
    }

    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

//shuffele password
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

}


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});


// Yeh line JavaScript ka event listener hai jo **slider ke move hone par chalti hai**. Chalo step-by-step samajhte hain:

// ```js
// inputSlider.addEventListener('input', (e) => {
//     passwordLength = e.target.value;
//     handleSlider();
// });
// ```

// ### Yeh code kya karta hai:
// 1. `inputSlider` pe **"input"** event lagaya gaya hai — matlab jaise hi user slider ko move karega, yeh function chalega.
// 2. `e.target.value` se **slider ki current value milti hai**, aur usse `passwordLength` update ho jaata hai.
// 3. `handleSlider()` call hota hai, jisme UI update hoti hai — jaise:
//    - slider ki visual position set hoti hai,
//    - password length number display update hota hai.

// ### Simple bhasha mein:
// > Jab tum slider ghumati ho, to passwordLength update hoti hai, aur UI uske hisaab se reflect karti hai.

// 💡 Without this event listener, **slider move karne ka koi effect nahi hota password pe**, kyunki JavaScript ko pata hi nahi chalta ki user ne value change ki hai.

// Chaaho toh `handleSlider()` ke andar ki exact logic bhi samjha du? 😄



copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
});



function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    })

    //special case

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


generateBtn.addEventListener('click', () => {
    //none of the checkbox are seleted
    if (checkCount <= 0) return;

    console.log("bhai me to nhi chal rh a")
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    // alert("hello")

    // let's start to find new password

    //remove old password
    password = "";

    //let's put the stuff mentioned by checkbox 

    // if (uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }
    // if (lowercaseCheck.checked) {
    //     password +=  generateLowerCase();
    // }
    // if (numbersCheck.checked) {
    //     password += generateSymbol();
    // }
    // if (symbolsCheck.checked) {
    //     password += generateSymbol();
    // }
    let funcArr = [];

    if (uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }
    if (numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }
    if (symbolsCheck.checked) {
        funcArr.push(generateSymbol);
    }

    //compulsary addition

    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    // console.log("done")

    //remaining addition hum kar rhe he

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    //shuffle the password
    password = shufflePassword(Array.from(password));

    //show in ui
    passwordDisplay.value = password;

    //calculate strength
    calcStrength();

});

