import React from "react";
import { Link } from "react-router-dom";
import * as HiIcons from "react-icons/hi";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const logout = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL_BACK}auth/logout`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.success) {
          removeCookie("jwt");
          window.location = res.data.redirectUrl;
        } else {
          console.log(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="logout-button">
      <ul id="logout">
        <li>
          <Link to="#" onClick={logout}>
            <HiIcons.HiOutlineLogout />
          </Link>
        </li>

        <li>
          <p>Logout</p>
        </li>
      </ul>
    </div>
  );
};

export default Logout;
