document.addEventListener("DOMContentLoaded", function () {
    
    // 1. KHỞI TẠO HIỆU ỨNG CUỘN (AOS)
    AOS.init({ duration: 1000, once: true });

    // 2. LOAD DATA TỪ FILE JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadWeddingData(data);
            startCountdown(data.weddingDate);
        })
        .catch(error => console.error('Lỗi: Cần chạy trên Local Server hoặc GitHub Pages để đọc file JSON', error));

    // --- HÀM ĐIỀN DỮ LIỆU ---
    function loadWeddingData(data) {
        // Hero
        document.getElementById('heroGroom').innerText = data.couple.groom.name;
        document.getElementById('heroBride').innerText = data.couple.bride.name;
        
        const d = new Date(data.weddingDate);
        document.getElementById('heroDate').innerText = `${d.getDate()} Tháng ${d.getMonth() + 1} Năm ${d.getFullYear()}`;

        // Couple
        document.getElementById('groomName').innerText = data.couple.groom.name;
        document.getElementById('groomImg').src = data.couple.groom.image;
        document.getElementById('groomJob').innerHTML = `<i class="fa-solid ${data.couple.groom.jobIcon}"></i> ${data.couple.groom.job}`;
        document.getElementById('groomDesc').innerText = data.couple.groom.desc;

        document.getElementById('brideName').innerText = data.couple.bride.name;
        document.getElementById('brideImg').src = data.couple.bride.image;
        document.getElementById('brideJob').innerHTML = `<i class="fa-solid ${data.couple.bride.jobIcon}"></i> ${data.couple.bride.job}`;
        document.getElementById('brideDesc').innerText = data.couple.bride.desc;

        // Family
        document.getElementById('groomFather').innerText = data.family.groom.father;
        document.getElementById('groomMother').innerText = data.family.groom.mother;
        document.getElementById('groomAddress').innerText = data.family.groom.address;

        document.getElementById('brideFather').innerText = data.family.bride.father;
        document.getElementById('brideMother').innerText = data.family.bride.mother;
        document.getElementById('brideAddress').innerText = data.family.bride.address;

        // Events
        document.getElementById('eventGroomTitle').innerText = data.events.groom.title;
        document.getElementById('eventGroomTime').innerText = data.events.groom.time;
        document.getElementById('eventGroomPlace').innerText = data.events.groom.place;
        document.getElementById('eventGroomAddress').innerText = data.events.groom.address;
        document.getElementById('eventGroomMap').href = data.events.groom.mapLink;

        document.getElementById('eventBrideTitle').innerText = data.events.bride.title;
        document.getElementById('eventBrideTime').innerText = data.events.bride.time;
        document.getElementById('eventBridePlace').innerText = data.events.bride.place;
        document.getElementById('eventBrideAddress').innerText = data.events.bride.address;
        document.getElementById('eventBrideMap').href = data.events.bride.mapLink;

        // Story Timeline
        const timelineContainer = document.getElementById('storyTimeline');
        let storyHTML = '';
        data.story.forEach((item) => {
            const aosEffect = item.side === 'left' ? 'fade-right' : 'fade-left';
            storyHTML += `
                <div class="timeline-item ${item.side}" data-aos="${aosEffect}">
                    <div class="content">
                        <h3>${item.title}</h3>
                        <span class="time">${item.date}</span>
                        <p>${item.content}</p>
                    </div>
                </div>`;
        });
        timelineContainer.innerHTML = storyHTML;

        // --- XỬ LÝ GALLERY (LOAD MORE) ---
        const galleryContainer = document.getElementById('galleryContainer');
        const viewMoreBtn = document.getElementById('viewMoreBtn');
        
        if (galleryContainer && data.gallery) {
            const totalImages = data.gallery.count;
            const imagesPerPage = 6; 
            let currentImageCount = 0;

            function loadImages(count) {
                let htmlToAdd = '';
                const start = currentImageCount + 1;
                const end = Math.min(currentImageCount + count, totalImages);

                for (let i = start; i <= end; i++) {
                    const aosAnimation = ['fade-up', 'zoom-in', 'flip-left'][Math.floor(Math.random() * 3)];
                    htmlToAdd += `
                        <div class="gallery-item" data-aos="${aosAnimation}">
                            <img src="${data.gallery.folder}${i}${data.gallery.extension}" alt="Wedding Photo ${i}" loading="lazy">
                        </div>
                    `;
                }

                galleryContainer.insertAdjacentHTML('beforeend', htmlToAdd);
                currentImageCount = end;

                // Ẩn nút nếu đã hiện hết ảnh
                if (currentImageCount >= totalImages) {
                    if(viewMoreBtn) viewMoreBtn.style.display = 'none';
                } else {
                    if(viewMoreBtn) viewMoreBtn.style.display = 'inline-block';
                }
                
                // Refresh hiệu ứng AOS
                setTimeout(() => { AOS.refresh(); }, 500); 
            }

            // Load lần đầu
            loadImages(imagesPerPage);

            // Bắt sự kiện click
            if(viewMoreBtn) {
                viewMoreBtn.addEventListener('click', function() {
                    loadImages(imagesPerPage);
                });
            }
        }

        // Bank
        document.getElementById('bankGroomQr').src = data.couple.groom.bank.qr;
        document.getElementById('bankGroomName').innerText = data.couple.groom.bank.bankName;
        document.getElementById('bankGroomNum').innerText = data.couple.groom.bank.number;
        document.getElementById('bankGroomAcc').innerText = data.couple.groom.bank.accountName;

        document.getElementById('bankBrideQr').src = data.couple.bride.bank.qr;
        document.getElementById('bankBrideName').innerText = data.couple.bride.bank.bankName;
        document.getElementById('bankBrideNum').innerText = data.couple.bride.bank.number;
        document.getElementById('bankBrideAcc').innerText = data.couple.bride.bank.accountName;

        // Footer
        document.getElementById('footerGroom').innerText = data.couple.groom.name;
        document.getElementById('footerBride').innerText = data.couple.bride.name;
        document.getElementById('footerDate').innerText = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    }

    // 3. ĐẾM NGƯỢC
    function startCountdown(dateString) {
        const weddingDate = new Date(dateString).getTime();
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
    }

    // 4. TIM RƠI
    const heartsContainer = document.querySelector('.falling-hearts-container');
    function createHeart() {
        if(!heartsContainer) return;
        const heart = document.createElement('i');
        heart.classList.add('fa-solid', 'fa-heart', 'heart-fall');
        heart.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 15 + 10; 
        heart.style.fontSize = size + 'px';
        const duration = Math.random() * 5 + 3;
        heart.style.animationDuration = duration + 's';
        if (Math.random() > 0.5) { heart.style.color = '#ffccd5'; }
        heartsContainer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, duration * 1000);
    }
    setInterval(createHeart, 400);

    // 5. NHẠC & MENU
    const musicBtn = document.getElementById("musicBtn");
    const bgMusic = document.getElementById("bgMusic");
    let isPlaying = false;
    if(musicBtn && bgMusic) {
        musicBtn.addEventListener("click", function () {
            if (isPlaying) { bgMusic.pause(); musicBtn.classList.add("paused"); } 
            else { bgMusic.play(); musicBtn.classList.remove("paused"); }
            isPlaying = !isPlaying;
        });
    }

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    if(hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        document.querySelectorAll(".nav-menu li a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // 6. RSVP FORM
    const rsvpForm = document.getElementById("rsvpForm");
    if(rsvpForm) {
        rsvpForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Cảm ơn bạn đã gửi lời chúc!");
            rsvpForm.reset();
        });
    }
});
