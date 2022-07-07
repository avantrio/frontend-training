/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../state/modal";

function TestContent() {
    return (
        <div style={{width:500, height:300, padding:20}}>
            <h4>Test Modal</h4>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
    )
}

const MODAL_CONTENT = {
    TEST: TestContent,
};

export default function ModalContainer() {
    const { modalTypes, modalProps } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    const handleOverlayKeypress = (e) => {
        // TODO: fix this logic
        if (e.key === "Escape") {
            dispatch(modalActions.hideModal());
        }
    };

    return modalTypes.map((modalType) => {
        const CurrModalContent = MODAL_CONTENT[modalType];
        if (!modalTypes.length === 0) return null;
        return (
            <div className="modal-container">
                <div
                    role="presentation"
                    className="modal-overlay"
                    onClick={() => dispatch(modalActions.hideModal())}
                    onKeyPress={handleOverlayKeypress}
                />
                <div className="modal-content">
                    <CurrModalContent {...modalProps[modalType]} />
                </div>
            </div>
        );
    });
}
