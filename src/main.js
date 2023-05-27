var switchElement = document.querySelector('input[type="checkbox"]');

switchElement.addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('body').classList.remove("fundo-claro");
    document.getElementById('body').classList.add("fundo-escuro");
  } else {
    document.getElementById('body').classList.remove("fundo-escuro");
    document.getElementById('body').classList.add("fundo-claro");
  }
});