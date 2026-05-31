const api = {
  baseURL: 'https://jsonplaceholder.typicode.com',

  async getUsers() {
    const response = await fetch(this.baseURL + '/users');
    if (!response.ok) throw new Error(response.status);
    return response.json();
  },

  async getUser(id) {
    const response = await fetch(this.baseURL + '/users/' + id);
    if (!response.ok) throw new Error(response.status);
    return response.json();
  },

  async createUser(data) {
    const response = await fetch(this.baseURL + '/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(response.status);
    return response.json();
  },

  async updateUser(id, data) {
    const response = await fetch(this.baseURL + '/users/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(response.status);
    return response.json();
  },

  async deleteUser(id) {
    const response = await fetch(this.baseURL + '/users/' + id, { method: 'DELETE' });
    if (!response.ok) throw new Error(response.status);
    return response;
  }
};

const ui = {
  elements: {
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
  },

  state: {
    users: [],
    query: '',
    editingUserId: null
  },

  renderUsers(list) {
    this.elements.users.innerHTML = '';

    if (list.length === 0) {
      this.elements.users.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px;">No users found</p>';
      return;
    }

    list.forEach((user) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <strong>${user.name}</strong>
        <div>✉️ ${user.email}</div>
        ${user.phone ? `<div>📞 ${user.phone}</div>` : ''}
        ${user.company?.name ? `<div>🏢 ${user.company.name}</div>` : ''}
        <div class="actions">
          <button class="edit" data-id="${user.id}">✏️ Edit</button>
          <button class="del" data-id="${user.id}">🗑️ Delete</button>
        </div>
      `;
      this.elements.users.appendChild(card);
    });
  },

  renderSkeleton(count = 6) {
    this.elements.users.innerHTML = Array.from({ length: count }, () => {
      return `
        <div class="card skeleton">
          <div></div>
          <div></div>
          <div></div>
          <div style="width: 70%;"></div>
        </div>
      `;
    }).join('');
  },

  getFilteredUsers() {
    const query = this.state.query.trim().toLowerCase();
    if (!query) return this.state.users;
    return this.state.users.filter((user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  },

  renderFilteredUsers() {
    this.renderUsers(this.getFilteredUsers());
  },

  showLoading(show = true) {
    this.elements.loading.classList.toggle('hidden', !show);
    if (show) {
      this.renderSkeleton();
    }
  },

  showMessage(message, type = 'error') {
    const messageEl = this.elements.errorMessage;
    messageEl.textContent = message;
    messageEl.className = 'error-message';
    if (type === 'success') {
      messageEl.classList.add('success');
    }
    messageEl.classList.remove('hidden');
    setTimeout(() => {
      messageEl.classList.add('hidden');
    }, 5000);
  },

  openModal(title, user = null) {
    this.elements.modalTitle.textContent = title;

    if (user) {
      this.state.editingUserId = user.id;
      this.elements.formName.value = user.name || '';
      this.elements.formEmail.value = user.email || '';
      this.elements.formPhone.value = user.phone || '';
      this.elements.formCompany.value = user.company?.name || '';
    } else {
      this.state.editingUserId = null;
      this.elements.form.reset();
    }

    this.elements.modal.classList.remove('hidden');
    this.elements.formName.focus();
  },

  closeModal() {
    this.elements.modal.classList.add('hidden');
    this.elements.form.reset();
    this.state.editingUserId = null;
  }
};

async function loadUsers() {
  try {
    ui.showLoading(true);
    ui.state.users = await api.getUsers();
    ui.renderFilteredUsers();
  } catch (error) {
    ui.showMessage('Error loading users: ' + error.message);
    ui.renderUsers([]);
  } finally {
    ui.showLoading(false);
  }
}

ui.elements.search.addEventListener('input', () => {
  ui.state.query = ui.elements.search.value;
  ui.renderFilteredUsers();
});

ui.elements.create.addEventListener('click', () => {
  ui.openModal('➕ New User');
});

ui.elements.form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = ui.elements.formName.value.trim();
  const email = ui.elements.formEmail.value.trim();
  const phone = ui.elements.formPhone.value.trim();
  const company = ui.elements.formCompany.value.trim();

  if (!name || !email) {
    ui.showMessage('Name and Email are required');
    return;
  }

  try {
      const userData = { name, email, phone };
      if (company) {
        userData.company = { name: company };
      }
    let result;

    if (ui.state.editingUserId) {
      result = await api.updateUser(ui.state.editingUserId, userData);
      ui.state.users = ui.state.users.map((user) =>
        user.id == ui.state.editingUserId ? result : user
      );
      ui.closeModal();
      ui.renderFilteredUsers();
      ui.showMessage('✓ User updated successfully', 'success');
    } else {
      result = await api.createUser(userData);
      ui.state.users.unshift(result);
      ui.closeModal();
      ui.renderFilteredUsers();
      ui.showMessage('✓ User created successfully', 'success');
    }
  } catch (error) {
    ui.showMessage('Error saving user: ' + error.message);
  }
});

document.querySelector('.close-modal').addEventListener('click', () => ui.closeModal());
document.querySelector('.btn-cancel').addEventListener('click', () => ui.closeModal());

ui.elements.modal.addEventListener('click', (event) => {
  if (event.target === ui.elements.modal || event.target.classList.contains('modal-overlay')) {
    ui.closeModal();
  }
});

ui.elements.users.addEventListener('click', async (event) => {
  const button = event.target.closest('button');
  if (!button || !ui.elements.users.contains(button)) return;

  const userId = button.dataset.id;
  if (!userId) return;

  if (button.classList.contains('edit')) {
    const user = ui.state.users.find((item) => item.id == userId);
    if (user) ui.openModal('✏️ Edit User', user);
  }

  if (button.classList.contains('del')) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.deleteUser(userId);
      ui.state.users = ui.state.users.filter((item) => item.id != userId);
      ui.renderFilteredUsers();
      ui.showMessage('✓ User deleted successfully', 'success');
    } catch (error) {
      ui.showMessage('Error deleting user: ' + error.message);
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !ui.elements.modal.classList.contains('hidden')) {
    ui.closeModal();
  }
});

loadUsers();
