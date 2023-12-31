import React, { useEffect, useState } from "react"
import ArticleBox from "../ArticleBox/ArticleBox"
import SectionHeader from "./../SectionHeader/SectionHeader"

import "./LastArticles.css"

export default function LastArticles() {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem("user"))
    fetch("https://back-end-sabzlearn.vercel.app/articles", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          !localStorageToken ? "null" : localStorageToken.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setArticles(result)
      })
  }, [])
  return (
    <section className="articles">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          btnHref={"/articles/1"}
        />

        <div className="articles__content">
          <div className="row">
            {articles &&
              articles
                .filter(article=>article.publish)
                .splice(0, 3)
                .map((article) => <ArticleBox key={article._id} {...article} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
