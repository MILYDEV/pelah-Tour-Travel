const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".destination__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".showcase__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".showcase__content h4", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".showcase__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".showcase__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".banner__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".discover__card", {
  ...scrollRevealOption,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
});

// Fungsi untuk mendapatkan item yang dipilih
function getSelectedItems() {
  const selectedItems = [];
  document.querySelectorAll('input[type="checkbox"][name="wisata"]:checked').forEach(checkbox => {
    selectedItems.push(checkbox.value);
  });
  const hotel = document.querySelector('input[type="checkbox"][name="hotel"]:checked');
  const selectedHotel = hotel ? hotel.value : "Tempat yang sudah kami pesan diluar layanan ini";
  return { selectedItems, selectedHotel };
}

// Fungsi untuk update preview pemesanan
function updatePreview() {
  const { selectedItems, selectedHotel } = getSelectedItems();
  const previewItems = document.getElementById("previewItems");
  previewItems.innerText = `Destinasi: ${selectedItems.join(", ")}\nHotel: ${selectedHotel}`;
}

// Tambahkan event listener untuk checkbox perubahan
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener("change", updatePreview);
});

// Fungsi untuk generate nomor tiket acak
function generateTicketNumber() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Fungsi untuk generate pesan
function generateOrder() {
  const userName = document.getElementById("userName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const { selectedItems, selectedHotel } = getSelectedItems();

  // Validasi jumlah item yang dipilih
  if (selectedItems.length < 2) {
    alert("Pilih setidaknya dua destinasi wisata.");
    return;
  }

  const ticketNumber = generateTicketNumber();
  const itemList = selectedItems.join(", ");
  const message = `Saya *${userName}* ingin melakukan perjalanan pada *${startDate}* sampai *${endDate}*, Memesan paket wisata *${itemList}*. Kami akan menginap di *${selectedHotel}*.\n\nNomor Pemesanan: *${ticketNumber}*\n\nTerimakasih.`;

  // Encode pesan untuk URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://api.whatsapp.com/send?phone=+6285363796901&text=${encodedMessage}`;

  // Buka WhatsApp
  window.open(whatsappURL, "_blank");
}
