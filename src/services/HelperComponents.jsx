import React, { useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import axios from "axios"; // Ensure axios is installed

const TestForm = ({ selectedOption, handleChangeTest, subject, subSubjects, chapters, topics }) => {
  const [tests, setTests] = useState([
    {
      testType: "",
      testCost: "",
      subject: "",
      chapter: "",
      topic: [],
      testSeriesFiles: [{ instructionFile: "", testSeriesFile: "" }],
    },
  ]);

  const addTest = () => {
    setTests([
      ...tests,
      {
        testType: "",
        testCost: "",
        subject: "",
        chapter: "",
        topic: [],
        testSeriesFiles: [{ instructionFile: "", testSeriesFile: "" }],
      },
    ]);
  };

  // Reusable component for File Upload
  const FileUpload = ({ label, file, inputId, onChange }) => (
    <div>
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
            {file.name}
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
          onChange={(e) => onChange(e.target.files[0])} // File selected, triggers onChange
        />
      </div>
    </div>
  );

  const uploadFile = async (file, testIndex, fileType) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming the response contains the file ID
      const fileId = response.data.id;

      setTests((prevTests) => {
        const updatedTests = [...prevTests];
        updatedTests[testIndex].testSeriesFiles[0][fileType] = fileId;
        return updatedTests;
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleTestChange = (e, testIndex, field) => {
    const { name, value } = e.target;

    setTests((prevTests) => {
      const updatedTests = [...prevTests];
      updatedTests[testIndex][field] = value;
      return updatedTests;
    });
  };

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
    >
      {tests.map((test, testIndex) => (
        <div key={testIndex}>
          {/* Test Type Selection */}
          <div>
            <h6>Select type of Test</h6>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {["Mock Test", "Subject Test", "Chapter Test", "Partial Test"].map(
                (label, index) => (
                  <div className="addcourse-radios" key={label}>
                    <input
                      type="radio"
                      value={`option${index + 1}`}
                      checked={test.testType === `option${index + 1}`}
                      onChange={(e) => handleTestChange(e, testIndex, "testType")}
                    />
                    <p>{label}</p>
                  </div>
                )
              )}
            </div>
          </div>

          {test.testType === "option1" && (
            <>
              {/* Cost of the Test */}
              <div>
                <h6>Cost of the Test</h6>
                <div className="addcourse-radios-btns">
                  {["Paid Test", "Free Test"].map((option) => (
                    <div className="addcourse-radios" key={option}>
                      <input
                        type="radio"
                        name={`testCost-${testIndex}`}
                        value={option}
                        checked={test.testCost === option}
                        onChange={(e) => handleTestChange(e, testIndex, "testCost")}
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instruction File */}
              <FileUpload
                label="Instruction File"
                file={test.testSeriesFiles[0].instructionFile}
                inputId={`instructionFile-${testIndex}`}
                onChange={(file) => uploadFile(file, testIndex, "instructionFile")}
              />

              {/* Test Series File */}
              <FileUpload
                label="Upload Test Series"
                file={test.testSeriesFiles[0].testSeriesFile}
                inputId={`testSeriesFile-${testIndex}`}
                onChange={(file) => uploadFile(file, testIndex, "testSeriesFile")}
              />

              {/* Dropdown Fields */}
              <div>
                <h6>Subject</h6>
                <select
                  value={test.subject}
                  onChange={(e) => handleTestChange(e, testIndex, "subject")}
                >
                  <option value="">Select Subject</option>
                  {subject.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h6>Sub Subjects (Optional)</h6>
                <select
                  value={test.subSubjects}
                  onChange={(e) => handleTestChange(e, testIndex, "subSubjects")}
                >
                  <option value="">Select Sub Subjects</option>
                  {subSubjects.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h6>Chapter</h6>
                <select
                  value={test.chapter}
                  onChange={(e) => handleTestChange(e, testIndex, "chapter")}
                >
                  <option value="">Select Chapter</option>
                  {chapters.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h6>Topic</h6>
                <select
                  multiple
                  value={test.topic}
                  onChange={(e) => handleTestChange(e, testIndex, "topic")}
                >
                  {topics.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      ))}

      <button onClick={addTest}>Add Test</button>
    </div>
  );
};

export default TestForm;
