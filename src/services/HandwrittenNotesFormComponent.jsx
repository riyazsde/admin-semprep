import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  getAllSubjects,
  getAllSubSubjects,
  getAllSubjectsByGoalExam,
  getTopicsByChapter,
  getAllVideos,
} from "./exportFunctions";

const HandwrittenNotesFormComponent = ({
  goalCategory,
  goalExamId,
  setFormSubjects,
}) => {
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [subSubjectOptions, setSubSubjectOptions] = useState({});
  const [chapterOptions, setChapterOptions] = useState({});
  const [topicOptions, setTopicOptions] = useState({});
  const [videosData, setVideosData] = useState({});

  const { register, handleSubmit, control } = useForm();
  const {
    fields: subjectFields,
    append: appendSubject,
    remove: removeSubject,
  } = useFieldArray({
    control,
    name: "subjects",
  });

  useEffect(() => {
    if (goalExamId) {
      const params = {
        goalCategory,
        goalId: goalExamId,
        page: 1,
        limit: 1000,
        search: "",
      };

      getAllSubjects({
        setData: (data) => {
          setSubjectOptions(Array.isArray(data?.data) ? data?.data : []);
        },
        params,
      });
    }
  }, [goalExamId, goalCategory]);

  const handleFieldChange = (
    subjectIndex,
    subIndex,
    chapterIndex,
    name,
    value
  ) => {
    const params = { page: 1, limit: 1000, search: "" };

    if (name === "subjectId" && value) {
      params.subjectId = value;
      getAllSubSubjects({
        setData: (data) =>
          setSubSubjectOptions((prev) => ({
            ...prev,
            [subjectIndex]: data?.data || [],
          })),
        params,
      });
      
      getAllSubjectsByGoalExam({
        setData: (data) =>
          setChapterOptions((prev) => ({
            ...prev,
            [subjectIndex]: data?.data || [],
          })),
        params,
      });
    }

    if (name === "subSubjectId" && value) {
      params.subSubjectId = value;
      // Use composite key so that chapters for one sub-subject don't override another.
      getAllSubjectsByGoalExam({
        setData: (data) =>
          setChapterOptions((prev) => ({
            ...prev,
            [`${subjectIndex}-${subIndex}`]: data?.data || [],
          })),
        params,
      });
    }

    if (name === "chapterId" && value) {
      params.chapterId = value;
      getTopicsByChapter({
        setData: (data) =>
          setTopicOptions((prev) => ({
            ...prev,
            [`${subjectIndex}-${subIndex}-${chapterIndex}`]: data?.data || [],
          })),
        params,
      });
    }

    if (name === "topicId" && value) {
      params.topicId = value;
      getAllVideos({
        setData: (data) => {
          const videoData = {
            courseVideos: [data?.data?.[0]?._id] || [],
          };

          setVideosData((prev) => ({
            ...prev,
            [value]: videoData,
          }));
        },
        params,
      });
    }
  };

  const onSubmit = (data) => {
    const formattedData = data.subjects.map((subject, subjectIndex) => ({
      subject: subject.subjectId,
      subSubjects: subject.subSubjects?.map((sub, subIndex) => {
        const subSubjectData = {
          chapters: sub.chapters?.map((chapter, chapterIndex) => ({
            chapter: chapter.chapterId,
            topics: chapter.topics?.map((topic) => {
              const videoDetails = videosData[topic.topicId] || {};
              const topicName =
                topicOptions[
                  `${subjectIndex}-${subIndex}-${chapterIndex}`
                ]?.find((opt) => opt._id === topic.topicId)?.name ||
                "Unknown Topic";

              return {
                topic: topic.topicId,
                name: topicName,
                handwrittenNotes: [topic.handwrittenNotesLink] || [],
                durationOfNotes: topic.durationOfNotes || "",
              };
            }),
          })),
        };

        if (sub.subSubjectId) {
          subSubjectData.subSubject = sub.subSubjectId;
        }

        return subSubjectData;
      }),
    }));

    setFormSubjects(formattedData);
    console.log(formattedData);
  };

  return (
    <form>
      {subjectFields.map((subject, subjectIndex) => (
        <div key={subject.id}>
          <div style={{ display: "block" }}>
            <button
              type="button"
              onClick={() => removeSubject(subjectIndex)}
              style={{ marginBottom: "5px" }}
            >
              ❌
            </button>
            <div className="input-container">
              <select
                {...register(`subjects[${subjectIndex}].subjectId`, {
                  required: true,
                })}
                onChange={(e) =>
                  handleFieldChange(
                    subjectIndex,
                    null,
                    null,
                    "subjectId",
                    e.target.value
                  )
                }
              >
                <option value="">Select Subject</option>
                {subjectOptions?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <label>Select Subject</label>
            </div>
          </div>

          <SubSubjectArray
            control={control}
            register={register}
            subjectIndex={subjectIndex}
            subSubjectOptions={subSubjectOptions[subjectIndex] || []}
            
            chapterOptions={chapterOptions}
            topicOptions={topicOptions}
            handleFieldChange={handleFieldChange}
          />
        </div>
      ))}

      <button type="button" onClick={() => appendSubject({ subSubjects: [] })}>
        Add Subject
      </button>

      <button type="button" onClick={handleSubmit(onSubmit)}>
        Submit
      </button>
    </form>
  );
};

const SubSubjectArray = ({
  control,
  register,
  subjectIndex,
  subSubjectOptions,
  handleFieldChange,
  chapterOptions,
  topicOptions,
}) => {
  const {
    fields: subFields,
    append: appendSub,
    remove: removeSub,
  } = useFieldArray({
    control,
    name: `subjects[${subjectIndex}].subSubjects`,
  });

  return (
    <div className="mt-4 mb-2">
      {subFields.map((sub, subIndex) => (
        <div key={sub.id}>
          <div style={{ display: "block" }}>
            <button
              type="button"
              onClick={() => removeSub(subIndex)}
              style={{ marginBottom: "5px" }}
            >
              ❌
            </button>
            <div className="input-container mt-4 mb-2">
              <select
                {...register(
                  `subjects[${subjectIndex}].subSubjects[${subIndex}].subSubjectId`
                )}
                onChange={(e) =>
                  handleFieldChange(
                    subjectIndex,
                    subIndex,
                    null,
                    "subSubjectId",
                    e.target.value
                  )
                }
              >
                <option value="">Select SubSubject</option>
                {subSubjectOptions?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <label>Select SubSubject</label>
            </div>
          </div>

          <ChapterArray
            control={control}
            register={register}
            
            chapterOptions={
              chapterOptions[`${subjectIndex}-${subIndex}`] ||
              chapterOptions[subjectIndex] ||
              []
            }
            subjectIndex={subjectIndex}
            subIndex={subIndex}
            handleFieldChange={handleFieldChange}
            topicOptions={topicOptions}
          />
        </div>
      ))}
      <button type="button" onClick={() => appendSub({ chapters: [] })}>
        Add SubSubject
      </button>
    </div>
  );
};

const ChapterArray = ({
  control,
  register,
  subjectIndex,
  subIndex,
  handleFieldChange,
  chapterOptions,
  topicOptions,
}) => {
  const {
    fields: chapterFields,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({
    control,
    name: `subjects[${subjectIndex}].subSubjects[${subIndex}].chapters`,
  });

  return (
    <div className="mt-4 mb-2">
      {chapterFields.map((chapter, chapterIndex) => (
        <div key={chapter.id}>
          <div style={{ display: "block" }}>
            <button
              type="button"
              onClick={() => removeChapter(chapterIndex)}
              style={{ marginBottom: "5px" }}
            >
              ❌
            </button>
            <div className="input-container">
              <select
                {...register(
                  `subjects[${subjectIndex}].subSubjects[${subIndex}].chapters[${chapterIndex}].chapterId`
                )}
                onChange={(e) =>
                  handleFieldChange(
                    subjectIndex,
                    subIndex,
                    chapterIndex,
                    "chapterId",
                    e.target.value
                  )
                }
              >
                <option value="">Select Chapter</option>
                {chapterOptions?.map((chapter) => (
                  <option key={chapter._id} value={chapter._id}>
                    {chapter.name}
                  </option>
                ))}
              </select>
              <label>Select Chapter</label>
            </div>
          </div>

          <TopicArray
            control={control}
            register={register}
            subjectIndex={subjectIndex}
            subIndex={subIndex}
            chapterIndex={chapterIndex}
            handleFieldChange={handleFieldChange}
            topicOptions={topicOptions}
          />
        </div>
      ))}
      <button type="button" onClick={() => appendChapter({ topics: [] })}>
        Add Chapter
      </button>
    </div>
  );
};

const TopicArray = ({
  control,
  register,
  subjectIndex,
  subIndex,
  chapterIndex,
  handleFieldChange,
  topicOptions,
}) => {
  const {
    fields: topicFields,
    append: appendTopic,
    remove: removeTopic,
  } = useFieldArray({
    control,
    name: `subjects[${subjectIndex}].subSubjects[${subIndex}].chapters[${chapterIndex}].topics`,
  });

  const uniqueKey = `${subjectIndex}-${subIndex}-${chapterIndex}`;

  return (
    <div className="mt-4 mb-2">
      {topicFields.map((topic, topicIndex) => (
        <div key={topic.id}>
          <div style={{ display: "block" }}>
            <button
              type="button"
              onClick={() => removeTopic(topicIndex)}
              style={{ marginBottom: "5px" }}
            >
              ❌
            </button>
            <div className="input-container">
              <select
                {...register(
                  `subjects[${subjectIndex}].subSubjects[${subIndex}].chapters[${chapterIndex}].topics[${topicIndex}].topicId`
                )}
                onChange={(e) =>
                  handleFieldChange(
                    subjectIndex,
                    subIndex,
                    chapterIndex,
                    "topicId",
                    e.target.value
                  )
                }
              >
                <option value="">Select Topic</option>
                {topicOptions[uniqueKey]?.map((topic) => (
                  <option key={topic._id} value={topic._id}>
                    {topic.name}
                  </option>
                ))}
              </select>
              <label>Select Topic</label>
            </div>
          </div>

          <div className="input-container mt-4">
            <input
              type="text"
              placeholder="Enter Handwritten Notes Link"
              {...register(
                `subjects[${subjectIndex}].subSubjects[${subIndex}].chapters[${chapterIndex}].topics[${topicIndex}].handwrittenNotesLink`
              )}
            />
            <label>Handwritten Notes Link</label>
          </div>

          <div className="input-container mt-4">
            <input
              type="text"
              placeholder="Enter Duration of Notes"
              {...register(
                `subjects[${subjectIndex}].subSubjects[${subIndex}].chapters[${chapterIndex}].topics[${topicIndex}].durationOfNotes`
              )}
            />
            <label>Duration of Notes (Min)</label>
          </div>
        </div>
      ))}
      <button
        className="mt-2 mb-2"
        type="button"
        onClick={() => appendTopic({})}
      >
        Add Topic
      </button>
    </div>
  );
};

export default HandwrittenNotesFormComponent;
