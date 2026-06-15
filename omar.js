
function openModal(title, link, description, instagram){

    document.getElementById("videoModal").style.display = "block";

    document.getElementById("modalTitle").innerText = title;

    document.getElementById("modalFrame").src = link;

    document.getElementById("modalDescription").innerText = description;

    document.getElementById("modalLink").href = instagram;
}
function closeModal(){

    document.getElementById("videoModal").style.display="none";

    document.getElementById("modalFrame").src="";
}

window.onclick=function(e){

    let modal=document.getElementById("videoModal");

    if(e.target==modal){
        closeModal();
    }
}



const about = document.querySelector(".about-section");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            about.classList.add("show");
        }

    });

},{
    threshold:0.4
});

observer.observe(about);

const tracks = document.querySelectorAll(".track");

const state = new Map();

tracks.forEach(track => {

    state.set(track, {
        x: 0,
        speed: parseFloat(track.dataset.speed) || 1,
        direction: track.dataset.direction === "right" ? 1 : -1,
        hover: false
    });

    // smooth hover pause
    track.addEventListener("mouseenter", () => {
        state.get(track).hover = true;
    });

    track.addEventListener("mouseleave", () => {
        state.get(track).hover = false;
    });

});

function animate(){

    tracks.forEach(track => {

        const s = state.get(track);

        // smooth stop (ease out effect)
        if(s.hover){
            s.speed *= 0.92;
        } else {
            s.speed = parseFloat(track.dataset.speed);
        }

        s.x += s.speed * s.direction;

        const width = track.scrollWidth / 2;

        // seamless loop
        if(Math.abs(s.x) >= width){
            s.x = 0;
        }

        track.style.transform = `translateX(${s.x}px)`;

    });

    requestAnimationFrame(animate);
}

animate();


let swiper;

function openGallery(images, title, link) {  // ✅ نفس الترتيب في HTML
    document.getElementById("galleryModal").style.display = "block";
    document.getElementById("galleryTitle").innerText = title;
    document.getElementById("galleryLink").href = link;

    let wrapper = document.getElementById("galleryWrapper");
    wrapper.innerHTML = "";

    if (!Array.isArray(images)) {
        images = [images];
    }

    images.forEach(img => {
        wrapper.innerHTML += `
            <div class="swiper-slide">
                <img src="${img}">
            </div>
        `;
    });

    if (swiper) swiper.destroy(true, true);

    setTimeout(() => {
        swiper = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            loop: images.length > 2,
            mousewheel: true,
            keyboard: { enabled: true },
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true
            }
        });
    }, 50);
}


function toggleFullscreen(){

    const slider = document.querySelector(".mySwiper");

    if(!document.fullscreenElement){

        slider.requestFullscreen();

    }else{

        document.exitFullscreen();

    }
}   


function closeGallery() {
    document.getElementById("galleryModal").style.display = "none";
    if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
    }
}

window.onclick = function(e) {
   
    let videoModal = document.getElementById("videoModal");
    if (e.target == videoModal) {
        closeModal();
    }
    
   
    let galleryModal = document.getElementById("galleryModal");
    if (e.target == galleryModal) {
        closeGallery();
    }
}
