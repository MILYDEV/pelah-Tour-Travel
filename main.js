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


// Initialize map
const map = L.map('map').setView([-0.305441, 100.369913], 13); // Default to Jam Gadang

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const markers = [];

// Update map based on selected checkboxes
function updateMap() {
  // Clear previous markers
  markers.forEach(marker => map.removeLayer(marker));
  markers.length = 0;

  const selectedLocations = [];
  document.querySelectorAll('input[type="checkbox"][name="wisata"]:checked').forEach(checkbox => {
    const lat = parseFloat(checkbox.dataset.lat);
    const lng = parseFloat(checkbox.dataset.lng);
    const name = checkbox.value;

    selectedLocations.push([lat, lng]);

    const marker = L.marker([lat, lng]).addTo(map).bindPopup(name);
    markers.push(marker);
  });

  if (selectedLocations.length === 1) {
    // Focus on single location
    map.setView(selectedLocations[0], 15);
  } else if (selectedLocations.length > 1) {
    // Fit map to show all markers
    const bounds = L.latLngBounds(selectedLocations);
    map.fitBounds(bounds);
  }
}

// Listen for checkbox changes
document.querySelectorAll('input[type="checkbox"][name="wisata"]').forEach(checkbox => {
  checkbox.addEventListener('change', updateMap);
});

// Generate WhatsApp Order
function generateOrder() {
  const userName = document.getElementById("userName").value;
  const numPeople = document.getElementById("numPeople").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const additionalNotes = document.getElementById("additionalNotes").value;

  const selectedItems = [];
  document.querySelectorAll('input[type="checkbox"][name="wisata"]:checked').forEach(checkbox => {
    selectedItems.push(checkbox.value);
  });
  const hotel = document.querySelector('input[type="checkbox"][name="hotel"]:checked');
  const selectedHotel = hotel ? hotel.value : "Tempat yang sudah kami pesan diluar layanan ini";

  if (selectedItems.length === 0) {
    alert("Pilih setidaknya satu destinasi wisata.");
    return;
  }

  const ticketNumber = Math.random().toString(36).substring(2, 8).toUpperCase();
  const itemList = selectedItems.join(", ");
  const message = `Saya ${userName} ingin melakukan perjalanan pada ${startDate} sampai ${endDate}, Memesan paket wisata ${itemList}. Total yang akan mengikuti trip ini ada ${numPeople} orang. Kami akan menginap di ${selectedHotel}.\n\nCatatan tambahan: ${additionalNotes}\n\nNomor Pemesanan: ${ticketNumber}\n\nTerimakasih.`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://api.whatsapp.com/send?phone=+6285364538446&text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
}
