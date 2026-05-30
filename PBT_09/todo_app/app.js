// TODO APP - DOM MANIPULATION & EVENTS

// DOM Elements
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const filterButtons = document.querySelectorAll(".filter-btn");
const itemsLeftSpan = document.querySelector("#itemsLeft");
const clearCompletedBtn = document.querySelector("#clearCompleted");
const emptyState = document.querySelector("#emptyState");

// State
let todos = [];
let currentFilter = "all";

// ============================================
// INITIALIZE
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    renderTodos();
    setupEventListeners();
});

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupEventListeners() {
    // Form submit - ADD TODO
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        
        if (!text) {
            alert("Vui lòng nhập công việc!");
            return;
        }

        addTodo(text);
        todoInput.value = "";
        todoInput.focus();
    });

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            currentFilter = e.target.dataset.filter;
            renderTodos();
        });
    });

    // Clear completed button
    clearCompletedBtn.addEventListener("click", () => {
        todos = todos.filter(todo => !todo.completed);
        saveToLocalStorage();
        renderTodos();
    });

    // Event Delegation - Listen on todoList parent for child events
    todoList.addEventListener("click", handleTodoListClick);
    todoList.addEventListener("dblclick", handleTodoListDblClick);
    todoList.addEventListener("change", handleCheckboxChange);
}

// ============================================
// EVENT DELEGATION HANDLERS
// ============================================

function handleTodoListClick(e) {
    const deleteBtn = e.target.closest(".btn-delete");
    const editBtn = e.target.closest(".btn-edit");
    const saveBtn = e.target.closest(".btn-save");
    const cancelBtn = e.target.closest(".btn-cancel");

    if (deleteBtn) {
        const li = deleteBtn.closest(".todo-item");
        const id = parseInt(li.dataset.id);
        deleteTodo(id);
    }

    if (editBtn) {
        const li = editBtn.closest(".todo-item");
        const id = parseInt(li.dataset.id);
        startEdit(id);
    }

    if (saveBtn) {
        const li = saveBtn.closest(".todo-item");
        const id = parseInt(li.dataset.id);
        const input = li.querySelector(".todo-input-edit");
        const newText = input.value.trim();

        if (!newText) {
            alert("Công việc không được để trống!");
            return;
        }

        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.text = newText;
            saveToLocalStorage();
            renderTodos();
        }
    }

    if (cancelBtn) {
        renderTodos();
    }
}

function handleTodoListDblClick(e) {
    const todoText = e.target.closest(".todo-text");
    if (todoText) {
        const li = todoText.closest(".todo-item");
        const id = parseInt(li.dataset.id);
        startEdit(id);
    }
}

function handleCheckboxChange(e) {
    const checkbox = e.target.closest(".todo-checkbox");
    if (checkbox) {
        const li = checkbox.closest(".todo-item");
        const id = parseInt(li.dataset.id);
        toggleTodo(id);
    }
}

// ============================================
// CRUD OPERATIONS
// ============================================

function addTodo(text) {
    const id = Date.now();
    todos.push({
        id,
        text,
        completed: false
    });
    saveToLocalStorage();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage();
        renderTodos();
    }
}

function updateTodo(id, newText) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.text = newText;
        saveToLocalStorage();
        renderTodos();
    }
}

// ============================================
// EDIT MODE
// ============================================

function startEdit(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const li = document.querySelector(`[data-id="${id}"]`);
    const textSpan = li.querySelector(".todo-text");
    const buttonsContainer = li.querySelector(".btn-group");

    // Replace text with input
    const input = document.createElement("input");
    input.type = "text";
    input.className = "todo-input-edit";
    input.value = todo.text;

    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "btn-save";
    saveBtn.textContent = "💾 Lưu";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.className = "btn-cancel";
    cancelBtn.textContent = "❌ Hủy";

    textSpan.replaceWith(input);
    buttonsContainer.innerHTML = "";
    buttonsContainer.appendChild(saveBtn);
    buttonsContainer.appendChild(cancelBtn);

    input.focus();
    input.select();

    // Save on Enter key
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            saveBtn.click();
        }
    });

    // Cancel on Escape key
    input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            cancelBtn.click();
        }
    });
}

// ============================================
// RENDER
// ============================================

function renderTodos() {
    // Filter todos based on current filter
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "completed") return todo.completed;
        if (currentFilter === "active") return !todo.completed;
        return true;
    });

    // Clear list
    todoList.innerHTML = "";

    // Render each todo using createElement (NOT innerHTML)
    filteredTodos.forEach(todo => {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
    });

    // Update stats
    updateStats();

    // Show/hide empty state
    emptyState.style.display = todos.length === 0 ? "block" : "none";
}

function createTodoElement(todo) {
    // Create list item
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;
    if (todo.completed) {
        li.classList.add("completed");
    }

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.completed;
    li.appendChild(checkbox);

    // Create text span
    const textSpan = document.createElement("span");
    textSpan.className = "todo-text";
    textSpan.textContent = todo.text;
    if (todo.completed) {
        textSpan.classList.add("completed");
    }
    li.appendChild(textSpan);

    // Create button group container
    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    // Create edit button
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn-edit";
    editBtn.textContent = "✏️ Sửa";
    btnGroup.appendChild(editBtn);

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "❌ Xóa";
    btnGroup.appendChild(deleteBtn);

    li.appendChild(btnGroup);

    return li;
}

// ============================================
// UTILITIES
// ============================================

function updateStats() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    itemsLeftSpan.textContent = `${activeCount} công việc còn lại`;

    // Disable clear button if no completed items
    const hasCompleted = todos.some(todo => todo.completed);
    clearCompletedBtn.disabled = !hasCompleted;
}

function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem("todos");
    if (stored) {
        try {
            todos = JSON.parse(stored);
        } catch (e) {
            console.error("Error loading todos:", e);
            todos = [];
        }
    }
}

// ============================================
// KEYBOARD SHORTCUTS (Bonus)
// ============================================

document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        todoInput.focus();
    }

    // Delete key to clear completed (when on clear button)
    if (e.key === "Delete" && document.activeElement === clearCompletedBtn) {
        clearCompletedBtn.click();
    }
});
