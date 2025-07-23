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
  ["#0d3b66","#faf0ca","#f4d35e","#ee964b","#f95738"],
  ["#000814","#001d3d","#003566","#ffc300","#ffd60a"],
  ["#d8e2dc","#ffe5d9","#ffcad4","#f4acb7","#9d8189"],
  ["#ff6d00","#ff7900","#ff8500","#ff9100","#ff9e00","#240046","#3c096c","#5a189a","#7b2cbf","#9d4edd"],
  ["#6b9080","#a4c3b2","#cce3de","#eaf4f4","#f6fff8"]



];


function displaySummary() {
  summaryList.innerHTML = "";

  // عرض أنواع المشروع والتفاصيل والإضافات كما في كودك...

  // استرجاع الألوان المختارة من الـ sessionStorage
  const selectedPalettes = JSON.parse(sessionStorage.getItem('summaryList')) || [];

  // إنشاء عنصر لعرض الألوان المختارة
  const liColors = document.createElement("li");
  if (selectedPalettes.length > 0) {
    liColors.textContent = "Selected Color Palettes:";
    const palettesContainer = document.createElement("div");
    palettesContainer.style.display = "flex";
    palettesContainer.style.gap = "5px";
    palettesContainer.style.flexWrap = "wrap";
    palettesContainer.style.marginTop = "5px";

    selectedPalettes.forEach(palette => {
      const paletteDiv = document.createElement("div");
      paletteDiv.style.display = "flex";
      paletteDiv.style.border = "1px solid #ccc";
      paletteDiv.style.padding = "3px";
      paletteDiv.style.borderRadius = "4px";

      palette.forEach(color => {
        const colorBox = document.createElement("div");
        colorBox.style.width = "20px";
        colorBox.style.height = "20px";
        colorBox.style.backgroundColor = color;
        colorBox.style.marginRight = "2px";
        paletteDiv.appendChild(colorBox);
      });

      palettesContainer.appendChild(paletteDiv);
    });

    liColors.appendChild(palettesContainer);
  } else {
    liColors.textContent = "Selected Color Palettes: None";
  }

  summaryList.appendChild(liColors);

  // باقي الكود (التخصيص النهائي)...
}

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
const okButton = document.getElementById('okButton');
const selectedDisplay = document.getElementById('selectedPalettesDisplay');

