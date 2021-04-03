import React from "react";
import { Menu } from "antd";
import Link from "next/link";

const services = [
  {
    id: 1,
    status: true,
    path: "/admin",
    name: "Home",
  },
];

export const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      {services
        ?.filter((service) => service.status)
        .map((service) => (
          <Menu.Item key={service.id}>
            <Link href={service.path}>
              <a>{service.name}</a>
            </Link>
          </Menu.Item>
        ))}
    </Menu>
  );
};

export default LeftMenu;
