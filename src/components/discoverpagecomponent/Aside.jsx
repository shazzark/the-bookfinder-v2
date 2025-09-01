// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpenIcon,
  BookmarkIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import LogoutModal from "../../utils/LogoutModal";
import { supabase } from "../../service/supabase";
import toast from "react-hot-toast";

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
    toast.info("Logged out successfully");
  };

  const tabButton = (tabName, Icon, label) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        setActiveTab(tabName);
        if (isMobile && onItemClick) onItemClick();
      }}
      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
        activeTab === tabName
          ? "bg-green-100 text-neutral-900"
          : "hover:bg-primary-200"
      }`}
    >
      <Icon
        className={`w-5 h-5 mr-3 ${
          activeTab === tabName ? "text-neutral-800" : "text-neutral-600"
        }`}
      />
      <span>{label}</span>
    </motion.button>
  );

  return (
    <>
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`bg-gray-100 p-6 rounded-lg ${
          isMobile ? "mb-4" : "flex flex-col h-[40rem]"
        }`}
      >
        <div className={isMobile ? "" : "flex-1 overflow-y-auto"}>
          <h2 className="text-xl font-bold mb-6">Library</h2>
          <nav className="space-y-4">
            {tabButton("books", BookOpenIcon, "Books")}
            {tabButton("bookmarks", BookmarkIcon, "Bookmarks")}
          </nav>
        </div>

        <div className="mt-auto pt-4 border-t border-primary-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center w-full p-3 rounded-lg hover:bg-primary-200 transition-colors text-primary-500"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {showLogoutConfirm && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </>
  );
}
