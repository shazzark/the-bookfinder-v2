import { useEffect, useState } from "react";
// import { supabase } from "../hooks/supabaseClient";
import {
  BellIcon,
  ChatBubbleOvalLeftIcon,
  UserCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../../service/supabase";

function SideHeader({ onProfileClick, compact = false }) {
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        setUserData({
          name: user.user_metadata?.full_name || user.email?.split("@")[0],
          email: user.email,
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUserData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(fetchUserData);
    return () => subscription.unsubscribe();
  }, []);

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
        >
          <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <BellIcon className="h-4 w-4 mr-2" />
              Notifications
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <ChatBubbleOvalLeftIcon className="h-4 w-4 mr-2" />
              Messages
            </button>
            <button
              onClick={onProfileClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <UserCircleIcon className="h-4 w-4 mr-2" />
              Profile
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <button className="relative p-1 text-gray-500 hover:text-gray-700">
        <BellIcon className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-red-500"></span>
      </button>

      <button className="relative p-1 text-gray-500 hover:text-gray-700">
        <ChatBubbleOvalLeftIcon className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
      </button>

      <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
        <button
          onClick={onProfileClick}
          className="text-gray-500 hover:text-gray-700"
        >
          <UserCircleIcon className="h-7 w-7" />
        </button>
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium truncate max-w-[120px]">
            {userData?.name || "User"}
          </p>
          <p className="text-xs text-gray-600 truncate max-w-[120px]">
            {userData?.email || "No email"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideHeader;
