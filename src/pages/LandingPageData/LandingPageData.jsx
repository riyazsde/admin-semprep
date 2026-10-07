import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Pagination from "../../components/Pagination/Pagination";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  getBannerByPosition,
  addBannerByPosition,
  updateBannerByPosition,
  getAllLandingPage,
} from "../../services/exportFunctions";
import { useRef } from "react";

const LandingPageData = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageId, setImageId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const fileRef = useRef();

  const handlePageChange = (p) => setCurrentPage(p);
  const handleLimitChange = (l) => setLimit(l);

  const fetchData = () => {
    getBannerByPosition({
      setIsLoading,
      params: { type: "Landing", position: "TOP" },
      setData: setBannerData,
    });
    getAllLandingPage({
      setIsLoading,
      setData: setListData,
      params: { page: currentPage, limit, search },
    });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, limit, search]);

  useEffect(() => {
    const current = Array.isArray(bannerData)
      ? bannerData.find((b) => b.type === "Landing")
      : undefined;
    setImagePreview(current?.image ?? null);
    setImageId(current?._id ?? null);
  }, [bannerData]);

  // normalize rows:
  // if API returned home object { status, message, data: { popularCourses, selectUniversities } }
  // convert those into rows for the table while preserving original landing list behavior
  const rowsFromHomeData = () => {
    const root = listData?.data ?? listData;
    if (!root) return [];
    const popular = Array.isArray(root.popularCourses)
      ? root.popularCourses
      : [];
    const unis = Array.isArray(root.selectUniversities)
      ? root.selectUniversities
      : [];
    const popularRows = popular.map((c) => ({
      _id: c._id,
      title: c.title ?? c.name ?? "Untitled Course",
      type: "Popular Course",
      link: null,
      image: Array.isArray(c.courseImage)
        ? c.courseImage[0]
        : c.courseImage ?? null,
      createdAt: c.createdAt,
      raw: c,
    }));
    const uniRows = unis.map((u) => ({
      _id: u._id,
      title: u.name ?? u.title ?? "Untitled University",
      type: "University",
      link: u.contact?.website ?? null,
      image: u.logo ?? null,
      createdAt: u.createdAt,
      raw: u,
    }));
    return [...popularRows, ...uniRows];
  };

  const defaultRows = Array.isArray(listData?.data)
    ? listData.data
    : Array.isArray(listData)
    ? listData
    : Array.isArray(listData?.landingPages)
    ? listData.landingPages
    : [];

  const isHomeResponse =
    (listData &&
      listData.data &&
      (listData.data.popularCourses || listData.data.selectUniversities)) ||
    (listData && (listData.popularCourses || listData.selectUniversities));

  const rows = isHomeResponse ? rowsFromHomeData() : defaultRows;

  const totalPages =
    listData?.pagination?.totalPages ??
    listData?.pagination?.totalPagesCount ??
    (isHomeResponse ? 1 : Math.ceil((listData?.count ?? rows.length) / limit));

  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Landing Page Content</h6>
        </div>

        <div className="handwrittennotes-list">
          <div className="handwrittennotes-list-header">
            <Link to={"/landing-page-data/update"} className="link">
              <div className="handwrittennotes-add">
                <FaPlus />
                <h6>Update Landing Page Item</h6>
              </div>
            </Link>
          </div>

          <div className="handwrittennotes-list-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Link</th>
                  <th>Image</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((item, idx) => (
                  <tr key={item._id ?? item.id ?? idx}>
                    <td>{item.title ?? item.name ?? "-"}</td>
                    <td>{item.type ?? item.position ?? "-"}</td>
                    <td>
                      {item.link ?? item.url ? (
                        <a
                          href={item.link ?? item.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.link ?? item.url}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title ?? "img"}
                          style={{ width: 120, height: 60, objectFit: "cover" }}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td>
                      <div className="handwrittennotes-table-icons"></div>
                    </td>
                  </tr>
                ))}

                {rows.length === 0 && !isLoading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-6 text-sm text-gray-500"
                    >
                      No landing items found
                    </td>
                  </tr>
                )}

                {isLoading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-6 text-sm text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(LandingPageData);
