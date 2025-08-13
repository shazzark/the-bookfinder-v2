function BookThemeLoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-t-blue-500 border-r-green-500 border-b-yellow-500 border-l-purple-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-blue-300 border-r-green-300 border-b-yellow-300 border-l-purple-300 rounded-full animate-spin [animation-delay:0.2s]"></div>
      </div>
    </div>
  );
}

export default BookThemeLoadingSpinner;
