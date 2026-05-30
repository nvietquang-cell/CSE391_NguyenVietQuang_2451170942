// Bài B3 - Higher-Order Functions Challenge

console.log("=== HIGHER-ORDER FUNCTIONS ===\n");

// ========== 1. PIPE - Nối chuỗi functions ==========

console.log("--- 1. PIPE Function ---\n");

function pipe(...fns) {
    return (x) => fns.reduce((result, fn) => fn(result), x);
}

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);

console.log("pipe(x => x * 2, x => x + 10, x => x.toString(), x => 'Kết quả: ' + x)(5)");
console.log("  Kết quả:", process(5));
console.log("  Kỳ vọng: Kết quả: 20\n");

// Ví dụ khác
const formatNumber = pipe(
    x => x * 100,
    x => Math.round(x),
    x => x / 100,
    x => x.toFixed(2),
    x => "Số: " + x
);

console.log("Ví dụ khác: pipe(x => x*100, ..., x => x.toFixed(2), ...)(3.14159)");
console.log("  Kết quả:", formatNumber(3.14159));
console.log();

// ========== 2. MEMOIZE - Cache kết quả ==========

console.log("--- 2. MEMOIZE Function ---\n");

function memoize(fn) {
    const cache = {};
    
    return (arg) => {
        // Tạo key từ argument
        const key = JSON.stringify(arg);
        
        // Nếu đã có trong cache, trả về ngay
        if (key in cache) {
            console.log("  (từ cache)");
            return cache[key];
        }
        
        // Nếu không có, tính toán và lưu cache
        const result = fn(arg);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("  Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("expensiveCalc(1000000) lần 1:");
console.log("  Kết quả:", expensiveCalc(1000000));

console.log("\nexpensiveCalc(1000000) lần 2 (cache):");
console.log("  Kết quả:", expensiveCalc(1000000));

console.log("\nexpensiveCalc(100) (tính mới):");
console.log("  Kết quả:", expensiveCalc(100));
console.log();

// ========== 3. DEBOUNCE - Chờ user ngừng gõ mới thực hiện ==========

console.log("--- 3. DEBOUNCE Function ---\n");

function debounce(fn, delay) {
    let timeoutId = null;
    
    return (...args) => {
        // Nếu đã có timeout chưa thực hiện, cancel nó
        clearTimeout(timeoutId);
        
        // Set timeout mới
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log(`  Searching: "${query}"`);
}, 500);

console.log("Gọi search 5 lần trong 600ms (chỉ lần cuối mới thực hiện):");
search("j");
search("ja");
search("jav");
search("java");
search("javascript");

setTimeout(() => {
    console.log("\nSau 700ms, lần cuối thực hiện:");
    console.log("  (kết quả sẽ hiện ở trên)");
    
    console.log("\n--- Ví dụ khác: Debounce resize event ---\n");
    
    const handleResize = debounce(() => {
        console.log("  Window resized!");
    }, 300);
    
    // Simulate resize
    console.log("Resize 1:");
    handleResize();
    
    console.log("Resize 2 (50ms sau):");
    setTimeout(() => handleResize(), 50);
    
    console.log("Resize 3 (100ms sau):");
    setTimeout(() => handleResize(), 100);
    
    setTimeout(() => {
        console.log("\nSau 350ms, chỉ lần cuối thực hiện:");
        console.log("  (sẽ hiện 'Window resized!')");
    }, 350);
}, 700);

// ========== 4. RETRY - Thử lại nếu lỗi ==========

console.log("\n--- 4. RETRY Function ---\n");

// Async retry function
async function retry(fn, maxAttempts = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            console.log(`  Attempt ${attempt}/${maxAttempts}`);
            const result = await fn();
            console.log(`  ✅ Success!`);
            return result;
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
            
            if (attempt === maxAttempts) {
                console.log(`  Failed after ${maxAttempts} attempts`);
                throw error;
            }
            
            console.log(`  Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Test retry
console.log("Test retry dengan simulated error:\n");

let attemptCount = 0;

const unreliableFunction = async () => {
    attemptCount++;
    if (attemptCount < 3) {
        throw new Error("Network error");
    }
    return "Success!";
};

retry(unreliableFunction, 3, 500)
    .then(result => {
        console.log(`  Final result: ${result}\n`);
    })
    .catch(error => {
        console.log(`  All retries failed: ${error.message}\n`);
    })
    .then(() => {
        console.log("=== HIGHER-ORDER FUNCTIONS DEMO COMPLETE ===");
    });

// ========== Thêm: COMPOSE - Nối chuỗi functions (ngược chiều pipe) ==========

console.log("\n--- BONUS: COMPOSE Function ---\n");

function compose(...fns) {
    return (x) => fns.reduceRight((result, fn) => fn(result), x);
}

// Compose là ngược chiều pipe
const add5 = x => x + 5;
const multiply2 = x => x * 2;
const square = x => x * x;

const composeTest = compose(square, multiply2, add5);

console.log("compose(square, multiply2, add5)(3)");
console.log("  = square(multiply2(add5(3)))");
console.log("  = square(multiply2(8))");
console.log("  = square(16)");
console.log("  = 256");
console.log("  Kết quả thực tế:", composeTest(3));
console.log();

// ========== Thêm: CURRY - Chuyển function với nhiều params thành function nested ==========

console.log("--- BONUS: CURRY Function ---\n");

function curry(fn) {
    const arity = fn.length; // Số parameters
    
    return function curried(...args) {
        if (args.length >= arity) {
            return fn(...args);
        }
        
        return (...nextArgs) => curried(...args, ...nextArgs);
    };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log("curry(add)(1)(2)(3)");
console.log("  Kết quả:", curriedAdd(1)(2)(3));

console.log("\ncurry(add)(1, 2)(3)");
console.log("  Kết quả:", curriedAdd(1, 2)(3));

console.log("\ncurry(add)(1, 2, 3)");
console.log("  Kết quả:", curriedAdd(1, 2, 3));
console.log();

// ========== Thêm: PARTIAL - Bind một số arguments ==========

console.log("--- BONUS: PARTIAL Function ---\n");

function partial(fn, ...boundArgs) {
    return (...args) => fn(...boundArgs, ...args);
}

const multiply = (a, b) => a * b;
const double = partial(multiply, 2);

console.log("partial(multiply, 2)(5)");
console.log("  Kết quả:", double(5));

console.log("\npartial(multiply, 2)(10)");
console.log("  Kết quả:", double(10));
console.log();

// ========== ADVANCED: Combine PIPE + CURRY ==========

console.log("--- ADVANCED: Pipe + Curry ---\n");

const divide = curry((a, b) => a / b);
const subtract = curry((a, b) => a - b);
const multiply2_curry = curry((a, b) => a * b);

const mathPipeline = pipe(
    divide(100),           // 100 / x
    multiply2_curry(2),    // result * 2
    subtract(10)           // result - 10
);

console.log("pipe(divide(100), multiply(2), subtract(10))(5)");
console.log("  = ((100 / 5) * 2) - 10");
console.log("  = (20 * 2) - 10");
console.log("  = 40 - 10");
console.log("  = 30");
console.log("  Kết quả thực tế:", mathPipeline(5));
