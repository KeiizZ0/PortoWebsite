// Intersection Observer untuk animasi fade-in
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => observer.observe(element));

// Mengatur active state pada navigasi berdasarkan scroll
const sections = document.querySelectorAll('.section');
const navDots = document.querySelectorAll('.nav-dot');

const observerOptions = { threshold: 0.5 };

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navDots.forEach(dot => dot.classList.remove('active'));
            const targetDot = document.querySelector(`.nav-dot[data-section="${entry.target.id}"]`);
            if (targetDot) targetDot.classList.add('active');
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// Smooth scroll saat mengklik navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form submission dengan EmailJS
document.addEventListener("DOMContentLoaded", function () {
    // Cek apakah EmailJS sudah ter-load di halaman
    if (typeof emailjs === "undefined") {
        alert("Error: EmailJS tidak ter-load! Pastikan sudah mengimpor script EmailJS di HTML.");
        console.error("EmailJS library tidak ditemukan!");
        return;
    }

    try {
        emailjs.init("QLiFebEOhUnS_sSo1"); // Public Key dari gambar Anda
        console.log("EmailJS berhasil diinisialisasi ✅");
    } catch (error) {
        console.error("Gagal menginisialisasi EmailJS ❌", error);
        alert("Error: Gagal menginisialisasi EmailJS. Periksa Public Key Anda!");
        return;
    }

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Mencegah halaman refresh

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        if (!name || !email || !message) {
            alert("Harap isi semua kolom sebelum mengirim! ❌");
            return;
        }

        let params = { name, email, message };

        console.log("Mengirim email dengan parameter:", params);

        emailjs.send("service_33v8t54", "template_wgg1f2o", params)
            .then(function (response) {
                console.log("Email berhasil dikirim! ✅", response);
                alert("Pesan berhasil dikirim! ✅");
                document.getElementById("contact-form").reset();
            })
            .catch(function (error) {
                console.error("Gagal mengirim email ❌", error);
                alert("Gagal mengirim pesan. Cek console untuk error detail.");
            });
    });
});
