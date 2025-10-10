function resizeApp() {
    const wrapper = document.getElementById("scale-wrapper");
    const scaleX = window.innerWidth / wrapper.scrollWidth;
    const scaleY = window.innerHeight / wrapper.scrollHeight;
    const scale = Math.min(scaleX, scaleY);

    wrapper.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", resizeApp);
window.addEventListener("load", resizeApp);
