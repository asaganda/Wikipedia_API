$(document).ready(function() {

  // Wikipedia AJAX request goes here

  // API url for all image file names on NJ wikipedia page
  var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=query&prop=images&imlimit=max&titles=New%20Jersey&format=json&callback=?';

  // Parent ajax api call
  $.ajax({
    url: wikiUrl,
    dataType: 'jsonp',
    
    success: function(response) {
      //called when successful

      images = response.query.pages[21648].images;

      // for loop iterates over images array object 
      for(var i = 0; i < images.length; i++ ) {

        // output of all file names only in ascending order - sanity check
        console.log(images[i].title);

        imgFile = images[i].title
      
        // output of all images with filenames on page - sanity check
        console.log(response);

        // new api url with img file variable for each iteration done for loop which is used in following ajax api call
        var wikiImgInfo = 'http://en.wikipedia.org/w/api.php?action=query&titles=' + imgFile + '&prop=imageinfo&iiprop=user|url&format=json&callback=?';

      
      // child ajax api call
      $.ajax({
        url: wikiImgInfo,
        dataType: 'jsonp',

        success: function(response) {

          // used for testing of api call for wikiImgInfo api url
          console.log(response);
                 
          // these 2 variables store each image and their author respectively    
          var imgUrl = response.query.pages[-1].imageinfo[0].url;
          var imgAuthor = response.query.pages[-1].imageinfo[0].user;

          // jquery image/author DOM HTML append
          $(".images").append('<img src="' + imgUrl + '">').append('<h4 class="author">Above authored on Wikipedia by: ' + imgAuthor + '</h4>');

        },
        
      }); // end child ajax api call
 
      } // end for loop

    
    }, // first success response for image file name
    
  }); // end parent ajax api call
  
}); // end overall function

