import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import { addTutorialVideo } from "../../services/exportFunctions";

const AddTutorialVideo = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [isSamePage, setIsSamePage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    const fd = new FormData();
    fd.append("type", "Video");
    fd.append("title", formData.title || "");
    fd.append("desc", formData.desc || "");
    if (formData.image && formData.image[0]) fd.append("image", formData.image[0]);
    fd.append("code", formData.link || "");

    setIsSubmitting(true);
    const addFun = () => {
      reset();
      if (!isSamePage) navigate("/tutorial-videos");
      setIsSamePage(false);
      setIsSubmitting(false);
    };

    addTutorialVideo({
      setIsLoading,
      data: fd,
      addFun,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dashboardcontainer">
          <div className="dashboardcontainer-header">
            <h6>Tutorial Videos</h6>
            <p>
              <GoArrowLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
              Tutorial Videos /<span> Add Tutorial Video</span>
            </p>
          </div>
          <div className="studentprofile-container">
            <div className="studyplanner-container">
              <div className="addhandwritten-inputs">
                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{ gap: 12 }}>
                    <h6>
                      Title <span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input type="text" {...register("title", { required: true })} />
                        {/* <label htmlFor="">Enter Title</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{ gap: 12 }}>
                    <h6>
                      Link <span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input type="url" {...register("link", { required: true })} />
                        {/* <label htmlFor="">Enter Video Link</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                </div>

                <div className="addhandwritten-input-two-div">
                  <div className="addhandwritten-input" style={{ gap: 12 }}>
                    <h6>
                      Image <span>*</span>
                    </h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <input type="file" accept="image/*" {...register("image", { required: true })} />
                        {/* <label htmlFor="">Upload Thumbnail</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                  <div className="addhandwritten-input" style={{ gap: 12 }}>
                    <h6>Description</h6>
                    <div className="addhandwritten-inputs-div">
                      <div className="input-container">
                        <textarea style={{outline:"none", border:"none", width:"100%"}} rows={4} {...register("desc")} />
                        {/* <label htmlFor="">Enter Description</label> */}
                      </div>
                      {/* <div className="addhandwritten-inputs-icons"></div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="addhandwritennotes-submit">
              <div className="handwritten-button">
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
              </div>
              <div className="handwritten-button-addnote">
                <button onClick={() => setIsSamePage(true)} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save and add another"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HOC(AddTutorialVideo);
