import { NavLink } from "react-router-dom";

function RemembermeForm() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="remember"
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
        />
        <label
          htmlFor="remember"
          className="ml-2 block text-sm text-neutral-700"
        >
          Remember me
        </label>
      </div>

      <NavLink
        to="/forgot-password"
        className="text-sm text-primary-600 hover:text-primary-700"
      >
        Forgot password?
      </NavLink>
    </div>
  );
}

export default RemembermeForm;
