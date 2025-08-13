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

export const handleDownload = (book) => {
  window.open(book.accessInfo?.pdf?.downloadLink || "#", "_blank");
};

// export const handleReadNow = (book) => {
//   window.open(book.accessInfo?.webReaderLink || "#", "_blank");
// };
// src/hooks/bookLogic.js
// export const handleReadNow = (book) => {
//   const canRead =
//     book.accessInfo?.viewability === "ALL_PAGES" ||
//     book.accessInfo?.viewability === "PARTIAL";

//   if (canRead && book.accessInfo?.webReaderLink) {
//     window.open(book.accessInfo.webReaderLink, "_blank");
//   } else {
//     alert("This book is not available for online reading.");
//   }
// };
export const handleReadNow = (book) => {
  const canRead =
    book.accessInfo?.viewability === "ALL_PAGES" ||
    book.accessInfo?.viewability === "PARTIAL";

  if (canRead && book.accessInfo?.webReaderLink) {
    window.open(book.accessInfo.webReaderLink, "_blank");
  } else {
    alert("This book is not available for online reading in your region.");
  }
};
