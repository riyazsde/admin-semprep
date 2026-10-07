import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import { toast } from "sonner";

export const showNotification = ({
  message,
  type = "success",
  duration = 3000,
}) => {
  const validTypes = ["success", "error", "info", "warning"];
  const toastType = validTypes.includes(type) ? type : "success";
  toast[toastType](message, {
    duration,
  });
};

export const PaginatedAsyncDropdown = ({
  getAllData,
  params,
  placeholder = "Search...",
  isMulti = false,
  onChange,
  defaultValue = null,
}) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (!hasMore) return;

    setIsLoading(true);
    const updatedParams = {
      ...params,
      page,
      search,
    };

    try {
      const response = await getAllData({
        setIsLoading,
        setData: setOptions,
        params: updatedParams,
      });
      const { data, hasMore: newHasMore } = response;

      setOptions((prev) => [
        ...prev,
        ...data.map((item) => ({
          value: item._id,
          label: item.bundleName,
        })),
      ]);

      setHasMore(newHasMore);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const loadOptions = (inputValue, callback) => {
    setSearch(inputValue);
    setPage(1);
    callback(options);
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={options}
      isLoading={isLoading}
      placeholder={placeholder}
      isMulti={isMulti}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export const courseTypeName = (transaction) => {
  const item = transaction.order?.items?.[0];
  if (!item) return "N/A";

  if (item.course?.title) return item.course.title;
  if (item.capsuleCourse?.name) return item.capsuleCourse.name;
  if (item.studyPlanner?._id)
    return `Study Planner ${item.studyPlanner?.duration}`;
  if (item.userStudyPlanner?.duration)
    return `Study Planner ${item.userStudyPlanner.duration}`;
  if (item.userStudyPlanner?.name) return item.userStudyPlanner.name;
  if (item.skill?.name) return item.skill.name;
  if (item.testSeries?.name) return item.testSeries.name;
  if (item.handwrittenNotes?.bundleName)
    return item.handwrittenNotes.bundleName;
  if (item.previousYearQuestion?.name) return item.previousYearQuestion.name;

  return "N/A";
};

export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec${diffInSeconds === 1 ? "" : "s"} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
};

export const getFormattedDate = (dateString) => {
  if (!dateString) return "";
  const formattedDate = dateString
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("-");
  return formattedDate;
};

export const generateCsv = async (headers, data, filename = "data.csv") => {
  if (
    !Array.isArray(headers) ||
    !Array.isArray(data) ||
    !data.every(Array.isArray)
  ) {
    console.error(
      "Invalid data format. Headers and each row should be an array."
    );
    return;
  }

  const csvContent = [headers, ...data].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: "CSV Files", accept: { "text/csv": [".csv"] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      console.log("File saved successfully.");
      return;
    } catch (error) {
      console.error("Error saving file:", error);
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
