const Index = () => {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://galaxy.piemadd.com";

  return (
    <div id="title">
      <h1>Album</h1>
      <p>
        <i>What's in yours?</i>
      </p>
      <a
        href={`https://accounts.spotify.com/authorize?client_id=7fb0f4d07ac843eb834a8a291bb91a4c&redirect_uri=${baseURL}/callback&scope=user-top-read&response_type=token&show_dialog=true`}
        className='button'
      >
        Login with Spotify
      </a>
      <p>
        Made with ❤️ by <a href='https://piemadd.com/'>Piero</a> in Chicago
      </p>
    </div>
  );
};

export default Index;
