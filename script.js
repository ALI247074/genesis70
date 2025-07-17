// تفعيل التفاعل على كل البطاقات الزجاجية
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('active');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('active');
  });

  document.addEventListener("DOMContentLoaded", () => {
 const paymentBtn = document.getElementById("paymentBtn");
 const paymentModal = document.getElementById("paymentModal");
 const closeModal = document.getElementById("closeModal");

 paymentBtn.addEventListener("click", () => {
  paymentModal.style.display = "flex";
 });

 closeModal.addEventListener("click", () => {
  paymentModal.style.display = "none";
 });

 window.addEventListener("click", (e) => {
  if (e.target === paymentModal) {
   paymentModal.style.display = "none";
  }
 });
});
});
