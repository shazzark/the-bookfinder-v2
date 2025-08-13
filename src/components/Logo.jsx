import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img
        src="/logo.png"
        alt="Bookfinder logo"
        className="size-24 shrink-12 h-[7.2rem] "
      />
    </Link>
  );
}

export default Logo;
