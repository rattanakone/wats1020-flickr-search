// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){	
(function searchImages(tags) {
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
	console.log(tags);
  $('#images').innerHTML = '<li class="search-throbber">Searching...</li>';
  $.getJSON( flickerAPI, { 
	  tags: tags,
      tagmode: "any",
      format: "json"
  }) 
    .done(function( data ) {
      $.each( data.items, function( i, item ) {
        $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" )
		  .wrap("<a href='" + item.link + "' target=\"_blank\"></a>");
      });
	  $(".search-title").html(data.title);
		$.each( data.items, function( i, item ) {
        var newListItem = $("<li>")
        // If you're not doing the modal, then show info about the image.
        var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem);
        var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
        var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);
    });
})();

$('button.search').click(function(event){
	event.preventDefault();
	var newSearch = $(event.target.parentElement).find('input[name="searchText"]')[0];
	console.log(newSearch);
	searchImages(newSearch.value);
  });
});
