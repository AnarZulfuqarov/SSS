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
import serv1 from "/src/assets/services/1.png"
import serv2 from "/src/assets/services/2.png"
import serv3 from "/src/assets/services/3.png"
import serv4 from "/src/assets/services/4.png"
import serv5 from "/src/assets/services/5.png"
import serv6 from "/src/assets/services/6.png"
import serv7 from "/src/assets/services/7.png"
import serv8 from "/src/assets/services/8.png"
import serv9 from "/src/assets/services/9.png"
import serv10 from "/src/assets/services/10.png"

import showToast from "../../../components/ToastMessage.js";
// Import your custom toast component

// Seçilə bilən şəkillər (hazır 3 şəkil, bu siyahıya daha çox şəkil əlavə etmək olar)
const availableServiceCardImages = [
    { name: "1.png", src: serv1 },
    { name: "2.png", src: serv2 },
    { name: "3.jpeg", src: serv3 },
    { name: "4.jpeg", src: serv4 },
    { name: "5.jpeg", src: serv5 },
    { name: "6.jpeg", src: serv6 },
    { name: "7.jpeg", src: serv7 },
    { name: "8.jpeg", src: serv8 },
    { name: "9.jpeg", src: serv9 },
    { name: "10.jpeg", src: serv10 }
    // Əlavə şəkillər əlavə etmək olar...
];

// Köməkçi funksiya: verilmiş URL-dən File obyektinə çevirir
const convertImageToFile = async (imgSrc, fileName) => {
    const res = await fetch(imgSrc);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
};

