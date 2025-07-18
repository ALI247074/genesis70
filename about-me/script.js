const backBtn = document.getElementById('backBtn');

function checkHistory() {
  if (window.history.length > 1) {
    backBtn.disabled = false;
  } else {
    backBtn.disabled = true;
  }
}

backBtn.addEventListener('click', () => {
  if (window.history.length > 1) {
    window.history.back();
  }
});

// تحقق من وجود صفحة سابقة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', checkHistory);