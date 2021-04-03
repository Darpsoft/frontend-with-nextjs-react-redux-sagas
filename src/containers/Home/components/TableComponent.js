import React from "react";
import { useSelector } from "react-redux";
import { Button, Popconfirm, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const getColumn = ({ handleEdit, handleDelete }) => {
  return [
    {
      title: "BookingId",
      dataIndex: "BookingId",
      key: "BookingId",
    },
    {
      title: "Cliente",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Fecha de creación",
      dataIndex: "bookingTime",
      key: "bookingTime",
    },
    {
      title: "Dirección",
      dataIndex: "streetAddress",
      key: "streetAddress",
    },
    {
      title: "Precio",
      dataIndex: "bookingPrice",
      key: "bookingPrice",
    },
    {
      width: 120,
      title: "",
      render: (_, record) => (
        <>
          <Tooltip title="Editar">
            <Button shape="circle" style={{ marginBottom: 0 }} onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Popconfirm placement="bottomRight" title={"Estas seguro en eliminar: "} onConfirm={() => handleDelete(record)} okText="Si" cancelText="No">
              <Button shape="circle" style={{ marginBottom: 0 }} icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];
};

export const TableComponent = ({ openModal }) => {
  const { auth, home } = useSelector((store) => store);

  const handleEdit = (values) => {
    console.log("🚀 ~ file: TableComponent.js ~ line 44 ~ handleEdit ~ values", values);
  };

  const handleDelete = (values) => {
    console.log("🚀 ~ file: TableComponent.js ~ line 48 ~ handleDelete ~ values", values);
  };

  const columns = getColumn({ handleDelete, handleEdit });

  return (
    <Table
      size="small"
      loading={auth.loader}
      className="gx-table-responsive"
      columns={columns}
      dataSource={home.data.map((video, key) => ({ key, ...video }))}
    />
  );
};
