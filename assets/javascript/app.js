
$(document).ready(function(){
    //variable for the available buttons!
    var topics = ['Professor Farnsworth', 'Phillip J Fry', 'Leela', 'Bender', 'Hypnotoad', 'Zoidberg', 'Nibbler', 'Hermes Conrad', 'Amy Wong', 'Kif Kroker', 'Zapp Brannigan', 'Morbo'];
    //function to create a new button and add class, attribute, and text of user entry.
    function buttonExpress(){
        $('#buttonsView').empty();
        for ( var i=0; i < topics.length; i++) {
            var a = $('<button>');
            a.addClass('expression');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            //append the button with Jquery!
            $('#buttonsView').append(a);
        }
    }    
    //invoke the function written above
    buttonExpress();

  $(document).on('click', '.expression', function() {
    var person = $(this).html(); 
    console.log(person);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=qxJTnHTz156tpfedrbdhRmUse97179Zd&limit=10";
        //ajax call to retreive data from giphy using my API.
        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            var results = response.data;
            $('#expressView').empty();
                //creating for loop so that results display into the divs from the index file.
                for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                    var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    expressImage.attr('data-state', 'still');
                    //prepend the images once the next button is pushed by user!
                    $('#expressView').prepend(expressImage);
                    expressImage.on('click', playGif);
                        var rating = results[j].rating;
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#expressView').prepend(displayRated);
                }
        });

        //now a function to call forth the two different states of the gif... first the animate and then on user click to stop being animate.
        
        function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                     $(this).attr('data-state', 'animate');
                 } else {
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }
                }
    })

// now to prevent the user from entering nothing into the field-- 
// if the user clicks the submit button with nothing in the field then the page will alert the user to enter something before pushing the submit button.

$(document).on('click', '#addExpress', function(){
    if ($('#express-input').val().trim() == ''){
      alert('I do not want to live on this planet anymore! Please input something in the search bar!');
   }
   else {
    var person = $('#express-input').val().trim();
    topics.push(person);
    $('#express-input').val('');
    buttonExpress();
    return false;
    }
});
});