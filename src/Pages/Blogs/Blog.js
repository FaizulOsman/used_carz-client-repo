import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useTitle from "../../hooks/useTitle";
import { HashLoader } from "react-spinners";

const Blog = () => {
  useTitle("Blog");

  const [loading, setLoading] = useState(true);

  const { data: blogDatas = [] } = useQuery({
    queryKey: ["blogDatas"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/blogs`);
      const data = await res.json();
      setLoading(false);
      return data;
    },
  });

  if (loading) {
    return (
      <div className="w-20 mx-auto h-20 my-52">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }

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
