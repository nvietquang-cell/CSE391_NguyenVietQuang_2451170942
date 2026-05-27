// Bài B3 - Game Đoán Số

let secretNumber;
let attempts = 0;
const maxAttempts = 7;
let guessedNumbers = [];
let gameOver = false;

function startGame() {
    // Reset game state
    secretNumber = Math.floor(Math.random() * 100) + 1;  // 1-100
    attempts = 0;
    guessedNumbers = [];
    gameOver = false;
    
    console.log("🎮 Game bắt đầu! Số bí mật là:", secretNumber);  // Chỉ debug
    
    // Ẩn section start, hiển thị section playing
    document.getElementById('startSection').classList.remove('active');
    document.getElementById('playingSection').classList.add('active');
    document.getElementById('gameOverSection').classList.remove('active');
    
    // Focus input
    document.getElementById('guessInput').focus();
    updateStats();
}

function submitGuess() {
    if (gameOver) return;
    
    const input = document.getElementById('guessInput');
    const guess = parseInt(input.value);
    const hintElement = document.getElementById('hint');
    
    // Validate input
    if (isNaN(guess)) {
        showHint("❌ Vui lòng nhập một số!", 'error');
        return;
    }
    
    if (guess < 1 || guess > 100) {
        showHint("❌ Số phải từ 1 đến 100!", 'error');
        return;
    }
    
    // Check nếu đã đoán số này trước đó
    if (guessedNumbers.includes(guess)) {
        showHint(`⚠️ Bạn đã đoán ${guess} trước rồi!`, 'warning');
        return;
    }
    
    // Thêm vào danh sách đã đoán
    guessedNumbers.push(guess);
    attempts++;
    
    // Cập nhật lịch sử
    addAttemptToList(guess);
    
    // Kiểm tra
    if (guess === secretNumber) {
        winGame();
    } else if (attempts >= maxAttempts) {
        loseGame();
    } else {
        // Gợi ý
        if (guess < secretNumber) {
            showHint(`⬆️ Số bí mật CAO HƠN ${guess}`, 'hint');
        } else {
            showHint(`⬇️ Số bí mật THẤP HƠN ${guess}`, 'hint');
        }
        updateStats();
    }
    
    // Clear input
    input.value = '';
    input.focus();
}

function showHint(message, type) {
    const hintElement = document.getElementById('hint');
    hintElement.textContent = message;
    hintElement.className = 'message ' + type;
    hintElement.style.display = 'block';
}

function updateStats() {
    document.getElementById('attemptsLeft').textContent = maxAttempts - attempts;
    document.getElementById('guessedCount').textContent = attempts;
}

function addAttemptToList(guess) {
    const attemptList = document.getElementById('attemptList');
    const attemptItem = document.createElement('div');
    attemptItem.className = 'attempt-item';
    
    let hint = '';
    if (guess < secretNumber) {
        hint = ' ⬆️ Cao hơn';
    } else if (guess > secretNumber) {
        hint = ' ⬇️ Thấp hơn';
    } else {
        hint = ' ✅ ĐÚNG!';
    }
    
    attemptItem.textContent = `${attempts}. Số ${guess}${hint}`;
    attemptList.appendChild(attemptItem);
}

function winGame() {
    gameOver = true;
    
    // Ẩn playing, hiển thị game over
    document.getElementById('playingSection').classList.remove('active');
    document.getElementById('gameOverSection').classList.add('active');
    
    const message = document.getElementById('gameOverMessage');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message success';
    
    let text = `🎉 CHÚC MỪNG! Bạn đoán đúng sau ${attempts} lần!`;
    if (attempts === 1) {
        text += "\n👑 Thực sự quá tuyệt vời!";
    } else if (attempts <= 3) {
        text += "\n⭐ Rất tốt!";
    } else if (attempts <= 5) {
        text += "\n👍 Không tệ!";
    }
    
    messageDiv.textContent = text;
    message.innerHTML = '';
    message.appendChild(messageDiv);
    
    document.getElementById('revealNumber').textContent = secretNumber;
    document.getElementById('finalAttempts').textContent = attempts;
}

function loseGame() {
    gameOver = true;
    
    // Ẩn playing, hiển thị game over
    document.getElementById('playingSection').classList.remove('active');
    document.getElementById('gameOverSection').classList.add('active');
    
    const message = document.getElementById('gameOverMessage');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message error';
    messageDiv.textContent = `😢 GAME OVER! Bạn đã hết ${maxAttempts} lần đoán.`;
    message.innerHTML = '';
    message.appendChild(messageDiv);
    
    document.getElementById('revealNumber').textContent = secretNumber;
    document.getElementById('finalAttempts').textContent = attempts;
}

// Cho phép nhấn Enter để submit
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('guessInput');
    if (input) {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                submitGuess();
            }
        });
    }
});
