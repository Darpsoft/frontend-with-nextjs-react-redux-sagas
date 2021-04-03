import React, { useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Button, Avatar } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { logo } = useSelector(({ auth }) => auth);
  const [image, setImage] = useState(logo ?? "/assets/images/logo.png");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className="menuBar">
      <div className="menuCon">
        <div className="leftMenu">
          <div className="gx-flex-row gx-justify-content-center gx-align-items-center" style={{ height: 67 }}>
            <LeftMenu mode="horizontal" />
          </div>
        </div>
        <div className="rightMenu">
          <RightMenu className="hide-responsive" />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer placement="right" closable={false} onClose={onClose} visible={visible}>
          <div className="gx-flex-column gx-justify-content-between gx-h-100">
            <LeftMenu mode="vertical" />
            <RightMenu className="" block={true} />
          </div>
        </Drawer>
      </div>
    </nav>
  );
};
export default Navbar;
