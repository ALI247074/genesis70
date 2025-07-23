// جلب العناصر من الصفحة
const steps = document.querySelectorAll(".step");
const next1 = document.getElementById("next1");
const back2 = document.getElementById("back2");
const next2 = document.getElementById("next2");
const back3 = document.getElementById("back3");
const submitBtn = document.getElementById("submit");
const projectTypeSelect = document.getElementById("projectType");
const detailsOptions = document.querySelectorAll("#detailsOptions input[type='checkbox']");
const addonsOptions = document.querySelectorAll("#addonsOptions input[type='checkbox']");
const summaryList = document.getElementById("summaryList");

// عناصر الخطوة الرابعة
const step4 = document.getElementById("step4");
const back4 = document.getElementById("back4");
const next4 = document.getElementById("next4");
const customOptions = [
  document.getElementById("customOption1"),
  document.getElementById("customOption2"),
  document.getElementById("customOption3"),
  
];

// تعطيل زر Next في البداية حتى يتم اختيار نوع المشروع
next1.disabled = true;
projectTypeSelect.addEventListener("change", () => {
 const value = projectTypeSelect.value;
 next1.disabled = value === "";
 localStorage.setItem("projectType", value);
});

// دالة لإظهار الخطوة المناسبة وإخفاء الباقي
function showStep(index) {
  steps.forEach((step, i) => {
    if (i === index) {
      step.classList.add("active");
      step.classList.remove("hidden");
    } else {
      step.classList.remove("active");
      step.classList.add("hidden");
    }
  });
}

// استعادة البيانات المحفوظة
window.addEventListener("DOMContentLoaded", () => {
 // نوع المشروع
 const savedProjectType = localStorage.getItem("projectType");
 if (savedProjectType) {
 projectTypeSelect.value = savedProjectType;
 next1.disabled = false;
 }

 // تفاصيل المشروع
 const savedDetails = JSON.parse(localStorage.getItem("projectDetails") || "[]");
 detailsOptions.forEach((checkbox) => {
 if (savedDetails.includes(checkbox.value)) {
 checkbox.checked = true;
 }
 });

 // الإضافات
 const savedAddons = JSON.parse(localStorage.getItem("addonsOptions") || "[]");
 addonsOptions.forEach((checkbox) => {
 if (savedAddons.includes(checkbox.value)) {
 checkbox.checked = true;
 }
 });

 // التخصيص النهائي
 const savedCustom = JSON.parse(localStorage.getItem("customOptions") || "[]");
 customOptions.forEach((checkbox) => {
 if (savedCustom.includes(checkbox.value)) {
 checkbox.checked = true;
 }
 });

 // إذا رجعنا من color page على step 5
 if (window.location.hash === "#step5") {
 showStep(4); // index 4 هي step 5
 } else {
 showStep(0); // البداية
 }
});
// بدايةً نظهر الخطوة الأولى
showStep(0);

// حدث عند الضغط على زر Next في الخطوة 1 (اختيار نوع المشروع)
next1.addEventListener("click", () => {
  showStep(1);
});

// زر الرجوع في الخطوة 2
back2.addEventListener("click", () => {
  showStep(0);
});

// زر Next في الخطوة 2
next2.addEventListener("click", () => {
 const selectedDetails = [];
 detailsOptions.forEach((checkbox) => {
 if (checkbox.checked) selectedDetails.push(checkbox.value);
 });
 localStorage.setItem("projectDetails", JSON.stringify(selectedDetails));
 showStep(2);
});

// زر الرجوع في الخطوة 3
back3.addEventListener("click", () => {
  showStep(1);
});

// زر الرجوع في الخطوة 4
back4.addEventListener("click", () => {
  showStep(2); // نرجع للخطوة 3 من الخطوة 4
});

// زر Next في الخطوة 4
next4.addEventListener("click", () => {
 // حفظ اختيارات Add-ons
 const selectedAddons = [];
 addonsOptions.forEach((checkbox) => {
 if (checkbox.checked) {
 selectedAddons.push(checkbox.value);
 }
 });
 localStorage.setItem("addonsOptions", JSON.stringify(selectedAddons));

 // حفظ التخصيص النهائي من step4 (custom options)
 const selectedCustom = [];
 customOptions.forEach((checkbox) => {
 if (checkbox.checked) {
 selectedCustom.push(checkbox.value);
 }
 });
 localStorage.setItem("customOptions", JSON.stringify(selectedCustom));

 // عرض الملخص
 displaySummary();
 showStep(4); // ننتقل إلى صفحة النتيجة النهائية
});
nextToSummaryBtn.addEventListener("click", () => {
  // عند الضغط على التالي في الخطوة 4، ننتقل للنتيجة النهائية
  displaySummary();
  showStep(5); // صفحة النتيجة النهائية
});
backToStep4Btn.addEventListener("click", () => {
  showStep(2); // نرجع للخطوة 3 من الخطوة 4
});


// زر Submit في الخطوة 3 — سيكون هنا الآن وليس في الخطوة 4
submitBtn.addEventListener("click", () => {
  // عند الضغط على Submit في الخطوة 3 ننتقل للخطوة 4 لعرض خيارات التخصيص
  showStep(3); // الخطوة 4 هي index 3 (حسب الترتيب 0,1,2,3)
});

// دالة لعرض ملخص النتائج مع كل الاختيارات من الخطوات
function displaySummary() {
  summaryList.innerHTML = "";

  // Project Type
  const liProjectType = document.createElement("li");
  liProjectType.textContent = "Project Type: " + projectTypeSelect.value;
  summaryList.appendChild(liProjectType);

  // Project Details
  const selectedDetails = [];
  detailsOptions.forEach((checkbox) => {
    if (checkbox.checked) selectedDetails.push(checkbox.value);
  });
  const liDetails = document.createElement("li");
  liDetails.textContent = "Project Details: " + (selectedDetails.length ? selectedDetails.join(", ") : "None");
  summaryList.appendChild(liDetails);

  // Add-ons
  const selectedAddons = [];
  addonsOptions.forEach((checkbox) => {
    if (checkbox.checked) selectedAddons.push(checkbox.value);
  });
  const liAddons = document.createElement("li");
  liAddons.textContent = "Add-ons: " + (selectedAddons.length ? selectedAddons.join(", ") : "None");
  summaryList.appendChild(liAddons);

  // Date of Project (الخطوة 4)
  const selectedCustom = [];
  customOptions.forEach((checkbox) => {
    if (checkbox.checked) selectedCustom.push(checkbox.value);
  });
  const liCustom = document.createElement("li");
  liCustom.textContent = "Date of Project: " + (selectedCustom.length ? selectedCustom.join(", ") : "None");
  summaryList.appendChild(liCustom);
}

// نضيف خاصية إظهار الخطوة الرابعة بشكل جيد مع تنسيق داخل HTML (مهم جداً)
if (step4) {
  step4.classList.add("step");
  step4.classList.add("hidden"); // تخفي الخطوة 4 في البداية
}
const backFinal = document.getElementById("backFinal");
backFinal.addEventListener("click", () => {
  showStep(4); // العودة للخطوة 4 مثلاً
});


// التحقق مما إذا كان المستخدم عاد من صفحة الألوان إلى step 5
if (window.location.hash === "#step5") {
 showStep(4); // الخطوة الخامسة هي index 4 لأن العد يبدأ من 0
}