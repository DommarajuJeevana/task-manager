import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const location = useLocation();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    navigate("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Task Manager
        </Link>

        <div className="flex items-center gap-4">
          {userInfo ? (
            <>
              <span className="font-medium text-gray-600">
                {userInfo.name}
              </span>

              <button
                onClick={logoutHandler}
                className="bg-black text-white px-4 py-2 rounded-xl"
              >
                Logout
              </button>
            </>
          ) : (
            location.pathname !== "/login" &&
            location.pathname !==
              "/register" && (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-black"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-black text-white px-4 py-2 rounded-xl"
                >
                  Register
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;