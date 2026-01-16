// Display element ko select karna
const display = document.getElementById('result');

// 1. Numbers ko display par add karna
function appendNumber(num) {
    if (display.value === '0') {
        display.value = num;
    } else {
        display.value += num;
    }
}

// 2. Operators ko handle karna (+, -, *, /)
function appendOperator(op) {
    const lastChar = display.value.slice(-1);
    
    // Agar screen khali hai aur operator daba diya
    if (display.value === '' && op !== '-') return;
    
    // Agar pehle se koi operator hai toh use badal dein (overwrite)
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + op;
    } else {
        display.value += op;
    }
}

// 3. Pura display saaf karna (AC)
function clearDisplay() {
    display.value = '';
}

// 4. Ek single character delete karna (DEL)
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// 5. Final Calculation (=)
function calculate() {
    try {
        // eval() pure string ko math expression ki tarah solve karta hai
        let result = eval(display.value);
        
        // Agar result decimal mein hai toh limit karna
        if (!Number.isInteger(result)) {
            result = result.toFixed(2);
        }
        
        display.value = result;
    } catch (error) {
        display.value = "Error";
        // 1.5 second baad error hata dena
        setTimeout(clearDisplay, 1500);
    }
}

// 6. Optional: Keyboard Support (Bonus)
document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
    if (e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
});