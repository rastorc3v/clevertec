// analog $(), but for NodeList
function querySelectAll(selector) {
    try {
        return document.querySelectorAll(selector)
    } catch (err) {
        console.log(`Error query all selecting! ${err.message}, line - ${err.lineNumber}`)
    }
}

// analog $(), but for single element
function querySelect(selector) {
    try {
        return document.querySelector(selector)
    } catch (err) {
        console.log(`Error query selecting! ${err.message}, line - ${err.lineNumber}`)
    }
}

// drop css transition-duration property
function dropDuration(element) {
    element.style.transitionDuration = "";
    return element
}

// set css transition-duration property
function setDuration(element, duration) {
    element.style.transitionDuration = `${duration}ms`;
    return element
}

// hide *element(-s)* for duration time
function hide(elements, duration) {
    if (elements.length > 1) {
        elements.forEach(element => {
            setDuration(element, duration);
            element.style.opacity = "0%";
            setTimeout(() => {
                element.style.display = "none";
                dropDuration(element)
            }, duration)
        })
    } else {
        setDuration(elements, duration);
        elements.style.opacity = "0%";
        setTimeout(() => {
            elements.style.display = "none";
            dropDuration(elements)
        }, duration)
    }
    return elements
}


// show *element(-s)* for duration time. Can point display css property like flex, block, inline, etc.
function show(elements, duration, displayType) {
    if (displayType === undefined) displayType = "block";
    if (elements.length > 1) {
        elements.forEach(element => {
            setDuration(element, duration);
            element.style.display = displayType;
            setTimeout(() => element.style.opacity = "100%", 100);

        })
    } else {
        setDuration(elements, duration);
        elements.style.display = displayType;
        setTimeout(() => elements.style.opacity = "100%", 100);

    }
    return elements
}


// definition variables for base
const navButtons = querySelectAll('#main-navigation li:not(#return)'),
      returnButton = querySelect('#return'),
      header = querySelect('header'),
      footer = querySelect('footer');

// last user scroll position for onScroll function
let lastScrollTop = 0;

// check scrolling direction to show/hide header navigation bar
function onScroll() {
    let top = window.scrollY;
    if (lastScrollTop < top) {
        header.style.height = "0px";
        lastScrollTop = top;
    } else if (lastScrollTop > top) {
        header.style.height = "80px";
        lastScrollTop = top;
    }
}

hide(returnButton, 0);
// set event listeners to every navigation button
navButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        window.removeEventListener("scroll", onScroll);
        hide(navButtons, 500);
        setTimeout(() => show(returnButton, 500), 500);
        header.classList.toggle("small");
        pageHandler(event)
    })
});

// add event listener to expand (go back) button
returnButton.addEventListener("click", () => {
    window.addEventListener("scroll", onScroll);
    header.classList.toggle("small");
    hide(returnButton, 500);
    setTimeout(() => show(navButtons, 1000), 500);
});


// add scroll event listener to check out user scroll direction
window.addEventListener("scroll", onScroll);

// define variable for pageHandler function
let currentPage = "joke";

// hide all sections ("pages")
function clearWindow() {
    window.pageYOffset = 0;
    hide(querySelectAll('main > section'), 500);
}

// handle user clicked button's event
function pageHandler(event) {
    clearWindow();
    currentPage = event.target.id;
    if (currentPage === "about") {
        console.log("scrollJoke activate");
        console.log("about_nav slideUp");
        console.log("activate nav line")
    } else {
        console.log("off scrollJoke")
    }
    if (currentPage === "contacts") {
        setTimeout(() => show(querySelect('.contacts'), 1000, "flex"), 500);
    } else {
        setTimeout(() => show(querySelect(`.${currentPage}`), 1000), 500)
    }
}
