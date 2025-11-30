// ===== Teks Berjalan (Typing Effect) ===== //
    const teksElement = document.getElementById('teks');
    const teksArray = [
        "Frontend Developer",
        "UI/UX Designer",
        "Content Creator",
        "Video Editor"
    ];
    let teksIndex = 0;
    let hurufIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
        isEnd = false;
        
        // Set teks saat ini
        const currentTeks = teksArray[teksIndex];
        
        if (isDeleting) {
            // Menghapus teks
            teksElement.textContent = currentTeks.substring(0, hurufIndex - 1);
            hurufIndex--;
        } else {
            // Mengetik teks
            teksElement.textContent = currentTeks.substring(0, hurufIndex + 1);
            hurufIndex++;
        }
        
        // Kecepatan mengetik
        let typeSpeed = isDeleting ? 80 : 150;
        
        if (!isDeleting && hurufIndex === currentTeks.length) {
            // Jeda di akhir teks
            isEnd = true;
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && hurufIndex === 0) {
            // Pindah ke teks berikutnya
            isDeleting = false;
            teksIndex++;
            if (teksIndex >= teksArray.length) teksIndex = 0;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Mulai efek mengetik
    setTimeout(type, 1000);

// ===== Fitur Salin Link (Copy Link Effect) ===== //
const actionlink = document.querySelectorAll(".link-card .link action")

actionlink.forEach((action) => {

    action.addEventListener("click", (e) => {

        // Mencegah event bubbling agar tidak membuka link
        e.preventDefault();
        e.stopPropagation();

        // Mendapatkan URL dari elemen parent (link-card)
        const url = action.parentElement.getAttribute("href");

        // Salin URL ke clipboard
        navigator.clipboard.writeText(url).then(() => {

            // Tampilkan notifikasi
            showToast("Link berhasil disalin")

            // Ubah ikon sementara menjadi centang
            const icon = action.querySelector("i");
            const originalClass = icon.className;

            icon.className = "ph ph-check";

            setTimeout(() => {
                icon.className = originalClass;
            }, 2000);
        }).catch(err => {
            console.error("Gagal menyalin link: ", err);
            showToast("Gagal menyalin link");
        });
    });
    
});

// Fungsi untuk menampilkan toast notification
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

/* Animasi Text bergerak saat scrolling */
document.addEventListener("scroll", (e) => {
    console.log("scroll : ", window.scrollY);

    document.querySelector(".bg-text-animation").style.transform = 'translateY(${window.scrollY}px)';
});