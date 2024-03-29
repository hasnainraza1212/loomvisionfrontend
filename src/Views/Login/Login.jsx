import React, {useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Navigate, Link, useNavigate } from "react-router-dom";
import openEye from "./../../assets/images/eye.png";
import closeEye from "./../../assets/images/closed-eye.png";
import Joi from "joi";
import CustomSnackBar from "../../Components/CustomSnackBar";
import { logIn } from "./../../EndPoints/EndPoints";
const joiSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}":;<>,.?~\\-]).{8,}$'
      )
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 1 upper case, 1 number, 1 special character, and atmost 8 characters long.",
    }),
});
const Login = () => {
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isOpenEye, setOpenEye] = useState(closeEye);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackBarProps, setSnackBarProps] = useState({
    severity: "success",
    message: "",
  });
  const validateData = () => {
    const { error } = joiSchema.validate(details, { abortEarly: false });
    if (!error) return true;
    const newErrors = error.details.reduce(
      (acc, detail) => ({
        ...acc,
        [detail.path[0]]: detail.message.replace(/"/g, ""),
      }),
      {}
    );
    setErrors(newErrors);
    return false;
  };
  const handleEye = () => {
    if (isOpenEye === closeEye) {
      setOpenEye(openEye);
    } else {
      setOpenEye(closeEye);
    }
  };
  const isEmptyField = () => {
    if (Object.keys(details).find((detail) => !details[detail])) {
      return setDisabled(true);
    }
    return setDisabled(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const isValid = validateData();
    if (isValid) {
      setErrors({});
      const res = await logIn(details);
      if (res.success) {
        setSnackBarProps({
          severity: "success",
          message: "Logged in successfully!",
        });
        setOpen(true);
        const {token, user} = res
        localStorage.setItem("token",token )
        setIsAuthenticated(true)
        navigate("/")
        return setIsLoading(false);
      }
      setSnackBarProps({
        severity: "error",
        message: res.response.data.message,
      });
      setOpen(true);
      return setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isEmptyField();
  }, [details]);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <main>
        <div className="form-container">
          <p className="title">Welcome Back 🎉</p>
          <form className="form">
            <div>
              <input
                onChange={(e) => {
                  setDetails((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
                type="email"
                className="input"
                name="email"
                placeholder="Email"
              />
              <p className="error">{errors["email"] ? errors["email"] : ""}</p>
            </div>
            <div>
              <div className="password">
                <input
                  onChange={(e) => {
                    setDetails((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                  type={isOpenEye === closeEye ? "password" : "text"}
                  className="input"
                  name="password"
                  placeholder="Password"
                />
                <img
                  style={{ display: !details.password ? "none" : "" }}
                  onClick={() => {
                    handleEye();
                  }}
                  width={20}
                  height={20}
                  src={isOpenEye}
                />
              </div>
              <p className="error">
                {errors["password"] ? errors["password"] : ""}
              </p>
            </div>
            <button
              disabled={disabled || isLoading}
              onClick={(e) => {
                handleLogin(e), isEmptyField();
              }}
              className={disabled || isLoading ? "disabled-button" : "form-btn"}
            >
              Log in
            </button>
          </form>
          <p className="sign-up-label">
            Don't have an account?
            <Link to="/sign-up">
              <span className="sign-up-link">Sign up</span>
            </Link>
          </p>
        </div>
        <CustomSnackBar
          open={open}
          handleClose={handleClose}
          severity={snackBarProps.severity}
          message={snackBarProps.message}
        />
      </main>
    </>
  );
};

export default Login;
