// src/logic/bookLogic.js
export const getBookDetails = (books, id) => {
  return books.find((b) => b.id.toLowerCase() === id.toLowerCase());
};

export const getSimilarBooks = (books, currentBookId, currentCategories) => {
  return books
    .filter(
      (b) =>
        b.id !== currentBookId &&
        b.volumeInfo?.categories?.some((cat) =>
          currentCategories?.includes(cat)
        )
    )
    .slice(0, 4);
};
