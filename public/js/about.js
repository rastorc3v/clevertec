
const navLineHeight = $window.height()*0.7;
const contentHeight = $('.about_content').height();
const navLineElements = $('.about_nav li');
const contentBlocks = $('.about_content .about_block');

//ratio of content height to block size multiplied by height of navLine
//used to correctly position nav elements on navLine


for (let i = 0; i < 4; i++) {
    navLineElements.eq(i).height(contentBlocks.eq(i).height()/contentHeight*navLineHeight);
}

navLineElements.click(() => {
   $('.about_nav ul:before').height(100);
});