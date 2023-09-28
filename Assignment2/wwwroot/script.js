$(document).ready(function () {
  // Function to call the 'apiSearch' function on the click of the search button
    $('#Search').click(function () {
    apiSearch();
});

// Function to change the background image on the click of the search engine name
$('header h1').click(function () {
    changeBackgroundImage();
});

// Function to get the current time, load it into the 'time' div, and display it as a dialog window
$('#timeButton').click(function () {
    displayCurrentTime();
});
$('#displayTime').click(function () {
        displayCurrentTime();
});
$('#luckyButton').click(function () {
    apiLucky();
});

});

var len;
var results = '';
var currentIndex = 0; // To keep track of the current background image index
var backgroundImages = ['mcqueen2.jpg', 'mcqueen.jpg']; // Replace with your image URLs


function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "f824ccdc6b3445aa84ee82d858471dfc");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
      $('#searchResults').dialog();
    })
    .fail(function () {
      alert("error");
    });
}

function apiLucky() {
    var params = {
        "q": $("#query").val(),
        "count": "1", // Set the count to 1 to get only the first result
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "f824ccdc6b3445aa84ee82d858471dfc");
        },
        type: "GET",
    })
        .done(function (data) {
            if (data.webPages.value.length > 0) {
                // Ensure there is at least one search result
                var firstResultUrl = data.webPages.value[0].url;
                // Open the first link in a new tab or window
                window.open(firstResultUrl, '_blank');
            } else {
                alert("No search results found.");
            }
        })
        .fail(function () {
            alert("error");
        });
}


// Function to change the background image
function changeBackgroundImage() {
    currentIndex = (currentIndex + 1) % backgroundImages.length;
    const newBackgroundImage = 'url("' + backgroundImages[currentIndex] + '")';
    $('body').css('background-image', newBackgroundImage);
}

// Function to get the current time and display it as a dialog window
function displayCurrentTime() {
    const currentTime = new Date();
    const formattedTime = currentTime.getHours() + ':' + (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();
    $('#time').html('Current Time: ' + formattedTime);

    // Display the 'time' div as a jQuery UI dialog window
    $('#time').dialog();
}