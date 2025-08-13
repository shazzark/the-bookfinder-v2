function StatusMessage({ loading, error }) {
  if (loading) return <p className="text-center py-8">Loading books...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;
  return null;
}

export default StatusMessage;
