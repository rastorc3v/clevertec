//variables definition
const navButtons = $('#main-navigation li:not(#return)'),
      returnButton = $('#return'),
      header = $('header'),
      footer = $('footer'),
      $window = $(window);
let currentPage = "joke";

//nav buttons click handler
navButtons.click((event) => {
    navButtons.hide();
    setTimeout(() => returnButton.show(500), 500);
    header.toggleClass("slow-move");
    $window.off("scroll", onScroll);
    header.toggleClass("small");
    pageHandler(event);
});

//open navbar click handler
returnButton.click(() => {
    header.toggleClass("small");
    setTimeout(() => header.toggleClass("slow-move"), 1000);
    $window.on("scroll", onScroll);
    returnButton.hide(500);
    setTimeout(() => navButtons.show(500), 600)
});

//auto hide/show navbar according to user scrolling
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

// "open" page with debug functions
function pageHandler(event) {
    clearWindow();
    currentPage = event.target.id;
    if (currentPage === "about")  {
        $window.on('scroll', scrollJoke);
        $('.about_nav').slideUp();
    } else {
        $window.off('scroll', scrollJoke);
    }
    if (currentPage === "contacts") {
        $('.contacts').css("display", "flex")
    } else {
        $('.' + currentPage).show(1000);
        if (currentPage === "about") {
            setTimeout(createNavLine, 2000)
        }
    }
}

// hide all "pages"
function clearWindow() {
    setTimeout(() => $window.scrollTop(0), 500);
    $('main > section').hide(1000);
}