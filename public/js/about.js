
const navLineHeight = $window.height()*0.7;
let navLineElements = $('.about_nav li');
let contentBlocks = $('.about_content .about_block');

//ratio of content height to block size multiplied by height of navLine
//used to correctly position nav elements on navLine

function createNavLine() {
    console.log("create")
    let contentHeight = $(document).height();
    for (let i = 0; i < 4; i++) {
        navLineElements.eq(i+1).height(contentBlocks.eq(i).height() / contentHeight * navLineHeight);
    }
    navLineElements.eq(1).css("padding-top", contentBlocks.eq(0).offset().top/contentHeight*navLineHeight);  //edit
    navLineElements.eq(4).css("padding-bottom", (contentHeight - contentBlocks.eq(3).offset().top - contentBlocks.eq(3).height() - $window.height()) / contentHeight * navLineHeight);
    $('.about_nav').slideDown(1000);
}

$window.on('scroll', updateNavLine);

function updateNavLine() {
    let a = $window.scrollTop();
    let windowHeight = $(document).height();
    navLineElements.eq(0).height(a/windowHeight*navLineHeight + 10)
}

const slider = $('.slider');
let currPosition = 0;
let rightBorder = -400;


async function getUser() {
    let newSlide = $('<div>').addClass('slide');
    slider.append(newSlide);

    let response = await fetch('https://randomuser.me/api/?inc=name,picture');
    let user = await response.json().catch((err) => console.log(err));

    if (response.ok) {
        newSlide.append(
            $('<img>').attr('src', user.results[0].picture.large),
            $('<span>').text(user.results[0].name.first));
    } else {
        console.log("fetching error")
    }
}

function checkBorders() {
    if (currPosition <= rightBorder) {
        getUser("next");
        rightBorder -= 400;
    }
    if (currPosition === -400) {
        $('#previous').hide();
        $('#next').css("margin-left", "calc(50% - 25px)");
    }
}

function moveSlider(direction) {
    checkBorders();
    if (direction) {
        console.log(currPosition)
        currPosition -= 400;
        $('#previous').css("display", "inline");
        $('#next').css("margin-left", "0");
        slider.css('transform', "translateX(" + (currPosition) + "px");

    } else {
        currPosition += 400;
        slider.css('transform', "translateX(" + currPosition + "px");
    }
}

$window.on('scroll', scrollJoke);

function scrollJoke() {
    let top = $window.scrollTop();
    if (top > $(document).height() * 0.6) $window.scrollTop(0)
}