// FORM VALIDATOR - REAL-TIME VALIDATION

// ============================================
// DOM ELEMENTS
// ============================================

const form = document.querySelector("#registrationForm");
const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");
const termsCheckbox = document.querySelector("#terms");
const submitBtn = document.querySelector("#submitBtn");
const togglePasswordBtn = document.querySelector("#togglePassword");

const successModal = document.querySelector("#successModal");
const closeSuccessBtn = document.querySelector("#closeSuccessModal");
const successDetails = document.querySelector("#successDetails");
const modalOverlay = document.querySelector("#modalOverlay");

// ============================================
// STATE
// ============================================

const formState = {
    fullName: { valid: false, touched: false },
    email: { valid: false, touched: false },
    phone: { valid: false, touched: false },
    password: { valid: false, touched: false },
    confirmPassword: { valid: false, touched: false },
    terms: { valid: false }
};

// ============================================
// INITIALIZE
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
});

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Real-time validation on input
    fullNameInput.addEventListener("input", handleFullNameChange);
    fullNameInput.addEventListener("blur", () => {
        formState.fullName.touched = true;
        validateFullName();
    });

    emailInput.addEventListener("input", handleEmailChange);
    emailInput.addEventListener("blur", () => {
        formState.email.touched = true;
        validateEmail();
    });

    phoneInput.addEventListener("input", handlePhoneChange);
    phoneInput.addEventListener("blur", () => {
        formState.phone.touched = true;
        validatePhone();
    });

    passwordInput.addEventListener("input", handlePasswordChange);
    passwordInput.addEventListener("blur", () => {
        formState.password.touched = true;
        validatePassword();
    });

    confirmPasswordInput.addEventListener("input", handleConfirmPasswordChange);
    confirmPasswordInput.addEventListener("blur", () => {
        formState.confirmPassword.touched = true;
        validateConfirmPassword();
    });

    termsCheckbox.addEventListener("change", handleTermsChange);

    // Toggle password visibility
    togglePasswordBtn.addEventListener("click", togglePasswordVisibility);

    // Form submit
    form.addEventListener("submit", handleFormSubmit);

    // Modal close
    closeSuccessBtn.addEventListener("click", closeSuccessModal);
    modalOverlay.addEventListener("click", closeSuccessModal);
}

// ============================================
// VALIDATION HANDLERS
// ============================================

function handleFullNameChange(e) {
    const value = e.target.value;
    validateFullName();
}

function validateFullName() {
    const value = fullNameInput.value.trim();
    const isValid = value.length >= 2 && value.length <= 50 && /^[a-zA-Zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ\s]+$/.test(value);
    
    formState.fullName.valid = isValid;
    updateFieldUI(fullNameInput, isValid, "Tên hợp lệ", "Tên phải từ 2-50 ký tự");
    checkFormValidity();
}

function handleEmailChange(e) {
    validateEmail();
}

function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);

    let message = "";
    if (value === "") {
        message = "Email không được để trống";
    } else if (!isValid) {
        message = "Email không hợp lệ";
    } else {
        message = "Email hợp lệ";
    }

    formState.email.valid = isValid;
    updateFieldUI(emailInput, isValid, message, message);
    checkFormValidity();
}

function handlePhoneChange(e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    
    // Auto-format phone: 0901234567 → 0901-234-567
    if (value.length > 0) {
        if (value.length <= 4) {
            value = value;
        } else if (value.length <= 7) {
            value = value.slice(0, 4) + "-" + value.slice(4);
        } else {
            value = value.slice(0, 4) + "-" + value.slice(4, 7) + "-" + value.slice(7, 10);
        }
    }

    phoneInput.value = value;
    validatePhone();
}

function validatePhone() {
    const value = phoneInput.value.replace(/\D/g, "");
    const isValid = value.length === 10 && /^0\d{9}$/.test(value);

    let message = "";
    if (value === "") {
        message = "Số điện thoại không được để trống";
    } else if (value.length !== 10) {
        message = `Cần đúng 10 chữ số (hiện có ${value.length})`;
    } else if (!isValid) {
        message = "Số điện thoại phải bắt đầu bằng 0";
    } else {
        message = "Số điện thoại hợp lệ";
    }

    formState.phone.valid = isValid;
    updateFieldUI(phoneInput, isValid, message, message);
    checkFormValidity();
}

function handlePasswordChange(e) {
    validatePassword();
    validateConfirmPassword(); // Re-validate confirm password
}

function validatePassword() {
    const value = passwordInput.value;
    
    // Check requirements
    const hasLength = value.length >= 8;
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    // Update requirement indicators
    updateRequirement("req-length", hasLength);
    updateRequirement("req-lowercase", hasLowercase);
    updateRequirement("req-uppercase", hasUppercase);
    updateRequirement("req-number", hasNumber);
    updateRequirement("req-special", hasSpecial);

    // Calculate strength
    let strength = 0;
    if (hasLength) strength++;
    if (hasLowercase) strength++;
    if (hasUppercase) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;

    // Update strength meter
    updatePasswordStrength(strength);

    // Valid if all requirements met
    const isValid = hasLength && hasLowercase && hasUppercase && hasNumber && hasSpecial;
    
    formState.password.valid = isValid;
    updateFieldUI(passwordInput, isValid, "Mật khẩu mạnh", "Mật khẩu yếu");
    checkFormValidity();
}

