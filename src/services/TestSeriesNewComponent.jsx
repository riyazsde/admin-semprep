import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import {
  getAllSubjects,
  getAllSubSubjects,
  getAllSubjectsByGoalExam,
  getTopicsByChapter,
} from "./exportFunctions";

/**
 * Props:
 *   goalCategory  – selected university (goalCategory id)
 *   goalExamId    – selected course/goal id
 *   setFormData   – callback to parent with the final tests array
 */
const TestSeriesNewComponent = ({ goalCategory, goalExamId, setFormData }) => {
  const [tests, setTests] = useState([]);

  /* Sync up to parent whenever tests change */
  useEffect(() => {
    setFormData(tests);
  }, [tests, setFormData]);

  /* ======================================================
     TEST-LEVEL HANDLERS
  ====================================================== */
  const addTest = () => {
    setTests((t) => [
      ...t,
      {
        testName: "",
        testType: "Mock Test",
        testCost: "Free",
        subjects: [],
        testSeriesFiles: [],
      },
    ]);
  };

  const removeTest = (idx) => {
    setTests((t) => t.filter((_, i) => i !== idx));
  };

  const updateTest = (idx, key, value) => {
    setTests((t) =>
      t.map((test, i) => (i === idx ? { ...test, [key]: value } : test))
    );
  };

  /* ======================================================
     SUBJECT HANDLERS
  ====================================================== */
  const addSubject = (testIdx) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: [...test.subjects, { subject: "", subSubjects: [] }],
            }
          : test
      )
    );
  };

  const updateSubject = (testIdx, subIdx, key, value) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: test.subjects.map((s, j) =>
                j === subIdx ? { ...s, [key]: value } : s
              ),
            }
          : test
      )
    );
  };

  const removeSubject = (testIdx, subIdx) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: test.subjects.filter((_, j) => j !== subIdx),
            }
          : test
      )
    );
  };

  /* ======================================================
     SUB-SUBJECT HANDLERS
  ====================================================== */
  const addSubSubject = (testIdx, subIdx) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: test.subjects.map((s, j) =>
                j === subIdx
                  ? {
                      ...s,
                      subSubjects: [
                        ...s.subSubjects,
                        { subSubject: "", chapters: [] },
                      ],
                    }
                  : s
              ),
            }
          : test
      )
    );
  };

  const updateSubSubject = (testIdx, subIdx, ssIdx, key, value) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: test.subjects.map((s, j) =>
                j === subIdx
                  ? {
                      ...s,
                      subSubjects: s.subSubjects.map((ss, k) =>
                        k === ssIdx ? { ...ss, [key]: value } : ss
                      ),
                    }
                  : s
              ),
            }
          : test
      )
    );
  };

  const removeSubSubject = (testIdx, subIdx, ssIdx) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: test.subjects.map((s, j) =>
                j === subIdx
                  ? {
                      ...s,
                      subSubjects: s.subSubjects.filter((_, k) => k !== ssIdx),
                    }
                  : s
              ),
            }
          : test
      )
    );
  };

  /* ======================================================
     CHAPTER HANDLERS
  ====================================================== */
  const addChapter = (testIdx, subIdx, ssIdx) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: test.subjects.map((s, j) =>
                j === subIdx
                  ? {
                      ...s,
                      subSubjects: s.subSubjects.map((ss, k) =>
                        k === ssIdx
                          ? {
                              ...ss,
                              chapters: [
                                ...ss.chapters,
                                { chapter: "", topics: [] },
                              ],
                            }
                          : ss
                      ),
                    }
                  : s
              ),
            }
          : test
      )
    );
  };

  const updateChapter = (testIdx, subIdx, ssIdx, cIdx, key, value) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: test.subjects.map((s, j) =>
                j === subIdx
                  ? {
                      ...s,
                      subSubjects: s.subSubjects.map((ss, k) =>
                        k === ssIdx
                          ? {
                              ...ss,
                              chapters: ss.chapters.map((c, l) =>
                                l === cIdx ? { ...c, [key]: value } : c
                              ),
                            }
                          : ss
                      ),
                    }
                  : s
              ),
            }
          : test
      )
    );
  };

  const removeChapter = (testIdx, subIdx, ssIdx, cIdx) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: test.subjects.map((s, j) =>
                j === subIdx
                  ? {
                      ...s,
                      subSubjects: s.subSubjects.map((ss, k) =>
                        k === ssIdx
                          ? {
                              ...ss,
                              chapters: ss.chapters.filter((_, l) => l !== cIdx),
                            }
                          : ss
                      ),
                    }
                  : s
              ),
            }
          : test
      )
    );
  };

  /* ======================================================
     TOPIC HANDLERS
  ====================================================== */
  const addTopic = (testIdx, subIdx, ssIdx, cIdx) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: test.subjects.map((s, j) =>
                j === subIdx
                  ? {
                      ...s,
                      subSubjects: s.subSubjects.map((ss, k) =>
                        k === ssIdx
                          ? {
                              ...ss,
                              chapters: ss.chapters.map((c, l) =>
                                l === cIdx
                                  ? {
                                      ...c,
                                      topics: [...c.topics, { topic: "" }],
                                    }
                                  : c
                              ),
                            }
                          : ss
                      ),
                    }
                  : s
              ),
            }
          : test
      )
    );
  };

  const updateTopic = (testIdx, subIdx, ssIdx, cIdx, tIdx, value) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: test.subjects.map((s, j) =>
                j === subIdx
                  ? {
                      ...s,
                      subSubjects: s.subSubjects.map((ss, k) =>
                        k === ssIdx
                          ? {
                              ...ss,
                              chapters: ss.chapters.map((c, l) =>
                                l === cIdx
                                  ? {
                                      ...c,
                                      topics: c.topics.map((tp, m) =>
                                        m === tIdx ? { topic: value } : tp
                                      ),
                                    }
                                  : c
                              ),
                            }
                          : ss
                      ),
                    }
                  : s
              ),
            }
          : test
      )
    );
  };

  const removeTopic = (testIdx, subIdx, ssIdx, cIdx, tIdx) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              subjects: test.subjects.map((s, j) =>
                j === subIdx
                  ? {
                      ...s,
                      subSubjects: s.subSubjects.map((ss, k) =>
                        k === ssIdx
                          ? {
                              ...ss,
                              chapters: ss.chapters.map((c, l) =>
                                l === cIdx
                                  ? {
                                      ...c,
                                      topics: c.topics.filter(
                                        (_, m) => m !== tIdx
                                      ),
                                    }
                                  : c
                              ),
                            }
                          : ss
                      ),
                    }
                  : s
              ),
            }
          : test
      )
    );
  };

  /* ======================================================
     FILE HANDLERS
  ====================================================== */
  const addFile = (testIdx) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              testSeriesFiles: [
                ...test.testSeriesFiles,
                { instructionFile: "", testSeriesFile: "" },
              ],
            }
          : test
      )
    );
  };

  const updateFile = (testIdx, fileIdx, key, value) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              testSeriesFiles: test.testSeriesFiles.map((tf, j) =>
                j === fileIdx ? { ...tf, [key]: value } : tf
              ),
            }
          : test
      )
    );
  };

  const removeFile = (testIdx, fileIdx) => {
    setTests((t) =>
      t.map((test, i) =>
        i === testIdx
          ? {
              ...test,
              testSeriesFiles: test.testSeriesFiles.filter(
                (_, j) => j !== fileIdx
              ),
            }
          : test
      )
    );
  };

  /* ======================================================
     RENDER
  ====================================================== */
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h5 className="font-semibold">Tests</h5>
        <button
          type="button"
          onClick={addTest}
          className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-green-500 rounded"
        >
          <AiFillPlusCircle /> Add Test
        </button>
      </div>

      {tests.map((test, testIdx) => (
        <div key={testIdx} className="border rounded p-4 mb-4 bg-gray-50">
          <div className="flex justify-between mb-3">
            <h6 className="font-semibold">Test #{testIdx + 1}</h6>
            {tests.length > 1 && (
              <button
                type="button"
                onClick={() => removeTest(testIdx)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          {/* Test meta */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <input
              placeholder="Test Name"
              value={test.testName}
              onChange={(e) => updateTest(testIdx, "testName", e.target.value)}
              className="border p-2 rounded"
            />
            <select
              value={test.testType}
              onChange={(e) => updateTest(testIdx, "testType", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="Mock Test">Mock Test</option>
              <option value="Chapter Test">Chapter Test</option>
              <option value="Subject Test">Subject Test</option>
            </select>
            <select
              value={test.testCost}
              onChange={(e) => updateTest(testIdx, "testCost", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          {/* Subjects */}
          <div className="mb-3">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">Subjects</span>
              <button
                type="button"
                onClick={() => addSubject(testIdx)}
                className="text-green-600 text-sm"
              >
                + Add Subject
              </button>
            </div>

            {test.subjects.map((subject, subIdx) => (
              <SubjectBlock
                key={subIdx}
                testIdx={testIdx}
                subIdx={subIdx}
                subject={subject}
                goalExamId={goalExamId}
                updateSubject={updateSubject}
                removeSubject={removeSubject}
                addSubSubject={addSubSubject}
                updateSubSubject={updateSubSubject}
                removeSubSubject={removeSubSubject}
                addChapter={addChapter}
                updateChapter={updateChapter}
                removeChapter={removeChapter}
                addTopic={addTopic}
                updateTopic={updateTopic}
                removeTopic={removeTopic}
              />
            ))}
          </div>

          {/* Test Series Files */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">Test Series Files</span>
              <button
                type="button"
                onClick={() => addFile(testIdx)}
                className="text-green-600 text-sm"
              >
                + Add File
              </button>
            </div>

            {test.testSeriesFiles.map((tf, fileIdx) => (
              <div key={fileIdx} className="grid grid-cols-2 gap-3 mb-2">
                <input
                  placeholder="Instruction File ID"
                  value={tf.instructionFile}
                  onChange={(e) =>
                    updateFile(
                      testIdx,
                      fileIdx,
                      "instructionFile",
                      e.target.value
                    )
                  }
                  className="border p-2 rounded"
                />
                <input
                  placeholder="Test Series File ID"
                  value={tf.testSeriesFile}
                  onChange={(e) =>
                    updateFile(
                      testIdx,
                      fileIdx,
                      "testSeriesFile",
                      e.target.value
                    )
                  }
                  className="border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeFile(testIdx, fileIdx)}
                  className="text-red-500 text-xs col-span-2 text-left"
                >
                  Remove File
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {tests.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-6">
          No tests yet. Click "Add Test" to begin.
        </p>
      )}
    </div>
  );
};

/* ======================================================
   SUBJECT BLOCK
====================================================== */
const SubjectBlock = ({
  testIdx,
  subIdx,
  subject,
  goalExamId,
  updateSubject,
  removeSubject,
  addSubSubject,
  updateSubSubject,
  removeSubSubject,
  addChapter,
  updateChapter,
  removeChapter,
  addTopic,
  updateTopic,
  removeTopic,
}) => {
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    if (!goalExamId) return;
    getAllSubjects({
      setIsLoading: () => {},
      setData: (d) => setSubjectList(d?.data || []),
      params: { page: 1, limit: 100, search: "", goalId: goalExamId },
    });
  }, [goalExamId]);

  return (
    <div className="border rounded p-3 bg-white mb-2">
      <div className="flex items-center gap-2 mb-2">
        <select
          value={subject.subject}
          onChange={(e) =>
            updateSubject(testIdx, subIdx, "subject", e.target.value)
          }
          className="flex-1 border p-1.5 rounded text-sm"
        >
          <option value="">-- Select Subject --</option>
          {subjectList.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => removeSubject(testIdx, subIdx)}
          className="text-red-500"
        >
          <MdDelete />
        </button>
      </div>

      {/* Sub-Subjects */}
      <div className="ml-4">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-semibold text-gray-600">
            Sub-Subjects
          </span>
          <button
            type="button"
            onClick={() => addSubSubject(testIdx, subIdx)}
            className="text-green-600 text-xs"
          >
            + Add
          </button>
        </div>

        {subject.subSubjects.map((ss, ssIdx) => (
          <SubSubjectBlock
            key={ssIdx}
            testIdx={testIdx}
            subIdx={subIdx}
            ssIdx={ssIdx}
            subSubject={ss}
            subjectId={subject.subject}
            updateSubSubject={updateSubSubject}
            removeSubSubject={removeSubSubject}
            addChapter={addChapter}
            updateChapter={updateChapter}
            removeChapter={removeChapter}
            addTopic={addTopic}
            updateTopic={updateTopic}
            removeTopic={removeTopic}
          />
        ))}
      </div>
    </div>
  );
};

/* ======================================================
   SUB-SUBJECT BLOCK
====================================================== */
const SubSubjectBlock = ({
  testIdx,
  subIdx,
  ssIdx,
  subSubject,
  subjectId,
  updateSubSubject,
  removeSubSubject,
  addChapter,
  updateChapter,
  removeChapter,
  addTopic,
  updateTopic,
  removeTopic,
}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!subjectId) return;
    getAllSubSubjects({
      setIsLoading: () => {},
      setData: (d) => setList(d?.data || []),
      params: { page: 1, limit: 100, search: "", subjectId },
    });
  }, [subjectId]);

  return (
    <div className="border rounded p-2 bg-gray-50 mb-2">
      <div className="flex items-center gap-2 mb-2">
        <select
          value={subSubject.subSubject}
          onChange={(e) =>
            updateSubSubject(
              testIdx,
              subIdx,
              ssIdx,
              "subSubject",
              e.target.value
            )
          }
          className="flex-1 border p-1.5 rounded text-sm"
        >
          <option value="">-- Sub-Subject --</option>
          {list.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => removeSubSubject(testIdx, subIdx, ssIdx)}
          className="text-red-500"
        >
          <MdDelete />
        </button>
      </div>

      {/* Chapters */}
      <div className="ml-4">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-semibold text-gray-600">Chapters</span>
          <button
            type="button"
            onClick={() => addChapter(testIdx, subIdx, ssIdx)}
            className="text-green-600 text-xs"
          >
            + Add
          </button>
        </div>

        {subSubject.chapters.map((c, cIdx) => (
          <ChapterBlock
            key={cIdx}
            testIdx={testIdx}
            subIdx={subIdx}
            ssIdx={ssIdx}
            cIdx={cIdx}
            chapter={c}
            subSubjectId={subSubject.subSubject}
            updateChapter={updateChapter}
            removeChapter={removeChapter}
            addTopic={addTopic}
            updateTopic={updateTopic}
            removeTopic={removeTopic}
          />
        ))}
      </div>
    </div>
  );
};

/* ======================================================
   CHAPTER BLOCK + TOPICS
====================================================== */
const ChapterBlock = ({
  testIdx,
  subIdx,
  ssIdx,
  cIdx,
  chapter,
  subSubjectId,
  updateChapter,
  removeChapter,
  addTopic,
  updateTopic,
  removeTopic,
}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!subSubjectId) return;
    getAllSubjectsByGoalExam({
      setIsLoading: () => {},
      setData: (d) => setList(d?.data || []),
      params: { page: 1, limit: 100, subSubjectId },
    });
  }, [subSubjectId]);

  return (
    <div className="border rounded p-2 bg-white mb-2">
      <div className="flex items-center gap-2 mb-2">
        <select
          value={chapter.chapter}
          onChange={(e) =>
            updateChapter(
              testIdx,
              subIdx,
              ssIdx,
              cIdx,
              "chapter",
              e.target.value
            )
          }
          className="flex-1 border p-1.5 rounded text-sm"
        >
          <option value="">-- Chapter --</option>
          {list.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => removeChapter(testIdx, subIdx, ssIdx, cIdx)}
          className="text-red-500"
        >
          <MdDelete />
        </button>
      </div>

      {/* Topics */}
      <div className="ml-4">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-semibold text-gray-600">Topics</span>
          <button
            type="button"
            onClick={() => addTopic(testIdx, subIdx, ssIdx, cIdx)}
            className="text-green-600 text-xs"
          >
            + Add
          </button>
        </div>

        {chapter.topics.map((tp, tIdx) => (
          <TopicSelect
            key={tIdx}
            chapterId={chapter.chapter}
            value={tp.topic}
            onChange={(v) =>
              updateTopic(testIdx, subIdx, ssIdx, cIdx, tIdx, v)
            }
            onRemove={() => removeTopic(testIdx, subIdx, ssIdx, cIdx, tIdx)}
          />
        ))}
      </div>
    </div>
  );
};

const TopicSelect = ({ chapterId, value, onChange, onRemove }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!chapterId) return;
    getTopicsByChapter({
      setIsLoading: () => {},
      setData: (d) => setList(d?.data || []),
      params: { page: 1, limit: 100, chapterId },
    });
  }, [chapterId]);

  return (
    <div className="flex items-center gap-2 mb-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 border p-1 rounded text-xs"
      >
        <option value="">-- Topic --</option>
        {list.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={onRemove} className="text-red-500 text-xs">
        ×
      </button>
    </div>
  );
};

export default TestSeriesNewComponent;