okButton.addEventListener('click', () => {
 const selected = [];
 const checkboxes = document.querySelectorAll('input[type="checkbox"]');
 checkboxes.forEach(cb => {
  if (cb.checked) {
   selected.push(JSON.parse(cb.dataset.palette));
  }
 });

 selectedDisplay.innerHTML = ''; // تنظيف القديم

 if (selected.length === 0) {
  selectedDisplay.innerHTML = '<p style="color:white;text-align:center;">لم يتم اختيار أي بورد.</p>';
  return;
 }

 selected.forEach((palette, idx) => {
  const boardWrapper = document.createElement('div');
  boardWrapper.style.background = 'rgba(255, 255, 255, 0.12)';
  boardWrapper.style.borderRadius = '15px';
  boardWrapper.style.padding = '15px';
  boardWrapper.style.marginBottom = '20px';
  boardWrapper.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  boardWrapper.style.backdropFilter = 'blur(10px)';

  const colorsRow = document.createElement('div');
  colorsRow.style.display = 'flex';
  colorsRow.style.flexWrap = 'wrap';
  colorsRow.style.gap = '6px';
  colorsRow.style.marginBottom = '10px';

  palette.forEach(color => {
   const colorBox = document.createElement('div');
   colorBox.style.backgroundColor = color;
   colorBox.style.width = '50px';
   colorBox.style.height = '50px';
   colorBox.style.borderRadius = '8px';
   colorBox.style.border = '1px solid #fff';

   const colorLabel = document.createElement('div');
   colorLabel.textContent = color;
   colorLabel.style.fontSize = '12px';
   colorLabel.style.color = '#fff';
   colorLabel.style.textAlign = 'center';
   colorLabel.style.marginTop = '3px';

   const colorContainer = document.createElement('div');
   colorContainer.style.display = 'flex';
   colorContainer.style.flexDirection = 'column';
   colorContainer.style.alignItems = 'center';
   colorContainer.appendChild(colorBox);
   colorContainer.appendChild(colorLabel);

   colorsRow.appendChild(colorContainer);
  });

  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.justifyContent = 'space-between';
  actions.style.marginTop = '10px';

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.style.padding = '8px 16px';
  cancelBtn.style.border = 'none';
  cancelBtn.style.borderRadius = '8px';
  cancelBtn.style.background = 'rgba(255, 0, 0, 0.4)';
  cancelBtn.style.color = 'white';
  cancelBtn.style.cursor = 'pointer';

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';
  submitBtn.style.padding = '8px 16px';
  submitBtn.style.border = 'none';
  submitBtn.style.borderRadius = '8px';
  submitBtn.style.background = 'rgba(0, 128, 0, 0.4)';
  submitBtn.style.color = 'white';
  submitBtn.style.cursor = 'pointer';

  // تحكم بالزرين
  cancelBtn.addEventListener('click', () => {
   boardWrapper.remove();
  });

  // إنشاء زر Copy
// استبدل قسم إنشاء زر النسخ Copy Button الحالي بالكود التالي:
const copyButton = document.createElement("button");
copyButton.textContent = "Copy";
copyButton.style.margin = "0 10px";
copyButton.style.padding = "8px 16px";
copyButton.style.borderRadius = "8px";
copyButton.style.border = "1px solid rgba(255, 255, 255, 0.3)";
copyButton.style.backdropFilter = "blur(10px)";
copyButton.style.background = "rgba(0, 200, 255, 0.2)";
copyButton.style.color = "#000";
copyButton.style.fontWeight = "bold";
copyButton.style.cursor = "pointer";
copyButton.style.transition = "background 0.3s ease";

// تعديل وظيفة النسخ لتنسخ أسماء الألوان من هذا البورد فقط:
copyButton.addEventListener("click", () => {
    // هذه الـ div هي الحاوية التي تعرض ألوان هذا البورد
    const colorsRow = boardWrapper.querySelector('div'); // أول div داخل boardWrapper هو colorsRow

    // نأخذ أسماء الألوان (النص الموجود تحت كل مربع لون)
    const colorLabels = colorsRow.querySelectorAll('div > div:last-child');
    
    // إذا لم تعمل الطريقة أعلاه جرب:
    // const colorLabels = colorsRow.querySelectorAll('div div:nth-child(2)');

    // نجمع أسماء الألوان في مصفوفة
    const colorsText = [];
    colorLabels.forEach(label => {
        colorsText.push(label.textContent.trim());
    });

    if (colorsText.length > 0) {
        const colorsString = colorsText.join(' ');
        navigator.clipboard.writeText(colorsString)
            .then(() => alert("Copied colors: " + colorsString))
            .catch(err => console.error("Copy failed", err));
    } else {
        alert("No colors found to copy.");
    }
});
    submitBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll('input[name="colors"]:checked');
    const paletteContainer = Array.from(checkboxes).map(cb => cb.value);

    // حفظ الألوان في localStorage
    localStorage.setItem("paletteContainer", JSON.stringify(paletteContainer));

    // الانتقال لواجهة السماري
    window.location.href = "../../work-and-flow/home.html#step5"
});

  actions.appendChild(cancelBtn);
  actions.appendChild(submitBtn);
  actions.appendChild(copyButton);
  
  boardWrapper.appendChild(colorsRow);
  boardWrapper.appendChild(actions);
  selectedDisplay.appendChild(boardWrapper);
 });
});

for (let i = 0; i < uniquePalettes.length; i++) {
  const palette = uniquePalettes[i];
  const paletteDiv = document.createElement('div');
  paletteDiv.classList.add('palette');

  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('checkbox-container');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.dataset.palette = JSON.stringify(palette);
  checkbox.addEventListener('change', function () {
 enforceSingleSelection(this);
});
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

function enforceSingleSelection(selectedCheckbox) {
 const checkboxes = document.querySelectorAll('input[type="checkbox"]');
 checkboxes.forEach(cb => {
  if (cb !== selectedCheckbox) {
   cb.checked = false;
  }
 });
}

document.getElementById("backToStep5Btn").addEventListener("click", () => {
 window.location.href = "../../work-and-flow/index.html#step5";
});