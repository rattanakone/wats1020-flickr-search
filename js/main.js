// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){	
function searchImages(tags) {
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
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
    });
}

$('button.search').click(function(){
	event.preventDefault();
	var newSearch = $(this.parentElement).find('input[name="searchText"]')[0];
	searchImages(newSearch.value);
  });
});
