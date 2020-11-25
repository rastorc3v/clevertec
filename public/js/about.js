// define variables of vertical navigation line.
const navLineHeight = $window.height()*0.7;
let navLineElements = $('.about_nav li'),
    contentBlocks = $('.about_content .about_block');

// ratio of content height to block size multiplied by height of navLine.
// used to correctly position nav elements on navLine.
function createNavLine() {
    let contentHeight = $(document).height();
    for (let i = 0; i < 4; i++) {
        navLineElements.eq(i+1).height(contentBlocks.eq(i).height() / contentHeight * navLineHeight);
    }
    navLineElements.eq(1).css("padding-top", contentBlocks.eq(0).offset().top/contentHeight*navLineHeight);  //edit
    navLineElements.eq(4).css("padding-bottom", (contentHeight - contentBlocks.eq(3).offset().top - contentBlocks.eq(3).height() - $window.height()) / contentHeight * navLineHeight);
    $('.about_nav').slideDown(1000);
}

// change green line height according to user scrolling. Look like great scrollbar.
// *height* - window height feature doesn't use to correctly working of navigation line.
$window.on('scroll', updateNavLine);

function updateNavLine() {
    let a = $window.scrollTop();
    let windowHeight = $(document).height();
    navLineElements.eq(0).height(a/windowHeight*navLineHeight + 10)
}

// definition slider variables.
// right border use for optimize. Don't fetching requests when user just click right arrow.
const slider = $('.slider');
let currPosition = 0;
let rightBorder = -400;

// async function for get random user information (first name, photo url)
async function getUser() {
    // create new slide with pseudo loading animation
    let newSlide = $('<div>').addClass('slide');
    slider.append(newSlide);

    // await response from randomuser.me API
    let response = await fetch('https://randomuser.me/api/?inc=name,picture&gender=male').catch((err) => {
        console.log(err)
    });
    // get body in json
    let user = await response.json().catch((err) => console.log(err));

    if (response.ok) {
        newSlide.append(
            $('<img alt="random man" src="">').attr('src', user.results[0].picture.large),
            $('<span>').text(user.results[0].name.first));
    } else {
        console.log("fetching error")
    }
}

// check out user's current position and right border's position to create (or not) new slide.
// don't pay attention that promise from getUser ignored. // I add .then() to hide warning.
function checkBorders() {
    if (currPosition <= rightBorder) {
        getUser("next").then();
        rightBorder -= 400;
    }
    if (currPosition === -400) {
        $('#previous').hide();
        $('#next').css("margin-left", "calc(50% - 25px)");
    }
}

// move slider. It seems like only one slide move.
function moveSlider(direction) {
    checkBorders();
    if (direction) {
        currPosition -= 400;
        $('#previous').css("display", "inline");
        $('#next').css("margin-left", "0");
        slider.css('transform', "translateX(" + (currPosition) + "px");
    } else {
        currPosition += 400;
        slider.css('transform', "translateX(" + currPosition + "px");
    }
}


// ha-ha =)
// It's joke too. (Last navigation element's name is "My credit card's data" and function below have you to scroll up
// when you try to check it out
function scrollJoke() {
    let top = $window.scrollTop();
    if (top > $(document).height() * 0.6) $window.scrollTop(0)
}