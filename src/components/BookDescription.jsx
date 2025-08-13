export default function BookDescription({ book }) {
  return (
    <div className="prose max-w-none mb-8">
      <p className="text-gray-700">{book.volumeInfo.description}</p>
    </div>
  );
}
