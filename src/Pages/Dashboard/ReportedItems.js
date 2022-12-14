import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const ReportedItems = () => {
  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await fetch(
        `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/reports`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (report) => {
    const isConfirm = window.confirm(
      `Do you want to delete "${report?.productName}"s report?`
    );
    if (isConfirm) {
      fetch(
        `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/reports/${report?._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success(`${report?.productName} deleted successfully`);
            refetch();
          }
        });
    }
  };

  return (
    <div className="w-11/12 mx-auto p-10">
      <h3 className="text-3xl mb-5 font-semibold text-primary">
        Reported Items
      </h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Reporter Name</th>
              <th>Reporter Email</th>
              <th>Description</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{report?.productName}</td>
                <td>{report?.reporterName}</td>
                <td>{report?.reporterEmail}</td>
                <td>{report?.description}</td>
                <td>
                  <button
                    onClick={() => handleDelete(report)}
                    className="badge py-3 badge-outline bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedItems;
