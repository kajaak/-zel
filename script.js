// script.js - Romantik Aşk Sitesi İnteraktif Mantık Dosyası

// =========================================================================
// 1. YAPILANDIRMA (İstediğiniz gibi özelleştirebilirsiniz)
// =========================================================================
const CONFIG = {
    // Giriş Şifresi (Lütfen giriş yaparken boşlukları otomatik temizler)
    PASSWORD: "2402", 

    // İlişki Başlangıç Tarihi (Yıl, Ay-1, Gün, Saat, Dakika)
    // NOT: Javascript'te Aylar 0'dan başlar (Ocak: 0, Şubat: 1, Mart: 2, Nisan: 3, vb.)
    // Örnek: 24 Şubat 2024 saat 00:00 -> new Date(2024, 1, 24, 0, 0, 0)
    START_DATE: new Date(2026, 1, 24, 6, 0, 0), 

    // Fotoğrafların Listesi (img klasöründeki dosya isimleri)
    PHOTOS: [
        { url: "img/resim1.jpg", caption: "İlk Kahvemiz, İlk Tatlı Telaşımız ☕" },
        { url: "img/resim2.jpg", caption: "Seninle Dünyanın En Tepesindeyiz ⛰️" },
        { url: "img/resim3.jpg", caption: "Gözlerindeki Işık Dünyamı Aydınlatıyor ✨" },
        { url: "img/resim4.jpg", caption: "Güzel Bir Akşam Yemeği, Baş Başa... 🍽️" },
        { url: "img/resim5.jpg", caption: "Geceyi Aydınlatan En Tatlı Öpücük 🌙" },
        { url: "img/resim6.jpg", caption: "Aslanlı Yolda, Tarihin Gölgesinde El Ele 🇹🇷" },
        { url: "img/resim7.jpg", caption: "Başını Omzuma Yasladığında Zaman Durur ⏳" },
        { url: "img/resim8.jpg", caption: "Her Kutlamada, Her Balonda Seninle Yan Yana 🎈" },
        { url: "img/resim9.jpg", caption: "Güneş Bile Güzelliğin Karşısında Kıskanıyor ☀️" },
        { url: "img/resim10.jpg", caption: "Gülüşünle Hayat Bulduğum En Güzel Günler 😊" },
        { url: "img/resim11.jpg", caption: "Seninle Yolculuklar Bile Bir Ayrı Güzel 🚗" }
    ],

    // "Neden Seni Seviyorum?" Notları (Kavanoza tıklandıkça rastgele seçilir)
    LOVE_NOTES: [
        "Bana her baktığında gözlerinin içinde kendimi güvende hissettiğim için.",
        "Gülüşünle en karanlık günlerimi bile bir anda aydınlatabildiğin için.",
        "Sadece sevgilim değil, aynı zamanda en yakın arkadaşım ve sırdaşım olduğun için.",
        "Dünyadaki tüm zorluklara karşı seninle el ele durabileceğimi bildiğim için.",
        "Beni ben olduğum için sevdiğin ve her halimle kabul ettiğin için.",
        "Sesini her duyduğumda içimde ilk günkü gibi kelebekler uçuştuğu için.",
        "Geleceğe dair kurduğum tüm hayallerin başrolünde sen olduğun için.",
        "En küçük saçmalığıma bile benimle birlikte gülebildiğin için.",
        "Yanında kendimi dünyanın en şanslı insanı hissetmemi sağladığın için.",
        "Ellerimi tuttuğunda kalbimin atışını değiştiren tek insan sen olduğun için.",
        "Hayatımın en güzel maceralarını seninle yaşadığım ve yaşayacağım için.",
        "Bana sevmeyi, sevilmeyi ve aşkın en saf halini hissettirdiğin için.",
        "Seninle içilen sıcak bir kahvenin, dünyanın en lüks yemeğinden daha tatlı olduğu için.",
        "Kalbinin güzelliği yüzüne yansıdığı ve ruhuma dokunduğu için."
    ],

    // %100 Sevgi Slider'ı Açıldığında Yazılacak Özel Mektup
    SECRET_LETTER_TEXT: "Sevgilimmmmm, bu baremi ne yaparsan yap biliyorum beni çok seviyorsun ama emin ol ki bende seni çocukken istediğim bir top dondurma kadar beni ne kadar seviyorsun diyen babama bu kadar dediğim kollarımın arası kadar seviyorum hayatımmmmmmm iyi ki varsın nice 4 aylarımız yıllarımız olsun balımmmmmmm..... ❤️"
};