// Alternativ ImagePickerGallery komponenti – clickable kartlardan ibarət seçim UI-dur.
const ImagePickerGalleryAlternative = ({ value, onChange }) => {
    const handleClick = (imgName) => {
        onChange(imgName);
    };

    return (
        <div
            className="image-picker-gallery-alternative"
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
                    className={`image-card ${value === imgObj.name ? "selected" : ""}`}
                    style={{
                        width: "100px",
                        height: "100px",
                        border: value === imgObj.name ? "2px solid #1890ff" : "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
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
    const { data: getAllProject, refetch: getAllProjectRefetch } =
        useGetAllServicesQuery();
    const dataSource = getAllProject?.data;
    const [postProject] = usePostServiceMutation();
    const [deleteProject] = useDeleteServiceMutation();
    const [putService] = usePutServiceMutation();

    // Add Modal state
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addForm] = Form.useForm();

    // Edit Modal state
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editForm] = Form.useForm();
    const [editingRecord, setEditingRecord] = useState(null);

    // Tablo sütunları
    const columns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => <div>{index + 1}</div>,
        },
        {
            title: "Şəkil",
            dataIndex: "cardImage",
            key: "cardImage",
            render: (cardImage) => (
                <img
                    src={SERVICE_CARD_IMAGES + cardImage}
                    alt="Card"
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                />
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
            render: (text, record) => (
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

    // Expanded row – digər dillərdəki dəyərlər göstərilir
    const expandedRowRender = (record) => (
        <div>
            {record.titleEng && record.titleEng !== record.title && (
                <p>
                    <strong>Başlıq (EN):</strong> {record.titleEng}
                </p>
            )}
            {record.titleRu && record.titleRu !== record.title && (
                <p>
                    <strong>Başlıq (RU):</strong> {record.titleRu}
                </p>
            )}
            {record.subTitleEng && record.subTitleEng !== record.subTitle && (
                <p>
                    <strong>Alt Başlıq (EN):</strong> {record.subTitleEng}
                </p>
            )}
            {record.subTitleRu && record.subTitleRu !== record.subTitle && (
                <p>
                    <strong>Alt Başlıq (RU):</strong> {record.subTitleRu}
                </p>
            )}
        </div>
    );

    // Delete əməliyyatı: backend-dən gələn error mesajını showToast vasitəsilə göstəririk
    const handleDelete = async (record) => {
        try {
            await deleteProject(record.id).unwrap();
            showToast("Service deleted successfully!", "success");
            getAllProjectRefetch();
        } catch (error) {
            console.error("Delete Error:", error);
            const errorMsg = error?.data?.error || "Error deleting service!";
            showToast(errorMsg, "error");
        }
    };

    // Edit butonuna tıklayınca
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

    // Add Modal açmaq
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        addForm.resetFields();
    };

    // Yeni Service POST əməliyyatı: backend-dən gələn error mesajını showToast ilə göstəririk
    const handlePost = () => {
        addForm
            .validateFields()
            .then(async (values) => {
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
                    if (values[field]) {
                        formData.append(field, values[field]);
                    }
                });
                if (values.cardImage) {
                    const imgObj = availableServiceCardImages.find(
                        (item) => item.name === values.cardImage
                    );
                    if (imgObj) {
                        try {
                            const file = await convertImageToFile(imgObj.src, imgObj.name);
                            formData.append("cardImage", file);
                        } catch (error) {
                            console.error("Image conversion error:", error);
                        }
                    }
                }
                try {
                    await postProject(formData).unwrap();
                    showToast("Service added successfully!", "success");
                    setIsModalVisible(false);
                    addForm.resetFields();
                    getAllProjectRefetch();
                } catch (error) {
                    console.error("POST Error:", error);
                    const errorMsg = error?.data?.error || "Error adding service!";
                    showToast(errorMsg, "error");
                }
            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    // Edit Modal cancel əməliyyatı
    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        editForm.resetFields();
        setEditingRecord(null);
    };

    // Edit Service PUT əməliyyatı: backend-dən gələn error mesajını showToast vasitəsilə göstəririk
    const handleEditSubmit = () => {
        editForm
            .validateFields()
            .then(async (values) => {
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
                    if (values[field]) {
                        formData.append(field, values[field]);
                    }
                });
                if (editingRecord?.id) {
                    formData.append("id", editingRecord.id);
                }
                if (values.cardImage) {
                    const imgObj = availableServiceCardImages.find(
                        (item) => item.name === values.cardImage
                    );
                    if (imgObj) {
                        try {
                            const file = await convertImageToFile(imgObj.src, imgObj.name);
                            formData.append("cardImage", file);
                        } catch (error) {
                            console.error("Image conversion error:", error);
                        }
                    }
                }
                try {
                    await putService(formData).unwrap();
                    showToast("Service updated successfully!", "success");
                    setIsEditModalVisible(false);
                    editForm.resetFields();
                    setEditingRecord(null);
                    getAllProjectRefetch();
                } catch (error) {
                    console.error("PUT Error:", error);
                    const errorMsg = error?.data?.error || "Error updating service!";
                    showToast(errorMsg, "error");
                }
            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    return (
        <div>
            <div style={{ marginBottom: "16px" }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    Yeni Servis Əlavə edin
                </Button>
            </div>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                expandedRowRender={expandedRowRender}
            />

            {/* Yeni Servis Əlavə edin Modal */}
            <Modal
                title="Yeni Servis Əlavə edin"
                visible={isModalVisible}
                onOk={handlePost}
                onCancel={handleCancel}
                okText="Submit"
                width={800}
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
                            <Form.Item label="Başlıq (ENG)" name="titleEng" rules={[{ required: true, message: "Please input the title!" }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Başlıq (RU)" name="titleRu" rules={[{ required: true, message: "Please input the title!" }]}>
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
                            <Form.Item label="Alt Başlıq (ENG)" name="subTitleEng" rules={[{ required: true, message: "Please input the title!" }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Alt Başlıq (RU)" name="subTitleRu" rules={[{ required: true, message: "Please input the title!" }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Kart Şəkli"
                                name="cardImage"
                                rules={[{ required: true, message: "Please select the card image!" }]}
                            >
                                <ImagePickerGalleryAlternative
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
                title="Edit Service"
                visible={isEditModalVisible}
                onOk={handleEditSubmit}
                onCancel={handleEditCancel}
                okText="Update"
                width={800}
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
                            <Form.Item label="Başlıq (ENG)" name="titleEng">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Başlıq (RU)" name="titleRu">
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
                            <Form.Item label="Alt Başlıq (ENG)" name="subTitleEng">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Alt Başlıq (RU)" name="subTitleRu">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Kart Şəkli" name="cardImage">
                                <ImagePickerGalleryAlternative
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
