import React from "react";

import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillBook />,
    cName: "navbar-text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <AiIcons.AiFillProfile />,
    cName: "navbar-text",
  },
  {
    title: "Trending",
    path: "/trending",
    icon: <AiIcons.AiFillTags />,
    cName: "navbar-text",
  },
];