// =========================================================================
// 2. SAYFA YÜKLENME VE GİRİŞ KONTROLLERİ
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const lockScreen = document.getElementById("lock-screen");
    const mainApp = document.getElementById("main-app");
    const passwordInput = document.getElementById("love-password");
    const loginBtn = document.getElementById("btn-login");
    const errorMsg = document.getElementById("error-message");
    const hintTrigger = document.getElementById("hint-trigger");
    const hintText = document.getElementById("hint-text");
    const bgSlider = document.getElementById("bg-slider");

    // Oturum Kontrolü (Daha önce giriş yapıldıysa şifreyi sorma)
    if (sessionStorage.getItem("authenticated") === "true") {
        unlockSite();
    } else {
        // Giriş ekranında ilk fotoğrafı arka plan yap
        updateBackground(0);
    }

    // Şifre Giriş İşlemi
    loginBtn.addEventListener("click", handleLogin);
    passwordInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleLogin();
    });

    function handleLogin() {
        const inputVal = passwordInput.value.trim().toLowerCase().replace(/\s+/g, "");
        const correctPassword = CONFIG.PASSWORD.trim().toLowerCase().replace(/\s+/g, "");

        if (inputVal === correctPassword) {
            sessionStorage.setItem("authenticated", "true");
            unlockSite();
            triggerConfettiExplosion();
        } else {
            errorMsg.textContent = "Hatalı şifre sevgilim, tekrar dener misin? 🥺";
            passwordInput.value = "";
            // Şifre kutusunun titreme animasyonu
            const card = document.querySelector(".lock-card");
            card.style.transform = "translateX(10px)";
            setTimeout(() => card.style.transform = "translateX(-10px)", 80);
            setTimeout(() => card.style.transform = "translateX(5px)", 160);
            setTimeout(() => card.style.transform = "translateX(-5px)", 240);
            setTimeout(() => card.style.transform = "none", 300);
        }
    }

    // İpucu Göster/Gizle
    hintTrigger.addEventListener("click", () => {
        if (hintText.style.display === "block") {
            hintText.style.display = "none";
        } else {
            hintText.style.display = "block";
        }
    });

    function unlockSite() {
        lockScreen.classList.add("hidden");
        mainApp.classList.remove("hidden");
        
        // Müzik Çalmayı Başlat (Kullanıcı etkileşimi alındığı için tarayıcı engellemez)
        playMusic();

        // Sistemleri Başlat
        startLoveCounter();
        initPolaroidGallery();
        initHeartCanvas();
        initLoveNotes();
        initLoveSlider();
    }
});

// =========================================================================
// 3. MÜZİK KONTROLÜ
// =========================================================================
const audio = document.getElementById("bg-music");
const musicControl = document.getElementById("music-control");
const musicDisc = document.querySelector(".music-disc");

musicControl.addEventListener("click", toggleMusic);

function playMusic() {
    audio.play().then(() => {
        musicDisc.classList.add("playing");
    }).catch(err => {
        console.log("Müzik otomatik başlatılamadı, tıklama bekleniyor.");
    });
}

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        musicDisc.classList.add("playing");
    } else {
        audio.pause();
        musicDisc.classList.remove("playing");
    }
}

// Arka plan fotoğrafını değiştirme
function updateBackground(index) {
    const bgSlider = document.getElementById("bg-slider");
    if (bgSlider && CONFIG.PHOTOS[index]) {
        bgSlider.style.backgroundImage = `url('${CONFIG.PHOTOS[index].url}')`;
    }
}

