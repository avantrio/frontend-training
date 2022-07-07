import React, { useState } from "react";
import * as _ from "lodash";

export default function PaginatedTable({
    columns,
    columnNames,
    rows,
    data,
    actions,
    pagination = false,
    pageSize = 5,
    selectedRows = [],
    setSelectedRows,
    selectableRows = false,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectAll, setSelectAll] = useState(false);
    const paginatedRows = pagination
        ? rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        : rows;

    const totalPages = Math.ceil(rows && rows.length / pageSize);

    const getOriginalId = (rowIdx) => (currentPage - 1) * pageSize + rowIdx;

    const isRowSelected = (rowIdx) => {
        const originalIdx = getOriginalId(rowIdx);
        return selectedRows ? selectedRows.includes(originalIdx) : false;
    };

    const toggleSelectRow = (rowIdx) => {
        setSelectAll(false);
        const originalIdx = getOriginalId(rowIdx);
        const selectedRowsCopy = selectedRows.slice();
        if (isRowSelected(rowIdx)) {
            const index = selectedRowsCopy.indexOf(originalIdx);
            selectedRowsCopy.splice(index, 1);
        } else {
            selectedRowsCopy.push(originalIdx);
        }
        setSelectedRows(selectedRowsCopy);
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            // deselect all
            setSelectedRows([]);
        } else {
            // select all
            setSelectedRows(
                Array.from(Array(pageSize).keys()).map((i) => getOriginalId(i))
            );
        }
        setSelectAll(!selectAll);
    };

    const resetSelectAll = () => {
        setSelectedRows([]);
        setSelectAll(false);
    };

    const getEmptyMarker = () => (
        <div style={{ textAlign: "center", width: "100%" }}>-</div>
    );

    return (
        <div className="paginated-table">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            {selectableRows && (
                                <th style={{ maxWidth: "3.7rem" }}>
                                    {/* select all */}
                                    <div className="custom-checkbox">
                                        <div className="checkbox">
                                            <input
                                                type="checkbox"
                                                id="select_all_checkbox"
                                                checked={selectAll}
                                                onChange={() => {
                                                    toggleSelectAll();
                                                }}
                                            />
                                            <label htmlFor="select_all_checkbox">
                                                {" "}
                                            </label>
                                        </div>
                                    </div>
                                </th>
                            )}
                            {columnNames.map((cn, idx) => (
                                <th key={idx}>
                                    {_.isFunction(cn) ? cn() : cn}
                                </th>
                            ))}
                            {actions && actions.length > 0 && <th>ACTION</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRows &&
                            paginatedRows.map((rowId, idx) => (
                                <tr key={rowId}>
                                    {selectableRows && (
                                        <td>
                                            <div className="custom-checkbox">
                                                <div className="checkbox">
                                                    <input
                                                        type="checkbox"
                                                        id={`table_checkbox${rowId}`}
                                                        checked={isRowSelected(
                                                            idx
                                                        )}
                                                        onChange={() => {
                                                            toggleSelectRow(
                                                                idx
                                                            );
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={`table_checkbox${rowId}`}
                                                    >
                                                        {" "}
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    )}
                                    {columns.map((c, idx) => (
                                        <td key={idx}>
                                            {_.isFunction(c)
                                                ? c(data[rowId]) ||
                                                  getEmptyMarker()
                                                : _.get(data[rowId], c, null) ||
                                                  getEmptyMarker()}
                                        </td>
                                    ))}
                                    {actions && actions.length > 0 && (
                                        <td>
                                            {actions.map((action, idx) => (
                                                <button
                                                    type="button"
                                                    key={idx}
                                                    className="btn btn-sm btn-outline-primary btn-block"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        action.action(
                                                            data[rowId]
                                                        );
                                                    }}
                                                >
                                                    {action.name}
                                                </button>
                                            ))}
                                        </td>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
                {pagination && rows?.length > 0 && (
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={currentPage === 1 ? "disabled" : ""}>
                                <a
                                    onClick={() => {
                                        setCurrentPage(currentPage - 1);
                                        resetSelectAll();
                                    }}
                                >
                                    <img
                                        src="./img/table/left-arrow.png"
                                        alt=""
                                        style={{ width: "55%" }}
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-decoration-none"
                                    style={{ cursor: "default" }}
                                >
                                    Page
                                </a>
                            </li>
                            {Array.from(
                                Array(Math.ceil(rows.length / pageSize)).keys()
                            ).map((page, ind) => (
                                <li
                                    className={`page-item ${
                                        ind === currentPage - 1 ? "active" : ""
                                    }`}
                                    onClick={() => {
                                        setCurrentPage(ind + 1);
                                        resetSelectAll();
                                    }}
                                >
                                    <a className="page-link" href="#">
                                        {ind + 1}
                                    </a>
                                </li>
                            ))}
                            <li
                                className={
                                    currentPage === totalPages ? "disabled" : ""
                                }
                            >
                                <a
                                    onClick={() => {
                                        setCurrentPage(currentPage + 1);
                                        resetSelectAll();
                                    }}
                                >
                                    <img
                                        src="./img/table/right-arrow.png"
                                        alt=""
                                        style={{ width: "55%" }}
                                    />
                                </a>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}
