import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AllSellers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    const confirm = window.confirm("Are you sure to make a user admin?");
    if (confirm) {
      fetch(`http://localhost:5000/users/admin/${id}`, {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            toast.success("Make admin successful");
            refetch();
          }
        });
    }
  };

  const handleVerify = (user) => {
    const { _id } = user;
    const confirm = window.confirm(
      `Are you sure to make "${user?.name}" verified?`
    );
    if (confirm) {
      fetch(`http://localhost:5000/users/verify/${_id}`, {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            toast.success("User verified successfully");
            refetch();
          }
        });
    }
  };

  const handleDelete = (user) => {
    const isConfirm = window.confirm(`Do you want to delete "${user?.name}"?`);
    if (isConfirm) {
      fetch(`http://localhost:5000/users/${user?._id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success(`${user?.name} deleted successfully`);
            refetch();
          }
        });
    }
  };

  return (
    <div className="p-10">
      <h3 className="text-3xl mb-5 font-semibold text-primary">All Sellers</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Verify</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                {user?.acting === "seller" && (
                  <>
                    <th>{i + 1}</th>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>
                      {user?.acting !== "admin" ? (
                        <button
                          onClick={() => handleMakeAdmin(user?._id)}
                          className="btn btn-xs btn-primary text-white"
                        >
                          Make Admin
                        </button>
                      ) : (
                        <span className="text-primary font-semibold">
                          Admin
                        </span>
                      )}
                    </td>
                    <td>
                      {user?.verifyStatus !== "verified" ? (
                        <button
                          onClick={() => handleVerify(user)}
                          className="btn btn-xs btn-primary text-white"
                        >
                          Verify
                        </button>
                      ) : (
                        <span className="text-primary font-semibold">
                          Verified
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(user)}
                        className="btn btn-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
