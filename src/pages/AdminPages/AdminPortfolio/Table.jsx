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
import {PROJECT_CARD_IMAGES, PROJECT_IMAGES, PROJECT_VIDEOS} from "../../../contants.js";
import showToast from "../../../components/ToastMessage.js";

const PortfolioTable = () => {
    const { data: getAllProject, refetch: getAllProjectRefetch } =
        useGetAllProjectQuery();
    const dataSource = getAllProject?.data;
    const [postProject] = usePostProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();
    const [putProject] = usePutProjectMutation();

    // Add Modal state
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addForm] = Form.useForm();
    // Add loading state for Add Modal
    const [addLoading, setAddLoading] = useState(false);

    // Edit Modal state
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editForm] = Form.useForm();
    const [editingRecord, setEditingRecord] = useState(null);
    // Add loading state for Edit Modal
    const [editLoading, setEditLoading] = useState(false);

    // Add modal card image state
    const [cardImageFileList, setCardImageFileList] = useState([]);
    const handleCardImageChange = ({ fileList }) => {
        setCardImageFileList(fileList);
    };

    // Edit modal card image state
    const [editCardImageFileList, setEditCardImageFileList] = useState([]);
    const handleEditCardImageChange = ({ fileList }) => {
        setEditCardImageFileList(fileList);
    };

    // Edit modal additional images state
    const [editAdditionalImagesFileList, setEditAdditionalImagesFileList] =
        useState([]);
    const handleEditAdditionalImagesChange = ({ fileList }) => {
        setEditAdditionalImagesFileList(file)};

    const handleEdit = (record) => {
        console.log("Edit record:", record);
        setEditingRecord(record);

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

        const additionalImagesFileList =
            record.images && record.images.length > 0
                ? record.images.map((img, index) => ({
                    uid: `-${index}`,
                    name: img,
                    status: "done",
                    url: PROJECT_IMAGES + img,
                }))
                : [];

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

        setEditCardImageFileList(cardImageFileList);
        setEditAdditionalImagesFileList(additionalImagesFileList);
        setIsEditModalVisible(true);
    };

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
                    <strong>Şəkillər və Videolar:</strong>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                            marginTop: "5px",
                        }}
                    >
                        {record.images.map((fileSrc, index) => {
                            const isVideo = fileSrc.endsWith(".webm") || fileSrc.endsWith(".mp4"); // Add other video extensions if needed
                            const src = isVideo ? PROJECT_VIDEOS + fileSrc : PROJECT_IMAGES + fileSrc;
                            return isVideo ? (
                                <video
                                    key={index}
                                    src={src}
                                    controls
                                    style={{
                                        width: "120px",
                                        height: "80px",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Additional ${index}`}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );

    // Add Modal functions
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        addForm.resetFields();
        setCardImageFileList([]);
        setAddLoading(false); // Reset loading state
    };

    const handlePost = () => {
        addForm
            .validateFields()
            .then(async (values) => {
                setAddLoading(true); // Start loading
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
                if (cardImageFileList && cardImageFileList.length > 0) {
                    formData.append("cardImage", cardImageFileList[0].originFileObj);
                }
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
                } finally {
                    setAddLoading(false); // Stop loading
                }
            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
                setAddLoading(false); // Stop loading on validation failure
            });
    };

    // Edit Modal functions
    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        editForm.resetFields();
        setEditingRecord(null);
        setEditCardImageFileList([]);
        setEditAdditionalImagesFileList([]);
        setEditLoading(false); // Reset loading state
    };

    const handleEditSubmit = () => {
        editForm
            .validateFields()
            .then(async (values) => {
                setEditLoading(true); // Start loading
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
                formData.append("Id", editingRecord.id);
                if (editCardImageFileList && editCardImageFileList.length > 0) {
                    const cardFile = editCardImageFileList[0];
                    if (cardFile.originFileObj) {
                        formData.append("CardImage", cardFile.originFileObj);
                    }
                }
                if (editAdditionalImagesFileList && editAdditionalImagesFileList.length > 0) {
                    editAdditionalImagesFileList.forEach((file) => {
                        if (file.originFileObj) {
                            formData.append("Images", file.originFileObj);
                        }
                    });
                }
                const originalImages = editingRecord.images || [];
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
                } finally {
                    setEditLoading(false); // Stop loading
                }
            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
                setEditLoading(false); // Stop loading on validation failure
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

            {/* Add Portfolio Modal */}
            <Modal
                title="Yeni Portfolio Əlavə et"
                visible={isModalVisible}
                onOk={handlePost}
                onCancel={handleCancel}
                okText="Əlavə et"
                cancelText="Ləğv et"
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
                                rules={[{ required: true, message: "Please input the title!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Alt Başlıq (RU)"
                                name="subTitleRu"
                                rules={[{ required: true, message: "Please input the title!" }]}
                            >
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
                        <Col span={12}>
                            <Form.Item label="Klient" name="client">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Layihə meneceri" name="projectManager">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Podratçı" name="contractor">
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
                okText="Yenilə"
                cancelText="Ləğv et"
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
                                rules={[{ required: true, message: "Please input the title!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Alt Başlıq (RU)"
                                name="subTitleRu"
                                rules={[{ required: true, message: "Please input the title!" }]}
                            >
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
                        <Col span={12}>
                            <Form.Item label="Klient" name="client">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Layihə Meneceri" name="projectManager">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Podratçı" name="contractor">
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Kart şəkli"
                                name="cardImage"
                                valuePropName="fileList"
                                getValueFromEvent={(e) =>
                                    Array.isArray(e) ? e : e && e.fileList
                                }
                            >
                                <Upload
                                    fileList={editCardImageFileList}
                                    onChange={handleEditCardImageChange}
                                    listType="picture-card"
                                    beforeUpload={() => false}
                                    maxCount={1}
                                >
                                    {editCardImageFileList.length >= 1 ? null : (
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
                                    fileList={editAdditionalImagesFileList}
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