import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useHistory, Link } from "react-router-dom";
import { signIn } from "../api";
import {appService} from "../services/appService";

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../config";
import {
    Form,
    TextField,
    SubmitButton,
    DisplayField,
    Checkbox,
} from "../components/FormElements";
import { authActions, getUser } from "../state/auth";

const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Required")
        .min(1, "Required"),
    password: Yup.string().required("Required").min(6, "Too short"),
    passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
    ),
});

export default function SignInPage() {
    const dispatch = useDispatch();
    const [rememberMe] = useState(false);
    const history = useHistory();

    const [formData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const onSubmit = async (values) => {
        const { email, password, remember } = values;
        try {
            const response = await signIn(email, password, remember);
            if (response && response.access) {
                sessionStorage.setItem(ACCESS_TOKEN_NAME, response.access);
                if (rememberMe) {
                    localStorage.setItem(REFRESH_TOKEN_NAME, response.refresh);
                } else {
                    sessionStorage.setItem(
                        REFRESH_TOKEN_NAME,
                        response.refresh
                    );
                }
                history.push("/");
                dispatch(getUser());
            }
        } catch (e) {
            // continue regardless of error
        }
    };

    return (
        <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
            <h4>Sign In</h4>
            <div className="w-25">
                <Form
                    enableReinitialize
                    initialValues={formData}
                    validationSchema={LoginFormSchema}
                    onSubmit={onSubmit}
                >
                    <div className="input-row mt-4">
                        <TextField
                            name="email"
                            id="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="input-row mt-4">
                        <TextField
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                        />
                    </div>

                    <div className="input-row mt-3">
                        <Checkbox name="remember" label="Remember me" />
                    </div>

                    <DisplayField fieldName="status">
                        {(status) => {
                            if (!status) return <></>;
                            return (
                                <div
                                    className={`alert alert-${
                                        status.type === "error"
                                            ? "danger"
                                            : "success"
                                    }`}
                                    role="alert"
                                >
                                    <p>{status.message}</p>
                                </div>
                            );
                        }}
                    </DisplayField>
                    <SubmitButton
                        className="btn btn-primary mt-4 w-100"
                        title="Sign In"
                    />
                </Form>
            </div>
            <Link to="/forgot-password">Forgot Password?</Link>
        </div>
    );
}

export function LogoutPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.removeUser());
        sessionStorage.removeItem(ACCESS_TOKEN_NAME);
        sessionStorage.removeItem(REFRESH_TOKEN_NAME);
        localStorage.removeItem(REFRESH_TOKEN_NAME);
        history.push("/signin");
    }, [dispatch, history]);

    return <></>;
}

export function ForgotPasswordPage() {
    const [formData] = useState({
        email: "",
    });
    /* eslint-disable */
    // left as a sample
    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        // setSubmitting(true);
    };
    /* eslint-disable */

    return (
        <div className="form">
            <div className="heading">Forgot Your Password?</div>
            <div className="sub-text">
                Enter email associated with this account and we'll send a
                password reset link.
            </div>
            <div className="form-wrapper mb-3">
                <Form
                    enableReinitialize
                    initialValues={formData}
                    onSubmit={onSubmit}
                >
                    <div className="input-row">
                        <TextField
                            label="Email"
                            name="email"
                            placeholder="Email"
                        />
                    </div>
                    <DisplayField fieldName="status">
                        {(status) => {
                            if (!status) return <></>;
                            return (
                                <div
                                    className={`alert alert-${
                                        status.type === "error"
                                            ? "danger"
                                            : "success"
                                    }`}
                                    role="alert"
                                >
                                    <p>{status.message}</p>
                                </div>
                            );
                        }}
                    </DisplayField>
                    <SubmitButton
                        className="btn btn-primary mt-4 w-100"
                        title="Send Reset Link"
                    />
                </Form>
            </div>
            <Link to="/login">Back to Log in</Link>
        </div>
    );
}

export function RegisterPage() {
    const [formData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const onSubmit = () => {
        // console.log("done");
    };
    return (
        <div className="form">
            <div className="heading">Create an Account</div>
            <div className="form-wrapper">
                <Form
                    enableReinitialize
                    initialValues={formData}
                    validationSchema={LoginFormSchema}
                    onSubmit={onSubmit}
                >
                    <div className="input-row">
                        <TextField
                            label="Username"
                            name="username"
                            placeholder="Username"
                        />
                    </div>
                    <div className="input-row">
                        <TextField
                            label="Email"
                            name="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="input-row">
                        <TextField
                            type="password"
                            label="Password"
                            name="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="input-row">
                        <TextField
                            type="password"
                            label="Confirm Password"
                            name="passwordConfirmation"
                            placeholder="Confirm Password"
                        />
                    </div>
                    <DisplayField fieldName="status">
                        {(status) => {
                            if (!status) return <></>;
                            return (
                                <div
                                    className={`alert alert-${
                                        status.type === "error"
                                            ? "danger"
                                            : "success"
                                    }`}
                                    role="alert"
                                >
                                    <p>{status.message}</p>
                                </div>
                            );
                        }}
                    </DisplayField>
                    <SubmitButton
                        className="btn btn-primary mt-4"
                        title="Register"
                    />
                </Form>
            </div>
        </div>
    );
}

export function ForgotLinkSent() {
    return (
        <div className="form">
            <div className="heading">Check your email!</div>
            <div className="sub-text">
                Follow the instructions in the email we just sent you to reset
                password.
            </div>
            <Link className="mt-4 w-100" to="/login">
                Back to Log in
            </Link>
        </div>
    );
}
export function ResetPasswordPage() {
    const [formData] = useState({
        password: "",
        confirmPassword: "",
    });
    const history = useHistory();
    const onSubmit = () => {
        // setSubmitting(true);
        history.push("/forgot-link-sent");
    };
    return (
        <div className="form">
            <div className="heading">Reset Your Password</div>
            <div>
                Your new password must have 8 characters and at leat one symbol.
            </div>
            <div className="wrapper">
                <Form
                    enableReinitialize
                    initialValues={formData}
                    validationSchema={LoginFormSchema}
                    onSubmit={onSubmit}
                >
                    <div className="input-row">
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                        />
                    </div>
                    <div className="input-row">
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                        />
                    </div>
                    <DisplayField fieldName="status">
                        {(status) => {
                            if (!status) return <></>;
                            return (
                                <div
                                    className={`alert alert-${
                                        status.type === "error"
                                            ? "danger"
                                            : "success"
                                    }`}
                                    role="alert"
                                >
                                    <p>{status.message}</p>
                                </div>
                            );
                        }}
                    </DisplayField>
                    <SubmitButton
                        className="btn btn-primary mt-4"
                        title="Save Password"
                    />
                </Form>
            </div>
        </div>
    );
}
