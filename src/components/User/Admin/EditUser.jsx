import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { xoaNguoiDung } from "../../API/users";
const EditUser = ({
  users,
  setUsers
}) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const {
    t
  } = useTranslation();
  const handleEditUser = account => {
    setEditingUser(account);
    setEditName(account.name || "");
    setEditEmail(account.email || "");
  };
  const handleUpdateUser = e => {
    e.preventDefault();
    if (!editName.trim() || !editEmail.trim()) {
      alert(t("admin.userFieldsRequired"));
      return;
    }
    const emailExists = users.some(user => user.email?.toLowerCase() === editEmail.toLowerCase() && user.taiKhoan !== editingUser.taiKhoan);
    if (emailExists) {
      alert(t("admin.emailExists"));
      return;
    }
    if (editEmail.toLowerCase() === "admin@gmail.com") {
      alert(t("admin.reservedEmail"));
      return;
    }
    alert("Chức năng chỉnh sửa thông tin user chưa được kết nối API CyberSoft.");
  };
  const handleDeleteUser = async taiKhoan => {
    const confirmDelete = window.confirm(t("admin.deleteConfirmation", {
      email: taiKhoan
    }));
    if (!confirmDelete) {
      return;
    }
    try {
      await xoaNguoiDung(taiKhoan);
      const updatedUsers = users.filter(user => user.taiKhoan !== taiKhoan);
      setUsers(updatedUsers);
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (loggedInUser?.taiKhoan === taiKhoan) {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        window.dispatchEvent(new Event("userUpdated"));
      }
      alert("Xóa người dùng thành công!");
    } catch (err) {
      console.log("DELETE USER STATUS:", err.response?.status);
      console.log("DELETE USER DATA:", err.response?.data);
      if (err.response?.status === 401) {
        alert("401 Unauthorized: Admin chưa có accessToken hợp lệ.");
        return;
      }
      alert(err.response?.data?.message || err.response?.data?.content || "Không thể xóa người dùng!");
    }
  };
  const cancelEditUser = () => {
    setEditingUser(null);
    setEditName("");
    setEditEmail("");
  };
  return <div className="mt-5">

            <h3 className="mb-4">
                {t("admin.manageUsers")}
            </h3>

            {}

            {editingUser && <div className="border rounded p-4 mb-5">

                    <h4 className="mb-4">
                        {t("admin.editUser")}
                    </h4>

                    <form onSubmit={handleUpdateUser}>

                        {}
                        <div className="mb-3">

                            <label className="form-label">
                                {t("admin.name")}
                            </label>

                            <input type="text" className="form-control" value={editName} onChange={e => setEditName(e.target.value)} required />

                        </div>

                        {}
                        <div className="mb-3">

                            <label className="form-label">
                                {t("admin.email")}
                            </label>

                            <input type="email" className="form-control" value={editEmail} onChange={e => setEditEmail(e.target.value)} required />

                        </div>

                        <button type="submit" className="btn btn-dark me-2">
                            {t("admin.saveChanges")}
                        </button>

                        <button type="button" className="btn btn-secondary" onClick={cancelEditUser}>
                            {t("admin.cancel")}
                        </button>

                    </form>

                </div>}

            {}

            {users.length > 0 ? <div className="table-responsive">

                    <table className="table table-bordered">

                        <thead>

                            <tr>

                                <th>
                                    {t("admin.name")}
                                </th>

                                <th>
                                    {t("admin.email")}
                                </th>

                                <th>
                                    {t("admin.role")}
                                </th>

                                <th>
                                    {t("admin.action")}
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map(account => <tr key={account.taiKhoan}>

                                        <td>
                                            {account.name}
                                        </td>

                                        <td>
                                            {account.email}
                                        </td>

                                        <td>
                                            {account.role}
                                        </td>

                                        <td>

                                            <button className="btn btn-sm me-2 edit-button" onClick={() => handleEditUser(account)}>
                                                {t("admin.edit")}
                                            </button>

                                            <button className="btn btn-danger btn-sm delete-button" onClick={() => handleDeleteUser(account.taiKhoan)}>
                                                {t("admin.delete")}
                                            </button>

                                        </td>

                                    </tr>)}

                        </tbody>

                    </table>

                </div> : <p>
                    {t("admin.noRegisteredUsers")}
                </p>}

        </div>;
};
export default EditUser;