const heroImg = document.querySelector(".img-bg");
const menuImg = document.querySelector(".menu");
const menuBar = document.querySelector("header nav");

const browserSizeUpdate = () => {
	let browserSize = window.innerWidth;
	if (browserSize < 1024) {
		heroImg.src = "./images/bg-intro-mobile.svg";
	} else {
		heroImg.src = "./images/bg-intro-desktop.svg";
	}
};

browserSizeUpdate();
window.addEventListener("resize", browserSizeUpdate);

let menuOpen = false;
menuImg.addEventListener("click", () => {
	menuOpen = !menuOpen;

	if (menuOpen) {
		menuImg.src = "./images/icon-close.svg";
		menuBar.classList.add("show");
	} else {
		menuImg.src = "./images/icon-hamburger.svg";
		menuBar.classList.remove("show");
	}
});
