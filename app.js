let gifArr = ['cat','dog','bird','kanye west','michael jordan','kobe','Dragon Ball'];
let slideUp = {
    distance: '2000%',
    origin: 'bottom',
    opacity: null
};
let slideUp2 = {
    distance: '2000%',
    origin: 'bottom',
    delay: 200,
    opacity: null
};
let slideUp3 = {
    distance: '3000%',
    origin: 'bottom',
    delay: 400,
    opacity: null
};
function printButtons(){
    gifArr.forEach(function(arr){
        let button = $('<button>');
        button.text(arr);
        button.addClass('btn btn-primary reveal load-hidden')
        button.addClass('buttonStyle')
        $('.appendHere').append(button);
        ScrollReveal().reveal('.reveal', slideUp);
    })
}
function addButton(){
    $('.input').keypress(function(event){
        if(event.which === 13){
            let textInput = $('.input').val()
            $('.input').val('');
            let button = $('<button>');
            button.addClass('buttonStyle btn btn-primary Reveal');
            button.text(textInput);
            $('.appendHere').append(button);
        }
    })
}
function clickButton(){
    $('.appendHere').on('click', 'button', function(){
        $('.imgSize').remove();
        $('p').remove()
        let button = $(this);
        let url = `https://api.giphy.com/v1/gifs/search?q=${button.text()}&api_key=ZvkvFY9ajWn9rD4p5XqB5tKiNx3cPtAJ&limit=10`
        $.getJSON(url)
        .done(function(gif){
            gif.data.forEach(function(gif){
                let img = $('<img>');
                img.addClass('imgSize imgStyle');
                ScrollReveal().reveal('.imgStyle',{ easing: 'ease-in'});
                img.attr('src', gif.images.fixed_height_still.url);
                img.attr('data-still', gif.images.fixed_height_still.url);
                img.attr('data-animate', gif.images.fixed_height.url);
                img.attr('data-state', 'still');
                $('.gifHere').prepend(img, `<p class="removeP">Rating: ${gif.rating}</p>`);
            })
        })
        .fail(function(){
            console.log('there was a problem');
        })
    })
}
function playOrPauseGif(){
    $('.gifHere').on('click','img', function(){
        let img = $(this);
        if(img.attr('data-state') === 'still'){
            img.attr('src', img.attr('data-animate'))
            img.attr('data-state', 'animate');
        }else{
            img.attr('src', img.attr('data-still'))
            img.attr('data-state', 'still'); 
        }
        
    })
}
$(document).ready(function(){
    printButtons()
    ScrollReveal().reveal('.form-control', slideUp2);
    ScrollReveal().reveal('.commentReveal', slideUp3);
    addButton();
    clickButton();
    playOrPauseGif();
})