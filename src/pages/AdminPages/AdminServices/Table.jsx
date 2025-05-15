import React, { useState } from "react";
import {
    Table,
    Button,
    Popconfirm,
    Modal,
    Form,
    Input,
    Row,
    Col,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import {
    useDeleteServiceMutation,
    useGetAllServicesQuery,
    usePostServiceMutation,
    usePutServiceMutation,
} from "../../../services/userApi.jsx";
import { SERVICE_CARD_IMAGES } from "../../../contants.js";
import showToast from "../../../components/ToastMessage.js";

// Import images
import serv1 from "/src/assets/services/1.png";
import serv2 from "/src/assets/services/2.png";
import serv3 from "/src/assets/services/3.png";
import serv4 from "/src/assets/services/4.png";
import serv5 from "/src/assets/services/5.png";
import serv6 from "/src/assets/services/6.png";
import serv7 from "/src/assets/services/7.png";
import serv8 from "/src/assets/services/8.png";
import serv9 from "/src/assets/services/9.png";
import serv10 from "/src/assets/services/10.png";

// Available service card images
const availableServiceCardImages = [
    { name: "1.png", src: serv1 },
    { name: "2.png", src: serv2 },
    { name: "3.png", src: serv3 },
    { name: "4.png", src: serv4 },
    { name: "5.png", src: serv5 },
    { name: "6.png", src: serv6 },
    { name: "7.png", src: serv7 },
    { name: "8.png", src: serv8 },
    { name: "9.png", src: serv9 },
    { name: "10.png", src: serv10 },
];

// Helper function to convert image URL to File object
const convertImageToFile = async (imgSrc, fileName) => {
    try {
        const res = await fetch(imgSrc);
        if (!res.ok) throw new Error("Failed to fetch image");
        const blob = await res.blob();
        return new File([blob], fileName, { type: blob.type });
    } catch (error) {
        throw new Error(`Image conversion failed: ${error.message}`);
    }
};

// ImagePickerGallery component for selecting images
const ImagePickerGallery = ({ value, onChange }) => {
    const handleClick = (imgName) => {
        onChange(imgName);
    };

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                maxHeight: "250px",
                overflowY: "auto",
                padding: "5px",
            }}
        >
            {availableServiceCardImages.map((imgObj) => (
                <div
                    key={imgObj.name}
                    onClick={() => handleClick(imgObj.name)}
                    style={{
                        width: "100px",
                        height: "100px",
                        border: value === imgObj.name ? "2px solid #1890ff" : "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px",
                    }}
                >
                    <img
                        src={imgObj.src}
                        alt={imgObj.name}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

const ServicesTable = () => {
    const { data: getAllServices, refetch: getAllServicesRefetch, isLoading } =
        useGetAllServicesQuery();
    const [postService] = usePostServiceMutation();
    const [deleteService] = useDeleteServiceMutation();
    const [putService] = usePutServiceMutation();

    const dataSource = getAllServices?.data || [];

    // Modal states
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [editingRecord, setEditingRecord] = useState(null);
    const [addLoading, setAddLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    // Table columns
    const columns = [
        {
            title: "#",
            key: "index",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Şəkil",
            dataIndex: "cardImage",
            key: "cardImage",
            render: (cardImage) =>
                cardImage ? (
                    <img
                        src={`${SERVICE_CARD_IMAGES}${cardImage}`}
                        alt="Card"
                        style={{ width: 80, height: 80, objectFit: "cover" }}
                        onError={(e) => {
                            e.target.src = "/src/assets/services/placeholder.png"; // Fallback image
                        }}
                    />
                ) : (
                    <span>No Image</span>
                ),
        },
        {
            title: "Başlıq (AZ)",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Alt Başlıq (AZ)",
            dataIndex: "subTitle",
            key: "subTitle",
        },
        {
            title: "Fəaliyyətlər",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Popconfirm
                        title="Bu xidməti siləcəyinizə əminsiniz?"
                        onConfirm={() => handleDelete(record)}
                        okText="Bəli"
                        cancelText="Xeyr"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </>
            ),
        },
    ];

    // Expanded row for additional language fields
    const expandedRowRender = (record) => (
        <div>
            {record.titleEng && <p><strong>Başlıq (EN):</strong> {record.titleEng}</p>}
            {record.titleRu && <p><strong>Başlıq (RU):</strong> {record.titleRu}</p>}
            {record.subTitleEng && <p><strong>Alt Başlıq (EN):</strong> {record.subTitleEng}</p>}
            {record.subTitleRu && <p><strong>Alt Başlıq (RU):</strong> {record.subTitleRu}</p>}
        </div>
    );

    // Delete operation
    const handleDelete = async (record) => {
        try {
            await deleteService(record.id).unwrap();
            showToast("Service deleted successfully!", "success");
            getAllServicesRefetch();
        } catch (error) {
            console.error("Delete Error:", error);
            showToast(error?.data?.message || "Error deleting service!", "error");
        }
    };

    // Edit button click handler
    const handleEdit = (record) => {
        setEditingRecord(record);
        editForm.setFieldsValue({
            title: record.title,
            titleEng: record.titleEng,
            titleRu: record.titleRu,
            subTitle: record.subTitle,
            subTitleEng: record.subTitleEng,
            subTitleRu: record.subTitleRu,
            cardImage: record.cardImage,
        });
        setIsEditModalVisible(true);
    };

    // Add Modal handlers
    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    const handleAddCancel = () => {
        setIsAddModalVisible(false);
        addForm.resetFields();
        setAddLoading(false);
    };

    const handlePost = async () => {
        try {
            setAddLoading(true);
            const values = await addForm.validateFields();
            const formData = new FormData();
            const textFields = [
                "title",
                "titleEng",
                "titleRu",
                "subTitle",
                "subTitleEng",
                "subTitleRu",
            ];
            textFields.forEach((field) => {
                if (values[field]) formData.append(field, values[field]);
            });

            if (values.cardImage) {
                const imgObj = availableServiceCardImages.find(
                    (item) => item.name === values.cardImage
                );
                if (imgObj) {
                    const file = await convertImageToFile(imgObj.src, imgObj.name);
                    formData.append("cardImage", file);
                } else {
                    throw new Error("Selected image not found");
                }
            }

            await postService(formData).unwrap();
            showToast("Service added successfully!", "success");
            setIsAddModalVisible(false);
            addForm.resetFields();
            getAllServicesRefetch();
        } catch (error) {
            console.error("POST Error:", error);
            showToast(error.message || error?.data?.message || "Error adding service!", "error");
        } finally {
            setAddLoading(false);
        }
    };

    // Edit Modal handlers
    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        editForm.resetFields();
        setEditingRecord(null);
        setEditLoading(false);
    };

    const handleEditSubmit = async () => {
        try {
            setEditLoading(true);
            const values = await editForm.validateFields();
            const formData = new FormData();
            const textFields = [
                "title",
                "titleEng",
                "titleRu",
                "subTitle",
                "subTitleEng",
                "subTitleRu",
            ];
            textFields.forEach((field) => {
                if (values[field]) formData.append(field, values[field]);
            });
            formData.append("id", editingRecord.id);

            if (values.cardImage) {
                const imgObj = availableServiceCardImages.find(
                    (item) => item.name === values.cardImage
                );
                if (imgObj) {
                    const file = await convertImageToFile(imgObj.src, imgObj.name);
                    formData.append("cardImage", file);
                } else {
                    throw new Error("Selected image not found");
                }
            }

            await putService(formData).unwrap();
            showToast("Service updated successfully!", "success");
            setIsEditModalVisible(false);
            editForm.resetFields();
            setEditingRecord(null);
            getAllServicesRefetch();
        } catch (error) {
            console.error("PUT Error:", error);
            showToast(error.message || error?.data?.message || "Error updating service!", "error");
        } finally {
            setEditLoading(false);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "16px" }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                    Yeni Servis Əlavə edin
                </Button>
            </div>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSource}
                loading={isLoading}
                pagination={{ pageSize: 5 }}
                expandedRowRender={expandedRowRender}
            />

            {/* Add Service Modal */}
            <Modal
                title="Yeni Servis Əlavə edin"
                open={isAddModalVisible}
                onOk={handlePost}
                onCancel={handleAddCancel}
                cancelText="Ləğv et"
                okText="Əlavə Et"
                width={800}
                okButtonProps={{ loading: addLoading, disabled: addLoading }}
            >
                <Form form={addForm} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Başlıq (AZ)"
                                name="title"
                                rules={[{ required: true, message: "Please input the title!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Başlıq (ENG)"
                                name="titleEng"
                                rules={[{ required: true, message: "Please input the title!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Başlıq (RU)"
                                name="titleRu"
                                rules={[{ required: true, message: "Please input the title!" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Alt Başlıq (AZ)"
                                name="subTitle"
                                rules={[{ required: true, message: "Please input the subtitle!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Alt Başlıq (ENG)"
                                name="subTitleEng"
                                rules={[{ required: true, message: "Please input the subtitle!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Alt Başlıq (RU)"
                                name="subTitleRu"
                                rules={[{ required: true, message: "Please input the subtitle!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Kart Şəkli"
                                name="cardImage"
                                rules={[{ required: true, message: "Please select the card image!" }]}
                            >
                                <ImagePickerGallery
                                    onChange={(value) => addForm.setFieldsValue({ cardImage: value })}
                                    value={addForm.getFieldValue("cardImage")}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            {/* Edit Service Modal */}
            <Modal
                title="Servisi Redaktə et"
                open={isEditModalVisible}
                onOk={handleEditSubmit}
                onCancel={handleEditCancel}
                cancelText="Ləğv et"
                okText="Yenilə"
                width={800}
                okButtonProps={{ loading: editLoading, disabled: editLoading }}
            >
                <Form form={editForm} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Başlıq (AZ)"
                                name="title"
                                rules={[{ required: true, message: "Please input the title!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Başlıq (ENG)"
                                name="titleEng"
                                rules={[{ required: true, message: "Please input the title!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Başlıq (RU)"
                                name="titleRu"
                                rules={[{ required: true, message: "Please input the title!" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Alt Başlıq (AZ)"
                                name="subTitle"
                                rules={[{ required: true, message: "Please input the subtitle!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Alt Başlıq (ENG)"
                                name="subTitleEng"
                                rules={[{ required: true, message: "Please input the subtitle!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Alt Başlıq (RU)"
                                name="subTitleRu"
                                rules={[{ required: true, message: "Please input the subtitle!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Kart Şəkli"
                                name="cardImage"
                                rules={[{ required: true, message: "Please select the card image!" }]}
                            >
                                <ImagePickerGallery
                                    onChange={(value) => editForm.setFieldsValue({ cardImage: value })}
                                    value={editForm.getFieldValue("cardImage")}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default ServicesTable;