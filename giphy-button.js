const buttonList = ['titanic', 'the beach', 'The Aviator', 'great gatsby', 'man in the iron mask', 'blood diamond'];

const nav = $("#navigation");
const display = $('#display');
const search = $("#search");

nav.html(createButton()); //rendering default movie buttons


search.html(`<form onsubmit="addNav()">
Search: <input type="text" name="searchTerm"><br>
<input type="submit" value="Submit">
</form>`);

// Add Value to Navigation
function addNav() {
    event.preventDefault();
    buttonList.push($('input').val());
    console.log(buttonList);

    nav.html(createButton());

    $(".nav-button").on("click", function () {
        // In this case, the "this" keyword refers to the button that was clicked
        var movie = $(this).attr("data-movie");
        console.log(movie);
        // Constructing a URL to search Giphy for the name of the movie
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function (response) {

                // Storing an array of results in the results variable
                var results = response.data;
                console.log(results)

                var gifDiv = $("<div>"); // Creating a div for the gif set above for loop so it will be remembered
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r") {

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating an image tag
                        var movieImage = $("<img>");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        console.log(results[i].images.fixed_height.url)
                        movieImage.attr("src", results[i].images.fixed_height_still.url);
                        movieImage.attr("data-still", results[i].images.fixed_height_still.url);
                        movieImage.attr("data-animate", results[i].images.fixed_height.url);
                        movieImage.attr("data-state", 'still');

                        // Appending the paragraph and movieImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(movieImage);
                    }
                    console.log(gifDiv)
                }

                $("#display").html(gifDiv);
                $("img").on("click", function () {
                    //console.log(767676)

                    var state = $(this).attr('data-state'); //this is referencing our image to track data state (we need to find out if it's animated or paused)
                    //console.log(state, "IM HERREE?")
                    if (state === 'still') { //check what data attribute is stored as, if it is = to still(paused) then animate it
                        $(this).attr('src', $(this).attr('data-animate')); //animates gif when set to still
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).attr('data-still'));
                        $(this).attr('data-state', 'still');
                    }
                });
            });
    });
}

 // Create button with search words as string with spaces= "-"
function createButton() {
    const newArray = [];
    buttonList.forEach(buttonString => {
        newArray.push(`<button class="nav-button" data-movie=${buttonString.replace(/\s+/g, '-')}>${buttonString}</button>`)
    })
    console.log(newArray)
    return newArray
}






