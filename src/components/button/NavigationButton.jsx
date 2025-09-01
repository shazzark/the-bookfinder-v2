import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// In NavigationButton.jsx - revert to your original version
export default function NavigationButton({
  onPrev,
  onNext,
  disabledPrev,
  disabledNext,
  // loading,
}) {
  return (
    <div className="flex justify-between pt-4 border-t border-gray-300 mt-auto">
      <button
        onClick={onPrev}
        disabled={disabledPrev}
        className={`flex items-center gap-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md transition-colors ${
          disabledPrev ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
        }`}
      >
        <ChevronLeftIcon className="h-5 w-5" />
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={disabledNext}
        className={`flex items-center gap-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md transition-colors ${
          disabledNext ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
        }`}
      >
        Next
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
