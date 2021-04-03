import React from "react";
import { Layout, Menu, Row, Col } from "antd";
const { Header, Content, Footer } = Layout;

export const Wrapper = ({ children, isAuth = true }) => {
  if (!isAuth) {
    return <>{children}</>;
  }
  return (
    <Layout className="gx-app-layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Home</Menu.Item>
        </Menu>
      </Header>
      <Content className="gx-layout-content">
        <div className="gx-main-content-wrapper">
          <Row justify="center">
            <Col xxl={18} xl={24} lg={24} md={24} sm={24} xs={24}>
              {children}
            </Col>
          </Row>
        </div>
      </Content>
      <Footer>
        <div className="gx-layout-footer-content">Copyright Darpsoft © 2020</div>
      </Footer>
    </Layout>
  );
};
