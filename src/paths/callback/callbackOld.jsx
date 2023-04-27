import SampleData from "../../sample_data/top_songs_50.json";

const songDataToSongsList = (songData) => {
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
  const images = [...new Set(songs.map((song) => song.image))];
  const imagesToReturn = [];

  while (imagesToReturn.length < 49) {
    images.forEach((image) => {
      if (imagesToReturn.length >= 49) return;
      imagesToReturn.push(image);
    });
  }

  return imagesToReturn;
};

const Callback = () => {
  console.log(SampleData);

  const songs = songDataToSongsList(SampleData);

  console.log(songs);

  const images = generateListOfUniqueAlbumImages(songs);
  console.log(images);

  return (
    <>
      <h1>Your Record</h1>
      <div className='links'>
        <p>
          <a href='/'>Logout</a>
        </p>
        <p>Save Image</p>
      </div>

      <div id='album'>
        <div id='album-record'>
          <img src='https://i.scdn.co/image/ab6775700000ee85fdab38557591bda2500e127a' />
        </div>
        <div id='album-art'>
          {images.map((image, i) => {
            return <img src={image} key={i} />;
          })}
        </div>
      </div>
      <p>
        Made with ❤️ by <a href='https://piemadd.com/'>Piero</a> in Chicago
      </p>
    </>
  );
};

export default Callback;
