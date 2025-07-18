const rawPalettes = [
  ["#22577a","#38a3a5","#57cc99","#80ed99","#c7f9cc"],
  ["#d9ed92","#b5e48c","#99d98c","#76c893","#52b69a","#34a0a4","#168aad","#1a759f","#1e6091","#184e77"],
  ["#22223b","#4a4e69","#9a8c98","#c9ada7","#f2e9e4"],
  ["#10002b","#240046","#3c096c","#5a189a","#7b2cbf","#9d4edd","#c77dff","#e0aaff"],
  ["#d8f3dc","#b7e4c7","#95d5b2","#74c69d","#52b788","#40916c","#2d6a4f","#1b4332","#081c15"],
  ["#001427","#708d81","#f4d58d","#bf0603","#8d0801"],
  ["#ffadad","#ffd6a5","#fdffb6","#caffbf","#9bf6ff","#a0c4ff","#bdb2ff","#ffc6ff","#fffffc"],
  ["#f72585","#b5179e","#7209b7","#560bad","#480ca8","#3a0ca3","#3f37c9","#4361ee","#4895ef","#4cc9f0"],
  ["#590d22","#800f2f","#a4133c","#c9184a","#ff4d6d","#ff758f","#ff8fa3","#ffb3c1","#ffccd5","#fff0f3"],
  ["#ede0d4","#e6ccb2","#ddb892","#b08968","#7f5539","#9c6644"],
  ["#e9f5db","#cfe1b9","#b5c99a","#97a97c","#87986a","#718355"],
  ["#386641","#6a994e","#a7c957","#fbf7ef","#c9182c","#782832"],
  ["#231c35","#242039","#2a2b47","#484564","#5b5271","#6e5774"],
  ["#ccd5ae","#e9edc9","#fefae0","#faedcd","#d4a373"],
  ["#e63946","#f1faee","#a8dadc","#457b9d","#1d3557"],
  ["#f8f9fa","#e9ecef","#dee2e6","#ced4da","#adb5bd","#6c757d","#495057","#343a40","#212529"],
  ["#006466","#065a60","#0b525b","#144552","#1b3a4b","#212f45","#272640","#312244","#3e1f47","#4d194d"],
  ["#641220","#6e1423","#85182a","#a11d33","#a71e34","#b21e35","#bd1f36","#c71f37","#da1e37","#e01e37"],
  ["#eddcd2","#fff1e6","#fde2e4","#fad2e1","#c5dedd","#dbe7e4","#f0efeb","#d6e2e9","#bcd4e6","#99c1de"],
  ["#0d3b66","#faf0ca","#f4d35e","#ee964b","#f95738"]



];

// ✅ إزالة التكرار بناءً على البورد كاملاً
const uniquePalettes = [];
const seen = new Set();

for (const palette of rawPalettes) {
  const key = JSON.stringify(palette);
  if (!seen.has(key)) {
    seen.add(key);
    uniquePalettes.push(palette);
  }
}

const paletteContainer = document.getElementById('paletteContainer');
const submitButton = document.getElementById('submitButton');

for (let i = 0; i < uniquePalettes.length; i++) {
  const palette = uniquePalettes[i];
  const paletteDiv = document.createElement('div');
  paletteDiv.classList.add('palette');

  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('checkbox-container');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.dataset.palette = JSON.stringify(palette);
  checkbox.addEventListener('change', checkIfAnySelected);

  checkboxContainer.appendChild(checkbox);

  const colorsDiv = document.createElement('div');
  colorsDiv.classList.add('colors');

  palette.forEach(color => {
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = color;
    colorsDiv.appendChild(colorBox);
  });

  paletteDiv.appendChild(checkboxContainer);
  paletteDiv.appendChild(colorsDiv);
  paletteContainer.appendChild(paletteDiv);
}

function checkIfAnySelected() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
  submitButton.disabled = !anyChecked;
}

submitButton.addEventListener('click', () => {
  const selected = [];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (cb.checked) {
      selected.push(JSON.parse(cb.dataset.palette));
    }
  });
  sessionStorage.setItem('summaryList', JSON.stringify(selected));
  window.location.href = '../index.html';
  
});