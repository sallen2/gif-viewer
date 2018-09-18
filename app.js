let gifArr = ['cat','dog','bird'];

function printButtons(){
    gifArr.forEach(function(arr){
        let button = $('<button>');
        button.text(arr);
        $('.appendHere').append(button);
    })
}

function addButton(){
    $('.input').keypress(function(event){
        if(event.which === 13){
            let textInput = $('.input').val()
            let button = $('<button>');
            button.text(textInput);
            $('.appendHere').append(button);
        }
    })
}
function clickButton(){
    $('.appendHere').on('click', 'button', function(){
        $('.imgSize').remove();
        let button = $(this);
        let url = `http://api.giphy.com/v1/gifs/search?q=${button.text()}&api_key=ZvkvFY9ajWn9rD4p5XqB5tKiNx3cPtAJ&limit=10`
        $.getJSON(url)
        .done(function(gif){
            gif.data.forEach(function(gif,i){
                let img = $('<img>');
                img.addClass('imgSize');
                img.attr('src', gif.images.fixed_height.url);
                $('.gifHere').append(img);
            })
        })
        .fail(function(){
            console.log('there was a problem');
        })
    })
}
$(document).ready(function(){
    printButtons()
    addButton();
    clickButton();
})