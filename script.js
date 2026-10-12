// =========================================================================
// ⚙️ GLOBAL STATE (Penyimpanan Data Sementara)
// =========================================================================
let skorKuisGlobal = 0;
let gameStep = 3; // Menentukan angka target pertama pada Mini Game (+3)

// =========================================================================
// 🗺️ FUNGSI NAVIGASI MENU (Pindah Halaman)
// =========================================================================
function bukaMenu(idMenu) {
    // 1. Sembunyikan seluruh modul halaman konten yang ada
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });

    // 2. Tampilkan modul halaman konten yang dipilih oleh user
    document.getElementById(idMenu).classList.remove('hidden');
    
    // 3. Hapus status tombol aktif (warna biru) dari semua tombol navigasi
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('menu-active');
    });

    // 4. Berikan warna aktif (warna biru) pada tombol menu yang sedang dibuka
    document.getElementById('btn-' + idMenu).classList.add('menu-active');
}

// =========================================================================
// ✍️ PROFIL DETEKTIF (Sinkronisasi Nama)
// =========================================================================
function updateNama() {
    let namaInput = document.getElementById('namaDetektif').value;
    // Jika kolom input kosong, berikan nama bawaan "Detektif"
    let namaFinal = namaInput.trim() !== "" ? namaInput : "Detektif";
    document.getElementById('badge-nama').innerText = namaFinal;
}

// =========================================================================
// 🧩 LOGIKA MISI 1 DAN MISI 3 (Pilihan Ganda)
// =========================================================================
function jawabMisi(nomor, isBenar) {
    let fb = document.getElementById('feedback-misi' + nomor);
    
    if (isBenar) {
        fb.innerText = "🎉 Benar! Kamu hebat.";
        fb.style.color = "#059669"; // Mengubah warna teks menjadi Hijau
    } else {
        fb.innerText = "❌ Coba tebak lagi ya!";
        fb.style.color = "#dc2626"; // Mengubah warna teks menjadi Merah
    }
}

// =========================================================================
// 🔍 LOGIKA MISI 2 (Input Angka Manual)
// =========================================================================
function cekMisi2() {
    let val = document.getElementById('input-misi2').value;
    let fb = document.getElementById('feedback-misi2');
    
    // Memeriksa apakah input user sama dengan angka 9 (3, 6, [9], 12, 15)
    if (parseInt(val) === 9) {
        fb.innerText = "🎉 Benar! Angka yang hilang adalah 9.";
        fb.style.color = "#059669";
    } else {
        fb.innerText = "❌ Masih salah, ayo hitung lompatannya!";
        fb.style.color = "#dc2626";
    }
}

// =========================================================================
// 🎮 LOGIKA MINI GAME INTERAKTIF (Klik Berurutan Kelipatan 3)
// =========================================================================
function mainGame(angka) {
    let fb = document.getElementById('feedback-game');
    let targetIndicator = document.getElementById('target-game');
    
    // Periksa apakah angka yang diklik sesuai dengan urutan target (3 -> 6 -> 9 -> 12)
    if (angka === gameStep) {
        if (gameStep === 12) {
            fb.innerText = "🎉 Selamat! Kamu berhasil menyelesaikan semua urutan game!";
            targetIndicator.innerText = "SELESAI!";
        } else {
            gameStep += 3; // Menaikkan target kelipatan berikutnya (+3)
            targetIndicator.innerText = gameStep;
            fb.innerText = "👍 Bagus! Lanjutkan.";
        }
    } else {
        fb.innerText = "❌ Salah urutan! Cari angka target yang diminta di atas.";
    }
}

// =========================================================================
// 🤠 LOGIKA SOAL KONTEKSTUAL TANTANGAN (Soal Cerita)
// =========================================================================
function jawabTantangan(isBenar) {
    let fb = document.getElementById('feedback-tantangan');
    
    if (isBenar) {
        fb.innerText = "🎉 Tepat sekali! Jawabannya Rp10.000 karena polanya bertambah Rp2.000 tiap minggu.";
        fb.style.color = "#059669";
    } else {
        fb.innerText = "❌ Kurang tepat, coba urutkan dari minggu kesatu sampai kelima.";
        fb.style.color = "#dc2626";
    }
}

// =========================================================================
// 📝 LOGIKA KUIS EVALUASI & SISTEM REWARD LENCANA
// =========================================================================
function hitungKuis() {
    let skor = 0;
    
    // Mengambil pilihan jawaban radio button dari user
    let q1 = document.querySelector('input[name="q1"]:checked');
    let q2 = document.querySelector('input[name="q2"]:checked');
    
    // Memeriksa jawaban soal nomor 1
    if (q1 && q1.value === 'benar') {
        skor += 50;
    }
    
    // Memeriksa jawaban soal nomor 2
    if (q2 && q2.value === 'benar') {
        skor += 50;
    }
    
    // Sinkronisasi data ke tampilan kuis dan halaman penghargaan
    skorKuisGlobal = skor;
    document.getElementById('feedback-kuis').innerText = "Skor Kuis Kamu: " + skor;
    document.getElementById('badge-skor').innerText = skor;
    
    let lencanaContainer = document.getElementById('lencana-container');
    let lencanaNama = document.getElementById('lencana-nama');
    
    // Penentuan Kategori Medali Berdasarkan Skor Akhir
    if (skor === 100) {
        lencanaContainer.innerText = "🥇";
        lencanaNama.innerText = "Detektif Master Pola Bilangan";
        lencanaNama.className = "badge-status animate-bounce"; // Menambahkan efek melompat (CSS)
        lencanaNama.style.color = "#ca8a04";
    } else if (skor === 50) {
        lencanaContainer.innerText = "🥈";
        lencanaNama.innerText = "Detektif Muda";
        lencanaNama.className = "badge-status";
        lencanaNama.style.color = "#475569";
    } else {
        lencanaContainer.innerText = "🥉";
        lencanaNama.innerText = "Detektif Magang";
        lencanaNama.className = "badge-status";
        lencanaNama.style.color = "#b45309";
    }
    
    // Memberikan notifikasi pop-up kepada siswa
    alert("Kuis berhasil dinilai! Silakan cek menu 'Penghargaan' untuk melihat medalimu.");
}

// =========================================================================
// 🤔 LOGIKA REFLEKSI (Menangkap Pilihan Emosi Siswa)
// =========================================================================
function pilihRefleksi(pesan) {
    document.getElementById('feedback-refleksi').innerText = "Kamu memilih: " + pesan + " Terima kasih atas refleksinya!";
}
