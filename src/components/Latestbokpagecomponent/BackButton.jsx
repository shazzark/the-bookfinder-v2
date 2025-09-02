import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function BackButton({ navigate }) {
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group mb-8"
    >
      <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
}

export default BackButton;
