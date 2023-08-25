import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";
import { UidContext } from "../AppContext";
import Logout from "./Logout";
import { useSelector } from "react-redux";

const Navbar = () => {
  const uid = useContext(UidContext);

  

  const [sidebar, setSidebar] = useState(false);

  const showSideBar = () => setSidebar(!sidebar);

  

  
  const user = useSelector((state) => state.user);
  // console.log("user loaded ?");
  // console.log(user);
  let name;
  if(user.data) // check if all data are loaded in store
   name = user.data.displayName;
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className="NavBar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSideBar} />
        </Link>
        {uid ? (
          <div className="NavName">
            Sondage Corp, Bienvenue {name} !
          </div>
        ) : (
          <>
            {" "}
            <div className="NavName">
              Sondage Corp, Bienvenue !
            </div> <li></li>{" "}
          </>
        )}
        {uid && <Logout />}
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose onClick={showSideBar} />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path} onClick={showSideBar}>
                  {item.icon} <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
};

export default Navbar;
