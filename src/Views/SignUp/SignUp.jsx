import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import fbLogo from "./../../assets/images/facebook.png";
import openEye from "./../../assets/images/eye.png";
import closeEye from "./../../assets/images/closed-eye.png";
import { signUp } from "../../EndPoints/EndPoints";
import Joi from "joi";
import CustomSnackBar from "../../Components/CustomSnackBar";
const SignUp = () => {
  const navigate = useNavigate()
  const joiSchema = Joi.object({
    name: Joi.string().required().min(6),
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
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
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
  const formRef = useRef()
  const handleEye = () => {
    if (isOpenEye === closeEye) {
      setOpenEye(openEye);
    } else {
      setOpenEye(closeEye);
    }
  };
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
  const isEmptyField = () => {
    if (Object.keys(details).find((detail) => !details[detail])) {
      return setDisabled(true);
    }
    return setDisabled(false);
  };
  const handleGoogleAuth =async ()=>{
   window.open('http://localhost:5000/signup/google', "_self");
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = validateData();
    if (isValid) {
      setErrors({});
      const res = await signUp(details);
      if (res.success) {
        setSnackBarProps({
          severity: "success",
          message: res.message,
        });
        setOpen(true);
         setIsLoading(false);
         formRef.current.reset()
         localStorage.setItem("token", res.token)
         return  navigate("/")
        ;
      }
      setSnackBarProps({
        severity: "error",
        message: res.response.data.message,
      });
      setOpen(true);
    }
    setIsLoading(false);

  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    isEmptyField();
  }, [details]);
  
  return (
    <>
      <main>
        <div className="form-container">
          <p className="title">👋 Welcome </p>
          <form ref={formRef} className="form">
            <div>
              <input
                onChange={(e) => {
                  setDetails((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
                type="name"
                className="input"
                name="name"
                placeholder="Name"
              />
              <p className="error">{errors["name"] ? errors["name"] : ""}</p>
            </div>
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
                handleSignUp(e), isEmptyField();
              }}
              className={disabled || isLoading ? "disabled-button" : "form-btn"}
            >
              Signup
            </button>
          </form>
          <p className="sign-up-label">
            Already have an account?
            <Link to="/sign-in">
              <span className="sign-up-link">Sign in</span>
            </Link>
          </p>
        </div>
      </main>
      <CustomSnackBar
        open={open}
        handleClose={handleClose}
        severity={snackBarProps.severity}
        message={snackBarProps.message}
      />
    </>
  );
};

export default SignUp;
