import React, { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import CourseBox from "../../Components/CourseBox/CourseBox"
import Pagination from "../../Components/Pagination/Pagination"
import { AiOutlineSearch, AiOutlineAppstore } from "react-icons/ai"
import { HiMenuAlt2 } from "react-icons/hi"
import { BsChevronDown } from "react-icons/bs"
import { FaChalkboardTeacher, FaUsers, FaArrowLeft } from "react-icons/fa"

import "./Category.css"
import { Link, useParams } from "react-router-dom"
export default function Category() {
  const { categoryName } = useParams()
  const [courses, setCourses] = useState([])
  const [coursesOrdered, setCoursesOrdered] = useState([])
  const [shownCourses, setShownCourses] = useState([])
  const [lists, setLists] = useState([
    { 1: "مرتب سازی پیش فرض", key: "default" },
    { 2: "مرتب سازی دوره های رایگان", key: "free" },
    { 3: "مرتب سازی دوره های پولی", key: "money" },
    { 4: "مرتب سازی بر اساس ارزان ترین", key: "cheap" },
    { 5: "مرتب سازی بر اساس گران ترین", key: "expensive" },
    { 6: "مربت سازی بر اساس آخرین", key: "last" },
    { 7: "مربت سازی بر اساس اولین", key: "fist" },
  ])
  const [status, setStatus] = useState("default")
  const [statusTitle, setStatusTitle] = useState("مرتب سازی پیش فرض")
  const [searchValue, setSearchValue] = useState("")
  const [showCourses, setShowCourses] = useState("grid")
  useEffect(() => {
    fetch(`https://back-end-sabzlearn.vercel.app/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((result) => {
        setCourses(result)
        setCoursesOrdered(result)
      })
  }, [categoryName])

  useEffect(() => {
    switch (status) {
      case "free": {
        setCoursesOrdered(courses.filter((course) => !course.price))
        break
      }
      case "money": {
        setCoursesOrdered(courses.filter((course) => course.price))
        break
      }
      case "last": {
        setCoursesOrdered([...courses].reverse())
        break
      }
      case "first": {
        setCoursesOrdered(courses)
        break
      }
      case "cheap": {
        setCoursesOrdered([...courses].sort((a, b) => a.price - b.price))

        break
      }
      case "expensive": {
        setCoursesOrdered([...courses].sort((a, b) => b.price - a.price))
        break
      }
      default: {
        setCoursesOrdered(courses)
      }
    }
  }, [status])
  return (
    <div>
      <Header />
      <section className="courses border-0">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length ? (
                  <>
                    <div className="courses-top-bar">
                      <div className="courses-top-bar__right">
                        <div
                          className={`courses-top-bar__row-btn ${
                            showCourses == "grid" &&
                            "courses-top-bar__icon--active"
                          }`}
                          onClick={() => setShowCourses("grid")}
                        >
                          <AiOutlineAppstore className=" courses-top-bar__icon" />
                        </div>

                        <div
                          className={`courses-top-bar__row-btn ${
                            showCourses == "list" &&
                            "courses-top-bar__icon--active"
                          }`}
                          onClick={() => setShowCourses("list")}
                        >
                          <HiMenuAlt2 className="courses-top-bar__icon" />
                        </div>

                        <div className="courses-top-bar__selection">
                          <span className="courses-top-bar__selection-title">
                            {statusTitle}
                            <BsChevronDown className="courses-top-bar__selection-icon" />
                          </span>
                          <ul className="courses-top-bar__selection-list">
                            {lists.map((list, index) => (
                              <li
                                key={list._id}
                                onClick={(e) => {
                                  setStatusTitle(e.target.textContent)
                                  setStatus(list.key)
                                  setSearchValue("")
                                }}
                                className={`courses-top-bar__selection-item ${
                                  list.key == status &&
                                  "courses-top-bar__selection-item--active "
                                }`}
                              >
                                {list[index + 1]}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="courses-top-bar__left">
                        <form action="#" className="courses-top-bar__form">
                          <input
                            type="text"
                            className="courses-top-bar__input"
                            placeholder="جستجوی دوره ..."
                            value={searchValue}
                            onChange={(e) => {
                              setSearchValue(e.target.value)
                              setStatus("default")
                              setStatusTitle("مرتب سازی پیش فرض")
                              const filteredCours = courses.filter((course) =>
                                course.name.includes(e.target.value)
                              )
                              setCoursesOrdered(filteredCours)
                            }}
                          />
                          <AiOutlineSearch className="courses-top-bar__search-icon" />
                        </form>
                      </div>
                    </div>
                    {shownCourses.length ? (
                      <>
                        {showCourses == "grid" ? (
                          <>
                            {shownCourses.map((course) => (
                              <CourseBox key={course._id} {...course} />
                            ))}
                          </>
                        ) : (
                          <>
                            {shownCourses.map((course) => (
                              <div key={course._id} className="col-12">
                                <div className="course-box">
                                  <div className="course__box-header">
                                    <div className="course__box-right">
                                      <Link
                                        className="course__box-right-link"
                                        to={`/course-info/${course.shortName}`}
                                      >
                                        <img
                                          src={`http://localhost:4000/courses/covers/${course.cover}`}
                                          className="course__box-right-img"
                                        />
                                      </Link>
                                    </div>
                                    <div className="course__box-left">
                                      <div className="course__box-left-top">
                                        <Link
                                          to={`/course-info/${course.shortName}`}
                                          className="course__box-left-link"
                                        >
                                          {course.name}
                                        </Link>
                                      </div>
                                      <div className="course__box-left-center">
                                        <div className="course__box-left-teacher">
                                          <FaChalkboardTeacher className="course__box-left-icon ms-2" />
                                          <span className="course__box-left-name">
                                            {course.creator}
                                          </span>
                                        </div>
                                        <div className="course__box-left-stars">
                                          {Array(5 - course.courseAverageScore)
                                            .fill("0")
                                            .map((item, index) => (
                                              <img
                                                key={index}
                                                src="/images/svgs/star.svg"
                                                alt="rating"
                                                className="course-box__star"
                                              />
                                            ))}
                                          {Array(course.courseAverageScore)
                                            .fill(1)
                                            .map((item, index) => (
                                              <img
                                                key={index}
                                                src="/images/svgs/star_fill.svg"
                                                alt="rating"
                                                className="course-box__star"
                                              />
                                            ))}
                                        </div>
                                      </div>
                                      <div className="course__box-left-bottom">
                                        <div className="course__box-left-des">
                                          <p>{course.description}</p>
                                        </div>
                                      </div>
                                      <div className="course__box-footer">
                                        <div className="course__box-footer-right">
                                          <FaUsers className="course__box-footer-icon ms-2" />
                                          <span className="course__box-footer-count">
                                            {course.registers}
                                          </span>
                                        </div>
                                        <div>
                                          <span
                                            className={`course-box__price ${
                                              course.price !== 0 &&
                                              course.discount !== 0 &&
                                              "text-decoration-line-through"
                                            } `}
                                          >
                                            {course.price !== 0
                                              ? course.price.toLocaleString()
                                              : "رایگان"}
                                          </span>

                                          {course.price !== 0 &&
                                            course.discount !== 0 && (
                                              <>
                                                <span className="course-box__price ms-3">
                                                  {(
                                                    course.price -
                                                    (course.price *
                                                      course.discount) /
                                                      100
                                                  ).toLocaleString()}
                                                </span>
                                              </>
                                            )}
                                        </div>
                                        {course.price !== 0 &&
                                          course.discount !== 0 && (
                                            <span className="courses-box__discount">
                                              %{course.discount}
                                            </span>
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    ) : (
                      <div className="alert alert-warning">
                        هیچ دوره ای یافت نشد !
                      </div>
                    )}

                    <Pagination
                      items={coursesOrdered}
                      itemsCount={3}
                      pathname={`/category-info/${categoryName}`}
                      setShownCourses={setShownCourses}
                    />
                  </>
                ) : (
                  <div className="alert alert-warning">
                    هنوز هیچ دوره ای برای این دسته بندی ضبط نشده !
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
