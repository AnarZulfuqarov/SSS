import { Table, Button, Modal, Form, Input, Popconfirm, Select } from "antd";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const BrandTable = () => {

    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => <div>{index + 1}</div>,
        },
        {
            title: "Şəhər (AZ)",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ölkə ",
            dataIndex: "countryName",
            key: "countryName",
        },
        {
            title: "Əməliyyatlar",
            key: "actions",
            render: () => (
                <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    <Button type="primary">
                        <FaRegEdit />
                    </Button>
                    <Popconfirm
                        title="Silmək istədiyinizə əminsiniz?"
                        okText="Bəli"
                        cancelText="Xeyr"
                    >
                        <Button type="default" danger>
                            <MdDeleteForever />
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const expandedRowRender = (record) => (
        <div>
            <p style={{ margin: 0 }}>{record.description}</p>
        </div>
    );

    return (
        <div>
            <Button type="primary"  style={{ marginBottom: 16 }}>
                +
            </Button>
            <Table
                columns={columns}
                // dataSource={}
                expandable={{
                    expandedRowRender,
                    rowExpandable: (record) => !!record.description,
                }}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title="Yeni Şəhər Əlavə Et"
                footer={null}
                width={1000}
            >
                <Form  layout="vertical" >
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                name="name"
                                label="Ad"
                                rules={[{ required: true, message: "Ad daxil edin!" }]}
                            >
                                <Input placeholder="Ad" />
                            </Form.Item>
                            <Form.Item
                                name="nameEng"
                                label="Ad (EN)"
                                rules={[{ required: true, message: "Ad (EN) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (EN)" />
                            </Form.Item>
                            <Form.Item
                                name="nameRu"
                                label="Ad (RU)"
                                rules={[{ required: true, message: "Ad (RU) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (RU)" />
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                name="countryId"
                                label="Ölkə"
                                rules={[{ required: true, message: "Ölkə seçin!" }]}
                            >
                                <Select placeholder="Ölkə seçin">
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                                    Əlavə Et
                                </Button>
                                <Button >İmtina Et</Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>

            <Modal
                title="Şəhər Redaktə Et"

                footer={null}
                width={1000}
            >
                <Form layout="vertical">
                    <div className="row">
                        <div className="col-6">
                            <Form.Item
                                name="name"
                                label="Ad"
                                rules={[{ required: true, message: "Ad daxil edin!" }]}
                            >
                                <Input placeholder="Ad daxil edin" />
                            </Form.Item>
                            <Form.Item
                                name="nameEng"
                                label="Ad (EN)"
                                rules={[{ required: true, message: "Ad (EN) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (EN) daxil edin" />
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item
                                name="nameRu"
                                label="Ad (RU)"
                                rules={[{ required: true, message: "Ad (RU) daxil edin!" }]}
                            >
                                <Input placeholder="Ad (RU) daxil edin" />
                            </Form.Item>
                            <Form.Item
                                name="countryId"
                                label="Ölkə"
                                rules={[{ required: true, message: "Ölkə seçin!" }]}
                            >
                                <Select placeholder="Ölkə seçin">
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                            Redaktə Et
                        </Button>
                        <Button >İmtina Et</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BrandTable;