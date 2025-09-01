function BookCategories({ book }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {book.volumeInfo.categories?.map((cat, i) => (
          <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BookCategories;
