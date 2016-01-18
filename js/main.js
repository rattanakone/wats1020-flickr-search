// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.

$(document).on('ready', function(){	
function searchImages(tags) { // This function will handle the process of taking a user's search terms and sending them to Flickr for a response.
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"; // Define the location of the Flickr API
	console.log(tags);
    $('#images').innerHTML = '<li class="search-throbber">Searching...</li>';
  $.getJSON( flickerAPI, { // call where you send a request object including the tags the user submitted
	  tags: tags,
      tagmode: "any",
      format: "json"
  }) 
    .done(function( data ) { //handler that displays 
	  $('#images').empty(); // refreshes the content every time user searches for a new tag 
      $.each( data.items, function( i, item ) {
        $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" ) // appends the displayed results into images container
		  .wrap("<a href='" + item.link + "' target=\"_blank\"></a>"); // wrap the images and open up into new window when clicked on
      });
	  $(".search-title").html(data.title); // search title that displays the current tag of results
    });
}

$('button.search').click(function(){ // execute the search when clicked
	event.preventDefault(); // Prevent the default event execution so the browser doesn't
	var newSearch = $(this.parentElement).find('input[name="searchText"]')[0]; // Get the value of the 'input[name="searchText"]' and use that as the `tags` value send to `searchImages()`.
	searchImages(newSearch.value); // Execute the `searchImages()` function to fetch images for the user
  });
});
