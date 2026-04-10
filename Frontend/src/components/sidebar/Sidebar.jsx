import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { sidebarItems } from "../../constantdata";
import { securityBar } from "../../constantdata";
import { residentItems } from "../../constantdata";
import Logo from "../Logo";
import logout from "../../assets/images/logout.png";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../services/AuthService";
import sidebaricon from "../../assets/images/sidebarmenuicon.png";
import downangle from "../../assets/images/downangle.svg";
import { LogoutUser } from "../../redux/features/AuthSlice";
const tabs = securityBar;

export default function Sidebar({ isopen, onclose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(null);
  const [openSubItems, setOpenSubItems] = useState({});
  const [tabs, setTabs] = useState([]);
  const { role } = useSelector((store) => store.auth.user);

  const handleItemClick = (item) => {
    if (item.subItems) {
      setOpenSubItems((prev) => {
        const newState = { [item.id]: !prev[item.id] };
        localStorage.setItem("openSubItems", JSON.stringify(newState));
        return newState;
      });
    } else {
      setOpenSubItems({});
      localStorage.removeItem("openSubItems");
      onclose();
    }
    setActiveItem(item.id);
    localStorage.setItem("activeItem", item.id);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      navigate("/");
      dispatch(LogoutUser());
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    if (isopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    const savedSubItems = localStorage.getItem("openSubItems");
    if (savedSubItems) {
      setOpenSubItems(JSON.parse(savedSubItems));
    }
    const activeParentItem = tabs.find(
      (item) =>
        item.subItems?.some((subItem) => subItem.path === currentPath) ||
        item.path === currentPath
    );

    if (activeParentItem) {
      setActiveItem(activeParentItem.id);
      if (activeParentItem.subItems) {
        setOpenSubItems((prev) => ({
          ...prev,
          [activeParentItem.id]: true,
        }));
      }
    }

    if (role === "admin") {
      setTabs(sidebarItems);
    } else if (role === "security") {
      setTabs(securityBar);
    } else if (role === "resident") {
      setTabs(residentItems);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isopen, location.pathname, role, tabs]);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-[9999] h-full w-[280px] bg-theme-card p-4 shadow-lg border border-theme-border transition-all duration-300 lg:transition-none lg:relative lg:transform-none ${
          isopen ? "translate-x-0" : "-translate-x-full"
        } lg:w-[280px] lg:block text-theme-text`}
      >
        <div className="flex justify-between items-center mb-[30px] border-b border-theme-border pb-[28px] pt-[15px]">
          <Logo sidebarlogo />
          <button
            onClick={onclose}
            className="lg:hidden fixed top-[12px] right-[8px] text-theme-text"
          >
            <IoMdClose size={20} />
          </button>
        </div>

        <nav>
          <ul>
            {tabs.map((item) => (
              <li key={item.id}>
                {item.name === "dashboard" &&
                location.pathname === "/dashboard" ? null : (
                  <div className="relative">
                    <NavLink
                      to={item.path || "#"}
                      className={`flex items-center mb-[10px] text-sm font-medium rounded-lg p-[14px] group ${
                        activeItem === "dashboard" || activeItem === item.id
                          ? "bg-custom-gradient text-white border-none"
                          : "text-gray-400 hover:bg-custom-gradient hover:text-white transition-all duration-300"
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="mr-[10px]">
                        <img
                          src={item.icon}
                          alt=""
                          className={`transition duration-300 group-hover:brightness-0 group-hover:invert ${
                            activeItem === item.id
                              ? "filter brightness-0 invert"
                              : "dark:opacity-70 dark:group-hover:opacity-100"
                          }`}
                        />
                      </div>
                      <span className="lg:inline transition duration-0 group-hover:text-white font-medium leading-[19.5px] text-[13px]">
                        {item.label}
                      </span>
                      {item.subItems && (
                        <img
                          src={downangle}
                          className={`ml-auto transition-transform duration-300 group-hover:brightness-0 group-hover:invert ${
                            openSubItems[item.id] ? "rotate-180" : ""
                          } ${
                            activeItem === item.id ? "brightness-0 invert" : "dark:opacity-70"
                          }`}
                        />
                      )}
                    </NavLink>
                  </div>
                )}
                {item.subItems && openSubItems[item.id] && (
                  <ul className="ml-4 mt-2 mb-2">
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.id}
                        className={`border-l-2 pl-2 transition-colors duration-300 ${
                          location.pathname === subItem.path && subItem.id
                            ? "border-primary"
                            : "border-theme-border hover:border-primary"
                        }`}
                      >
                        <NavLink
                          to={subItem.path}
                          className={`flex items-center text-sm rounded-lg pt-[6px] pb-[5px] transition-colors duration-300 ${
                            location.pathname === subItem.path && subItem.id
                              ? "text-primary font-medium"
                              : "text-gray-400 hover:text-theme-text font-medium"
                          }`}
                          onClick={() => {
                            setActiveItem(subItem.id);
                            onclose();
                          }}
                        >
                          <span
                            className={`ml-2 transition duration-300 ${
                              location.pathname === subItem.path
                                ? "text-primary"
                                : "text-inherit hover:text-theme-text"
                            }`}
                          >
                            {subItem.label}
                          </span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-theme-border bg-theme-card transition-colors duration-300">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-[14px] text-sm font-medium text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition duration-300"
          >
            <div className="mr-[10px]">
              <img src={logout} alt="logout" />
            </div>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isopen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998] lg:hidden"
          onClick={onclose}
        />
      )}
    </>
  );
}
