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
    // Crear el botón de cambio de tema
    const navbar = document.querySelector('.navbar-collapse');
    if (!navbar) return;

    const themeContainer = document.createElement('div');
    themeContainer.className = 'form-inline ml-3';
    
    // Usar un switch (interruptor) para mejor UX
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
    this.themeToggle.checked = this.currentTheme === 'light';
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
    this.applyTheme(theme);
    this.updateToggleUI(theme);
  }

  applyTheme(theme) {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const table = document.getElementById('table');
    const cards = document.querySelectorAll('.card, .modal-content');
    const inputs = document.querySelectorAll('input, textarea, select');
    const buttons = document.querySelectorAll('.btn');
    
    if (theme === 'light') {
      // Tema claro
      body.style.backgroundColor = '#f5f5f5';
      body.style.color = '#212529';
      
      if (navbar) {
        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');
      }
      
      if (table) {
        table.classList.remove('table-dark');
        table.classList.add('table-striped');
      }
      
      cards.forEach(card => {
        card.classList.remove('bg-dark', 'text-white');
        card.classList.add('bg-white', 'text-dark');
      });
      
      inputs.forEach(input => {
        input.classList.remove('bg-dark', 'text-white');
        input.classList.add('bg-white', 'text-dark');
      });
      
    } else {
      // Tema oscuro
      body.style.backgroundColor = '#343a40';
      body.style.color = '#f8f9fa';
      
      if (navbar) {
        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
      }
      
      if (table) {
        table.classList.add('table-dark');
        table.classList.remove('table-striped');
      }
      
      cards.forEach(card => {
        card.classList.remove('bg-white', 'text-dark');
        card.classList.add('bg-dark', 'text-white');
      });
      
      inputs.forEach(input => {
        input.classList.remove('bg-white', 'text-dark');
        input.classList.add('bg-dark', 'text-white');
      });
    }
    
    // Actualizar colores específicos de elementos
    this.updateSpecificElements(theme);
  }

  updateSpecificElements(theme) {
    // Actualizar badges y otros elementos específicos
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
      if (theme === 'light') {
        badge.classList.remove('badge-info');
        badge.classList.add('badge-secondary');
      } else {
        badge.classList.remove('badge-secondary');
        badge.classList.add('badge-info');
      }
    });
    
    // Actualizar el color del texto en el navbar
    const navLinks = document.querySelectorAll('.nav-link, .navbar-brand');
    navLinks.forEach(link => {
      if (theme === 'light') {
        link.style.color = '#212529';
      } else {
        link.style.color = '#f8f9fa';
      }
    });
  }

  updateToggleUI(theme) {
    if (this.themeToggle) {
      const icon = this.themeToggle.parentElement.querySelector('.fa');
      const text = this.themeToggle.parentElement.querySelector('.theme-text');
      
      if (theme === 'light') {
        icon.className = 'fa fa-sun mr-1';
        text.textContent = 'Light';
      } else {
        icon.className = 'fa fa-moon mr-1';
        text.textContent = 'Dark';
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