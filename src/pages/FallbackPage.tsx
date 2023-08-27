import { Link } from "react-router-dom";

function FallbackPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The requested page could not be found.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to home page
      </Link>
    </div>
  );
}

export default FallbackPage;
