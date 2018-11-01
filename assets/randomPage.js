$(document).ready(function () {
  var search = "";
  var show = [];
  var showId = "";

  var RandomTvShowQueryByGenre = "";
  var collection = [];
  var test = "";

  var genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


  for (i = 0; i < 10; i++) {
    
    var randomGenre = genres[Math.floor(Math.random() * genres.length)];

    search = randomGenre.id;
    RandomTvShowQueryByGenre = "https://api.themoviedb.org/3/discover/tv?api_key=3b90c41cf16ced55f6bcaedd7b858cb5&with_genres=" + search;

    callApi();
  }

  function callApi() {


    $.ajax({
      url: RandomTvShowQueryByGenre,
      method: "GET",


      success: function (response) {

        console.log(response);
        var randomResponse = response.results[Math.floor(Math.random() * response.results.length)];
        console.log(randomResponse);

        show[i] = {
          title: randomResponse.name,
          overview: randomResponse.overview,
          poster: randomResponse.poster_path,
          tvShowId: randomResponse.id

        };
        var image = $("<img>");
        var title = randomResponse.name;
        var description = randomResponse.overview;
        image.attr("src", "https://image.tmdb.org/t/p/w500" + randomResponse.poster_path);
        image.addClass("imageStyle");
        image.attr(show[i]);

        var collapseDiv = $("<div class='row hideShow'></div>");
        var descriptionDiv = $("<div class='card card-body'><p>" + description + "</p></div>").addClass("dynamicText");
        var tvDescriptionButton = $("  <button class='btn btn-primary slideToggle' type='button' >Show Description</button>").addClass("dynamicButton");





        var eachImageDiv = $("<div>");
        
        var titleDiv = $("<h3>"+title+"</h3>");
        titleDiv.addClass("titleStyle");
        eachImageDiv.append(titleDiv);
        eachImageDiv.append(image);
        collapseDiv.append(descriptionDiv);
        eachImageDiv.append(tvDescriptionButton);
        eachImageDiv.append(collapseDiv);

        $(collapseDiv).hide();


        $("#mainContent").append(eachImageDiv);
        eachImageDiv.addClass("randomDiv");

        $(image).on("click", function () {
          $("#mainContent").empty();
          $("#altNavPosition").empty();

          var poster = $(this).attr("poster");
          var image = $("<img>").addClass("resizeImage").attr("src", "https://image.tmdb.org/t/p/w500" + poster);
          var title = $(this).attr("title");
          var summary = $(this).attr("overview");
          var tvShowId = $(this).attr("tvShowId");

          showId = tvShowId;
          test = title + " tv show";
          var watchListName = title;
         localStorage.setItem("title", watchListName);

          var addToWatchListButton = $("<button id='addToWatchList'>Add to Watchlist</button>");

          var mainContentDivR = $("<div>");
          var titleDiv = $("<h3>"+title+"</h3>");
          titleDiv.addClass("titleStyle");
          mainContentDivR.append(titleDiv);
          mainContentDivR.append(image);
          image.attr("alt", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxAvC_jMzhEU5JbW2A2zhPFDlaTZlrB6EaGilWU7Ok7nI8Wyrd");

          mainContentDivR.append("<p>"+summary+"</p>");
          mainContentDivR.addClass("randomDivClick");
          $("#mainContent").append(mainContentDivR);
          

          var altNav = $("<a class='altNavButtons current' id='mainDisplay'>Main</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id = 'reviews'>Reviews</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id = 'news'>News</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id = 'highlights'>Highlights</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id ='purchase'>Purchase</a>");
          $("#mainContent").append(addToWatchListButton);

          $("#altNavPosition").append(altNav);

          $(document).on("click", "#mainDisplay", function () {


            $("#mainContent").empty();
            $("#altNavPosition").empty();


            

            $("#mainContent").append(mainContentDivR);
            $("#mainContent").append(addToWatchListButton);

            $("#altNavPosition").append(altNav);
          });
        });

      

      }, error: function () {

        var warning = $("<h5><strong>Were going to give it to you straight, something went wrong with the api, were not sure what, but i promise a TMDB programmer is working hard to figure it out, please try again later.</strong></h5>").addClass("text-danger");
        $("#mainContent").append(warning);        
    }

    });

    

  };

  $(document).on("click", ".slideToggle", function () {

    $(this).parent().find(".hideShow").slideToggle("slow", function () {

    });
});





$(document).on("click", "#reviews", function () {

  var tvShowQueryReviews = "https://api.themoviedb.org/3/tv/" + showId + "/reviews?api_key=3b90c41cf16ced55f6bcaedd7b858cb5";
  var altNav = $("<a class='altNavButtons active' id='mainDisplay'>Main</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons current' id = 'reviews'>Reviews</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id = 'news'>News</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id = 'highlights'>Highlights</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id ='purchase'>Purchase</a>");

  $.ajax({
      url: tvShowQueryReviews,
      method: "GET",
      success: function (response) {
          $("#mainContent").empty();
          console.log(response);
          console.log(response.results.length);
          if (response.results.length === 0) {
              $("#mainContent").html("There are currently no Reviews for " + test + " please try again later or use google. ");


          }
          else {
          for (var i = 0; i < response.results.length; i++) {
         
             

              var author = response.results[i].author;
              var reviewContent = response.results[i].content;

              $("#mainContent").append("<strong>" + "Author: " + author + " " + "</strong>");
              $("#mainContent").append(reviewContent + "<br>" + "<br>");
          }
          $("#mainContent").prepend("<h3>The Movie Database Reviews</h3>");


      }


      }, error: function () {
          var warning = $("<h5><strong>Were going to give it to you straight, something went wrong with the api, were not sure what, but i promise a TMDB programmer is working hard to figure it out, please try again later.</strong></h5>").addClass("text-danger");
          $("#mainContent").append(warning);

      }



  });
  $("#altNavPosition").html(altNav);

});



$(document).on("click", "#highlights", function () {
  var altNav = $("<a class='altNavButtons active' id='mainDisplay'>Main</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id = 'reviews'>Reviews</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id = 'news'>News</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons current' id = 'highlights'>Highlights</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id ='purchase'>Purchase</a>");


  debugger;

  $("#mainContent").empty();

  var highlightVideos = {
      part: 'snippet',
      key: 'AIzaSyAfOEz01Vv4pWi9EtqUDb8Z5nlthL3mjA0',
      type: "video",
      q: test,
      maxResults: 10
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, highlightVideos, function (response) {
      for (var i = 0; i < response.items.length; i++) {
          var videoIds = response.items[i].id.videoId;
          var frame = $("<iframe width='355' height='200' src='https://www.youtube.com/embed/" + videoIds + "' frameborder='0' allowfullscreen></iframe>");
          $("#mainContent").append(frame);
      }

  });



  $("#altNavPosition").html(altNav);


});
$(document).on("click", "#news", function () {



  event.preventDefault();
  $("#mainContent").empty();


  var tvShowNewsQuery = "https://newsapi.org/v2/everything?q=" + test + "&sources=bbc-news,entertainment-weekly,buzzfeed,google-news,the-huffington,the-verge,wired-post&apiKey=7d5dfd55160e485e8d9ec889b85e0bef ";
  var altNav = $("<a class='altNavButtons active' id='mainDisplay'>Main</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id = 'reviews'>Reviews</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons current' id = 'news'>News</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons ' id = 'highlights'>Highlights</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id ='purchase'>Purchase</a>");

  $.ajax({
      url: tvShowNewsQuery,
      method: "GET",
      success: function (response) {
          for (var i = 0; i < 7; i++) {

              if(response.totalResults === 0){
                  $("#mainContent").html("There are currently no News Articles for the " + test + " please try again later or use google. " + "<h5 class='text-danger'>This message will self destruct in 5 seconds.</h5> ");

              }
              else {

             
              var articleTitle = response.articles[i].title;
              var articleDescription = response.articles[i].description;
              var articleUrl = response.articles[i].url;
              var mainContentDiv = $("<div>");
              var articleListItem = $("<li>");
              var link = $("<a href = '" + articleUrl + "' target = 'blank'>Read More</a><br><br>");
              $(mainContentDiv).append(" <li><strong>Title: </strong>" + "<u>" + articleTitle + "</u>" + "<br></li>");
              $(mainContentDiv).append(articleDescription + "<br>");

              $(mainContentDiv).append(link);
              $("#mainContent").append(mainContentDiv);
              }

          }
      }, error: function () {
          $("#mainContent").html("<strong>Were going to give it to you straight, something went wrong with the api, were not sure what, but i promise a newsAPI programmer is working hard to figure it out, please try again later.</strong>").addClass("text-danger");
      }
  });
  $("#altNavPosition").html(altNav);

});

$(document).on("click", "#purchase", function () {
  $("#mainContent").empty();

  var tvShowQueryForId = "https://itunes.apple.com/search?term=" + test + "&media=tvShow&entity=tvSeason";
  var altNav = $("<a class='altNavButtons active' id='mainDisplay'>Main</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id = 'reviews'>Reviews</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons' id = 'news'>News</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons ' id = 'highlights'>Highlights</a>" + '&nbsp | &nbsp' + "<a class='altNavButtons current' id ='purchase'>Purchase</a>");


  $.ajax({
      url: tvShowQueryForId,
      method: "GET",
      dataType: "json",
      success: function (response) {
          var tvShowAppleId = response.results[0].artistId;
          var tvShowPurchaseQuery = "https://itunes.apple.com/lookup?id=" + tvShowAppleId + "&sort=recent&media=tvShow&entity=tvSeason";

          $.ajax({
              url: tvShowPurchaseQuery,
              method: "GET",
              dataType: "json",
              success: function (response) {
                  //    var purchaseData =  JSON.parse(response);

                  for (i = 1; i < response.results.length; i++) {

                      collection[i] = {
                          collectionName: response.results[i].collectionName,
                          collectionCost: response.results[i].collectionPrice,
                          collectionImage: response.results[i].artworkUrl100,
                          collectionViewUrl: response.results[i].collectionViewUrl
                      };

                      var artistId = response.results[i].artistId;
                      var collectionCost = response.results[i].collectionPrice;
                      var collectionImage = response.results[i].artworkUrl100;
                      var collectionName = response.results[i].collectionName;
                      var collectionViewUrl = response.results[i].collectionViewUrl;
                      var image = $("<img>").attr("src", collectionImage);

                      image.attr(collection[i]);
                      var collectionLink = $("<a href='" + collectionViewUrl + "' target = 'blank'> View all episodes</a>");
                      var mainContentDiv = $("<div>");
                      var eachSeasonDiv = $("<div>");
                      eachSeasonDiv.append(image);
                      eachSeasonDiv.append(collectionName);
                      
                      eachSeasonDiv.append(collectionLink);
                      eachSeasonDiv.append(" $" + collectionCost);

                      $("#mainContent").prepend(eachSeasonDiv);
                  }
              }
          });
      }
  });
  $("#altNavPosition").html(altNav);

});

//borrowed from w3schools
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


});