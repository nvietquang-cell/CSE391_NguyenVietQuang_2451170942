// Câu A1 - var / let / const - Kiểm chứng

console.log("=== ĐOẠN 1: var hoisting ===");
console.log(x);  // undefined (hoisting - var được hoisting nhưng chưa gán)
var x = 5;
console.log("Sau khi gán:", x);  // 5

console.log("\n=== ĐOẠN 2: let Temporal Dead Zone ===");
try {
    console.log(y);  // ReferenceError - let có TDZ
} catch (e) {
    console.log("Lỗi:", e.message);
}
let y = 10;
console.log("Sau khi gán:", y);  // 10

console.log("\n=== ĐOẠN 3: const không thể gán lại ===");
const z = 15;
try {
    z = 20;  // TypeError
} catch (e) {
    console.log("Lỗi:", e.message);
}
console.log("z =", z);  // 15 (không thay đổi)

console.log("\n=== ĐOẠN 4: const cho mảng - có thể thay đổi nội dung ===");
const arr = [1, 2, 3];
arr.push(4);  // OK - thay đổi nội dung
console.log(arr);  // [1, 2, 3, 4]
try {
    arr = [5, 6];  // TypeError - không thể gán lại reference
} catch (e) {
    console.log("Lỗi khi gán lại arr:", e.message);
}

console.log("\n=== ĐOẠN 5: let có block scope ===");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);  // 2
}
console.log("Ngoài block:", a);  // 1

console.log("\n=== ĐOẠN BONUS: var trong vòng lặp ===");
console.log("\nVới var:");
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log("var i =", i);  // In 3, 3, 3
    }, 100);
}

console.log("\nVới let:");
for (let j = 0; j < 3; j++) {
    setTimeout(function() {
        console.log("let j =", j);  // In 0, 1, 2
    }, 100);
}

setTimeout(() => {
    console.log("\n=== KẾT LUẬN ===");
    console.log("1. var: function scope, hoisting, có thể gán lại");
    console.log("2. let: block scope, TDZ, có thể gán lại");
    console.log("3. const: block scope, TDZ, KHÔNG thể gán lại nhưng có thể thay đổi nội dung object/array");
}, 200);
