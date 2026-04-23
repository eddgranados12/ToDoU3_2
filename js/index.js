import Model from './model.js';
import View from './view.js';

document.addEventListener('DOMContentLoaded', () => {
  const model = new Model();
  const view = new View();
  //Inicializar el gestor de temas para aplicar el tema guardado en localStorage
  const themeManager = new ThemeManager(); 
  model.setView(view);
  view.setModel(model);

  view.render();
});
