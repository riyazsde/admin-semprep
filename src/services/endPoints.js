
export const endpoints = {
  // Authentication endpoints
  login: "/auth/login",
  register: "/auth/register",
  logout: "/auth/logout",

  //Upload Image
  uploadImage: (userId) => `admin/upload-id-picture/${userId}`,
  uploadInstructionFile: `admin/upload-instructions`,
  uploadTestInstructionFile: `admin/UploadCoursePdf`,

  // User endpoints
  getUserProfile: "/admin/getprofile",
  updateUserProfile: "/admin/update",
  updateUserProfileImage: (userId) => `admin/upload-profile-picture/${userId}`,
  getDashboardData: (userId) =>
    `/admin/my-courses/track/course/dashboard/user/${userId}`,

  //Dashboard
  // Home Page Content
  getHomePageContentBanner: "/admin/Banner/allBanner",
  deleteHomePageContentBanner: (id) => `/admin/Banner/deleteBanner/${id}`,
  addHomePageContentBanner: "/admin/Banner/AddBanner",
  updateHomePageContentBanner: (id) => `/admin/Banner/updateBanner/${id}`,

  getHomePageContentRewards: "/admin/coupons",
  deleteHomePageContentRewards: (id) => `/admin/coupons/${id}`,
  addHomePageContentRewards: "/admin/coupons",
  getAllTargetCurrentAffairs: "/admin/targetCurrentAffairs",
  deleteTargetCurrentAffairs: (id) => `/admin/targetCurrentAffairs/${id}`,
  getTargetCurrentAffairsById: (id) => `/admin/targetCurrentAffairs/${id}`,
  addTargetCurrentAffairs: "/admin/targetCurrentAffairs",
  editTargetCurrentAffairs: (id) => `/admin/targetCurrentAffairs/${id}`,
  getHomePageContentTopContent: "/admin/top-content",
  deleteHomePageContentTopContent: (id) => `/admin/top-content/${id}`,
  addHomePageContentTopContent: "/admin/top-content",

  getDashboradAboutExam: "/admin/aboutExam",
  addDashboradAboutExam: "/admin/aboutExam",
  deleteDashboradAboutExam: (id) => `/admin/aboutExam/${id}`,

  getDashboardCoursePageContent: "/admin/Category/getAllCategory",
  addDashboardCoursePageContent: "/admin/Category/createCategory",
  deleteDashboardCoursePageContent: (id) => `/admin/Category/delete/${id}`,

  getDashboardAllCourses: "/admin/courses/byChapter/byCourse/byTopic",
  getGoalCategory: "/admin/goal-category",
  getGoalCategoryById: (id) => `/admin/goals/${id}`,

  addGoalCategory: "/admin/goal-category",
  deleteGoalCategory: (id) => `/admin/goal-category/${id}`,

  getGoalExam: "/admin/goals",

  addGoalExam: "/admin/goals",
  editGoalExam: (id) => `/admin/goals/${id}`,
  deleteGoalExam: (id) => `/admin/goals/${id}`,

  getAllSubjects: "/admin/subjects",
  getSubjectById: (id) => `/admin/subjects/${id}`,
  addSubject: "/admin/subjects",

  editSubject: (id) => `/admin/subjects/${id}`,
  deleteSubject: (id) => `/admin/subjects/${id}`,

  getGoalExamByGoalCategory: (id) => `/admin/goals/byGoalCaegory/${id}`,
  getAllSubSubjects: "/admin/sub-Subjects",
  addSubSubject: "/admin/sub-Subjects",
  getSubSubjectById: (id) => `/admin/sub-Subjects/${id}`,
  editSubSubject: (id) => `/admin/sub-Subjects/${id}`,
  deleteSubSubject: (id) => `/admin/sub-Subjects/${id}`,

  getAllChapters: "/admin/chapters",
  getChapterById: (id) => `/admin/chapters/${id}`,
  addCourse: "/admin/courses/add",
  deleteCourse: (id) => `/admin/courses/${id}`,
  updateCourse: (id) => `/admin/courses/${id}`,

  addChapter: "/admin/chapters",
  editChapter: (id) => `/admin/chapters/${id}`,
  deleteChapter: (id) => `/admin/chapters/${id}`,

  getAllSubjectsByGoalExam: `/admin/chapters/bysubject/byCourse`,

  getAllTopics: "/admin/topics",
  getTopicById: (id) => `/admin/topics/${id}`,
  getTopicsByChapter: `/admin/topics/bysubject/byCourse/byChapter`,
  addTopic: "/admin/topics",
  editTopic: (id) => `/admin/topics/${id}`,
  deleteTopic: (id) => `/admin/topics/${id}`,

  getAllHandwrittenNotes: "/admin/handwritten-notes",
  getHandwrittenNoteById: (id) => `/admin/handwritten-notes/${id}`,
  deleteHandwrittenNote: (id) => `/admin/handwritten-notes/${id}`,
  addHandwrittenNote: "/admin/handwritten-notes",
  uploadHandwrittenNotesFile: "/admin/handwritten-notes/upload",
  updateHandwrittenNote: (id) => `/admin/handwritten-notes/${id}`,
  getAllEducatorNotes: "/admin/educators",

  getAllVideos: "/admin/videos",
  getVideoById: (id) => `/admin/videos/${id}`,
  addVideo: "/admin/videos",
  updateVideo: (id) => `/admin/videos/${id}`,
  deleteVideo: (id) => `/admin/videos/${id}`,

  getAllStudents: "/admin/profile",
  getStudentById: (id) => `/admin/profile/${id}`,
  deleteStudent: (id) => `/admin/users/profile/delete/${id}`,

  getAllCourseTypes: "/admin/Category/getAllCategory",
  getCourseTypeById: (id) => `/admin/Category/${id}`,
  addCourseType: "/admin/Category/createCategory",
  editCourseType: (id) => `/admin/Category/edit/${id}`,
  deleteCourseType: (id) => `/admin/Category/delete/${id}`,

  updateCourseCategoryById: (id) => `/admin/Category/update/${id}`,
  getCourseCategoryById: (id) => `/admin/Category/getAllCategory/${id}`,
  getAllConceptMapping: "/admin/concept-mappings",
  addConceptMapping: "/admin/concept-mapping",
  deleteConceptMapping: (id) => `/admin/concept-mapping/${id}`,
  editConceptMapping: (id) => `/admin/concept-mapping/${id}`,

  getAllPracticeQuestions: "/admin/practice-questions",
  getPracticeQuestionById: (id) => `/admin/practice-questions/${id}`,
  addPracticeQuestion: "/admin/practice-questions",
  editPracticeQuestion: (id) => `/admin/practice-questions/${id}`,
  deletePracticeQuestion: (id) => `/admin/practice-questions/${id}`,

  getAllPYQs: "/admin/previous-year-questions",
  getPYQById: (id) => `/admin/previous-year-questions/${id}`,
  addPYQ: "/admin/previous-year-questions",
  editPYQ: (id) => `/admin/previous-year-questions/${id}`,
  deletePYQ: (id) => `/admin/previous-year-questions/${id}`,

  getAllPayments: "/admin/transactions",
  getAllRatings: "/admin/ratings",

  getAllEducators: "/admin/educators",
  addEducator: "/admin/educators",
  updateEducator: (id) => `/admin/educators/${id}`,
  deleteEducator: (id) => `/admin/educators/${id}`,

  getAllTestSeries: "/admin/test-series",
  getTestSeriesById: (id) => `/admin/test-series/${id}`,
  addTestSeries: "/admin/test-series",
  updateTestSeries: (id) => `/admin/test-series/${id}`,
  deleteTestSeries: (id) => `/admin/test-series/${id}`,
  getAllGroups: "/admin/role",
  deleteGroup: (id) => `/admin/role/${id}`,
  addGroup: "/admin/role",

  addEmployee: "/admin/registration",
  editEmployee: (id) => `/admin/registration/${id}`,
  allPermissions: "/admin/permissions",

  getAllCarts: "/admin/courses/wishlist/get",

  getPYQContantents: "/admin/practice-questions/maintitle/get",
  addPYQContantents: "/admin/practice-questions/maintitle/get",
  updatePYQContantents: (id) => `/admin/practice-questions/maintitle/${id}`,

  getDailyNews: "/admin/currentAffairs",
  getAllDailyNews: "/admin/pdf",
  deleteNewsPDF: (id) => `/admin/pdf/${id}`,
  addNewsPDF: "/admin/pdf",
  deleteDailyNews: (id) => `/admin/currentAffairs/${id}`,
  addDailyNews: "/admin/currentAffairs",
  updateDailyNews: (id) => `/admin/currentAffairs/${id}`,

  addUserToGroup: "/admin/role/addRoleToUser",

  deleteUserCart: (id) => `/admin/cart/${id}`,
  editUserCart: (id) => `/admin/cart/update/user/${id}`,

  getUserWishList: "/admin/wishlist",

  getAllRedumptions: "/admin/redemptions",

  getAllCapsuleCourses: "/admin/capsuleCourse",
  addCapsuleCourse: "/admin/capsuleCourse/add",
  deleteCapsuleCourse: (id) => `/admin/capsuleCourse/${id}`,

  getCourseById: (id) => `/admin/courses/${id}`,

  addRedemption: "/admin/redemptions",
  editRedemption: (id) => `/admin/redemptions/${id}`,
  deleteRedemption: (id) => `/admin/redemptions/${id}`,

  getAllComunityItems: "/admin/posts",
  addCommunityItem: "/admin/posts",
  sendPost: (id) => `/admin/posts/${id}/comment`,
  savePost: (id) => `/admin/posts/${id}/save`,
  likePost: (id) => `/admin/posts/${id}/like`,
  deletePost: (id) => `/admin/posts/${id}`,
  deleteCommunityItem: (id) => `/admin/posts/${id}`,

  updateBannerByPosition: (id) => `/admin/Banner/updateBanner/${id}`,

  getBannerByPosition: "/admin/Banner/bannerByPosition",
  addBannerByPosition: "/admin/Banner/AddBanner",

  getAllTutorialVideos: "/admin/Banner/allBanner",
  addTutorialVideo: "/admin/Banner/AddBanner",

  getAllStudyPlans: "/admin/study-planners",
  getStudyPlannerCourseById: (id) => `/admin/study-planners/${id}`,
  addStudyPlannerCourse: "/admin/study-planners",
  editStudyPlannerCourse: (id) => `/admin/study-planners/${id}`,
  deleteStudyPlannerCourse: (id) => `/admin/study-planners/${id}`,
  getStudyPlannerPlans: "/admin/study-plans",
  getStudyPlannerPlansById: (id) => `/admin/study-plans/${id}`,
  addStudyPlannerPlan: "/admin/study-plans",
  editStudyPlannerPlan: (id) => `/admin/study-plans/${id}`,
  deleteStudyPlannerPlan: (id) => `/admin/study-plans/${id}`,
  getYouTubeVideos: "/admin/youtubeVideos",
  deleteYouTubeVideo: (id) => `/admin/youtubeVideos/${id}`,
  addYouTubeVideo: "/admin/youtubeVideos",

  getAllSkills: "/admin/skills",

  getAllTestSeries: "/admin/test-series",
  addTestSeries: "/admin/test-series",
  deleteTestSeries: (id) => `/admin/test-series/${id}`,

  getAllNotifications: "/admin/notifications/user",
  addNotification: "/admin/notifications",
  deleteNotification: (id) => `/admin/notifications/delete/${id}`,
  deleteAllNotifications: "/admin/notifications/delete/all",
  getAllMVPQuestions: "/admin/mvp",
  getMVPQuestionById: (id) => `/admin/mvp/${id}`,
  deleteMVPQuestion: (id) => `/admin/mvp/${id}`,
  addMVPQuestion: "/admin/mvp",
  updateMVPQuestion: (id) => `/admin/mvp/${id}`,
  getAllUniversities: "/admin/university",
  addUniversity: "/admin/university",
  deleteUniversity: (id) => `/admin/university/${id}`,
  getUniversityById: (id) => `/admin/university/${id}`,
  updateUniversity: (id) => `/admin/university/${id}`,
  getSemsterByUniversityId: `/admin/semester`,
  addSemester: "/admin/semester",
  deleteSemester: (id) => `/admin/semester/${id}`,
  getAllSemsters: "/admin/semester",
  addSemesterCourse: "/admin/semester",

  getAllJobs: "/admin/jobs",
  addJob: "/admin/jobs",
  deleteJob: (id) => `/admin/jobs/${id}`,
};
