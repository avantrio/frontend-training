import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../state/modal";

export default function DashboardPage() {
    const dispatch = useDispatch();
    const handleShowModal = () => {
        dispatch(modalActions.showModal({modalType:"TEST"}))
    };

    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>
            <button className="btn btn-primary" type="button" onClick={handleShowModal}>
                    Show Test Modal
            </button>
        </div>
    );
}
