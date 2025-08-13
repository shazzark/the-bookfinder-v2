import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  BookmarkIcon,
  BookOpenIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../hooks/supabaseClient";
import LogoutModal from "../utils/LogoutModal";

export default function Aside({
  activeTab,
  setActiveTab,
  isMobile,
  onItemClick,
}) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const tabButton = (tabName, Icon, label) => (
    <button
      onClick={() => {
        setActiveTab(tabName);
        if (isMobile && onItemClick) onItemClick();
      }}
      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
        activeTab === tabName
          ? "bg-green-100 text-green-800"
          : "hover:bg-green-100"
      }`}
    >
      <Icon
        className={`w-5 h-5 mr-3 ${
          activeTab === tabName ? "text-green-800" : "text-green-600"
        }`}
      />
      <span>{label}</span>
    </button>
  );

  return (
    <>
      <aside
        className={`bg-gray-100 p-6 rounded-lg ${
          isMobile ? "mb-4" : "flex flex-col h-[40rem]"
        }`}
      >
        <div className={isMobile ? "" : "flex-1 overflow-y-auto"}>
          <h2 className="text-xl font-bold mb-6">Library</h2>
          <nav className="space-y-4">
            {tabButton("books", BookOpenIcon, "Books")}
            {tabButton("bookmarks", BookmarkIcon, "Bookmarks")}
            {tabButton("notes", DocumentTextIcon, "Notes")}
            {tabButton("profile", UserCircleIcon, "Profile")}
          </nav>
        </div>

        {/* Logout */}
        <div className="mt-auto pt-4 border-t border-green-200">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center w-full p-3 rounded-lg hover:bg-green-100 transition-colors text-red-600"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {showLogoutConfirm && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </>
  );
}
