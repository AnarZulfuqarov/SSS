import {
    Table,
} from "antd";


import {useGetAllContactQuery} from "../../../services/userApi.jsx";
import React from "react";

const ContactTable = () => {
    const {data: getAllContact} = useGetAllContactQuery();
    const contact = getAllContact?.data;
    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => <div>{index + 1}</div>,
        },
        {
            title: "Ad",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Soyad",
            dataIndex: "surname",
            key: "surname",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Telefon",
            dataIndex: "phoneNumber",
            key: "phoneNumber",

        },
        // {
        //     title: "Not",
        //     dataIndex: "description",
        //     key: "description",
        // },
    ];
    const expandedRowRender = (record) => (
        <div>
            <p><strong>Not:</strong> {record.description}</p>
        </div>
    );
    return (
        <div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={contact}
                expandedRowRender={expandedRowRender}
                pagination={{pageSize: 5}}
            />

        </div>
    );
};

export default ContactTable;