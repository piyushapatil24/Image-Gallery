const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentIndex = 0;
let slideInterval;
let startX = 0;

const images = [
    {url:"https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"nature"},
    {url:"https://images.unsplash.com/photo-1546882588-d9bd63f85a7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"nature"},
    {url:"https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"nature"},
    {url:"https://images.unsplash.com/photo-1733298910077-b881a0ffa768?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"city"},
    {url:"https://images.unsplash.com/photo-1769882199966-9afc908cd379?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"nature"},
    {url:"https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"tech"},
    {url:"https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?q=80&w=663&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"tech"},
    {url:"https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"tech"},
    {url:"https://images.unsplash.com/photo-1569669568853-34d8da6b1db6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"city"},
    {url:"https://images.unsplash.com/photo-1704414326559-88f83d122338?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"city"},
    {url:"https://images.unsplash.com/photo-1519010470956-6d877008eaa4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"city"},
    {url:"https://images.unsplash.com/photo-1516571748831-5d81767b788d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"nature"},
    {url:"https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"tech"},
    {url:"https://images.unsplash.com/photo-1659553887386-3cf656ffb5be?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"city"},
    {url:"https://images.unsplash.com/photo-1578615437406-511cafe4a5c7?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"nature"},
    {url:"https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"city"},
    {url:"https://images.unsplash.com/photo-1634176866089-b633f4aec882?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"nature"},
    {url:"https://images.unsplash.com/photo-1593376853899-fbb47a057fa0?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"tech"},
    {url:"https://plus.unsplash.com/premium_photo-1680430093807-7fc44f018889?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"city"},
    {url:"https://images.unsplash.com/photo-1771428999876-0a04cd3497a9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"nature"},
    {url:"https://images.unsplash.com/photo-1593376853899-fbb47a057fa0?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"tech"},
    {url:"https://plus.unsplash.com/premium_photo-1686218921810-5aa724a04601?q=80&w=677&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"nature"},
    {url:"https://images.unsplash.com/photo-1487219116710-23ffcb172b2b?q=80&w=806&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"tech"},
    {url:"https://images.unsplash.com/photo-1631802694924-616a124e98cf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"tech"},
    {url:"https://plus.unsplash.com/premium_photo-1673709635882-3bd099a72359?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"tech"},
    {url:"https://plus.unsplash.com/premium_photo-1686081120276-5389f4e07f79?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"city"},
    {url:"https://plus.unsplash.com/premium_photo-1722795239761-42d289aef43c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category:"city"}
];

function loadImages(filter="all"){
    gallery.innerHTML="";
    images.forEach((img,index)=>{
        if(filter==="all" || img.category===filter){
            const div=document.createElement("div");
            div.classList.add("gallery-item");
            div.style.animationDelay = `${index * 0.1}s`;
            div.innerHTML=`<img src="${img.url}">`;
            gallery.appendChild(div);
        }
    });
}

loadImages();

document.querySelectorAll(".filter-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        loadImages(btn.dataset.filter);
    });
});

gallery.addEventListener("click",(e)=>{
    const clickedImg = e.target.closest("img");
    if(clickedImg){
        const visibleImages = Array.from(gallery.querySelectorAll("img"));
        currentIndex = visibleImages.indexOf(clickedImg);
        lightbox.classList.add("active");
        lightboxImg.src = visibleImages[currentIndex].src;
    }
});

document.querySelector(".close").onclick=()=>{
    lightbox.classList.remove("active");
};

document.querySelector(".next").onclick=()=>{
    const visibleImages = Array.from(gallery.querySelectorAll("img"));
    currentIndex = (currentIndex + 1) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].src;
};

document.querySelector(".prev").onclick=()=>{
    const visibleImages = Array.from(gallery.querySelectorAll("img"));
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].src;
};

document.addEventListener("keydown",(e)=>{
    if(!lightbox.classList.contains("active")) return;

    const visibleImages = Array.from(gallery.querySelectorAll("img"));

    if(e.key==="ArrowRight"){
        currentIndex = (currentIndex + 1) % visibleImages.length;
        lightboxImg.src = visibleImages[currentIndex].src;
    }

    if(e.key==="ArrowLeft"){
        currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
        lightboxImg.src = visibleImages[currentIndex].src;
    }

    if(e.key==="Escape"){
        lightbox.classList.remove("active");
    }
});

document.getElementById("themeToggle").onclick=()=>{
    document.body.classList.toggle("light");
};