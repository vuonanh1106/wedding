document.addEventListener("DOMContentLoaded", function () {
    
    // 1. KHỞI TẠO AOS
    AOS.init({ duration: 1000, once: true });

    // 2. XỬ LÝ ĐẾM NGƯỢC (Đúng ngày 31/12/2025)
    // Lưu ý: Tháng 12 trong JS là số 11
    const weddingDate = new Date(2025, 11, 31, 11, 0, 0).getTime();

    const countdownInterval = setInterval(function () {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            if(document.getElementById("countdown")) {
                document.getElementById("countdown").innerHTML = "<h2>Đám cưới viên mãn! ❤</h2>";
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(document.getElementById("days")) {
            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }, 1000);

    // 3. NHẠC NỀN
    const musicBtn = document.getElementById("musicBtn");
    const bgMusic = document.getElementById("bgMusic");
    let isPlaying = false;

    if(musicBtn && bgMusic) {
        musicBtn.addEventListener("click", function () {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.classList.add("paused");
            } else {
                bgMusic.play();
                musicBtn.classList.remove("paused");
            }
            isPlaying = !isPlaying;
        });
    }

    // 4. MENU MOBILE
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if(hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    document.querySelectorAll(".nav-menu li a").forEach(n => n.addEventListener("click", () => {
        if(hamburger) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    }));

    // 5. HIỆU ỨNG TIM RƠI
    const heartsContainer = document.querySelector('.falling-hearts-container');

    function createHeart() {
        if(!heartsContainer) return;
        
        const heart = document.createElement('i');
        heart.classList.add('fa-solid', 'fa-heart', 'heart-fall');
        
        // Random vị trí ngang
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Random kích thước (10px - 25px)
        const size = Math.random() * 15 + 10; 
        heart.style.fontSize = size + 'px';
        
        // Random tốc độ rơi (3s - 8s)
        const duration = Math.random() * 5 + 3;
        heart.style.animationDuration = duration + 's';

        // Random màu sắc
        if (Math.random() > 0.5) {
             heart.style.color = '#ffccd5'; // Hồng nhạt hơn chút
        }

        heartsContainer.appendChild(heart);

        // Xóa element sau khi rơi xong
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Tạo tim liên tục
    setInterval(createHeart, 400);

    // 6. FORM RSVP
    const rsvpForm = document.getElementById("rsvpForm");
    if(rsvpForm) {
        rsvpForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Cảm ơn bạn đã gửi lời chúc!");
            rsvpForm.reset();
        });
    }
});
