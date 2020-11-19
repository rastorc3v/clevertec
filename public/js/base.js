
const navButtons = $('#main-navigation li:not(#return)');
const returnButton = $('#return');
const header = $('header');
const footer = $('footer');
const $window = $(window);

navButtons.click((event) => {
    navButtons.hide();
    setTimeout(() => returnButton.show(500), 500);
    header.toggleClass("slow-move");                                        //off
    $window.off("scroll", onScroll);
    header.width(300);
    pageHandler(event);
});

returnButton.click(() => {
    header.width(100 + "%");
    setTimeout(() => header.toggleClass("slow-move"), 1000); //on
    $window.on("scroll", onScroll);
    returnButton.hide(500);
    setTimeout(() => navButtons.show(500), 600)
});

// function errorHandler(err, place) {
//     if (err) console.log("Error at " + place)
// }
//
// async function getUser() {
//     let user = await fetch('https://randomuser.me/api/?inc=name,picture');
//     // errorHandler(!user.json().ok, "Fetch Request");
//     return await user.json()
// }
//
//
// getUser()
//     .then((user) => console.log(user));


//scroll check


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
    $(document.getElementsByClassName(event.target.id)).show(1000)
}

function clearWindow() {
    $('main > section').hide(1000);
}