import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import HOC from "../../components/HOC/HOC";
import Pagination from "../../components/Pagination/Pagination";
import {
  getAllLandingPage,
  getAllLandingPageCourses,
  getAllLandingPageUniversitys,
  updateHomeData,
} from "../../services/exportFunctions";

const EditLandingSelection = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [homeData, setHomeData] = useState(null);

  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [selectedUnis, setSelectedUnis] = useState(new Set());

  const [coursesPage, setCoursesPage] = useState(1);
  const [unisPage, setUnisPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [coursesSearch, setCoursesSearch] = useState("");
  const [unisSearch, setUnisSearch] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const [isLoadingUnis, setIsLoadingUnis] = useState(false);
  const [isLoadingHome, setIsLoadingHome] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [coursesPage, limit, coursesSearch]);

  useEffect(() => {
    fetchUniversities();
  }, [unisPage, limit, unisSearch]);

  useEffect(() => {
    fetchHome();
  }, []);

  const fetchCourses = () => {
    const params = { page: coursesPage, limit, search: coursesSearch };
    getAllLandingPageCourses({
      setIsLoading: setIsLoadingCourses,
      setData: setCourses,
      params,
    });
  };

  const fetchUniversities = () => {
    const params = { page: unisPage, limit, search: unisSearch };
    getAllLandingPageUniversitys({
      setIsLoading: setIsLoadingUnis,
      setData: setUniversities,
      params,
    });
  };

  const fetchHome = () => {
    getAllLandingPage({
      setIsLoading: setIsLoadingHome,
      setData: (res) => {
        setHomeData(res?.data ?? res);
        const popular =
          (res?.data?.popularCourses ?? res?.popularCourses) || [];
        const unis =
          (res?.data?.selectUniversities ?? res?.selectUniversities) || [];

        setSelectedCourses(new Set(popular.map((c) => c._id ?? c)));
        setSelectedUnis(new Set(unis.map((u) => u._id ?? u)));
      },
    });
  };

  const toggleCourse = (id) => {
    setSelectedCourses((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  const toggleUni = (id) => {
    setSelectedUnis((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  const handleSelectAllCourses = (items) => {
    setSelectedCourses(new Set(items.map((i) => i._id ?? i)));
  };

  const handleClearAllCourses = () => {
    setSelectedCourses(new Set());
  };

  const handleSelectAllUnis = (items) => {
    setSelectedUnis(new Set(items.map((i) => i._id ?? i)));
  };

  const handleClearAllUnis = () => {
    setSelectedUnis(new Set());
  };

  const onSave = () => {
    const payload = {
      popularCourses: Array.from(selectedCourses),
      selectUniversities: Array.from(selectedUnis),
    };
    setIsSaving(true);
    updateHomeData({
      data: payload,
      setIsLoading: setIsSaving,
      addFun: () => {
        setIsSaving(false);
        fetchHome();
        navigate("/landing-page-data");
      },
      onError: () => {
        setIsSaving(false);
      },
    });
  };

  const coursesRows = Array.isArray(courses?.data)
    ? courses.data
    : Array.isArray(courses)
    ? courses
    : [];
  const unisRows = Array.isArray(universities?.data)
    ? universities.data
    : Array.isArray(universities)
    ? universities
    : [];

  const coursesTotalPages =
    courses?.pagination?.totalPages ??
    Math.ceil((courses?.count ?? coursesRows.length) / limit);
  const unisTotalPages =
    universities?.pagination?.totalPages ??
    Math.ceil((universities?.count ?? unisRows.length) / limit);

  return (
    <div className="dashboardcontainer">
      <div className="dashboardcontainer-header">
        <h6>Edit Landing Selections</h6>
        <p>
          <GoArrowLeft
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          Landing /<span> Edit Selections</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-semibold">Popular Courses</h5>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1 rounded border"
                onClick={() => handleSelectAllCourses(coursesRows)}
              >
                Select All
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded border"
                onClick={handleClearAllCourses}
              >
                Clear
              </button>
            </div>
          </div>

          {/* <div className="mb-3">
            <input
              placeholder="Search courses..."
              className="w-full px-3 py-2 border rounded"
              value={coursesSearch}
              onChange={(e) => {
                setCoursesSearch(e.target.value);
                setCoursesPage(1);
              }}
            />
          </div> */}

          <div className="max-h-[360px] overflow-auto space-y-2">
            {coursesRows?.map((c) => {
              const id = c._id ?? c.id;
              const checked = selectedCourses.has(id);
              return (
                <label
                  key={id}
                  className="flex items-center gap-3 border-b py-2"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCourse(id)}
                  />
                  <div className="border-dashed border-2 rounded-lg p-2">
                    <div className="font-medium">
                      {c.title ?? c.name ?? "Untitled"}
                    </div>

                  </div>
                </label>
              );
            })}
          </div>

          <div className="mt-3">
            <Pagination
              totalPages={coursesTotalPages || 1}
              onPageChange={(p) => setCoursesPage(p)}
              onLimitChange={(l) => setLimit(l)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-semibold">Select Universities</h5>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1 rounded border"
                onClick={() => handleSelectAllUnis(unisRows)}
              >
                Select All
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded border"
                onClick={handleClearAllUnis}
              >
                Clear
              </button>
            </div>
          </div>

          {/* <div className="mb-3">
            <input
              placeholder="Search universities..."
              className="w-full px-3 py-2 border rounded"
              value={unisSearch}
              onChange={(e) => {
                setUnisSearch(e.target.value);
                setUnisPage(1);
              }}
            />
          </div> */}

          <div className="max-h-[360px] overflow-auto space-y-2">
            {unisRows?.map((u) => {
              const id = u._id ?? u.id;
              const checked = selectedUnis.has(id);
              return (
                <label
                  key={id}
                  className="flex items-center gap-3 border-b py-2"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleUni(id)}
                  />
                  <div className="border-dashed border-2 rounded-lg p-2">
                    <div className="font-medium">
                      {u.name ?? u.title ?? "Untitled"}
                    </div>

                  </div>
                </label>
              );
            })}
          </div>

          <div className="mt-3">
            <Pagination
              totalPages={unisTotalPages || 1}
              onPageChange={(p) => setUnisPage(p)}
              onLimitChange={(l) => setLimit(l)}
            />
          </div>
        </div>
      </div>

      <div className="p-4 flex justify-end gap-3">
        <button
          className="px-4 py-2 rounded border"
          onClick={fetchHome}
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded bg-green-600 text-white flex items-center gap-2"
          onClick={onSave}
          disabled={isSaving}
        >
          <FaSave /> {isSaving ? "Saving…" : "Save Selections"}
        </button>
      </div>
    </div>
  );
};

export default HOC(EditLandingSelection);
