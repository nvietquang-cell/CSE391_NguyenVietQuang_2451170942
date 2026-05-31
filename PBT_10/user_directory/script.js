const api = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  async getUsers() {
    const r = await fetch(this.baseURL + '/users');
    if (!r.ok) throw new Error(r.status);
    return r.json();
  },
  async getUser(id) {
    const r = await fetch(this.baseURL + '/users/' + id);
    if (!r.ok) throw new Error(r.status);
    return r.json();
  },
  async createUser(data) {
    const r = await fetch(this.baseURL + '/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!r.ok) throw new Error(r.status);
    return r.json();
  },
  async updateUser(id, data) {
    const r = await fetch(this.baseURL + '/users/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!r.ok) throw new Error(r.status);
    return r.json();
  },
  async deleteUser(id) {
    const r = await fetch(this.baseURL + '/users/' + id, { method: 'DELETE' });
    if (!r.ok) throw new Error(r.status);
    return r;
  }
};

const el = {
  users: document.getElementById('users'),
  loading: document.getElementById('loading'),
  search: document.getElementById('search'),
  create: document.getElementById('create'),
  modal: document.getElementById('modal'),
  form: document.getElementById('user-form'),
  modalTitle: document.getElementById('modal-title'),
  formName: document.getElementById('form-name'),
  formEmail: document.getElementById('form-email'),
  formPhone: document.getElementById('form-phone'),
  formCompany: document.getElementById('form-company'),
  errorMessage: document.getElementById('error-message')
};

let usersCache = [];
let currentEditingUserId = null;

function renderUsers(list) {
  el.users.innerHTML = '';
  if (list.length === 0) {
    el.users.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px;">No users found</p>';
    return;
  }
  
  list.forEach(u => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <strong>${u.name}</strong>
      <div>✉️ ${u.email}</div>
      ${u.phone ? `<div>📞 ${u.phone}</div>` : ''}
      ${u.company?.name ? `<div>🏢 ${u.company.name}</div>` : ''}
      <div class="actions">
        <button class="edit" data-id="${u.id}">✏️ Edit</button>
        <button class="del" data-id="${u.id}">🗑️ Delete</button>
      </div>
    `;
    el.users.appendChild(card);
  });
}

function showLoading(v = true) {
  el.loading.classList.toggle('hidden', !v);
}

function showError(message) {
  el.errorMessage.textContent = message;
  el.errorMessage.classList.remove('hidden');
  setTimeout(() => {
    el.errorMessage.classList.add('hidden');
  }, 5000);
}

function openModal(title, user = null) {
  el.modalTitle.textContent = title;
  
  if (user) {
    currentEditingUserId = user.id;
    el.formName.value = user.name || '';
    el.formEmail.value = user.email || '';
    el.formPhone.value = user.phone || '';
    el.formCompany.value = user.company?.name || '';
  } else {
    currentEditingUserId = null;
    el.form.reset();
  }
  
  el.modal.classList.remove('hidden');
  el.formName.focus();
}

function closeModal() {
  el.modal.classList.add('hidden');
  el.form.reset();
  currentEditingUserId = null;
}

async function load() {
  try {
    showLoading(true);
    usersCache = await api.getUsers();
    renderUsers(usersCache);
  } catch (err) {
    showError('Error loading users: ' + err.message);
  } finally {
    showLoading(false);
  }
}

// Search
el.search.addEventListener('input', () => {
  const q = el.search.value.toLowerCase().trim();
  const filtered = usersCache.filter(u =>
    u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
  renderUsers(filtered);
});

// Create button
el.create.addEventListener('click', () => {
  openModal('➕ New User');
});

// Form submit
el.form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = el.formName.value.trim();
  const email = el.formEmail.value.trim();
  const phone = el.formPhone.value.trim();
  const company = el.formCompany.value.trim();
  
  if (!name || !email) {
    showError('Name and Email are required');
    return;
  }
  
  try {
    const userData = { name, email, phone, company: { name: company } };
    let result;
    
    if (currentEditingUserId) {
      // Update
      result = await api.updateUser(currentEditingUserId, userData);
      usersCache = usersCache.map(x => x.id == currentEditingUserId ? result : x);
      showError('✓ User updated successfully');
    } else {
      // Create
      result = await api.createUser(userData);
      usersCache.unshift(result);
      showError('✓ User created successfully');
    }
    
    renderUsers(usersCache);
    closeModal();
  } catch (err) {
    showError('Error saving user: ' + err.message);
  }
});

// Close modal
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.querySelector('.btn-cancel').addEventListener('click', closeModal);
el.modal.addEventListener('click', (e) => {
  if (e.target === el.modal || e.target.classList.contains('modal-overlay')) {
    closeModal();
  }
});

// Edit and Delete actions
el.users.addEventListener('click', async (e) => {
  const userId = e.target.dataset.id;
  
  if (e.target.classList.contains('edit')) {
    const u = usersCache.find(x => x.id == userId);
    openModal('✏️ Edit User', u);
  }
  
  if (e.target.classList.contains('del')) {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await api.deleteUser(userId);
        usersCache = usersCache.filter(x => x.id != userId);
        renderUsers(usersCache);
        showError('✓ User deleted successfully');
      } catch (err) {
        showError('Error deleting user: ' + err.message);
      }
    }
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !el.modal.classList.contains('hidden')) {
    closeModal();
  }
});

load();
