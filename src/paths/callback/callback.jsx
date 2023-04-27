import React, { useEffect, useState } from "react";

//import SampleData from "../../sample_data/top_songs_50.json";
//import SampleUser from "../../sample_data/user.json";

const songDataToSongsList = (songData) => {
  console.log(songData);

  return songData.items
    .map((song) => {
      return {
        artists: song.artists.map((artist) => artist.name).join(", "),
        title: song.name,
        popularity: song.popularity,
        image: song.album.images.sort(
          (a, b) => Math.max(b.width, b.height) - Math.max(a.width, a.height)
        )[0].url,
      };
    })
    .sort((a, b) => b.popularity - a.popularity);
};

const generateListOfUniqueAlbumImages = (songs) => {
  const images = [...new Set(songs.map((song) => song.image))].reverse();
  const imagesToReturn = [];

  while (imagesToReturn.length < 49) {
    console.log("toreturn less");
    images.forEach((image) => {
      if (imagesToReturn.length >= 49) return;
      imagesToReturn.push(image);
    });
  }

  return imagesToReturn;
};

const generateMusicObscurityScore = (songs) => {
  const popularities = songs.map((song) => song.popularity);
  const popularityAvg =
    popularities.reduce((a, b) => a + b, 0) / popularities.length;

  return 100 - popularityAvg;
};

const Callback = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [user, setUser] = useState([]);
  const [songs, setSongs] = useState([]);
  const [images, setImages] = useState([]);
  const [musicObscurityScore, setMusicObscurityScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = window.location.href
      .split("access_token=")[1]
      .split("&")[0];
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        setUser(userData);
        fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((songData) => {
            setTopSongs(songData);

            const processedSongs = songDataToSongsList(songData);

            setSongs(processedSongs);
            setImages(generateListOfUniqueAlbumImages(processedSongs));
            setMusicObscurityScore(generateMusicObscurityScore(processedSongs));

            console.log("topSongs:", topSongs);
            console.log("user:", user);
            console.log("songs:", songs);
            console.log("images:", images);
            console.log("musicObscurityScore:", musicObscurityScore);

            if (userData.images.length == 0) {
              userData.images.push({
                url: "/images/no_pfp.png",
              });
              setUser(userData);
            }

            setLoading(false);
          });
      });
  }, []);
  return (
    <>
      <h1>Your Record</h1>
      {loading ? (
        <div id='album-score'>
          <p>Loading....</p>
        </div>
      ) : (
        <>
          <div className='links'>
            <p>
              <a href='/'>Logout</a>
            </p>
            {/*
              <p>Save Image</p>
            */}
          </div>
          <div id='album'>
            <div id='album-record'>
              <img src={user.images[0].url} />
            </div>
            <div id='album-cover'>
              <div id='album-art'>
                {images.map((image, i) => {
                  return <img src={image} key={i} />;
                })}
              </div>
            </div>
          </div>
          <br />
          <div id='album-score'>
            <p>{user.display_name}</p>
            <p>{generateMusicObscurityScore(songs)}% Obscure</p>
          </div>

          <br />
        </>
      )}
      <p>
        Made with ❤️ by <a href='https://piemadd.com/'>Piero</a> in Chicago
      </p>
    </>
  );
};

export default Callback;
