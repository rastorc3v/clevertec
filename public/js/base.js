
const navButtons = $('#main-navigation li:not(#return)');
const returnButton = $('#return');
const header = $('header');
const footer = $('footer');
const $window = $(window);
let currentPage = "joke";

navButtons.click((event) => {
    navButtons.hide();
    setTimeout(() => returnButton.show(500), 500);
    header.toggleClass("slow-move");                                        //on
    $window.off("scroll", onScroll);
    header.toggleClass("small");
    pageHandler(event);
});

returnButton.click(() => {
    header.toggleClass("small");
    setTimeout(() => header.toggleClass("slow-move"), 1000); //on
    $window.on("scroll", onScroll);
    returnButton.hide(500);
    setTimeout(() => navButtons.show(500), 600)
});

let lastScrollTop = 0;

function onScroll () {
    let top = $window.scrollTop();
    if (lastScrollTop > top + 5) {
        header.slideDown(300, "linear");
        lastScrollTop = top + 5;
    } else if (lastScrollTop < top + 20 && top > 50) {
        header.slideUp(300, "linear");
        lastScrollTop = top - 5;
    }
}

$window.on('scroll', onScroll);


function pageHandler(event) {
    clearWindow();
    currentPage = event.target.id;
    if (currentPage === "about")  {
        $window.on('scroll', scrollJoke);
        $('.about_nav').slideUp();
        console.log("yeah")
    } else {
        $window.off('scroll', scrollJoke);
    }
    if (currentPage === "contacts") {
        $('.contacts').css("display", "flex")
    } else {
        $(document.getElementsByClassName(currentPage)).show(1000);
        if (currentPage === "about") {
            setTimeout(createNavLine, 2000)
        }
    }
}

function clearWindow() {
    setTimeout(() => $window.scrollTop(0), 500);
    $('main > section').hide(1000);
}

//TODO: Оптимизация JS
//TODO: Вариант с JS (не с jQuery)
//TODO: Кроссплатформенность