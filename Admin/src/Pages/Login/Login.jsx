import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Materials } from "../../Context/Context";
import axios from "axios";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate=useNavigate();
  // Store values from the login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { BackendUrl, createToken, setShowLogin } = useContext(Materials);

  // Function for storing values from frontend
  const takeInput = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Function for login
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BackendUrl}/api/admin/login`, loginData);
      if (data.success) {
        console.log("true");
        sessionStorage.setItem("token", data.token);
        createToken(data.token);
        setShowLogin(true);
        navigate('/dashboard')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          width: "320px",
          border: "1px solid #000",
        }}
      >
        <Typography variant="h5" color="black" sx={{ mb: 2 }}>
          Login
        </Typography>
        <form onSubmit={submitForm}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onChange={takeInput}
            name="email"
            value={loginData.email}
            required
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onChange={takeInput}
            name="password"
            value={loginData.password}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#000", color: "#fff", "&:hover": { backgroundColor: "#444" } }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
