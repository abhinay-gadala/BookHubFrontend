


const NotFound = () => {
 return (
  <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="text-center w-full max-w-lg">
        <div className="mb-6">
          <img
            src="https://img.freepik.com/vektor-gratis/404-error-with-a-landscape-concept-illustration_114360-7898.jpg"
            alt="Page Not Found Illustration"
            className="rounded-xl w-full mx-auto"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
       
      </div>
    </div>
  </>
    
  );
};

export default NotFound;
