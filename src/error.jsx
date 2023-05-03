import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <p>{error.message}</p>
      <p>
        Seems like we ran into an error, probably with getting data from
        spotify. Please <a href='/'>try again</a> and{" "}
        <a href='mailto:piero@piemadd.com'>email me</a> if you continue to face
        problems.
      </p>
    </div>
  );
};

export default ErrorPage;
