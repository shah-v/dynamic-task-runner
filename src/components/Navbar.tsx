import { Link, useLocation } from "react-router-dom";

interface NavItem {
  name: string;
  path: string;
}

export const Navbar = () => {
  const location = useLocation();
  const navItems: NavItem[] = [
    { name: "First", path: "/" },
    { name: "Second", path: "/path2" },
    { name: "Third", path: "/path3" },
    { name: "Bouncing Balls", path: "/bb" },
  ];

  return (
    <nav className="bg-blue-500 p-4 text-white shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Learning</h1>
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`hover: underline ${
                  item.path === location.pathname ? "font-bold" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
