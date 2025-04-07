import {
    Table,
} from "antd";


import {useGetAllContactQuery} from "../../../services/userApi.jsx";

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
        {
            title: "Not",
            dataIndex: "description",
            key: "description",
        },
    ];

    return (
        <div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={contact}

                pagination={{pageSize: 5}}
            />

        </div>
    );
};

export default ContactTable;