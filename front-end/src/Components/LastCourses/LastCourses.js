import React, { useEffect, useState } from "react"
import CourseBox from "../CourseBox/CourseBox"
import SectionHeader from "../SectionHeader/SectionHeader"

import "./LastCourses.css"

export default function LastCourses() {
  const [courses, setCourses] = useState(null)
  useEffect(() => {
    fetch("https://back-end-sabzlearn.vercel.app/courses")
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(res.text())
        }
      })
      .then((data) => {
        setCourses(data)
      })
  }, [])
  return (
    <>
      <div className="courses border-0">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            btnHref="/courses/1"
          />

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses &&
                  courses
                    .splice(0, 6)
                    .map((course) => <CourseBox key={course._id} {...course} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
