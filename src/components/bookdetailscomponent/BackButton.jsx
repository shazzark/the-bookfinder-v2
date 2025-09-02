import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function BackButton({ navigate }) {
  return (
    <div className="px-4 sm:px-6 pt-4 sm:pt-6">
      <button
        onClick={() => navigate("/discover")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Discover</span>
      </button>
    </div>
  );
}

export default BackButton;
