import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faBox,
  faHashtag,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminSidebar() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [show, setShow] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const inactiveLink = "flex-gap-1";
  const activeLink = inactiveLink + "bg-white";
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    router.push(`/admin/${tabName.toLowerCase()}`); // Update the URL based on the clicked tab
  };

  const handleToggleSidebar = () => {
    setShow(!show);
  };
  //   const handleLogout = async () => {
  //     localStorage.removeItem("user");
  //     localStorage.removeItem("token");
  //     await customSignOutUser();
  //     router.push("/")
  //     try {
  //       await signOut(auth);
  //     } catch (error) {
  //       console.error("Logout failed", error);
  //     }
  //   };
  return (
    <div
      className={`min-w-[32px] h-full  ${
        show ? "min-w-[180px] w-1/6 " : ""
      }`}
    >
      <div
        className={`ml-2 fixed bg-purple-800 top-0 left-0  h-full bg-bgGray transition-all ${
          show ? "" : "md:w-auto"
        }`}
      >
        <div className="mb-4 ">
          <button className="activeLink" onClick={handleToggleSidebar}>
            <FontAwesomeIcon icon={faBars} className="items-start mx-2" />
          </button>
        </div>
        <nav className={`flex    flex-col gap-2 mr-2 ${show ? "" : "hidden"}`}>
          <div>
            <Link
              href="/admin/dashboard"
              onClick={() => handleTabClick("dashboard")}
            >
              <span
                className={pathname.includes("/users") ? "bg-white" : ""}
              >
                <FontAwesomeIcon icon={faHouse} className="items-start mx-2" />
                Users
              </span>
            </Link>
          </div>
          <div>
            <Link
              href="/admin/categories"
              onClick={() => handleTabClick("categories")}
            >
              <span
                className={pathname.includes("/categories") ? "bg-white" : ""}
              >
                <FontAwesomeIcon
                  icon={faHashtag}
                  className="items-start mx-2"
                />
                Categories
              </span>
            </Link>
          </div>
          <div>
            <Link
              href="/admin/products"
              onClick={() => handleTabClick("products")}
            >
              <span
                className={pathname.includes("/products") ? "bg-white" : ""}
              >
                <FontAwesomeIcon icon={faBox} className="items-start mx-2" />
                Products
              </span>
            </Link>
          </div>
          <div>
            <Link
              href="/admin/settings"
              onClick={() => handleTabClick("settings")}
            >
              <FontAwesomeIcon icon={faGear} className="items-start mx-2" />
              Settings
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
