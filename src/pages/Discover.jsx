import { useState } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Aside from "../components/discoverpagecomponent/Aside";
import Article from "../components/discoverpagecomponent/Article";

export default function Discover() {
  const [activeTab, setActiveTab] = useState("books");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4">
      {/* Back Navigation */}
      <div className="flex items-center mb-6">
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-2" />
          Back to articles
        </button>

        {/* Mobile toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden ml-auto p-2 rounded-md text-primary-300"
        >
          {sidebarOpen ? (
            <XMarkIcon className="w-5 h-5" />
          ) : (
            <Bars3Icon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Mobile sidebar */}
        <div className={`lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
          <Aside
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={true}
            onItemClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Aside
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={false}
          />
        </div>

        {/* Article content */}
        <div
          className={`${
            sidebarOpen ? "hidden" : "block"
          } lg:block lg:col-span-2`}
        >
          <Article activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
}
