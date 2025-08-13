function BookmarkCard({ bookmark }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="font-bold">{bookmark.title}</h3>
      <p className="text-sm text-gray-600">{bookmark.author}</p>
      <p className="text-xs text-gray-500 mt-2">
        Last opened: {bookmark.lastOpened}
      </p>
    </div>
  );
}

export default BookmarkCard;
