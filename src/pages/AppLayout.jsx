// AppLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../service/supabase";
import Header from "../components/ui/Header";
import { useBookmarks } from "../hooks/useBookmarks";

function AppLayout() {
  const [content, setContent] = useState(null);
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked, getUserRating } = useBookmarks();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  function handleContentChange(newContent) {
    setContent(newContent);
  }

  function handleNavigation(newPath) {
    navigate(newPath);
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b bg-primary-200  ">
      <Header user={user} />

      <main className="w-full max-w-7xl mx-auto pb-6 px-4 sm:px-6 lg:px-8">
        <Outlet
          context={{
            isBookmarked,
            toggleBookmark,
            getUserRating,
            content,
            handleContentChange,
            handleNavigation,
          }}
        />
      </main>
    </div>
  );
}

export default AppLayout;
