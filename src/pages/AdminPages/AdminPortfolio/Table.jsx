import React, { useState } from "react";
import {
    Table,
    Button,
    Popconfirm,
    Modal,
    Form,
    Input,
    Upload,
    Row,
    Col,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import {
    useDeleteProjectMutation,
    useGetAllProjectQuery,
    usePostProjectMutation,
    usePutProjectMutation,
} from "../../../services/userApi.jsx";
import { PROJECT_CARD_IMAGES, PROJECT_IMAGES } from "../../../contants.js";
import showToast from "../../../components/ToastMessage.js";
// Özəl Toastify komponenti

const PortfolioTable = () => {
    // API hooks və data
    const { data: getAllProject, refetch: getAllProjectRefetch } =
        useGetAllProjectQuery();
    const dataSource = getAllProject?.data;
    const [postProject] = usePostProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();
    const [putProject] = usePutProjectMutation();

    // Add Modal state
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addForm] = Form.useForm();

    // Edit Modal state
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editForm] = Form.useForm();
    const [editingRecord, setEditingRecord] = useState(null);

    // Add modal üçün Card Image state
    const [cardImageFileList, setCardImageFileList] = useState([]);
    const handleCardImageChange = ({ fileList }) => {
        setCardImageFileList(fileList);
    };

    // Edit modal üçün Card Image state
    const [editCardImageFileList, setEditCardImageFileList] = useState([]);
    const handleEditCardImageChange = ({ fileList }) => {
        setEditCardImageFileList(fileList);
    };

    // Edit modal üçün Additional Images state
    const [editAdditionalImagesFileList, setEditAdditionalImagesFileList] =
        useState([]);
    const handleEditAdditionalImagesChange = ({ fileList }) => {
        setEditAdditionalImagesFileList(fileList);
    };

    // Redaktə üçün mövcud kaydı açan funksiya
    const handleEdit = (record) => {
        console.log("Edit record:", record);
        setEditingRecord(record);

        // 1) Card image üçün fileList hazırlayırıq
        const cardImageFileList = record.cardImage
            ? [
                {
                    uid: "-1",
                    name: record.cardImage,
                    status: "done",
                    url: PROJECT_CARD_IMAGES + record.cardImage,
                },
            ]
            : [];

        // 2) Additional images üçün fileList hazırlayırıq
        const additionalImagesFileList =
            record.images && record.images.length > 0
                ? record.images.map((img, index) => ({
                    uid: `-${index}`,
                    name: img,
                    status: "done",
                    url: PROJECT_IMAGES + img,
                }))
                : [];

        // 3) Form dəyərlərini doldururuq (cardImage və images sahələrini fileList kimi veririk)
        editForm.setFieldsValue({
            title: record.title,
            titleEng: record.titleEng,
            titleRu: record.titleRu,
            subTitle: record.subTitle,
            subTitleEng: record.subTitleEng,
            subTitleRu: record.subTitleRu,
            repairYear: record.repairYear,
            client: record.client,
            projectManager: record.projectManager,
            contractor: record.contractor,
            cardImage: cardImageFileList,
            images: additionalImagesFileList,
        });

        // 4) State-lərə də eyni dəyərləri ötürürük
        setEditCardImageFileList(cardImageFileList);
        setEditAdditionalImagesFileList(additionalImagesFileList);
        setIsEditModalVisible(true);
    };

    // Silmə əməliyyatı
    const handleDelete = async (record) => {
        try {
            await deleteProject(record.id).unwrap();
            showToast("Project deleted successfully!", "success");
            getAllProjectRefetch();
        } catch (error) {
            console.error("Delete Error:", error);
            const errorMsg = error?.data?.error || "Error deleting project!";
            showToast(errorMsg, "error");
        }
    };

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
                    src={PROJECT_CARD_IMAGES + cardImage}
                    alt="Main"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
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
            title: "Təmir ili",
            dataIndex: "repairYear",
            key: "repairYear",
        },
        {
            title: "Klient",
            dataIndex: "client",
            key: "client",
        },
        {
            title: "Layihə Meneceri",
            dataIndex: "projectManager",
            key: "projectManager",
        },
        {
            title: "Podratçı",
            dataIndex: "contractor",
            key: "contractor",
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
                        title="Bu layihəni siləcəyinizə əminsiniz?"
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
            {record.subTitleEng && (
                <p>
                    <strong>Alt Başlıq (EN):</strong> {record.subTitleEng}
                </p>
            )}
            {record.subTitleRu && (
                <p>
                    <strong>Alt Başlıq (RU):</strong> {record.subTitleRu}
                </p>
            )}
            {record.images && record.images.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                    <strong>Şəkillər:</strong>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                            marginTop: "5px",
                        }}
                    >
                        {record.images.map((imgSrc, index) => (
                            <img
                                key={index}
                                src={PROJECT_IMAGES + imgSrc}
                                alt={`Additional ${index}`}
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    // Add Modal funksiyaları
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        addForm.resetFields();
        setCardImageFileList([]);
    };

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
                    "repairYear",
                    "client",
                    "projectManager",
                    "contractor",
                ];
                textFields.forEach((field) => {
                    if (values[field]) {
                        formData.append(field, values[field]);
                    }
                });
                // Card Image əlavə edilir
                if (cardImageFileList && cardImageFileList.length > 0) {
                    formData.append("cardImage", cardImageFileList[0].originFileObj);
                }
                // Additional Images əlavə edilir
                if (values.images && values.images.length > 0) {
                    values.images.forEach((fileWrapper) => {
                        formData.append("images", fileWrapper.originFileObj);
                    });
                }
                try {
                    await postProject(formData).unwrap();
                    showToast("Project added successfully!", "success");
                    setIsModalVisible(false);
                    addForm.resetFields();
                    setCardImageFileList([]);
                    getAllProjectRefetch();
                } catch (error) {
                    console.error("POST Error:", error);
                    const errorMsg = error?.data?.error || "Error adding project!";
                    showToast(errorMsg, "error");
                }
            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    // Edit Modal funksiyaları
    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        editForm.resetFields();
        setEditingRecord(null);
        setEditCardImageFileList([]);
        setEditAdditionalImagesFileList([]);
    };

    const handleEditSubmit = () => {
        editForm
            .validateFields()
            .then(async (values) => {
                const formData = new FormData();

                // 1. Metin sahələri əlavə edilir
                const textFields = [
                    "title",
                    "titleEng",
                    "titleRu",
                    "subTitle",
                    "subTitleEng",
                    "subTitleRu",
                    "repairYear",
                    "client",
                    "projectManager",
                    "contractor",
                ];
                textFields.forEach((field) => {
                    if (values[field]) {
                        formData.append(field, values[field]);
                    }
                });

                // 2. Güncellenən kaydın Id'si əlavə edilir
                formData.append("Id", editingRecord.id);

                // 3. Card Image: əgər istifadəçi yeni bir şəkil yükləyibsə, göndəririk
                if (editCardImageFileList && editCardImageFileList.length > 0) {
                    const cardFile = editCardImageFileList[0];
                    if (cardFile.originFileObj) {
                        formData.append("CardImage", cardFile.originFileObj);
                    }
                }

                // 4. Additional Images: yeni yüklənən şəkillər əlavə edilir
                if (editAdditionalImagesFileList && editAdditionalImagesFileList.length > 0) {
                    editAdditionalImagesFileList.forEach((file) => {
                        if (file.originFileObj) {
                            formData.append("Images", file.originFileObj);
                        }
                    });
                }

                // 5. Silinmiş şəkillərin tespit edilməsi və DeleteImageNames sahəsinə hər birinin ayrıca əlavə olunması
                const originalImages = editingRecord.images || [];
                // Cari state-də, originFileObj olmayanlar artıq öncədən yüklənmiş (mövcud) şəkillərdir
                const currentExistingImageNames = editAdditionalImagesFileList
                    .filter((file) => !file.originFileObj)
                    .map((file) => file.name);
                const deletedImageNames = originalImages.filter(
                    (imgName) => !currentExistingImageNames.includes(imgName)
                );
                if (deletedImageNames.length > 0) {
                    deletedImageNames.forEach((name) => {
                        formData.append("DeleteImageNames[]", name);
                    });
                }

                try {
                    await putProject(formData).unwrap();
                    showToast("Project updated successfully!", "success");
                    setIsEditModalVisible(false);
                    editForm.resetFields();
                    setEditingRecord(null);
                    setEditCardImageFileList([]);
                    setEditAdditionalImagesFileList([]);
                    getAllProjectRefetch();
                } catch (error) {
                    console.error("PUT Error:", error);
                    const errorMsg = error?.data?.error || "Error updating project!";
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
                    Yeni Portfolio Əlavə et
                </Button>
            </div>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                expandedRowRender={expandedRowRender}
            />

            {/* Yeni Portfolio Əlavə et Modal */}
            <Modal
                title="Yeni Portfolio Əlavə et"
                visible={isModalVisible}
                onOk={handlePost}
                onCancel={handleCancel}
                okText="Submit"
                width={800}
            >
                <Form form={addForm} layout="vertical">
                    <Row gutter={16}>
                        {/* Sol sütun */}
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
                                label="Təmir ili"
                                name="repairYear"
                                rules={[{ required: true, message: "Please input the repair year!" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        {/* Sağ sütun */}
                        <Col span={12}>
                            <Form.Item
                                label="Klient"
                                name="client"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Layihə meneceri"
                                name="projectManager"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Podratçı"
                                name="contractor"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Kart şəkli"
                                name="cardImage"
                                rules={[{ required: true, message: "Please select the card image!" }]}
                                valuePropName="fileList"
                                getValueFromEvent={(e) =>
                                    Array.isArray(e) ? e : e && e.fileList
                                }
                            >
                                <Upload
                                    fileList={cardImageFileList}
                                    onChange={handleCardImageChange}
                                    beforeUpload={() => false}
                                    maxCount={1}
                                    listType="picture-card"
                                >
                                    {cardImageFileList.length >= 1 ? null : (
                                        <div>
                                            <UploadOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="Əlavə Şəkillər"
                                name="images"
                                valuePropName="fileList"
                                getValueFromEvent={(e) =>
                                    Array.isArray(e) ? e : e && e.fileList
                                }
                            >
                                <Upload
                                    multiple
                                    beforeUpload={() => false}
                                    listType="picture-card"
                                >
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            {/* Edit Project Modal */}
            <Modal
                title="Edit Project"
                visible={isEditModalVisible}
                onOk={handleEditSubmit}
                onCancel={handleEditCancel}
                okText="Update"
                width={800}
            >
                <Form form={editForm} layout="vertical">
                    <Row gutter={16}>
                        {/* Sol sütun */}
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
                                label="Təmir ili"
                                name="repairYear"
                                rules={[{ required: true, message: "Please input the repair year!" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        {/* Sağ sütun */}
                        <Col span={12}>
                            <Form.Item
                                label="Klient"
                                name="client"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Layihə Meneceri"
                                name="projectManager"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Podratçı"
                                name="contractor"
                            >
                                <Input />
                            </Form.Item>

                            {/* Edit Modal üçün Card Image Upload */}
                            <Form.Item
                                label="Kart şəkli"
                                name="cardImage"
                                valuePropName="fileList"
                                getValueFromEvent={(e) =>
                                    Array.isArray(e) ? e : e && e.fileList
                                }
                            >
                                <Upload
                                    onChange={handleEditCardImageChange}
                                    listType="picture-card"
                                    beforeUpload={() => false}
                                >
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>

                            {/* Edit Modal üçün Additional Images Upload */}
                            <Form.Item
                                label="Əlavə Şəkillər"
                                name="images"
                                valuePropName="fileList"
                                getValueFromEvent={(e) =>
                                    Array.isArray(e) ? e : e && e.fileList
                                }
                            >
                                <Upload
                                    onChange={handleEditAdditionalImagesChange}
                                    listType="picture-card"
                                    multiple
                                    beforeUpload={() => false}
                                >
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default PortfolioTable;