// =========================================================================
// 4. KRONOMETRE (AŞK SAYACI)
// =========================================================================
let counterInterval;
function startLoveCounter() {
    const yearsEl = document.getElementById("years");
    const monthsEl = document.getElementById("months");
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCounter() {
        const now = new Date();
        const start = CONFIG.START_DATE;
        let diffMs = now - start;

        if (diffMs < 0) {
            // Eğer başlangıç tarihi gelecekteyse 00 göster
            yearsEl.textContent = "00";
            monthsEl.textContent = "00";
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        // Zaman farklarını hesaplama
        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        let days = now.getDate() - start.getDate();

        if (days < 0) {
            months -= 1;
            // Bir önceki ayın gün sayısını bulma
            const prevMonthDate = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonthDate.getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        // Saat, dakika, saniye farkları
        let hours = now.getHours() - start.getHours();
        let minutes = now.getMinutes() - start.getMinutes();
        let seconds = now.getSeconds() - start.getSeconds();

        if (seconds < 0) {
            minutes -= 1;
            seconds += 60;
        }
        if (minutes < 0) {
            hours -= 1;
            minutes += 60;
        }
        if (hours < 0) {
            days -= 1;
            hours += 24;
        }

        // HTML Güncelleme (Başına sıfır ekleyerek şık görünüm sağlama)
        yearsEl.textContent = String(years).padStart(2, '0');
        monthsEl.textContent = String(months).padStart(2, '0');
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCounter();
    counterInterval = setInterval(updateCounter, 1000);
}

// =========================================================================
// 5. İNTERAKTİF POLAROID GALERİSİ
// =========================================================================
let currentPhotoIndex = 0;
function initPolaroidGallery() {
    const wrapper = document.getElementById("polaroid-wrapper");
    const prevBtn = document.getElementById("btn-prev");
    const nextBtn = document.getElementById("btn-next");
    const counterEl = document.getElementById("gallery-counter");

    // Galeriyi oluştur
    renderGallery();

    prevBtn.addEventListener("click", () => {
        navigateGallery(-1);
    });

    nextBtn.addEventListener("click", () => {
        navigateGallery(1);
    });

    function renderGallery() {
        wrapper.innerHTML = "";
        CONFIG.PHOTOS.forEach((photo, idx) => {
            const card = document.createElement("div");
            card.className = "polaroid-card";
            card.dataset.index = idx;
            
            // Üst üste yığılma efekti için z-index ve rotasyon ayarlama
            const rotation = (idx % 2 === 0 ? 1 : -1) * (idx * 1.5) % 8;
            card.style.transform = `rotate(${rotation}deg)`;
            card.style.zIndex = CONFIG.PHOTOS.length - idx;

            // Fotoğraf ekleme
            card.innerHTML = `
                <div class="polaroid-img-wrapper">
                    <img src="${photo.url}" alt="Anı Fotoğrafı" class="polaroid-img" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop'">
                </div>
                <div class="polaroid-caption">${photo.caption}</div>
            `;
            wrapper.appendChild(card);
        });

        updateActiveCard();
    }

    function navigateGallery(direction) {
        const cards = wrapper.querySelectorAll(".polaroid-card");
        const activeCard = Array.from(cards).find(c => parseInt(c.dataset.index) === currentPhotoIndex);

        if (!activeCard) return;

        if (direction === 1) {
            // Sonrakine geçiş animasyonu (kart yana kayarak arkaya gidecek)
            activeCard.style.transform = "translateX(350px) rotate(25deg)";
            activeCard.style.opacity = "0";
            
            setTimeout(() => {
                currentPhotoIndex = (currentPhotoIndex + 1) % CONFIG.PHOTOS.length;
                updateBackground(currentPhotoIndex);
                renderGallery();
            }, 400);
        } else {
            // Öncekine geçiş animasyonu
            currentPhotoIndex = (currentPhotoIndex - 1 + CONFIG.PHOTOS.length) % CONFIG.PHOTOS.length;
            updateBackground(currentPhotoIndex);
            
            // Arka plandan öne gelme hissi yaratmak için yeniden çizip efekt verme
            renderGallery();
            const newActive = Array.from(wrapper.querySelectorAll(".polaroid-card")).find(c => parseInt(c.dataset.index) === currentPhotoIndex);
            if (newActive) {
                newActive.style.transform = "scale(0.8) rotate(-10deg)";
                setTimeout(() => {
                    newActive.style.transform = "scale(1) rotate(0deg)";
                }, 50);
            }
        }
    }

    function updateActiveCard() {
        const cards = wrapper.querySelectorAll(".polaroid-card");
        cards.forEach(card => {
            const idx = parseInt(card.dataset.index);
            if (idx === currentPhotoIndex) {
                card.style.zIndex = CONFIG.PHOTOS.length + 10;
                card.style.transform = "rotate(0deg) scale(1.02)";
                card.classList.add("active");
            } else if (idx < currentPhotoIndex) {
                // Geçilmiş kartları gizle veya arkaya at
                card.style.zIndex = idx;
                card.style.transform = `translateX(-100px) rotate(-15deg) scale(0.9)`;
                card.style.opacity = "0";
                card.style.pointerEvents = "none";
            } else {
                // Bekleyen kartlar arkada duruyor
                const offset = idx - currentPhotoIndex;
                const rot = (idx % 2 === 0 ? 1 : -1) * (offset * 2);
                card.style.transform = `rotate(${rot}deg) translate(${offset * 2}px, ${offset * 2}px)`;
                card.style.zIndex = CONFIG.PHOTOS.length - offset;
                card.style.opacity = "1";
            }
        });

        counterEl.textContent = `${currentPhotoIndex + 1} / ${CONFIG.PHOTOS.length}`;
    }
}

// =========================================================================
// 6. YÜZEN KALPLER PARTİKÜL SİSTEMİ (HTML5 CANVAS)
// =========================================================================
function initHeartCanvas() {
    const canvas = document.getElementById("canvas-hearts");
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class HeartParticle {
        constructor(x, y, size, speedY, speedX, opacity) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || canvas.height + 20;
            this.size = size || Math.random() * 15 + 10;
            this.speedY = speedY || -(Math.random() * 1.5 + 0.5);
            this.speedX = speedX || (Math.random() - 0.5) * 1;
            this.opacity = opacity || Math.random() * 0.5 + 0.3;
            this.growth = Math.random() * 0.05;
            this.angle = Math.random() * Math.PI;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(Math.sin(this.angle) * 0.1);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = "#ff4d6d";
            
            // Klasik Kalp Çizimi
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, -this.size/4, -this.size, this.size/4);
            ctx.bezierCurveTo(-this.size, this.size*0.7, -this.size/4, this.size, 0, this.size*1.2);
            ctx.bezierCurveTo(this.size/4, this.size, this.size, this.size*0.7, this.size, this.size/4);
            ctx.bezierCurveTo(this.size, -this.size/4, this.size/2, -this.size/2, 0, 0);
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
            this.angle += 0.01;
            
            // Yavaşça şeffaflaşma
            if (this.y < -20) {
                this.y = canvas.height + 20;
                this.x = Math.random() * canvas.width;
                this.opacity = Math.random() * 0.5 + 0.3;
            }
        }
    }

    // Başlangıç partiküllerini ekle
    const count = Math.min(40, Math.floor(canvas.width / 30));
    for (let i = 0; i < count; i++) {
        particles.push(new HeartParticle(null, Math.random() * canvas.height));
    }

    // Fare hareketiyle kalp saçma
    window.addEventListener("mousemove", (e) => {
        if (Math.random() < 0.12) { // Her harekette fırlatmasın, ekran dolmasın
            particles.push(new HeartParticle(
                e.clientX, 
                e.clientY, 
                Math.random() * 8 + 6, 
                -(Math.random() * 1.5 + 1), 
                (Math.random() - 0.5) * 1.5, 
                0.8
            ));
            
            // Maksimum partikül sınırını koru
            if (particles.length > 80) {
                particles.shift();
            }
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// =========================================================================
// 7. AŞK KAVANOZU (RASTGELE NOT ÇEKME)
// =========================================================================
function initLoveNotes() {
    const jar = document.getElementById("jar-click");
    const display = document.getElementById("love-note-modal");
    const noteText = document.getElementById("love-note-text");
    let lastNotes = []; // Son çekilen notları tutarak üst üste aynı notların çıkmasını engeller

    jar.addEventListener("click", () => {
        // Çalkalanma animasyonu ekle
        jar.style.animation = "shake 0.4s ease";
        setTimeout(() => jar.style.animation = "", 400);

        // Rastgele not seç
        let availableNotes = CONFIG.LOVE_NOTES.filter(n => !lastNotes.includes(n));
        
        // Eğer tüm notlar bittiyse havuzu sıfırla
        if (availableNotes.length === 0) {
            lastNotes = [];
            availableNotes = CONFIG.LOVE_NOTES;
        }

        const randomNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
        lastNotes.push(randomNote);
        if (lastNotes.length > 5) lastNotes.shift(); // Son 5 notu hatırla

        // Notu ekranda göster
        noteText.textContent = randomNote;
        display.classList.remove("hidden");
        display.style.animation = "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";
    });
}

// CSS Shake animasyonu için stil ekleme
const style = document.createElement("style");
style.textContent = `
@keyframes shake {
    0% { transform: translate(0, 0) rotate(0deg); }
    20% { transform: translate(-8px, 4px) rotate(-5deg); }
    40% { transform: translate(6px, -2px) rotate(4deg); }
    60% { transform: translate(-6px, 2px) rotate(-3deg); }
    80% { transform: translate(4px, -2px) rotate(2deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
}
`;
document.head.appendChild(style);

// =========================================================================
// 8. "BENI NE KADAR SEVİYORSUN?" OYUNU & MEKTUP
// =========================================================================
function initLoveSlider() {
    const slider = document.getElementById("love-slider");
    const percentage = document.getElementById("slider-percentage");
    const message = document.getElementById("slider-message");
    const letter = document.getElementById("secret-letter");
    const typingText = document.getElementById("letter-typing");
    let letterOpened = false;

    slider.addEventListener("input", () => {
        const val = parseInt(slider.value);
        percentage.textContent = `${val}%`;

        // Seviyeye göre sevimli aşk cümleleri
        if (val === 0) {
            message.textContent = "Hiç mi sevmiyorsun? Kahroldum... 😢";
            message.style.color = "#595d75";
        } else if (val > 0 && val <= 20) {
            message.textContent = "Sadece bu kadarcık mı sevgilim? 🥺";
            message.style.color = "#ff758f";
        } else if (val > 20 && val <= 50) {
            message.textContent = "Hissediyorum, kalbin ısınıyor... 😊";
            message.style.color = "#ff4d6d";
        } else if (val > 50 && val <= 80) {
            message.textContent = "Kocaman sevgini hissedebiliyorum! 🥰";
            message.style.color = "#c9184a";
        } else if (val > 80 && val < 100) {
            message.textContent = "Aşkımız göklere sığıyor! 💖";
            message.style.color = "#a01a58";
        } else if (val === 100) {
            message.textContent = "KABUL EDİLDİ! BEN SENİ DAHA ÇOK SEVİYORUM! 🎉❤️";
            message.style.color = "#ff4d6d";
            
            // %100 olduysa konfeti ve mektup açılımı
            if (!letterOpened) {
                letterOpened = true;
                triggerConfettiExplosion();
                showSecretLetter();
            }
        }
    });

    function showSecretLetter() {
        letter.classList.remove("hidden");
        // Yazı yazma (daktilo) efekti
        typingText.textContent = "";
        let charIndex = 0;
        const text = CONFIG.SECRET_LETTER_TEXT;

        function type() {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 35); // Harf çıkma hızı (milisaniye)
            }
        }
        setTimeout(type, 500);
    }
}

// =========================================================================
// 9. KONFETİ EFEKTİ (CANVAS-CONFETTI KÜTÜPHANESİ)
// =========================================================================
function triggerConfettiExplosion() {
    // Eğer internet varsa veya kütüphane yüklendiyse canvas-confetti çalıştır
    if (typeof confetti === "function") {
        const duration = 2.5 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffccd5']
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffccd5']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    } else {
        console.log("Konfeti kütüphanesi yüklenemedi. (Çevrimdışı modu)");
    }
}
