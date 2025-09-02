import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Discover from "./pages/Discover";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import { Suspense } from "react";
// import FullPageSpinner from "./ui/FullPageSpinner";
import BookDetails from "./pages/BookDetails";
import SignUp from "./pages/Signup";
import { AuthProvider } from "./Context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { BookmarksProvider } from "./Context/BookmarkProvider";
import ProtectedRoute from "./components/Common/ProtectedRoutes";
import LatestbookPage from "./pages/LatestbookPage";
import LoadingSpinner from "./ui/LoadingSpinner";
// import { BookmarksProvider } from "./Context/BookmarkContext";

function App() {
  return (
    <AuthProvider>
      <BookmarksProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />

                <Route
                  path="discover"
                  element={
                    <ProtectedRoute>
                      <Discover />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/books/:id"
                  element={
                    <ProtectedRoute>
                      <BookDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="latest-books"
                  element={
                    <ProtectedRoute>
                      <LatestbookPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </BookmarksProvider>
    </AuthProvider>
  );
}

export default App;
