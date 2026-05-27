// Bài B1 - Máy tính đơn giản

function calculate(num1, operator, num2) {
    // Validate input - kiểm tra xem có phải số không
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return "Lỗi: Input không phải số";
    }
    
    // Nếu là NaN thì cũng lỗi
    if (isNaN(num1) || isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }
    
    let result;
    
    // Xử lý các operator hợp lệ
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            result = num1 / num2;
            break;
        case '%':
            if (num2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            result = num1 % num2;
            break;
        case '**':
            result = num1 ** num2;
            break;
        default:
            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
    
    return result;
}

// Test cases
console.log("=== TEST CALCULATOR ===\n");

console.log("calculate(10, '+', 5):", calculate(10, "+", 5));              // → 15
console.log("calculate(20, '-', 8):", calculate(20, "-", 8));              // → 12
console.log("calculate(7, '*', 6):", calculate(7, "*", 6));                // → 42
console.log("calculate(100, '/', 4):", calculate(100, "/", 4));            // → 25
console.log("calculate(17, '%', 5):", calculate(17, "%", 5));              // → 2
console.log("calculate(2, '**', 10):", calculate(2, "**", 10));            // → 1024

console.log("\n=== TEST EDGE CASES ===\n");

console.log("calculate(10, '/', 0):", calculate(10, "/", 0));              // → "Lỗi: Không thể chia cho 0"
console.log("calculate(10, '^', 5):", calculate(10, "^", 5));              // → "Lỗi: Operator '^' không hợp lệ"
console.log("calculate('abc', '+', 5):", calculate("abc", "+", 5));        // → "Lỗi: Input không phải số"
console.log("calculate(null, '+', 5):", calculate(null, "+", 5));          // → "Lỗi: Input không phải số"

console.log("\n=== TEST âm số ===\n");

console.log("calculate(-10, '+', 5):", calculate(-10, "+", 5));            // → -5
console.log("calculate(-8, '*', -3):", calculate(-8, "*", -3));            // → 24

console.log("\n=== TEST số thập phân ===\n");

console.log("calculate(10.5, '+', 2.5):", calculate(10.5, "+", 2.5));      // → 13
console.log("calculate(7.5, '/', 2.5):", calculate(7.5, "/", 2.5));        // → 3
