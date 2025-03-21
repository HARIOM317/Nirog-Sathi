import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../Shared/Footer/Footer";
import SearchContent from "./SearchContent";
import { useDebounced } from "../../../utils/hooks/useDebounced";
import { useGetDoctorsQuery } from "../../../redux/api/doctorApi";
import { Pagination, Select, Button } from "antd";
import Header from "../../Shared/Header/Header";
import SubHeader from "../../Shared/SubHeader";
import { FaRedoAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import Lottie from "lottie-react";
import Loading from "../../../animations/loading.json";
import NoDataFound from "../../../animations/no_data_found.json";
import SomethingWrong from "../../../animations/something_wrong.json";

import SearchBar from "../../SearchBar";
import ReactGA from "react-ga4";

const SearchDoctor = () => {
  const query = {};

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gender, setGender] = useState("Gender");
  const [sortByGender, setSorByGender] = useState("");
  const [specialization, setSpecialization] = useState("Specialization");
  const [specialist, setSpecialist] = useState("");

  const initialSearchTerm = queryParams.get("search") || "";

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const specialist = queryParams.get("specialist");

    if (specialist) {
      setSpecialization(specialist);
      setSpecialist(specialist);
    }
  }, [location]);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  query["limit"] = size;
  query["page"] = page;
  query["sortOrder"] = sortOrder;

  sortByGender !== "" && (query["gender"] = sortByGender);
  specialist !== "" && (query["specialist"] = specialist);

  const debounced = useDebounced({ searchQuery: searchTerm, delay: 600 });

  const resetFilter = () => {
    setPage(1);
    setSize(10);
    setSortOrder("");
    setSearchTerm("");
    setSorByGender("");
    setSpecialist("");

    setGender("Gender");
    setSpecialization("Specialization");
  };

  if (!!debounced) {
    query.searchTerm = debounced;
  }

  const { data, isLoading, isError } = useGetDoctorsQuery({
    ...query,
    sortOrder,
  });

  // const doctorsData = data?.doctors;
  const meta = data?.meta;
  const doctors = data?.doctors || [];
  // console.log("Actual Data = ", doctors);
  // console.log("Mete Data = ", meta);

  const combinedList = [
    ...new Set(doctors.map((doctor) => `${doctor.fullName}`)),
    ...new Set(doctors.map((doctor) => `${doctor.clinicName}`)),
    ...new Set(doctors.map((doctor) => `${doctor.specialization}`)),
    ...new Set(doctors.map((doctor) => `${doctor.designation}`)),
    ...new Set(doctors.map((doctor) => `${doctor.city}`)),
  ];

  const handleSearch = (value) => {
    setOptions(
      !value
        ? []
        : Array.from(
            new Set(
              combinedList.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
              )
            )
          ).map((item) => ({ value: item }))
    );

    setSearchTerm(value);
    ReactGA.event({
      category: "Search",
      action: "Searched Topic",
      label: value,
    });
  };

  //what to render
  let content = null;
  if (isLoading)
    content = (
      <>
        <div className="m-0 p-0 d-flex align-items-center justify-content-center">
          <Lottie
            loop={true}
            animationData={Loading}
            style={{ width: "300px" }}
          />
        </div>
      </>
    );
  if (!isLoading && isError)
    content = (
      <div className="m-0 p-0 d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={SomethingWrong}
          style={{ width: "300px" }}
        />
        <div
          style={{
            color: "var(--headingColor)",
            fontWeight: "bold",
            fontSize: "1.3rem",
            textAlign: "center",
          }}
        >
          Something went wrong!
        </div>
      </div>
    );
  if (!isLoading && !isError && doctors.length === 0)
    content = (
      <div className="m-0 p-0 d-flex align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={NoDataFound}
          style={{ width: "300px" }}
        />
      </div>
    );
  if (!isLoading && !isError && doctors.length > 0)
    content = (
      <>
        {doctors &&
          doctors?.map((item, id) => (
            <SearchContent key={id + item.id} data={item} />
          ))}
      </>
    );

  const onShowSizeChange = (current, pageSize) => {
    setPage(page);
    setSize(pageSize);
  };

  const onSelectGender = (value) => {
    setGender(value);
    setSorByGender(value);
  };

  const onSelectSpecialization = (value) => {
    setSpecialization(value);
    setSpecialist(value);
  };

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Search Top Doctors | Nirog Sathi</title>
          <meta
            name="description"
            content="Discover and book appointments with the best doctors. Find professional specialists for your healthcare needs at Nirog Sathi."
          />
          <meta
            name="keywords"
            content="Top doctors, Professional doctors, Specialist doctors, Book appointments, Healthcare specialists, Nirog Sathi"
          />
          <link rel="canonical" href="https://nirogsathi.com/doctors" />
        </Helmet>

        <Header />
        <SubHeader
          title="Doctors"
          subtitle="Make an appointment with your favorite doctor."
        />

        <div className="container" style={{ marginBottom: 80, marginTop: 80 }}>
          <div className="filter-bar">
            <div className="filter-group">
              <Select
                value={gender}
                style={{
                  width: 120,
                }}
                onChange={onSelectGender}
                options={[
                  {
                    value: "male",
                    label: "Male",
                  },
                  {
                    value: "female",
                    label: "Female",
                  },
                  {
                    value: "other",
                    label: "Other",
                  },
                ]}
              />

              <Select
                value={specialization}
                style={{
                  width: 200,
                }}
                onChange={onSelectSpecialization}
                options={[
                  {
                    value: "Cardiologist",
                    label: "Cardiologist",
                  },
                  {
                    value: "Dermatologist",
                    label: "Dermatologist",
                  },
                  {
                    value: "Orthopedic Surgeon",
                    label: "Orthopedic Surgeon",
                  },
                  {
                    value: "Gynecologist",
                    label: "Gynecologist",
                  },
                  {
                    value: "Neurologist",
                    label: "Neurologist",
                  },
                  {
                    value: "Ophthalmologist",
                    label: "Ophthalmologist",
                  },
                  {
                    value: "Pediatrician",
                    label: "Pediatrician",
                  },
                  {
                    value: "Endocrinologist",
                    label: "Endocrinologist",
                  },
                  {
                    value: "Gastroenterologist",
                    label: "Gastroenterologist",
                  },
                  {
                    value: "Pulmonologist",
                    label: "Pulmonologist",
                  },
                  {
                    value: "Orthopedic",
                    label: "Orthopedic",
                  },
                ]}
              />
            </div>

            <div className="filter-group">
              <SearchBar
                handleSearch={handleSearch}
                options={options}
                initialValue={searchTerm}
              />

              {Object.keys(query).length > 3 && (
                <Button
                  style={{ backgroundColor: "#ec1839" }}
                  onClick={resetFilter}
                  type="primary"
                  shape="round"
                  icon={<FaRedoAlt />}
                  size="sm"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>

          <div className="container-fluid">
            {content}
            <div className="text-center mt-5 mb-5">
              <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                total={meta?.total}
                pageSize={size}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SearchDoctor;
