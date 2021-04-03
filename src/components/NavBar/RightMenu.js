import React from "react";
import { Button, Col, Row } from "antd";
import { useRouter } from "next/router";

export const RightMenu = ({ className, block }) => {
  const router = useRouter();

  const geLogout = () => {
    router.push(`/logout`);
  };

  return (
    <div className="gx-flex-row gx-justify-content-center gx-align-items-center">
      <div className={className}>
        <Row style={{ marginBottom: -15 }}>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Button style={{ marginLeft: block ? 0 : -15 }} onClick={geLogout} type="dashed" danger block={block}>
              Cerrar Sesión
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default RightMenu;
