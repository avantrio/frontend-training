import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as Yup from "yup";
import PaginatedTable from "../components/PaginatedTable";
import { userActions } from "../state/user";
import { useGetUsersQuery, useGetUserQuery } from "../services/userService";

import {
    Form,
    TextField,
    Checkbox,
    Select,
    SubmitButton,
} from "../components/FormElements";
import { showToastSuccess } from "../utils/toastHelper";

export function UserListPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        data: userDetails = { byId: {}, allIds: [] },
        error: userError,
    } = useGetUsersQuery();

    const onEditClick = (userId) => {
        history.push(`/users/editUser/${userId}`);
    };

    const onAddUser = () => {
        history.push("users/addUser");
    };

    const displayAdminStatus = (rowData) => (
        <div className="custom-control custom-switch">
            <input
                type="checkbox"
                className="custom-control-input"
                id={`customSwitch${rowData.id}`}
                checked={rowData.is_admin}
                onChange={() => {
                    dispatch(
                        userActions.setUser({
                            ...rowData,
                            is_admin: !rowData.is_admin,
                        })
                    );
                }}
            />
            <label
                className="custom-control-label"
                htmlFor={`customSwitch${rowData.id}`}
            >
                {rowData.is_admin ? "Admin" : "Not an Admin"}
            </label>
        </div>
    );

    const displayEditButton = (rowData) => (
        <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => onEditClick(rowData.id)}
        >
            Edit
        </button>
    );

    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Users</h1>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={onAddUser}
                >
                    Add User
                </button>
            </div>
            <PaginatedTable
                columns={[
                    "id",
                    "display_name",
                    "occupation",
                    displayAdminStatus,
                    displayEditButton,
                ]}
                columnNames={["User Id", "Name", "Occupation", "Is Admin", ""]}
                rows={userDetails.allIds}
                data={userDetails.byId}
            />
        </div>
    );
}

const userSchema = Yup.object().shape({
    display_name: Yup.string().required("Required"),
    occupation: Yup.string().required("Required"),
    subscription: Yup.string().required("Required"),
    is_admin: Yup.bool(),
});

export function UserEditPage() {
    const { userId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isCreateMode, setIdCreateMode] = useState(false);
    const {data:user={}} = useGetUserQuery({userId})
    const { subscription } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        display_name: "",
        occupation: "",
        subscription: "",
        is_admin: false,
    });

    useEffect(() => {
        if (userId) {
            // load User Data
        } else {
            setIdCreateMode(true);
        }
    }, [userId]);

    useEffect(() => {
        if (user) {
            setFormData({ ...user });
        }
    }, [user]);

    const handleSubmit = (values) => {
        if (isCreateMode) {
            // create new user
            history.push("/users");
        } else {
            // send api call here
            dispatch(userActions.setUser(values));
            dispatch(showToastSuccess("Success", "User updated"));
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">{isCreateMode ? "Create" : "Edit"} User</h1>
            </div>
            {formData && (
                <Form
                    initialValues={formData}
                    validationSchema={userSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <TextField
                                label="Display Name"
                                name="display_name"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <TextField label="Occupation" name="occupation" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Select
                                label="Subscription"
                                name="subscription"
                                options={subscription.allIds.map((id) => ({
                                    value: id,
                                    label: subscription.byId[id],
                                }))}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Checkbox label="Is Admin" name="is_admin" />
                        </div>
                    </div>

                    <SubmitButton
                        title={isCreateMode ? "Create User" : "Update User"}
                    />
                </Form>
            )}
        </div>
    );
}
