// Bài B2 - Xử lý dữ liệu sinh viên

const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// 1. Tính điểm trung bình và xếp loại cho mỗi sinh viên
function calculateAverage(student) {
    return (student.math * 0.4) + (student.physics * 0.3) + (student.cs * 0.3);
}

function getClassification(average) {
    if (average >= 8.0) {
        return "Giỏi";
    } else if (average >= 6.5) {
        return "Khá";
    } else if (average >= 5.0) {
        return "Trung bình";
    } else {
        return "Yếu";
    }
}

// Tính toán cho tất cả sinh viên
const results = [];
for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const average = calculateAverage(student);
    const classification = getClassification(average);
    
    results.push({
        index: i + 1,
        name: student.name,
        average: average.toFixed(1),
        classification: classification,
        gender: student.gender,
        math: student.math,
        physics: student.physics,
        cs: student.cs
    });
}

// 3. In bảng kết quả
console.log("=== BẢNG ĐIỂM CHI TIẾT ===\n");
console.log("+-----+--------+-------+----------+-------+---------+------+");
console.log("| STT | Tên    | TB    | Xếp loại| Toán  | Vật lý  | KTLT |");
console.log("+-----+--------+-------+----------+-------+---------+------+");

for (let i = 0; i < results.length; i++) {
    const r = results[i];
    console.log(
        `| ${String(r.index).padEnd(3)} | ` +
        `${r.name.padEnd(6)} | ` +
        `${String(r.average).padEnd(5)} | ` +
        `${r.classification.padEnd(8)} | ` +
        `${String(r.math).padEnd(5)} | ` +
        `${String(r.physics).padEnd(7)} | ` +
        `${String(r.cs).padEnd(4)} |`
    );
}
console.log("+-----+--------+-------+----------+-------+---------+------+\n");

// 4. Đếm số SV mỗi xếp loại
console.log("=== THỐNG KÊ XẾP LOẠI ===\n");
let excellent = 0, good = 0, average = 0, poor = 0;

for (let i = 0; i < results.length; i++) {
    const classification = results[i].classification;
    if (classification === "Giỏi") excellent++;
    else if (classification === "Khá") good++;
    else if (classification === "Trung bình") average++;
    else if (classification === "Yếu") poor++;
}

console.log(`Giỏi (≥8.0):        ${excellent} sinh viên`);
console.log(`Khá (6.5-7.9):      ${good} sinh viên`);
console.log(`Trung bình (5.0-6.4): ${average} sinh viên`);
console.log(`Yếu (<5.0):         ${poor} sinh viên`);
console.log(`Tổng cộng:          ${students.length} sinh viên\n`);

// 5. Tìm SV có điểm TB cao nhất và thấp nhất
console.log("=== EXTREMES ===\n");
let maxStudent = results[0];
let minStudent = results[0];

for (let i = 1; i < results.length; i++) {
    if (parseFloat(results[i].average) > parseFloat(maxStudent.average)) {
        maxStudent = results[i];
    }
    if (parseFloat(results[i].average) < parseFloat(minStudent.average)) {
        minStudent = results[i];
    }
}

console.log(`Điểm cao nhất: ${maxStudent.name} - ${maxStudent.average} (${maxStudent.classification})`);
console.log(`Điểm thấp nhất: ${minStudent.name} - ${minStudent.average} (${minStudent.classification})\n`);

// 6. Tính điểm TB toàn lớp cho từng môn
console.log("=== ĐIỂM TRUNG BÌNH TOÀN LỚP ===\n");
let totalMath = 0, totalPhysics = 0, totalCS = 0;

for (let i = 0; i < students.length; i++) {
    totalMath += students[i].math;
    totalPhysics += students[i].physics;
    totalCS += students[i].cs;
}

const avgMath = (totalMath / students.length).toFixed(2);
const avgPhysics = (totalPhysics / students.length).toFixed(2);
const avgCS = (totalCS / students.length).toFixed(2);

console.log(`Toán học:     ${avgMath}`);
console.log(`Vật lý:       ${avgPhysics}`);
console.log(`Khoa học máy tính: ${avgCS}\n`);

// BONUS: Tính điểm TB theo giới tính
console.log("=== ĐIỂM TRUNG BÌNH THEO GIỚI TÍNH ===\n");
let maleCount = 0, femaleCount = 0;
let maleSum = 0, femaleSum = 0;

for (let i = 0; i < results.length; i++) {
    const avg = parseFloat(results[i].average);
    if (results[i].gender === "M") {
        maleCount++;
        maleSum += avg;
    } else {
        femaleCount++;
        femaleSum += avg;
    }
}

const maleAverage = (maleSum / maleCount).toFixed(2);
const femaleAverage = (femaleSum / femaleCount).toFixed(2);

console.log(`Nam:   ${maleAverage} (${maleCount} sinh viên)`);
console.log(`Nữ:    ${femaleAverage} (${femaleCount} sinh viên)`);
console.log(`Chênh lệch: ${Math.abs(maleAverage - femaleAverage).toFixed(2)}`);
