// Bài B4 - FizzBuzz nâng cao

console.log("=== VERSION 1: CLASSIC FIZZBUZZ ===\n");

function classicFizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        let output = '';
        
        if (i % 3 === 0) {
            output += 'Fizz';
        }
        if (i % 5 === 0) {
            output += 'Buzz';
        }
        
        console.log(output || i);
    }
}

// Test classic
classicFizzBuzz(30);

console.log("\n=== VERSION 2: CUSTOM FIZZBUZZ ===\n");

function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = '';
        
        // Check từng rule trong danh sách
        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            if (i % rule.divisor === 0) {
                output += rule.word;
            }
        }
        
        // In kết quả
        console.log(output || i);
    }
}

// Test 1: Classic FizzBuzz dùng custom function
console.log("Test 1 - Classic FizzBuzz (dùng custom function):");
customFizzBuzz(15, [
    { divisor: 3, word: 'Fizz' },
    { divisor: 5, word: 'Buzz' }
]);

console.log("\n---\n");

// Test 2: Thêm Jazz (chia hết 7)
console.log("Test 2 - FizzBuzzJazz (chia hết 3, 5, 7):");
customFizzBuzz(35, [
    { divisor: 3, word: 'Fizz' },
    { divisor: 5, word: 'Buzz' },
    { divisor: 7, word: 'Jazz' }
]);

console.log("\n---\n");

// Test 3: Custom rules khác
console.log("Test 3 - Custom rules (chia hết 2, 3, 5):");
customFizzBuzz(30, [
    { divisor: 2, word: 'Even' },
    { divisor: 3, word: 'Three' },
    { divisor: 5, word: 'Five' }
]);

console.log("\n=== PHÂN TÍCH KẾT QUẢ ===\n");

console.log("Ý tưởng của custom function:");
console.log("1. Loop từ 1 đến n");
console.log("2. Với mỗi số, loop qua tất cả rules");
console.log("3. Nếu số chia hết cho divisor, thêm word vào output");
console.log("4. Nếu output trống (không chia hết cho gì), in số gốc");
console.log("5. Ngược lại, in output string được tạo");

console.log("\nLợi ích:");
console.log("- Linh hoạt: có thể thêm/bớt rules dễ dàng");
console.log("- Tái sử dụng: cùng hàm cho nhiều quy tắc khác nhau");
console.log("- Dễ bảo trì: logic tập trung ở một chỗ");

// Bonus: Tạo biến thể khác
console.log("\n=== BONUS: TÌMKIẾM CÁC SỐ SPECIAL ===\n");

function specialNumbers(n, rules) {
    const results = [];
    
    for (let i = 1; i <= n; i++) {
        let output = '';
        let ruleCount = 0;
        
        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            if (i % rule.divisor === 0) {
                output += rule.word;
                ruleCount++;
            }
        }
        
        // Nếu match nhiều hơn 1 rule (special)
        if (ruleCount > 1) {
            results.push(i + ' = ' + output);
        }
    }
    
    return results;
}

console.log("Số chia hết cho cả 3, 5, 7 trong 100:");
const specials = specialNumbers(100, [
    { divisor: 3, word: 'Fizz' },
    { divisor: 5, word: 'Buzz' },
    { divisor: 7, word: 'Jazz' }
]);

for (let i = 0; i < specials.length; i++) {
    console.log(specials[i]);
}
