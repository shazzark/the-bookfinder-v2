import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Discover from "./pages/Discover";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./components/AuthLayout";
import { Suspense } from "react"; // Add this import
import FullPageSpinner from "./ui/FullPageSpinner";
import BookDetails from "./pages/BookDetails";
import AuthCallback from "./pages/AuthCallback";
import WaitingConfirmation from "./pages/WaitingConfirmation";
import ProtectedRoute from "./utils/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>
          {/* Main App */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route
              path="discover"
              element={
                <ProtectedRoute redirectTo="/login">
                  {" "}
                  <Discover />
                </ProtectedRoute>
              }
            />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/books/:id" element={<BookDetails />} />
            {/* ... other routes ... */}
          </Route>

          {/* Auth Pages */}
          <Route element={<AuthLayout center />}>
            {" "}
            {/* Fixed: Added closing slash */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Special Auth Pages */}
          <Route element={<AuthLayout bare center />}>
            {" "}
            {/* Fixed: Added closing slash */}
            <Route
              path="waiting-confirmation"
              element={<WaitingConfirmation />}
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="auth/callback" element={<AuthCallback />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
