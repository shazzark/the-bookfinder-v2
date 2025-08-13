import { useEffect, useState } from "react";
import { GENRES } from "./Genres";

const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const booksPerPage = 4;

  const fetchBooks = async (genre = "All", page = 0) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${GOOGLE_BOOKS_BASE_URL}?q=`;

      if (genre !== "All") {
        url += `subject:${encodeURIComponent(genre)}`;
      } else {
        url += "fiction";
      }

      url += `&maxResults=40&startIndex=${page * booksPerPage}`;

      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.items || []);
      setTotalBooks(data.totalItems || 0);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch books:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${GOOGLE_BOOKS_BASE_URL}?q=${encodeURIComponent(query)}&maxResults=20`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (err) {
      setError(err.message);
      console.error("Failed to search books:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if ((currentPage + 1) * booksPerPage < totalBooks) {
      setCurrentPage(currentPage + 1);
      fetchBooks(selectedGenre, currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      fetchBooks(selectedGenre, currentPage - 1);
    }
  };

  useEffect(() => {
    fetchBooks(selectedGenre, currentPage);
  }, [selectedGenre, currentPage]);

  return {
    books,
    loading,
    error,
    GENRES,
    selectedGenre,
    setSelectedGenre,
    currentPage,
    nextPage,
    prevPage,
    fetchBooks,
    searchBooks,
    setCurrentPage,
  };
};

export const booksData = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description:
      "A psychological thriller about a woman who shoots her husband and then stops speaking.",
    category: "Thriller",
    rating: 4.5,
    publishDate: "February 2019",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy & proven way to build good habits & break bad ones.",
    category: "Self-Help",
    rating: 4.7,
    publishDate: "October 2018",
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    description:
      "A science fiction novel about a desert planet and the boy who would become its messiah.",
    category: "Sci-Fi",
    rating: 4.8,
    publishDate: "August 1965",
  },
];

export const bookmarksData = [
  {
    id: 1,
    title: "Bookmarked Title",
    author: "Famous Author",
    lastOpened: "2 days ago",
  },
];
