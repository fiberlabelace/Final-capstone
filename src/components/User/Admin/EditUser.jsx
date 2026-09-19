
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { xoaNguoiDung } from "../../API/users";

const EditUser = ({ users, setUsers }) => {
    const [editingUser, setEditingUser] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const { t } = useTranslation();

    const handleEditUser = (account) => {
        setEditingUser(account);
        setEditName(account.name);
        setEditEmail(account.email);
        setEditPassword(account.password || "");
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();

        if (
            !editName.trim() ||
            !editEmail.trim() ||
            !editPassword.trim()
        ) {
            alert(t("admin.userFieldsRequired"));
            return;
        }

        const emailExists = users.some(
            (user) =>
                user.email.toLowerCase() === editEmail.toLowerCase() &&
                user.email !== editingUser.email
        );

        if (emailExists) {
            alert(t("admin.emailExists"));
            return;
        }

        if (editEmail.toLowerCase() === "admin@gmail.com") {
            alert(t("admin.reservedEmail"));
            return;
        }

        const updatedUsers = users.map((account) => {
            if (account.email === editingUser.email) {
                return {
                    ...account,
                    name: editName,
                    email: editEmail,
                    password: editPassword
                };
            }

            return account;
        });

        localStorage.setItem(
            "users",
            JSON.stringify(updatedUsers)
        );

        setUsers(updatedUsers);

        const loggedInUser = JSON.parse(
            localStorage.getItem("user")
        );

        if (loggedInUser?.email === editingUser.email) {
            const updatedLoggedInUser = {
                ...loggedInUser,
                name: editName,
                email: editEmail
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedLoggedInUser)
            );

            window.dispatchEvent(new Event("userUpdated"));
        }

        setEditingUser(null);
        setEditName("");
        setEditEmail("");
        setEditPassword("");

        alert(t("admin.userUpdated"));
    };

    const handleDeleteUser = async (taiKhoan) => {
        const confirmDelete = window.confirm(
            t("admin.deleteConfirmation", {
                email: taiKhoan
            })
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await xoaNguoiDung(taiKhoan);

            setUsers((prevUsers) =>
                prevUsers.filter(
                    (user) => user.taiKhoan !== taiKhoan
                )
            );

            alert("Xóa người dùng thành công!");
        } catch (err) {
            console.log(
                "DELETE USER STATUS:",
                err.response?.status
            );

            console.log(
                "DELETE USER DATA:",
                err.response?.data
            );

            if (err.response?.status === 401) {
                alert(
                    "401 Unauthorized: Access token không hợp lệ hoặc không có quyền."
                );
                return;
            }

            if (err.response?.status === 403) {
                alert(
                    "403 Forbidden: Tài khoản không có quyền xóa người dùng."
                );
                return;
            }

            alert(
                err.response?.data?.message ||
                "Không thể xóa người dùng!"
            );
        }
    };

    const cancelEditUser = () => {
        setEditingUser(null);
        setEditName("");
        setEditEmail("");
        setEditPassword("");
    };

    return (
        <div className="mt-5">
            <h3 className="mb-4">
                {t("admin.manageUsers")}
            </h3>

            {editingUser && (
                <div className="border rounded p-4 mb-5">
                    <h4 className="mb-4">
                        {t("admin.editUser")}
                    </h4>

                    <form onSubmit={handleUpdateUser}>
                        <div className="mb-3">
                            <label className="form-label">
                                {t("admin.name")}
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={editName}
                                onChange={(e) =>
                                    setEditName(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                {t("admin.email")}
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={editEmail}
                                onChange={(e) =>
                                    setEditEmail(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                {t("admin.password")}
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={editPassword}
                                onChange={(e) =>
                                    setEditPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark me-2"
                        >
                            {t("admin.saveChanges")}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={cancelEditUser}
                        >
                            {t("admin.cancel")}
                        </button>
                    </form>
                </div>
            )}

            {users.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>{t("admin.name")}</th>
                                <th>{t("admin.email")}</th>
                                <th>{t("admin.role")}</th>
                                <th>{t("admin.action")}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((account) => (
                                <tr key={account.taiKhoan}>
                                    <td>{account.name}</td>

                                    <td>{account.email}</td>

                                    <td>{account.role}</td>

                                    <td>
                                        <button
                                            className="btn btn-sm me-2 edit-button"
                                            onClick={() =>
                                                handleEditUser(account)
                                            }
                                        >
                                            {t("admin.edit")}
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm delete-button"
                                            onClick={() =>
                                                handleDeleteUser(
                                                    account.taiKhoan
                                                )
                                            }
                                        >
                                            {t("admin.delete")}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>
                    {t("admin.noRegisteredUsers")}
                </p>
            )}
        </div>
    );
};

export default EditUser;
