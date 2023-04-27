import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorPage;
