import React, { useState } from "react";
import { Table, Modal } from "antd";
import { useGetAllContactQuery } from "../../../services/userApi.jsx";

const ContactTable = () => {
    const { data: getAllContact } = useGetAllContactQuery();
    const contact = getAllContact?.data;

    // Modal üçün state-lər
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState("");

    // Mətni müəyyən uzunluqdan sonra kəsir (default olaraq 30 simvol)
    const truncateText = (text, limit = 30) => {
        if (!text) return "";
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    // Modal-ı açmaq üçün funksiyanı təyin edirik
    const showModal = (text) => {
        setSelectedNote(text);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
        {
            title: "Not",
            dataIndex: "description",
            key: "description",
            render: (text, record) => (
                <span
                    onClick={() => showModal(text)}
                    style={{ cursor: "pointer" }}
                >
                    {truncateText(text)}
                </span>
            ),
        },
    ];

    return (
        <div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={contact}
                pagination={{ pageSize: 5 }}
            />
            <Modal
                title="Not"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{selectedNote}</p>
            </Modal>
        </div>
    );
};

export default ContactTable;
