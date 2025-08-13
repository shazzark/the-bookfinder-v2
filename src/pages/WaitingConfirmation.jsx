import { useLocation } from "react-router-dom";

export default function WaitingConfirmation() {
  const { state } = useLocation();
  const email = state?.email || "your email";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Almost There!</h2>
        <p className="mb-2">We've sent a confirmation link to:</p>
        <p className="font-mono bg-gray-100 p-2 rounded">{email}</p>
        <p className="mt-4 text-gray-600">
          Check your inbox and click the link to complete signup.
        </p>
      </div>
    </div>
  );
}
