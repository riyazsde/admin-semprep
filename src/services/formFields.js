export const HomePageAddAdvertisment = [
  //   { type: "text", name: "name", label: "Name", required: true },
  {
    type: "file",
    name: "image",
    label: "Image",
    required: true,
  },
  // {
  //   type: "select",
  //   name: "type",
  //   label: "Type",
  //   required: true,
  //   options: [
  //     { value: "Home", label: "Home Page" },
  //     { value: "StudyPlanner", label: "Study Planner" },
  //     { value: "HandwrittenNotes", label: "Handwritten Notes" },
  //     { value: "PYQsWithVideos", label: "PYQs with Videos" },
  //     { value: "Community", label: "Community" },
  //     { value: "CapsuleCourse", label: "Capsule Course" },
  //     { value: "Skills", label: "Skills" },
  //     { value: "CurrentAffairs", label: "Current Affairs" },
  //     { value: "Offer", label: "Offer" },
  //   ],
  // },
];

export const HomePageAddRewardsFormFields = [
  { type: "file", name: "image", label: "Image", required: true },
  { type: "text", name: "title", label: "Title", required: true },
  { type: "text", name: "desc", label: "Description", required: true },
  { type: "text", name: "code", label: "Code", required: true },
  { type: "number", name: "discount", label: "Discount", required: true },
];

export const HomePageAddTopContentFormFields = [
  { type: "file", name: "image", label: "Image", required: true },
  { type: "text", name: "headingText", label: "Heading", required: true },
  { type: "text", name: "description", label: "Description", required: true },
];

export const DashboardCoursePageContentFormFields = [
  { type: "file", name: "image", label: "Image", required: true },
  { type: "text", name: "name", label: "Name", required: true },
  { type: "text", name: "desc", label: "Description (Optional)", required: false },
];
export const DailyNewsFormsField = [
  { type: "file", name: "image", label: "Image", required: true },
  { type: "text", name: "heading", label: "Heading", required: true },
  { type: "text", name: "subheading", label: "Sub Heading", required: true },
  { type: "text", name: "content", label: "Description", required: true },
  { type: "date", name: "date", label: "Choose Date", required: true },
];

export const AboutExamPageContantFormFields = [
  { type: "file", name: "image", label: "Image" },
  { type: "text", name: "name", label: "Name", required: true },
  {
    type: "textarea",
    name: "description",
    label: "Description",
    required: true,
  },
  {
    type: "textarea",
    name: "eligibilityCriteria",
    label: "Eligibility Criteria",
    required: true,
  },
  {
    type: "textarea",
    name: "importantDates",
    label: "Important Dates",
    required: true,
  },
  { type: "textarea", name: "syllabus", label: "Syllabus", required: true },
  {
    type: "textarea",
    name: "examPattern",
    label: "Exam Pattern",
    required: true,
  },
  {
    type: "textarea",
    name: "additionalInfo",
    label: "Additional Info",
    required: true,
  },
  {
    type: "textarea",
    name: "importantLinks",
    label: "Important Links",
  },
];
