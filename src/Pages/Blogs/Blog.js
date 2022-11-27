import React from "react";
import { useLoaderData } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const Blog = () => {
  useTitle("Blog");
  const blogDatas = useLoaderData();

  return (
    <div>
      <div className="w-11/12 max-w-[1400px] mx-auto my-20">
        <h2 className="text-center text-primary mb-10 text-xl md:text-4xl font-bold">
          Questions And Answers
        </h2>
        <div className="w-11/12 mx-auto">
          {blogDatas.map((blog) => (
            <div key={blog.id}>
              <div
                tabIndex={0}
                className="collapse collapse-arrow bg-gray-200 mt-1 border border-primary rounded-md"
              >
                <div className="collapse-title text-xl font-medium">
                  {blog.question}
                </div>
                <div className="collapse-content">
                  <p>{blog.answer}</p>
                  <h5 className="text-lg font-semibold my-2">
                    {blog?.list?.[0]}
                  </h5>
                  {blog?.list?.[1].map((list) => (
                    <li key={list}>{list}</li>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
