import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SlCloudUpload } from "react-icons/sl";
import {
  getAllSubjects,
  getAllSubSubjects,
  getAllSubjectsByGoalExam,
  getTopicsByChapter,
} from "./exportFunctions";
import { uploadTestSeriesFile, uploadInstructionFile } from "./otherFunction";

const TestSeriesFormComponentMain = ({
  goalCategory,
  goalExamId,
  setFormData,
}) => {
  const [selectedOption, setSelectedOption] = useState("option1");

  // Updated fileData structure to support multiple fields
  const [fileData, setFileData] = useState({
    option1: [],
    option2: [],
    option3: [],
    option4: [],
  });

  const [subjectOptions, setSubjectOptions] = useState([]);
  const [fieldData, setFieldData] = useState({
    option1: { subSubjectOptions: {}, chapterOptions: {}, topicOptions: {} },
    option2: { subSubjectOptions: {}, chapterOptions: {}, topicOptions: {} },
    option3: { subSubjectOptions: {}, chapterOptions: {}, topicOptions: {} },
    option4: { subSubjectOptions: {}, chapterOptions: {}, topicOptions: {} },
  });

  const { register, handleSubmit, control } = useForm();
  const testFieldArrays = {
    option1: useFieldArray({ control, name: "option1Subjects" }),
    option2: useFieldArray({ control, name: "option2Subjects" }),
    option3: useFieldArray({ control, name: "option3Subjects" }),
    option4: useFieldArray({ control, name: "option4Subjects" }),
  };

  useEffect(() => {
    if (goalExamId) {
      const params = {
        goalCategory,
        goalId: goalExamId,
        page: 1,
        limit: 100,
        search: "",
      };

      getAllSubjects({
        setData: (data) =>
          setSubjectOptions(Array.isArray(data?.data) ? data?.data : []),
        params,
      });
    }
  }, [goalExamId, goalCategory]);

  const handleFieldChange = (testType, index, name, value) => {
    const params = { page: 1, limit: 100, search: "" };
    const updateFieldData = (key, data) =>
      setFieldData((prev) => ({
        ...prev,
        [testType]: {
          ...prev[testType],
          [key]: {
            ...prev[testType][key],
            [index]: data || [],
          },
        },
      }));

    if (name === "subjectId" && value) {
      params.subjectId = value;
      getAllSubSubjects({
        setData: (data) => updateFieldData("subSubjectOptions", data?.data),
        params,
      });
    }

    if ((name === "subSubjectId" || name === "subjectId") && value) {
      params[name] = value;
      getAllSubjectsByGoalExam({
        setData: (data) => updateFieldData("chapterOptions", data?.data),
        params,
      });
    }

    if (name === "chapterId" && value) {
      params.chapterId = value;
      getTopicsByChapter({
        setData: (data) => updateFieldData("topicOptions", data?.data),
        params,
      });
    }
  };

  const uploadAndSetInstructionFileId = async (testType, index, file) => {
    try {
      const fileId = await uploadInstructionFile({ data: file });
      setFileData((prev) => {
        const updatedFileData = [...prev[testType]];
        updatedFileData[index] = {
          ...updatedFileData[index],
          instructionFile: fileId,
        };
        return { ...prev, [testType]: updatedFileData };
      });
    } catch (error) {
      console.error("Instruction file upload failed", error);
    }
  };

  const uploadAndSetTestSeriesFileId = async (testType, index, file) => {
    try {
      const fileId = await uploadTestSeriesFile({ data: file });
      setFileData((prev) => {
        const updatedFileData = [...prev[testType]];
        updatedFileData[index] = {
          ...updatedFileData[index],
          testSeriesFile: fileId,
        };
        return { ...prev, [testType]: updatedFileData };
      });
    } catch (error) {
      console.error("Test series file upload failed", error);
    }
  };

  const generateOutput = (data) => {

    const testTypes = {
      option1: "Mock Test",
      option2: "Subject Test",
      option3: "Chapter Test",
      option4: "Partial Test",
    };
  
    const output = Object.keys(testTypes).flatMap((key) => {
      const subjects = data[`${key}Subjects`] || [];
     
      return subjects.map((subject, index) => {
        const instructionFile = fileData[key][index]?.instructionFile || "";
        const testSeriesFile = fileData[key][index]?.testSeriesFile || "";
  
       
        return {
          testType: testTypes[key],
          testCost: "Free",
          subject: subject.subjectId,
          subSubject: subject.subSubjectId || undefined,
          chapter: subject.chapterId,
          topic: subject.topicId ? [subject.topicId] : [],
          testSeriesFiles: [
            {
              instructionFile,
              testSeriesFile,
            },
          ],
        };
      });
    });
  
    console.log("Generated Output:", output); // Log the final output
    return output;
  };

  const FileUpload = ({ file, setFile, label, inputId, uploadFunction }) => (
    <div className="addhandwritten-input mt-4 mb-4">
      <h6>{label}</h6>
      <div className="addcourse-upload-file">
        {file ? (
          <p
            onClick={() => document.getElementById(inputId).click()}
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            {label === "Instruction File"
              ? "Instruction File"
              : "Test Series File"}{" "}
            Uploaded
          </p>
        ) : (
          <SlCloudUpload
            style={{ cursor: "pointer" }}
            onClick={() => document.getElementById(inputId).click()}
          />
        )}
        <input
          type="file"
          id={inputId}
          style={{ display: "none" }}
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              setFile(file);
              await uploadFunction(file);
            }
          }}
        />
      </div>
    </div>
  );

  const renderTestFields = (testType) => {
    const { fields, append, remove } = testFieldArrays[testType];
    const { subSubjectOptions, chapterOptions, topicOptions } =
      fieldData[testType];

    return (
      <>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              <FileUpload
                file={fileData[testType][index]?.instructionFile}
                setFile={(file) =>
                  uploadAndSetInstructionFileId(testType, index, file)
                }
                label="Instruction File"
                inputId={`${testType}_instruction_${index}`}
                uploadFunction={(file) =>
                  uploadAndSetInstructionFileId(testType, index, file)
                }
              />

              <FileUpload
                file={fileData[testType][index]?.testSeriesFile}
                setFile={(file) =>
                  uploadAndSetTestSeriesFileId(testType, index, file)
                }
                label="Upload Test Series"
                inputId={`${testType}_testSeries_${index}`}
                uploadFunction={(file) =>
                  uploadAndSetTestSeriesFileId(testType, index, file)
                }
              />
            </div>
            <h6 className="mt-4">Subject</h6>
            <div className="input-container mb-2">
              <select
                {...register(`${testType}Subjects[${index}].subjectId`, {
                //   required: true,
                })}
                onChange={(e) =>
                  handleFieldChange(
                    testType,
                    index,
                    "subjectId",
                    e.target.value
                  )
                }
              >
                <option value="">Select Subject</option>
                {subjectOptions.map((opt) => (
                  <option key={opt._id} value={opt._id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <h6 className="mt-2">Sub-Subject</h6>
            <div className="input-container mb-2">
              <select
                {...register(`${testType}Subjects[${index}].subSubjectId`, {
                //   required: true,
                })}
                onChange={(e) =>
                  handleFieldChange(
                    testType,
                    index,
                    "subSubjectId",
                    e.target.value
                  )
                }
              >
                <option value="">Select Sub-Subject</option>
                {(subSubjectOptions[index] || []).map((opt) => (
                  <option key={opt._id} value={opt._id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <h6 className="mt-2">Chapter</h6>
            <div className="input-container mb-2">
              <select
                {...register(`${testType}Subjects[${index}].chapterId`, {
                //   required: true,
                })}
                onChange={(e) =>
                  handleFieldChange(
                    testType,
                    index,
                    "chapterId",
                    e.target.value
                  )
                }
              >
                <option value="">Select Chapter</option>
                {(chapterOptions[index] || []).map((opt) => (
                  <option key={opt._id} value={opt._id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <h6 className="mt-2">Topic</h6>
            <div className="input-container mb-2">
              <select
                {...register(`${testType}Subjects[${index}].topicId`, {
                //   required: true,
                })}
                onChange={(e) =>
                  handleFieldChange(testType, index, "topicId", e.target.value)
                }
              >
                <option value="">Select Topic</option>
                {(topicOptions[index] || []).map((opt) => (
                  <option key={opt._id} value={opt._id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            append({
              subjectId: "",
              subSubjectId: "",
              chapterId: "",
              topicId: "",
            });
            setFileData((prev) => ({
              ...prev,
              [testType]: [
                ...prev[testType],
                { instructionFile: null, testSeriesFile: null },
              ],
            }));
          }}
        >
          Add More
        </button>
      </>
    );
  };

  const onSubmit = (data) => setFormData(generateOutput(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="addhandwritten-input-two-div">
        <div className="addhandwritten-input">
          <h6>
            Select type of Test<span>*</span>
          </h6>
          <div className="addcourse-radios-btns">
            {["Mock Test", "Subject Test", "Chapter Test", "Partial Test"].map(
              (label, index) => {
                const value = `option${index + 1}`;
                return (
                  <div className="addcourse-radios" key={value}>
                    <input
                      type="radio"
                      value={value}
                      checked={selectedOption === value}
                      onChange={() => setSelectedOption(value)}
                    />
                    <p>{label}</p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {renderTestFields(selectedOption)}

      <button type="button" onClick={handleSubmit(onSubmit)}>
        Submit
      </button>
    </form>
  );
};

export default TestSeriesFormComponentMain;
