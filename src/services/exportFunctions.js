import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "./apiService";
import axios from "axios";
import { endpoints } from "./endPoints";
import api from "./api";
import { showNotification } from "./exportComponents";
import { toast } from "sonner"; // 
const baseUrl = "https://prep-project-zej8.onrender.com";


export const getHomePageContentBanner = async ({ setIsLoading, setData }) => {
  getRequest({
    endpoint: endpoints.getHomePageContentBanner,
    setIsLoading,
  })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
      setData(null);
    });
};

export const addHomePageContentBanner = async ({
  addFun,
  data,
  setShowModal,
}) => {
  postRequest({
    endpoint: endpoints.addHomePageContentBanner,
    data,
  })
    .then((res) => {
      if (addFun) addFun();
      if (setShowModal) setShowModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteHomePageContentBanner = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteHomePageContentBanner(id),
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getHomePageContentRewards = async ({ setIsLoading, setData }) => {
  getRequest({
    endpoint: endpoints.getHomePageContentRewards,
    setIsLoading,
  })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
      setData(null);
    });
};

export const deleteHomePageContentRewards = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteHomePageContentRewards(id),
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addHomePageContentRewards = async ({
  addFun,
  data,
  setShowModal,
}) => {
  postRequest({
    endpoint: endpoints.addHomePageContentRewards,
    data,
  })
    .then((res) => {
      if (setShowModal) setShowModal(false);
      if (addFun) addFun();
    })
    .catch((err) => {
      if (setShowModal) setShowModal(false);
    });
};
export const getHomePageContentTopContent = async ({
  setIsLoading,
  setData,
}) => {
  getRequest({
    endpoint: endpoints.getHomePageContentTopContent,
    setIsLoading,
  })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
      setData(null);
    });
};
export const addHomePageContentTopContent = async ({
  addFun,
  data,
  setShowModal,
}) => {
  postRequest({
    endpoint: endpoints.addHomePageContentTopContent,
    data,
  })
    .then((res) => {
      if (setShowModal) setShowModal(false);
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteHomePageContentTopContent = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteHomePageContentTopContent(id),
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDashboradAboutExam = async ({ setIsLoading, setData }) => {
  getRequest({
    endpoint: endpoints.getDashboradAboutExam,
    setIsLoading,
  })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
      setData(null);
    });
};

export const addDashboradAboutExam = async ({ addFun, data, setShowModal }) => {
  postRequest({
    endpoint: endpoints.addDashboradAboutExam,
    data,
  })
    .then((res) => {
      if (setShowModal) setShowModal(false);
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteDashboradAboutExam = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteDashboradAboutExam(id),
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDashboardCoursePageContent = async ({
  setIsLoading,
  setData,
}) => {
  getRequest({
    endpoint: endpoints.getDashboardCoursePageContent,
    setIsLoading,
  })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
      setData(null);
    });
};

export const addCourse = async ({ addFun, data, setShowModal }) => {
  postRequest({
    endpoint: endpoints.addCourse,
    data,
  })
    .then((res) => {
      if (setShowModal) setShowModal(false);
      if (addFun && res?.data?._id) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateCourse = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.updateCourse(id),
    data,
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCourse = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteCourse(id),
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addCapsuleCourse = async ({ addFun, data, setShowModal }) => {
  postRequest({
    endpoint: "/admin/skills",
    data,
  })
    .then((res) => {
      if (setShowModal) setShowModal(false);
      if (addFun && res?.data?._id) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addDashboardCoursePageContent = async ({
  addFun,
  data,
  setShowModal,
}) => {
  postRequest({
    endpoint: endpoints.addDashboardCoursePageContent,
    data,
  })
    .then((res) => {
      if (addFun) addFun();
      if (setShowModal) setShowModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteDashboardCoursePageContent = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteDashboardCoursePageContent(id),
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDashboardAllCourses = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getDashboardAllCourses,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
      setData(null);
    });
};

export const getGoalCategory = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getGoalCategory,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
      setData(null);
    });
};

export const getGoalCategoryById = async ({ setIsLoading, setData, id }) => {
  getRequest({
    endpoint: endpoints.getGoalCategoryById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
      setData(null);
    });
};

export const addGoalCategory = async ({ addFun, data, setShowModal }) => {
  postRequest({
    endpoint: endpoints.addGoalCategory,
    data,
  })
    .then((res) => {
      if (addFun && res?.data?._id) addFun(res?.data?._id);
      if (setShowModal) setShowModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteGoalCategory = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteGoalCategory(id),
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getGoalExam = async ({ setIsLoading, setData, params = {} }) => {
  getRequest({
    endpoint: endpoints.getGoalExam,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
      setData(null);
    });
};

export const addGoalExam = async ({ addFun, data, setShowModal }) => {
  postRequest({
    endpoint: endpoints.addGoalExam,
    data,
  })
    .then((res) => {
      if (addFun && res?.data?._id) addFun(res?.data?._id);
      if (setShowModal) setShowModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteGoalExam = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteGoalExam(id),
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllSubjects = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getAllSubjects,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllNotifications = async ({
  setIsLoading,
  setData,
  params = {},
}) =>
  getRequest({
    endpoint: endpoints.getAllNotifications,
    setIsLoading,
    setData,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });

export const addNotification = async ({ addFun, data, setShowModal }) => {
  postRequest({
    endpoint: endpoints.addNotification,
    data,
  })
    .then((res) => {
      if (addFun) addFun();
      if (setShowModal) setShowModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteNotification = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteNotification(id),
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteAllNotifications = async ({ addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteAllNotifications,
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSubjectById = async ({ setIsLoading, setData, id }) => {
  getRequest({
    endpoint: endpoints.getSubjectById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCourseById = async ({ setIsLoading, setData, id }) => {
  getRequest({
    endpoint: endpoints.getCourseById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addSubject = async ({ addFun, data, setShowModal }) => {
  postRequest({
    endpoint: endpoints.addSubject,
    data,
  })
    .then((res) => {
      if (addFun && res?.data?._id) addFun(res?.data?._id);
      if (setShowModal) setShowModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteSubject = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteSubject(id),
  })
    .then((res) => {
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getGoalExamByGoalCategory = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getGoalExamByGoalCategory(params?.goalCategoryId),
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
      setData(null);
    });
};

export const getAllSubSubjects = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getAllSubSubjects,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSubSubjectById = async ({ setIsLoading, setData, id }) => {
  getRequest({
    endpoint: endpoints.getSubSubjectById(id),
    setIsLoading,
    params: {},
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addSubSubject = async ({ addFun, data, setShowModal }) => {
  postRequest({
    endpoint: endpoints.addSubSubject,
    data,
  })
    .then((res) => {
      if (addFun && res?.data?._id) addFun(res?.data?._id);
      if (setShowModal) setShowModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteSubSubject = async ({ setIsLoading, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteSubSubject(id),
    setIsLoading,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllChapters = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getAllChapters,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getChapterById = async ({ setIsLoading, setData, id }) => {
  getRequest({
    endpoint: endpoints.getChapterById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addChapter = async ({ addFun, data, setShowModal }) => {
  postRequest({
    endpoint: endpoints.addChapter,
    data,
  })
    .then((res) => {
      if (addFun && res?.data?._id) addFun(res?.data?._id);
      if (setShowModal) setShowModal(false);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteChapter = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteChapter(id),
  })
    .then((res) => {
      console.log(res);
      if (addFun) addFun();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllSubjectsByGoalExam = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getAllSubjectsByGoalExam,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
      setData(null);
    });
};

export const getAllTopics = async ({ setIsLoading, setData, params = {} }) => {
  getRequest({
    endpoint: endpoints.getAllTopics,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getTopicById = async ({ setIsLoading, setData, id }) => {
  getRequest({
    endpoint: endpoints.getTopicById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addTopic = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addTopic,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res?.data?._id);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTopic = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteTopic(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTopicsByChapter = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getTopicsByChapter,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllVideos = async ({ setIsLoading, setData, params = {} }) => {
  getRequest({
    endpoint: endpoints.getAllVideos,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addVideo = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addVideo,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteVideo = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteVideo(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllHandwrittenNotes = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getAllHandwrittenNotes,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getAllTargetCurrentAffairs = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getAllTargetCurrentAffairs,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getHandwrittenNoteById = async ({ setIsLoading, setData, id }) => {
  getRequest({
    endpoint: endpoints.getHandwrittenNoteById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllSkills = async ({ setIsLoading, setData, params = {} }) => {
  getRequest({
    endpoint: endpoints.getAllSkills,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteSkill = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteSkill(id),
  }).then((res) => {
    if (res !== undefined) {
      if (addFun) addFun();
    }
  });
};

export const addHandwrittenNote = async ({ setIsLoading, data, addFun }) => {
  try {
    const res = await postRequest({
      endpoint: endpoints.addHandwrittenNote,
      data,
    });
    if (res !== undefined && addFun) addFun();
    return res;
  } catch (err) {
    console.error(err);
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to save handwritten note.";
    toast.error(msg);
    throw err;
  }
};

// ─────────────────────────────────────────────────────────────
// Upload handwritten notes file
// Auth token is read from localStorage. If your apiService uses a
// different key (e.g. "authToken", "accessToken"), update the
// getToken() line below to match.
// ─────────────────────────────────────────────────────────────


export const deleteHandwrittenNote = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteHandwrittenNote(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addTargetCurrentAffairs = async ({
  setIsLoading,
  data,
  addFun,
}) => {
  postRequest({
    endpoint: endpoints.addTargetCurrentAffairs,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editTargetCurrentAffairs = async ({
  setIsLoading,
  data,
  addFun,
  id,
}) => {
  putRequest({
    endpoint: endpoints.editTargetCurrentAffairs(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTargetCurrentAffairsById = async ({
  setIsLoading,
  setData,
  id,
}) =>
  getRequest({
    endpoint: endpoints.getTargetCurrentAffairsById(id),
    setIsLoading,
  }).then((res) => {
    if (res !== undefined) {
      setData(res?.data);
    }
  });

export const deleteTargetCurrentAffairs = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteTargetCurrentAffairs(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllEducatorNotes = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getAllEducatorNotes,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getVideoById = async ({ setIsLoading, setData, id }) => {
  getRequest({
    endpoint: endpoints.getVideoById(id),
    setIsLoading,
  })
    .then((res) => {
      if (res !== undefined) setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllStudents = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getAllStudents,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteStudent = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteStudent(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllCourseTypes = async ({ setIsLoading, setData, params }) => {
  getRequest({
    endpoint: endpoints.getAllCourseTypes,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addCourseType = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addCourseType,
    setIsLoading,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCourseType = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteCourseType(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllConceptMapping = async ({
  setIsLoading,
  setData,
  params,
}) => {
  getRequest({
    endpoint: endpoints.getAllConceptMapping,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addConceptMapping = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addConceptMapping,
    setIsLoading,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteConceptMapping = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteConceptMapping(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStudentById = async ({ setIsLoading, setData, id }) => {
  getRequest({
    endpoint: endpoints.getStudentById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res?.data?.user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllTestSeries = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getAllTestSeries,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTestSeriesById = async ({ setIsLoading, setData, id }) => {
  getRequest({
    endpoint: endpoints.getTestSeriesById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPracticeQuestionById = async ({
  setIsLoading,
  setData,
  id,
}) => {
  getRequest({
    endpoint: endpoints.getPracticeQuestionById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getPYQById = async ({ setIsLoading, setData, id }) => {
  getRequest({
    endpoint: endpoints.getPYQById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStudyPlannerPlansById = async ({
  setIsLoading,
  setData,
  id,
}) => {
  getRequest({
    endpoint: endpoints.getStudyPlannerPlansById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStudyPlannerCourseById = async ({
  setIsLoading,
  setData,
  id,
}) => {
  getRequest({
    endpoint: endpoints.getStudyPlannerCourseById(id),
    setIsLoading,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteTestSeries = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteTestSeries(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllPracticeQuestions = async ({
  setIsLoading,
  setData,
  params,
}) => {
  getRequest({
    endpoint: endpoints.getAllPracticeQuestions,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deletePracticeQuestion = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deletePracticeQuestion(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addPracticeQuestion = async ({ data, addFun }) => {
  postRequest({
    endpoint: endpoints.addPracticeQuestion,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllPYQs = async ({ setIsLoading, setData, params }) => {
  getRequest({
    endpoint: endpoints.getAllPYQs,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deletePYQ = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deletePYQ(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
// ─────────────────────────────────────────────────────────────
// Upload handwritten notes file
// ─────────────────────────────────────────────────────────────
export const uploadHandwrittenNotesFile = async ({ file, setIsLoading }) => {
  if (setIsLoading) setIsLoading(true);
  try {
    const formData = new FormData();
    formData.append("notes", file);

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("adminToken");

    const response = await axios.post(
      `${baseUrl}/api/v1/admin/handwritten-notes/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return response.data;
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

export const addPYQ = async ({ data, addFun }) => {
  postRequest({
    endpoint: endpoints.addPYQ,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllPayments = async ({ setIsLoading, setData, params }) => {
  getRequest({
    endpoint: endpoints.getAllPayments,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllRatings = async ({ setIsLoading, setData }) => {
  getRequest({
    endpoint: endpoints.getAllRatings,
    setIsLoading,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllEducators = async ({ setIsLoading, setData, params }) => {
  getRequest({
    endpoint: endpoints.getAllEducators,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addEducator = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addEducator,
    setIsLoading,
    data,
  })
    .then((res) => {
      if (res !== undefined) addFun(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteEducator = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteEducator(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllGroups = async ({ setIsLoading, setData }) => {
  getRequest({
    endpoint: endpoints.getAllGroups,
    setIsLoading,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addGroup = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addGroup,
    data,
    setIsLoading,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addUserToGroup = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addUserToGroup,
    data,
    setIsLoading,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteGroup = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteGroup(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getAllRedumptions = async ({ setIsLoading, setData }) => {
  getRequest({
    endpoint: endpoints.getAllRedumptions,
    setIsLoading,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addRedemption = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addRedemption,
    data,
    setIsLoading,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteRedemption = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteRedemption(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addEmployee = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addEmployee,
    setIsLoading,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const allPermissions = async ({ setIsLoading, setData, params }) => {
  getRequest({
    endpoint: endpoints.allPermissions,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllCarts = async ({ setIsLoading, setData, params }) => {
  getRequest({
    endpoint: endpoints.getAllCarts,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllComunityItems = async ({
  setIsLoading,
  setData,
  params,
}) => {
  getRequest({
    endpoint: endpoints.getAllComunityItems,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendPost = async ({ id, data, addFun }) => {
  postRequest({
    endpoint: endpoints.sendPost(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCommunityItem = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteCommunityItem(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const likePost = async ({ id, addFun }) => {
  putRequest({
    endpoint: endpoints.likePost(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const savePost = async ({ id, addFun }) => {
  putRequest({
    endpoint: endpoints.savePost(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addCommunityItem = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addCommunityItem,
    setIsLoading,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateBannerByPosition = async ({ id, data, addFun }) => {
  putRequest({
    endpoint: endpoints.updateBannerByPosition(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getBannerByPosition = async ({
  setData,
  params,
  setIsLoading,
  hideMsg,
}) => {
  getRequest({
    endpoint: endpoints.getBannerByPosition,
    setIsLoading,
    params,
    hideMsg,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getTutorialVideos = async ({ setData, setIsLoading, params }) => {
  getRequest({
    endpoint: endpoints.getAllTutorialVideos,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addTutorialVideo = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addTutorialVideo,
    setIsLoading,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};

export const addBannerByPosition = async ({ setIsLoading, data, addFun }) => {
  postRequest({
    endpoint: endpoints.addBannerByPosition,
    setIsLoading,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePost = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deletePost(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllStudyPlans = async ({ setData, setIsLoading, params }) => {
  getRequest({
    endpoint: endpoints.getAllStudyPlans,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStudyPlannerPlans = async ({
  setData,
  setIsLoading,
  params,
}) => {
  getRequest({
    endpoint: endpoints.getStudyPlannerPlans,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addStudyPlannerPlan = async ({ addFun, setIsLoading, data }) => {
  postRequest({
    endpoint: endpoints.addStudyPlannerPlan,
    setIsLoading,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteStudyPlannerPlan = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteStudyPlannerPlan(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getYouTubeVideos = async ({
  setData,
  setIsLoading,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getYouTubeVideos,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPYQContantents = async ({
  setData,
  setIsLoading,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getPYQContantents,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updatePYQContantents = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.updatePYQContantents(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addPYQContantents = async ({ addFun, setIsLoading, data }) => {
  postRequest({
    endpoint: endpoints.addPYQContantents,
    setIsLoading,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addYouTubeVideo = async ({ addFun, setIsLoading, data }) => {
  postRequest({
    endpoint: endpoints.addYouTubeVideo,
    setIsLoading,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteYouTubeVideo = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteYouTubeVideo(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addStudyPlannerCourse = async ({ addFun, data }) => {
  postRequest({
    endpoint: endpoints.addStudyPlannerCourse,

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getDailyNews = async ({ setData, setIsLoading, params = {} }) => {
  getRequest({
    endpoint: endpoints.getDailyNews,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteDailyNews = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteDailyNews(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteStudyPlannerCourse = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteStudyPlannerCourse(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addTestSeries = async ({ addFun, data }) => {
  return postRequest({
    endpoint: endpoints.addTestSeries,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

// export const updateTestSeries = async ({ addFun, data, id }) => {
//   return putRequest({
//     endpoint: endpoints.updateTestSeries(id),
//     data,
//   })
//     .then((res) => {
//       if (res !== undefined) {
//         if (addFun) addFun(res);
//       }
//       return res;
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });
// };

// export const deleteTestSeries = async ({ id, addFun }) => {
//   return deleteRequest({
//     endpoint: endpoints.deleteTestSeries(id),
//   })
//     .then((res) => {
//       if (res !== undefined) {
//         if (addFun) addFun(res);
//       }
//       return res;
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });
// };

export const getAllCapsuleCourses = async ({
  setData,
  setIsLoading,
  params,
}) => {
  getRequest({
    endpoint: endpoints.getAllCapsuleCourses,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCapsuleCourse = async ({ addFun, id }) => {
  deleteRequest({
    endpoint: endpoints.deleteCapsuleCourse(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addDailyNews = async ({ addFun, data }) => {
  postRequest({
    endpoint: endpoints.addDailyNews,

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateDailyNews = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.updateDailyNews(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateHomePageContentBanner = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.updateHomePageContentBanner(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDashboardDataByUserId = async ({
  addFun,
  parmas = {},
  id,
  setData,
  setIsLoading,
}) => {
  getRequest({
    endpoint: endpoints.getDashboardData(id),

    parmas,
  })
    .then((res) => {
      if (res !== undefined) {
        if (setData) setData(res);
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateEducator = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.updateEducator(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editConceptMapping = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editConceptMapping(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editGoalExam = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editGoalExam(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editSubject = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editSubject(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editSubSubject = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editSubSubject(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editChapter = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editChapter(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editTopic = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editTopic(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateVideo = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.updateVideo(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCourseTypeById = async ({ addFun, id, setData }) => {
  getRequest({
    endpoint: endpoints.getCourseTypeById(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
        if (setData) setData(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editCourseType = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editCourseType(id),

    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateCourseCategoryById = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.updateCourseCategoryById(id),
    data,
  }).then((res) => {
    if (res !== undefined) {
      if (addFun) addFun(res);
    }
  });
};

export const getCourseCategoryById = async ({ addFun, id, setData }) => {
  getRequest({
    endpoint: endpoints.getCourseCategoryById(id),
  }).then((res) => {
    if (res !== undefined) {
      if (addFun) addFun(res);
      if (setData) setData(res);
    }
  });
};

export const updateHandwrittenNote = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.updateHandwrittenNote(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editPYQ = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editPYQ(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editPracticeQuestion = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editPracticeQuestion(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editRedemption = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editRedemption(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUserCart = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editUserCart(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editStudyPlannerPlan = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editStudyPlannerPlan(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editStudyPlannerCourse = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editStudyPlannerCourse(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUserProfileImage = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.updateUserProfileImage(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
      // if (err?.response?.status === 413) showNotification({
      //   type: "error",
      //   message: "Image size should not be more than 2mb",
      // });
    });
};

export const uploadImage = async ({ data, id, addFun }) => {
  putRequest({
    endpoint: endpoints.uploadImage(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
      // if (err?.response?.status === 413) showNotification({
      //   type: "error",
      //   message: "Image size should not be more than 2mb",
      // });
    });
};

export const updateTestSeries = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.updateTestSeries(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateEmployee = async ({ addFun, data, id }) => {
  putRequest({
    endpoint: endpoints.editEmployee(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllDailyNews = async ({ addFun, setData }) => {
  getRequest({
    endpoint: endpoints.getAllDailyNews,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
        if (setData) setData(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteNewsPDF = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteNewsPDF(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addNewsPDF = async ({ addFun, data }) => {
  postRequest({
    endpoint: endpoints.addNewsPDF,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllMVPQuestions = async ({
  setIsLoading,
  setData,
  params = {},
}) => {
  getRequest({
    endpoint: endpoints.getAllMVPQuestions,
    setIsLoading,
    params,
  })
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteMVPQuestion = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteMVPQuestion(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addMVPQuestion = async ({ addFun, data }) => {
  postRequest({
    endpoint: endpoints.addMVPQuestion,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateMVPQuestion = async ({ id, addFun, data }) => {
  putRequest({
    endpoint: endpoints.updateMVPQuestion(id),
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getMVPQuestionById = async ({ id, addFun }) => {
  getRequest({
    endpoint: endpoints.getMVPQuestionById(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUniversity = async ({
  setIsLoading,
  setData,
  params,
  addFun,
}) => {
  if (setData) setIsLoading(true);
  getRequest({
    endpoint: endpoints.getAllUniversities,
  })
    .then((res) => {
      if (res !== undefined) {
        console.log(res);
        if (setData) setData(res?.data);
        if (addFun) addFun(res);
      }
      if (setData) setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      if (setData) setIsLoading(false);
    });
};

export const deleteUniversity = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteUniversity(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addUniversity = async ({ data, addFun, setIsLoading }) => {
  if (setIsLoading) setIsLoading(true);
  postRequest({
    endpoint: endpoints.addUniversity,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      if (setIsLoading) setIsLoading(false);
    });
};

export const getAllSemsters = async ({ setData, setIsLoading }) => {
  getRequest({
    endpoint: endpoints.getAllSemsters,
    setData,
    setIsLoading,
  })
    .then((res) => {
      if (res !== undefined) {
        console.log(res);
        if (setData) setData(res?.data);
        // if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSemsterByUniversityId = async ({
  setData,
  setIsLoading,
  params,
}) => {
  getRequest({
    endpoint: endpoints.getSemsterByUniversityId,
    setData,
    setIsLoading,
    params,
  })
    .then((res) => {
      if (res !== undefined) {
        setData(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteSemester = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: endpoints.deleteSemester(id),
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addSemester = async ({ data, addFun }) => {
  postRequest({
    endpoint: endpoints.addSemester,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addSemesterCourse = async ({ data, addFun }) => {
  postRequest({
    endpoint: endpoints.addSemesterCourse,
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllUniversityCourses = async ({
  setData,
  setIsLoading,
  params,
}) => {
  getRequest({
    endpoint: "/admin/UniversityCourse?",
    setData,
    setIsLoading,
    params,
  })
    .then((res) => {
      if (res !== undefined) {
        setData(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addUniversityCourse = async ({ data, addFun, setIsLoading }) => {
  if (setIsLoading) setIsLoading(true);
  postRequest({
    endpoint: "/admin/UniversityCourse",
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      if (setIsLoading) setIsLoading(false);
    });
};

export const deleteUniversityCourse = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: `/admin/UniversityCourse/${id}`,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllSemstersCommon = async ({
  setData,
  setIsLoading,
  params,
}) => {
  getRequest({
    endpoint: "/admin/semester",
    setData,
    setIsLoading,
    params,
  })
    .then((res) => {
      if (res !== undefined) {
        setData(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllJobs = async ({ setData, setIsLoading, params }) => {
  getRequest({
    endpoint: "/admin/placement-job",
    setData,
    setIsLoading,
    params,
  })
    .then((res) => {
      if (res !== undefined) {
        setData(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteJob = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: `/admin/placement-job/${id}`,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addJob = async ({ data, addFun, setIsLoading }) => {
  if (setIsLoading) setIsLoading(true);
  postRequest({
    endpoint: "/admin/placement-job",
    data,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      if (setIsLoading) setIsLoading(false);
    });
};

export const getAllApplicants = async ({
  id,
  setData,
  setIsLoading,
  params,
}) => {
  getRequest({
    endpoint: `/admin/placement-job/${id}/applications`,
    setData,
    setIsLoading,
    params,
  })
    .then((res) => {
      if (res !== undefined) {
        setData(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteApplicant = async ({ id, addFun }) => {
  deleteRequest({
    endpoint: `/admin/applicants/${id}`,
  })
    .then((res) => {
      if (res !== undefined) {
        if (addFun) addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllLandingPage = async ({ setData, setIsLoading, params }) => {
  getRequest({
    endpoint: `/admin/home/getHomeData`,
    setData,
    setIsLoading,
    params,
  })
    .then((res) => {
      if (res !== undefined) {
        setData(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllLandingPageCourses = async ({
  setData,
  setIsLoading,
  params,
}) => {
  getRequest({
    endpoint: `/admin/courses`,
    setData,
    setIsLoading,
    params,
  })
    .then((res) => {
      if (res !== undefined) {
        setData(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllLandingPageUniversitys = async ({
  setData,
  setIsLoading,
  params,
}) => {
  getRequest({
    endpoint: `/admin/university`,
    setData,
    setIsLoading,
    params,
  })
    .then((res) => {
      if (res !== undefined) {
        setData(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateHomeData = async ({ data, setIsLoading, addFun }) => {
  postRequest({
    endpoint: `/admin/home/update`,
    data,
    setIsLoading,
  })
    .then((res) => {
      if (res !== undefined) {
        addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllCoupons = async ({ setData, setIsLoading, params }) => {
  getRequest({
    endpoint: `/admin/coupons`,
    setData,
    setIsLoading,
    params,
  })
    .then((res) => {
      if (res !== undefined) {
        setData(res?.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCoupon = async ({ couponId, setIsLoading, getData }) => {
  deleteRequest({
    endpoint: `/admin/coupons/${couponId}`,
    setIsLoading,
  })
    .then((res) => {
      if (res !== undefined) {
        getData();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addCoupon = async ({ data, setIsLoading, addFun }) => {
  postRequest({
    endpoint: `/admin/coupons`,
    data,
    setIsLoading,
  })
    .then((res) => {
      if (res !== undefined) {
        addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllSubscriptions = async ({ setData, setIsLoading, params }) => {
  getRequest({
    endpoint: `/admin/subscription-plans`,
    setData,
    setIsLoading,
    params,
  })
    .then((res) => {
      if (res !== undefined) {
        setData(res?.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteSubscription = async ({
  subscriptionId,
  setIsLoading,
  getData,
}) => {
  deleteRequest({
    endpoint: `/admin/subscription-plan/${subscriptionId}`,
    setIsLoading,
  })
    .then((res) => {
      if (res !== undefined) {
        getData();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addSubscription = async ({ data, setIsLoading, addFun }) => {
  postRequest({
    endpoint: `/admin/subscription-plan`,
    data,
    setIsLoading,
  })
    .then((res) => {
      if (res !== undefined) {
        addFun(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
