var songSearchEl = document.querySelector("#song");
var artistSearchEl = document.querySelector("#artist");
var searchSongBtn = document.querySelector("#searchSong");
var songInfo = document.querySelector("#songInfo");
var lyricsDisplay = document.querySelector("#lyricsDisplay");
var video = document.querySelector("#video");
var song = "";
var artist = "";

var formSubmitHandler = function (event) {  
    event.preventDefault();

    song = songSearchEl.value.trim();
    artist = artistSearchEl.value.trim();

    if (song, artist) {
        console.log(song, artist);
        songSearch(song, artist);
        songInfo.textContent = song.toUpperCase() + " BY " + artist.toUpperCase();
        songSearchEl.value = "";
        artistSearchEl.value = "";
    } else {
        alert("Please Enter A Song Title And Artist Name");
    }
}

var songSearch = function (song, artist) { 
    console.log("songSearch " + song, artist);
    var apiURL = "https://api.lyrics.ovh/v1/" + artist + "/" + song;
    console.log(apiURL);
    fetch(apiURL).then(function (response) {  
        if (response.ok) {
            response.json().then(function (data) {  
                console.log(data.lyrics);
                displayLyrics(data);
            })
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function (event) {  
        alert("Unable to connect to Lyrics API");
    })
}

var displayLyrics = function (data) {
    if (data.lyrics.length === 0) {
        console.log("no lyrics found");
        lyricsDisplay.textContent = "No Lyrics Found";
        return;
    } else {
        lyricsDisplay.textContent = "";
        lyricsDisplay.textContent = data.lyrics;
        
        // YOUTUBE
        var YoutubeApi = "AIzaSyDmjBtZUutKjG2725gC5lcGoV_jzDwbR7o";
        console.log("Youtube " + song, artist);
        fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + song + " " + artist + "&type=video&videoCaption=closedCaption&key=" + YoutubeApi)

        .then(function (response) {  
            if (response.ok) {
                response.json().then(function (data) {  
                    console.log(data);
                    var videoId = data.items[0].id.videoId;
                    document.getElementById("video").src = "https://www.youtube.com/embed/" + videoId;
                })
            } else {
                alert("Error: " + response.statusText);
            }
        })
    }
}

searchSongBtn.addEventListener("click", formSubmitHandler);


