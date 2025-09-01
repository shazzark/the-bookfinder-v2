// src/components/discoverpagecomponent/BookmarkTabs.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useBookmarks } from "../../hooks/useBookmarks";
import BookmarkList from "./BookmarkList";

export default function BookmarksTab() {
  const { bookmarks, loading } = useBookmarks();

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 text-gray-600 text-center h-64 flex items-center justify-center"
      >
        <p>Loading bookmarks...</p>
      </motion.div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 text-gray-600 text-center h-64 flex items-center justify-center"
      >
        <p>No bookmarks yet. Start bookmarking books to see them here!</p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <BookmarkList />
    </motion.div>
  );
}