function handleConfirmPasswordChange(e) {
    validateConfirmPassword();
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const isValid = password !== "" && password === confirmPassword;

    let message = "";
    if (confirmPassword === "") {
        message = "Xác nhận mật khẩu không được để trống";
    } else if (password !== confirmPassword) {
        message = "Mật khẩu không khớp";
    } else {
        message = "Mật khẩu khớp";
    }

    formState.confirmPassword.valid = isValid;
    updateFieldUI(confirmPasswordInput, isValid, message, message);
    checkFormValidity();
}

function handleTermsChange(e) {
    formState.terms.valid = e.target.checked;
    checkFormValidity();
}

// ============================================
// UI HELPERS
// ============================================

function updateFieldUI(input, isValid, successMsg, errorMsg) {
    const group = input.closest(".form-group");
    const feedback = group.querySelector(".validation-feedback");
    const statusIcon = feedback.querySelector(".status-icon");
    const statusMessage = feedback.querySelector(".status-message");

    if (input.value === "") {
        input.classList.remove("valid", "invalid");
        statusIcon.className = "status-icon";
        statusMessage.textContent = "";
        statusMessage.className = "status-message";
    } else if (isValid) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        statusIcon.className = "status-icon valid";
        statusMessage.textContent = successMsg;
        statusMessage.className = "status-message valid";
    } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        statusIcon.className = "status-icon invalid";
        statusMessage.textContent = errorMsg;
        statusMessage.className = "status-message invalid";
    }
}

function updateRequirement(id, met) {
    const requirement = document.querySelector(`#${id}`);
    if (met) {
        requirement.classList.add("met");
    } else {
        requirement.classList.remove("met");
    }
}

function updatePasswordStrength(score) {
    const strengthBar = document.querySelector("#strengthBar");
    const strengthText = document.querySelector("#strengthText");

    strengthBar.className = "strength-bar";
    
    if (score <= 1) {
        strengthBar.classList.add("weak");
        strengthText.textContent = "Yếu";
        strengthText.className = "strength-text";
    } else if (score <= 3) {
        strengthBar.classList.add("medium");
        strengthText.textContent = "Trung bình";
        strengthText.className = "strength-text medium";
    } else {
        strengthBar.classList.add("strong");
        strengthText.textContent = "Mạnh";
        strengthText.className = "strength-text strong";
    }
}

function togglePasswordVisibility() {
    const type = passwordInput.getAttribute("type");
    if (type === "password") {
        passwordInput.setAttribute("type", "text");
        togglePasswordBtn.textContent = "🙈";
    } else {
        passwordInput.setAttribute("type", "password");
        togglePasswordBtn.textContent = "👁️";
    }
}

function checkFormValidity() {
    const isValid = 
        formState.fullName.valid &&
        formState.email.valid &&
        formState.phone.valid &&
        formState.password.valid &&
        formState.confirmPassword.valid &&
        formState.terms.valid;

    submitBtn.disabled = !isValid;
}

// ============================================
// FORM SUBMIT
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();

    // Validate all fields one more time
    formState.fullName.touched = true;
    formState.email.touched = true;
    formState.phone.touched = true;
    formState.password.touched = true;
    formState.confirmPassword.touched = true;

    validateFullName();
    validateEmail();
    validatePhone();
    validatePassword();
    validateConfirmPassword();

    // Check if all valid
    if (!checkFormValidity()) {
        return;
    }

    // Show success modal with submitted data
    showSuccessModal({
        fullName: fullNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value.replace(/\D/g, "")
    });
}

function showSuccessModal(data) {
    successDetails.innerHTML = `
        <p><strong>Họ tên:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Số điện thoại:</strong> ${data.phone.slice(0, 4)}-${data.phone.slice(4, 7)}-${data.phone.slice(7)}</p>
    `;

    successModal.classList.remove("hidden");

    // Reset form
    form.reset();
    formState.fullName = { valid: false, touched: false };
    formState.email = { valid: false, touched: false };
    formState.phone = { valid: false, touched: false };
    formState.password = { valid: false, touched: false };
    formState.confirmPassword = { valid: false, touched: false };
    formState.terms = { valid: false };

    // Reset UI
    document.querySelectorAll(".form-input").forEach(input => {
        input.classList.remove("valid", "invalid");
    });
    document.querySelectorAll(".validation-feedback").forEach(feedback => {
        feedback.querySelector(".status-icon").className = "status-icon";
        feedback.querySelector(".status-message").textContent = "";
    });
    document.querySelectorAll(".requirement").forEach(req => {
        req.classList.remove("met");
    });

    submitBtn.disabled = true;
}

function closeSuccessModal() {
    successModal.classList.add("hidden");
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener("keydown", (e) => {
    // Ctrl+Enter to submit form (if valid)
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        if (!submitBtn.disabled) {
            form.dispatchEvent(new Event("submit"));
        }
    }

    // Escape to close modal
    if (e.key === "Escape" && !successModal.classList.contains("hidden")) {
        closeSuccessModal();
    }
});
