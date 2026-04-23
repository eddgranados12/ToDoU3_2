// components/theme-manager.js
export default class ThemeManager {
  constructor() {
    this.themeToggle = null;
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.createThemeToggle();
    this.loadTheme();
    this.setupEventListeners();
  }

  createThemeToggle() {
    const navbar = document.querySelector('.navbar-collapse');
    if (!navbar) return;

    const themeContainer = document.createElement('div');
    themeContainer.className = 'form-inline ml-3';
    
    themeContainer.innerHTML = `
      <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="themeSwitch">
        <label class="custom-control-label d-flex align-items-center" for="themeSwitch">
          <i class="fa ${this.currentTheme === 'dark' ? 'fa-moon' : 'fa-sun'} mr-1"></i>
          <span class="theme-text">${this.currentTheme === 'dark' ? 'Dark' : 'Light'}</span>
        </label>
      </div>
    `;
    
    navbar.appendChild(themeContainer);
    this.themeToggle = document.getElementById('themeSwitch');
    if (this.themeToggle) {
      this.themeToggle.checked = this.currentTheme === 'light';
    }
  }

  setupEventListeners() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'light' : 'dark';
        this.setTheme(newTheme);
      });
    }
  }

  setTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
    this.applyTheme(theme);
    this.updateToggleUI(theme);
  }

  applyTheme(theme) {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const table = document.getElementById('table');
    const cards = document.querySelectorAll('.modal-content');
    const inputs = document.querySelectorAll('input, textarea, select');
    
    if (theme === 'light') {
      // ========== TEMA CLARO ==========
      body.style.backgroundColor = '#f5f5f5';
      body.style.color = '#212529';
      
      // Cambiar navbar
      if (navbar) {
        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');
      }
      
      // Cambiar tabla - IMPORTANTE: el texto debe ser oscuro
      if (table) {
        table.classList.remove('table-dark');
        table.classList.add('table-striped', 'table-light');
        // Forzar color de texto oscuro en la tabla
        table.style.color = '#212529';
      }
      
      // Cambiar todas las celdas de la tabla
      const allCells = document.querySelectorAll('#table td, #table th');
      allCells.forEach(cell => {
        cell.style.color = '#212529';
      });
      
      // Cambiar filas de la tabla
      const rows = document.querySelectorAll('#table tr');
      rows.forEach(row => {
        row.style.color = '#212529';
      });
      
      // Cambiar modal
      cards.forEach(card => {
        card.classList.remove('bg-dark', 'text-white');
        card.classList.add('bg-white', 'text-dark');
      });
      
      // Cambiar inputs
      inputs.forEach(input => {
        input.classList.remove('bg-dark', 'text-white', 'border-secondary');
        input.classList.add('bg-white', 'text-dark', 'border-light');
      });
      
      // Actualizar badges
      document.querySelectorAll('.badge-info').forEach(badge => {
        badge.classList.remove('badge-info');
        badge.classList.add('badge-secondary');
      });
      
    } else {
      // ========== TEMA OSCURO ==========
      body.style.backgroundColor = '#343a40';
      body.style.color = '#f8f9fa';
      
      // Cambiar navbar
      if (navbar) {
        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
      }
      
      // Cambiar tabla
      if (table) {
        table.classList.remove('table-striped', 'table-light');
        table.classList.add('table-dark');
        table.style.color = '#f8f9fa';
      }
      
      // Cambiar todas las celdas de la tabla
      const allCells = document.querySelectorAll('#table td, #table th');
      allCells.forEach(cell => {
        cell.style.color = '#f8f9fa';
      });
      
      // Cambiar filas de la tabla
      const rows = document.querySelectorAll('#table tr');
      rows.forEach(row => {
        row.style.color = '#f8f9fa';
      });
      
      // Cambiar modal
      cards.forEach(card => {
        card.classList.remove('bg-white', 'text-dark');
        card.classList.add('bg-dark', 'text-white');
      });
      
      // Cambiar inputs
      inputs.forEach(input => {
        input.classList.remove('bg-white', 'text-dark', 'border-light');
        input.classList.add('bg-dark', 'text-white', 'border-secondary');
      });
      
      // Actualizar badges
      document.querySelectorAll('.badge-secondary').forEach(badge => {
        badge.classList.remove('badge-secondary');
        badge.classList.add('badge-info');
      });
    }
    
    // Actualizar los badges de los tags (por si hay cambios dinámicos)
    this.updateAllBadges(theme);
  }

  updateAllBadges(theme) {
    // Buscar todos los contenedores de tags y volver a renderizar
    const tagCells = document.querySelectorAll('#table td:nth-child(3)');
    tagCells.forEach(cell => {
      const tags = [];
      const badges = cell.querySelectorAll('.badge');
      badges.forEach(badge => {
        tags.push(badge.innerText);
      });
      
      if (tags.length > 0) {
        // Volver a renderizar con el tema correcto
        cell.innerHTML = '';
        tags.forEach(tag => {
          const badge = document.createElement('span');
          badge.classList.add('badge', 'mr-1');
          if (theme === 'light') {
            badge.classList.add('badge-secondary');
          } else {
            badge.classList.add('badge-info');
          }
          badge.innerText = tag;
          cell.appendChild(badge);
        });
      }
    });
  }

  updateToggleUI(theme) {
    if (this.themeToggle) {
      const icon = this.themeToggle.parentElement.querySelector('.fa');
      const text = this.themeToggle.parentElement.querySelector('.theme-text');
      
      if (icon && text) {
        if (theme === 'light') {
          icon.className = 'fa fa-sun mr-1';
          text.textContent = 'Light';
        } else {
          icon.className = 'fa fa-moon mr-1';
          text.textContent = 'Dark';
        }
      }
    }
  }

  loadTheme() {
    this.applyTheme(this.currentTheme);
    if (this.themeToggle) {
      this.themeToggle.checked = this.currentTheme === 'light';
      this.updateToggleUI(this.currentTheme);
    }
  }
}