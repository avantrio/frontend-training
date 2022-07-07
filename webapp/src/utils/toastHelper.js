import { actions } from "react-redux-toastr";

export function showToastSuccess(title, message) {
    return actions.add({
        title,
        message,
        type: "success",
    });
}

export function showToastError(title, message) {
    return actions.add({
        title,
        message,
        type: "error",
    });
}
