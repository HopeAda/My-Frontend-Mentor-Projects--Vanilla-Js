const inputItm = document.querySelector(".inputLink input");
const inputBtn = document.querySelector(".inputLink Button");
const inputContainer = document.querySelector(".inputLink");
const errMsg = document.querySelector("p.error-msg");
const shortLinksContainer = document.querySelector(".shortenedLinks");

let myLinks = JSON.parse(localStorage.getItem("shortenedLinks")) || [];
console.log(myLinks);

async function shorten(encodedUrl) {
	const proxy = "https://corsproxy.io/?url=";
	let res = await fetch(proxy + `https://cleanuri.com/api/v1/shorten`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: `url=${encodeURIComponent(encodedUrl)}`,
	});

	if (!res.ok) {
		errMsg.textContent = "Please input a valid link";
		inputContainer.classList.add("error");
		return;
	}

	let data = await res.json();
	console.log(data);
	console.log(data.result_url);

	let result = {
		long: inputItm.value,
		short: data.result_url,
	};

	myLinks.push(result);
	localStorage.setItem("shortenedLinks", JSON.stringify(myLinks));

	addLinkToList();
	inputItm.value = "";
}

function shortenLink(event) {
	event.preventDefault();
	if (inputItm.value.trim().length == 0) {
		errMsg.textContent = "Please add a link";
		inputContainer.classList.add("error");
	} else {
		inputContainer.classList.remove("error");
		shorten(inputItm.value.trim());
	}
}

inputBtn.addEventListener("click", shortenLink);

const addLinkToList = () => {
	shortLinksContainer.textContent = "";
	myLinks.map((itm) => {
		let linkItm = document.createElement("DIV");
		linkItm.classList.add("link");

		shortLinksContainer.append(linkItm);

		let longLink = document.createElement("SPAN");
		longLink.classList.add("longLink");
		longLink.textContent = itm.long;
		linkItm.append(longLink);

		let shorter = document.createElement("DIV");
		shorter.classList.add("shorter");

		let shortLink = document.createElement("P");
		shortLink.classList.add("shortLink");
		shortLink.textContent = itm.short;
		shorter.append(shortLink);

		let copyBtn = document.createElement("button");
		copyBtn.textContent = "Copy";
		shorter.append(copyBtn);
		copyBtn.addEventListener("click", btnCopyFunction);

		linkItm.append(shorter);
	});
};

async function btnCopyFunction() {
	let urlToCopy = Array.from(this.parentElement.children)[0].textContent;

	await navigator.clipboard.writeText(urlToCopy);

	this.textContent = "Copied!";
	this.classList.add("copied");
}

addLinkToList();
