import React, { useEffect, useState, memo } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./../../Context/AuthContext";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { AiOutlineLogout } from "react-icons/ai";
import CardContent from "@mui/material/CardContent";
import { getLoggedInUser } from "../../EndPoints/EndPoints";
import CustomSnackBar from "../../Components/CustomSnackBar";
const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated, user, setToken, setUser } =
    useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [snackBarProps, setSnackBarProps] = useState({
    severity: "success",
    message: "",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.clear();
    navigate("/sign-in");
  };

  useEffect(() => {
    (async () => {
      if(!localStorage.getItem("token")){
        navigate("/sign-in")
      }

      if(localStorage.getItem("token")){
        const res = await getLoggedInUser(localStorage.getItem("token"));
        if (res && res.success) {
          setUser(res.user);
          setIsLoading(false);
          return setIsAuthenticated(true);
        }

      }

      setIsAuthenticated(false);
      localStorage.clear();
      navigate("/sign-in");


    })();
  }, [location.pathname]);
  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          justifyContent: "center",
          background:"white"
        }}
      >
        <span className="loader"></span>
      </Box>
    );
  }

  return isAuthenticated ? (
    <>
        <Box sx={{color:"white", height:"100vh",background:"black", boxSizing:"borderBox"}}>
        <Card sx={{ minWidth: "100%",  borderRadius:"0", }}>
          <CardContent
            sx={{ display: "flex", gap: "30px", alignItems: "center", p:"30px" }}
          >
            <Avatar
              sx={{
                width:  {
                  md:"70px",
                  xs:"40px"
                },
                background: "black",
                height: {
                  md:"70px",
                  xs:"40px"
                },
              }}
              alt={user?.name?.toUpperCase()}
              src="/static/images/avatar/1.jpg"
            />
            <Tooltip title="SignOut">
              <Box
                onClick={handleLogout}
                sx={{ ml: "auto", fontSize: "30px", cursor: "pointer",transform: "rotate(90deg)" }}
              >
                <AiOutlineLogout />
              </Box>
            </Tooltip>
          </CardContent>
        </Card>
        <Box sx={{  display:"flex",padding:{
          md:"80px 80px",
          xs:"40px"
        }, alignItems:"start", flexDirection:"column"}}>
        <Typography sx={{
            fontSize:{
              lg:"35px",
              md:"30px",
              sm:"25px",
              xs:"20px"
            },
            fontWeight:"600"
          }}>
            Thank you 
            <Typography sx={{
            fontSize:{
              lg:"70px",
              md:"70px",
              sm:"50px",
              xs:"40px"
            },
            fontWeight:"600",
            color:"white",
           }}>LOOMVISION</Typography> 
          </Typography>
          <Typography sx={{
            fontSize:{
              lg:"40px",
              md:"35px",
              xs:"25px"
            },
            maxWidth:{
              lg:"70%",
              xs:"100%"
            },
            fontWeight:"600",
            lineHeight:"60px"
          }}>
            FOR GIVING ME CHANGE BEST REGARDS 
          </Typography>
          <Typography sx={{
            fontSize:"40px",
            fontWeight:"600",
            lineHeight:"60px"
          }}>
            <Typography sx={{
            fontSize:{
              lg:"60px",
              md:"55px",
              sm:"40px",
              xs:"35px"

            },
            fontWeight:"700",
            color:"black",
            lineHeight:{
              md:"70px",
              sm:"40px",
              xs:"30px"
            },
            mt:"10px",
            background:"yellow"
           }}>
            {user.name.toUpperCase()}
              </Typography> 
          </Typography>
        </Box>
         
        </Box>
      <CustomSnackBar
        open={open}
        handleClose={handleClose}
        severity={snackBarProps.severity}
        message={snackBarProps.message}
      />
    </>
  ) : (
    <Navigate to={`/sign-in`} />
  );
};

export default memo(Layout);
