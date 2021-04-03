import React from "react";
import { Button, Row, Col, Divider } from "antd";
import { customUseReducer } from "@utils/customHooks";

import { TableComponent } from "./components/TableComponent";
import Widget from "@components/Widget";

const initialState = {
  loading: false,
  modal: false,
  selected: {},
};

export function IndexPage() {
  const [state, dispatchComponent] = customUseReducer(initialState);
  return (
    <>
      <Widget>
        <div>
          <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <p className="gx-text-grey">Detalles del Contenedor</p>
              <h2 className="gx-text-uppercase gx-text-black gx-font-weight-bold gx-fnd-title">REGISTROS DE RESERVACIONES</h2>
              <p>Este contenedor tiene como funcionalidad la visualización de reservaciones</p>
            </Col>
          </Row>
          <Divider dashed />
          <Row>
            <Col span={10}>
              <h1 className="gx-text-grey">Historial de Reservaciones</h1>
            </Col>
            {/* <Col span={14} style={{ display: "flex", alignItems: "flex-end", flexDirection: "column" }}>
              <Button
                type="primary"
                onClick={() => dispatchComponent({ modal: true, selected: {} })}
                icon={<i className="icon icon-add" style={{ marginRight: 5, verticalAlign: "inherit" }}></i>}
              >
                NUEVOA RESERVACION
              </Button>
            </Col> */}
          </Row>
          <TableComponent openModal={dispatchComponent} />
        </div>
      </Widget>
    </>
  );
}

IndexPage.propTypes = {};

export default IndexPage;
