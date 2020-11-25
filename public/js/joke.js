//joke function. Easy for understanding (i hope)
function sayHello() {
    if (jokeFormButton.height() === 54) {
        alert("Hello, Jordan");
        alert("Oops, I mean " + jokeFormInput.val() + " =)")
    }
}

// add heart near the face of Steve and make him happy =)
function funSteve() {
    $('.pretty-text').addClass("like");
    jokeImage.attr("src", "media/steve-jobs-fun.jpg")
}

// remove heart (if exist) and make Steve sad =(
function sadSteve() {
    $('.pretty-text').removeClass("like");
    jokeImage.attr("src", "media/steve-jobs-sad.jpeg")
}


//
// MAGIC FLOW
//
// all page changes thanks only one button (joke too)
//

// definition of all DOM objects on the joke page.
let jokeHeader = $('.joke h1'),
    jokeForm = $('.joke form'),
    jokeFormHeader =$('.joke h2'),
    jokeFormLabel = $('.joke label span'),
    jokeFormInput = $('.joke input'),
    jokeFormButton = $('.joke button'),
    jokeImage =  $('.joke img'),
    jokeText = $('.joke span').last(),
    jokeParagraph = $('.joke p:first-of-type'),
    flowButton = $('.joke p:last-of-type');


// every function `pretty{elementName}` make style of {elementName} cooler.

function prettyHeader() {
        jokeHeader.text("Rastorc3v Web Page");
        jokeHeader.addClass("pretty-header");
}

function prettyForm(){
        jokeForm.addClass("pretty-form");
        jokeFormHeader.text("FORM");
        jokeFormLabel.text("Name");
        jokeFormInput.attr("placeholder", "Type your name");
        jokeFormButton.text("Say Hello!");
}

function prettyImage(){
        jokeImage.addClass("pretty-image");
        jokeImage.attr('src', 'media/steve-jobs-fun.jpg')
}

function prettyDescription() {
    jokeText.text("Steve is cool, isn't he?");
    jokeText.addClass("pretty-text");
    jokeParagraph.html("<button onclick='funSteve();'>Yes!</button><button onclick='sadSteve();'>No!</button>");
    jokeParagraph.addClass("pretty-paragraph")

}

//run all pretty functions
function magicFlow() {
    header.css("display", "flex");
    flowButton.text("Better?");
    flowButton.addClass('nice-text');
    prettyHeader();
    prettyForm();
    prettyImage();
    prettyDescription();
    footer.show(1000)
}