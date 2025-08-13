import { Outlet } from "react-router-dom";

export default function AuthLayout({ bare = false, center = false }) {
  return (
    <div
      className={`min-h-screen ${bare ? "" : "bg-gray-100"} ${
        center ? "grid place-items-center" : ""
      }`}
    >
      <Outlet />
    </div>
  );
}
