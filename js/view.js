// Solo el método renderTags (el resto del archivo igual)
renderTags(cell, tags) {
  cell.innerHTML = '';

  if (!tags || tags.length === 0) {
    cell.innerHTML = '<span class="text-muted">No tags</span>';
    return;
  }

  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  tags.forEach((tag) => {
    const badge = document.createElement('span');
    badge.classList.add('badge', 'mr-1');
    
    // Aplicar clase según el tema actual
    if (currentTheme === 'light') {
      badge.classList.add('badge-secondary');
    } else {
      badge.classList.add('badge-info');
    }
    
    badge.innerText = tag;
    cell.appendChild(badge);
  });
}