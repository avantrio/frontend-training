/* eslint-disable react/jsx-props-no-spreading */
// these are wrapper components. need to forward the props via spreading

import React, { useState } from "react";
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
} from "formik";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Form({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize,
    children,
    ...rest
}) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={enableReinitialize}
            {...rest}
        >
            <FormikForm className="needs-validation" noValidate="">
                {children}
            </FormikForm>
        </Formik>
    );
}

export function SubmitButton({ className, title }) {
    const { isSubmitting } = useFormikContext();
    return (
        <button
            type="submit"
            className={className || "btn btn-primary"}
            disabled={isSubmitting}
        >
            {title}
        </button>
    );
}

export function DisplayField({ fieldName, children }) {
    const context = useFormikContext();
    return children(context[fieldName]);
}

export function TextField({
    name,
    label,
    type = "text",
    placeholder,
    ...rest
}) {
    const [field, meta] = useField({ name, label, type, placeholder, ...rest });
    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                className="form-control"
                placeholder={placeholder || ""}
                type={type}
                {...field}
                {...rest}
            />
            {meta.touched && meta.error ? (
                <div className="invalid-feedback" style={{ display: "block" }}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
}

export function Select(props) {
    const { name, label, options } = props;
    const [field, meta] = useField(props);
    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <select
                className="custom-select"
                id={name}
                name={name}
                {...field}
                {...props}
            >
                <option value="">Choose...</option>
                {options.map((optn) => (
                    <option
                        value={optn.value}
                        label={optn.label || optn.value}
                    />
                ))}
            </select>
            {meta.touched && meta.error ? (
                <div className="invalid-feedback" style={{ display: "block" }}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
}

export function SearchableSelect(props) {
    const { name, label, options, ...rest } = props;
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={name}>
                <strong>{label}</strong>
            </label>
            <input
                className="form-control"
                list={`${name}_list`}
                name={name}
                id={name}
                {...field}
                {...rest}
            />
            <datalist id={`${name}_list`}>
                <option value="">Choose...</option>
                {options.map((optn) => (
                    /* eslint-disable jsx-a11y/control-has-associated-label */
                    <option value={optn.value} />
                    /* eslint-disable jsx-a11y/control-has-associated-label */
                ))}
            </datalist>
            {meta.touched && meta.error ? (
                <div className="invalid-feedback" style={{ display: "block" }}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
}

export function Checkbox(props) {
    const { name, label } = props;
    const [field, meta, helpers] = useField(props);
    return (
        <div className="custom-control custom-checkbox mr-3 mb-2">
            <input
                type="checkbox"
                className="custom-control-input"
                id={name}
                checked={field.value}
                value={field.value}
                onChange={() => {
                    helpers.setTouched(true);
                    helpers.setValue(!field.value);
                }}
            />
            <label className="custom-control-label" htmlFor={name}>
                {label}
            </label>
        </div>
    );
}

export function DatePicker(props) {
    const { name, label, ...rest } = props;
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <ReactDatePicker
                {...rest}
                selected={field.value}
                onChange={(val) => setFieldValue(field.name, val)}
                className="form-control"
            />
            {meta.touched && meta.error ? (
                <div className="invalid-feedback" style={{ display: "block" }}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
}

export function FileField(props) {
    const { name, label, ...rest } = props;
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                {...rest}
                type="file"
                onChange={(e) =>
                    setFieldValue(field.name, e.currentTarget.files[0])
                }
                className="form-control"
            />
            {meta.touched && meta.error ? (
                <div className="invalid-feedback" style={{ display: "block" }}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
}

export function TableField(props) {
    const { name, label, headers } = props;
    const [field, meta, helpers] = useField(props);
    const [values, setvalues] = useState({});

    const handleInput = (e, fieldName) => {
        e.preventDefault();
        setvalues({
            ...values,
            [fieldName]: e.target.value,
        });
    };

    const reset = () => {
        const initValues = headers.reduce(
            (preValue, currValue) => ({
                ...preValue,
                [currValue.value]: "",
            }),
            {}
        );
        setvalues(initValues);
    };

    const addRecord = () => {
        if (field.value) {
            const update = field.value.slice();
            update.push(values);
            helpers.setValue(update);
        } else {
            const update = [];
            update.push(values);
            helpers.setValue(update);
        }
        reset();
    };

    const handleEnterPress = (e) => {
        if (e.which === 13) {
            e.preventDefault();
            addRecord();
        }
    };

    const removeRecord = (index) => {
        const update = field.value.slice();
        update.splice(index, 1);
        helpers.setValue(update);
    };

    if (!Array.isArray(field.value)) {
        return null;
    }

    if (!Array.isArray(headers)) {
        return null;
    }

    return (
        <>
            <label htmlFor={`table${name}`}>{label}</label>
            <table id={`table${name}`} className="table table-borderless">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th scope="col">{header.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {field.value.map((fieldItem, idx) => (
                        <tr key={fieldItem[headers[0]?.value]}>
                            {headers.map((header) => (
                                <>
                                    <td>{fieldItem[header.value]}</td>
                                </>
                            ))}
                            <td>
                                <button
                                    type="button"
                                    style={{ minWidth: 100 }}
                                    className="btn btn-light btn-sm"
                                    onClick={() => removeRecord(idx)}
                                >
                                    Remove Entry
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        {headers.map((header) => (
                            <>
                                <td key={header.value}>
                                    <input
                                        className="form-control"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={values[header.value]}
                                        onChange={(e) => {
                                            handleInput(e, header.value);
                                        }}
                                        onKeyPress={handleEnterPress}
                                    />
                                </td>
                            </>
                        ))}
                        <td>
                            <button
                                type="button"
                                style={{ minWidth: 100 }}
                                className="btn btn-light btn-sm"
                                onClick={addRecord}
                            >
                                Add Entry
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ErrorMessage
                name={name}
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
            />
        </>
    );
}

export function YesNoRadio(props) {
    const { name, label } = props;

    return (
        <Field name={name} id={name} label={label}>
            {({ field, form: { setFieldValue } }) => (
                <div>
                    {/* <label>{label}</label> */}
                    <div className="d-flex">
                        <div className="custom-control custom-radio mr-3">
                            <input
                                className="custom-control-input"
                                checked={field.value}
                                onChange={() => {
                                    setFieldValue(name, true);
                                }}
                                id={`${name}-yes`}
                                type="radio"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor={`${name}-yes`}
                            >
                                Yes{" "}
                            </label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                className="custom-control-input"
                                checked={field.value === false}
                                onChange={() => {
                                    setFieldValue(name, false);
                                }}
                                id={`${name}-no`}
                                type="radio"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor={`${name}-no`}
                            >
                                No{" "}
                            </label>
                        </div>
                    </div>
                    <ErrorMessage
                        name={name}
                        render={(msg) => (
                            <div style={{ color: "red" }}>{msg}</div>
                        )}
                    />
                </div>
            )}
        </Field>
    );
}
