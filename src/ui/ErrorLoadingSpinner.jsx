function ErrorLoadingSpinner({ error, fetchLatestBooks }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={fetchLatestBooks}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorLoadingSpinner;
