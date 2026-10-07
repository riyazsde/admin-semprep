import { useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import { IoMdEye } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import HOC from "../../components/HOC/HOC";
import {
  addHomePageContentBanner,
  deleteHomePageContentBanner,
  getTutorialVideos,
  updateHomePageContentBanner
} from "../../services/exportFunctions";
import { useNavigate, useState } from "../../services/exports";
import { CustomModal, UniversalForm } from "../../services/ModalComponent";

const TutorialVideos = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewItem, setIsViewItem] = useState(null);
  const [mode, setMode] = useState("view");
  const [showModal, setShowModal] = useState(false);

  const getData = () => {
    getTutorialVideos({
      setIsLoading,
      setData,
      params: { type: "video" },
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("type", "TutorialVideo");
    if (values.title) formData.append("title", values.title);
    if (values.description) formData.append("description", values.description);
    if (values.thumbnail) formData.append("thumbnail", values.thumbnail);
    if (values.video) formData.append("video", values.video);
    if (mode === "add")
      addHomePageContentBanner({
        addFun: () => {
          getData();
          setShowModal(false);
        },
        data: formData,
        setShowModal,
      });
    if (mode === "edit")
      updateHomePageContentBanner({
        addFun: () => {
          getData();
          setShowModal(false);
        },
        data: formData,
        setShowModal,
        id: isViewItem?._id,
      });
  };

  return (
    <>
      <CustomModal
        show={showModal}
        onHide={handleCloseModal}
        title={mode === "view" ? "Preview Tutorial Video" : mode === "edit" ? "Edit Tutorial Video" : "Add Tutorial Video"}
        bodyContent={
          mode === "view" ? (
            <div className="space-y-3">
              <div className="font-semibold">{isViewItem?.title || "Untitled"}</div>
              <div className="text-sm text-gray-600">{isViewItem?.description || ""}</div>
              <div className="w-full">
                <video
                  src={isViewItem?.video || isViewItem?.videoLink || ""}
                  controls
                  className="w-full rounded"
                />
              </div>
            </div>
          ) : (
            <UniversalForm
              mode={mode}
              formFields={[
                { type: "text", name: "title", label: "Title", required: true },
                { type: "textarea", name: "description", label: "Description" },
                { type: "file", name: "thumbnail", label: "Thumbnail" },
                { type: "file", name: "video", label: "Video", required: mode === "add" },
              ]}
              initialData={{
                title: isViewItem?.title || "",
                description: isViewItem?.description || "",
              }}
              onSubmit={(vals) => handleFormSubmit(vals)}
            />
          )
        }
      />

      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Tutorial Videos</h6>
          <p>
            <GoArrowLeft
              size={25}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
            Dashboard /<span> Tutorial Videos</span>
          </p>
        </div>

        <div className="homepagecontent">
          <div className="homepagecontent-top">
            <div className="homepagecontent-left">
              <div className="homepagecontent-left-header">
                <h6>Manage Tutorial Videos</h6>
                <MdAddBox
                  onClick={() => {
                    navigate("/tutorial-videos/add-tutorial-videos");
                    setMode("add");
                    setIsViewItem(null);
                    handleOpenModal();
                  }}
                />
              </div>

              <div className="homepagecontent-left-table">
                <table>
                  <thead>
                    <tr>
                      <th>Thumbnail</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data?.map((item, index) => (
                        <tr key={item?._id || index}>
                          <td>
                            <div className="addimage">
                              {item?.thumbnail || item?.image ? (
                                <img
                                  style={{ width: "80px", height: "40px", objectFit: "cover" }}
                                  src={item?.thumbnail || item?.image}
                                  alt=""
                                />
                              ) : (
                                <IoImageOutline />
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="totalorders">
                              <span>{item?.title || "Untitled"}</span>
                            </div>
                          </td>
                          <td>
                            <div className="totalorders">
                              <span>{(item?.description || "").slice(0, 60)}</span>
                            </div>
                          </td>
                          <td>
                            <div className="actiontable">
                              <IoMdEye
                                onClick={() => {
                                  setMode("view");
                                  setIsViewItem(item);
                                  setShowModal(true);
                                }}
                              />
                              <FiEdit3
                                onClick={() => {
                                  setMode("edit");
                                  setIsViewItem(item);
                                  setShowModal(true);
                                }}
                              />
                              <RiDeleteBin6Line
                                onClick={() =>
                                  deleteHomePageContentBanner({
                                    addFun: getData,
                                    id: item?._id,
                                  })
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {(!data || data.length === 0) && (
                  <div className="p-4 text-center text-sm text-gray-500">No tutorial videos found.</div>
                )}
                {isLoading && (
                  <div className="p-4 text-center text-sm text-gray-500">Loading...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(TutorialVideos);
