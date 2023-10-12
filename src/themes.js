function toggleDark() {
    if (document.body.classList.contains("herb")) {
        document.body.classList.remove("herb");
    }  else if (document.body.classList.contains("ice-cream")) {
        document.body.classList.remove("ice-cream")
        document.body.classList.add("herb");
    } else {
        document.body.classList.add("ice-cream")
    }
}

export default toggleDark;