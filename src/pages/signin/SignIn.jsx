import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import useRedirect from "../../hooks/useRedirect";
import { NavLink } from "react-router-dom";

function SignIn() {
  const goTo = useRedirect();
  const fieldStyle = {
    backgroundColor: "primary.light",
    ".MuiFilledInput-root": {
      input: {
        color: "black",
      },
    },
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("Успішний вхід:", user.displayName);
        const token = await user.getIdToken();
        console.log(token);
        goTo("/profile");
      })
      .catch((error) => {
        console.error("Error:", error.code, error.message);
        alert(error.message);
      });
  };

  return (
    <Box sx={{ paddingTop: "150px", border: "1px solid red" }}>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "secondary.light",
          margin: "0 auto",
          width: "fit-content",
          maxWidth: "100vw",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          {...register("email", {
            required: "Email field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "invalid email",
            },
          })}
          label="Email"
          type="email"
          variant="filled"
          sx={fieldStyle}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            {errors.email.message}
          </p>
        )}
        <TextField
          {...register("password", {
            required: "This field is required",
            maxLength: { value: 25, message: "max lenght is 25 symbols" },
            minLength: { value: 6, message: "min lenght is 6 symbols" },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: "Only letters and numbers are allowed",
            },
          })}
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          sx={fieldStyle}
        />
        {errors.password && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            {errors.password.message}
          </p>
        )}
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "primary.main" }}
        >
          Sign In
        </Button>
      </Box>
      <Box
        sx={{
          border: "1px solid green",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        <Typography
          variant="p"
          sx={{ color: "primary.text", fontSize: "16px" }}
        >
          Not registered yet? go to the
          <NavLink className="page-link underform" to="/register">
            registration
          </NavLink>
          page
        </Typography>
      </Box>
    </Box>
  );
}

export default SignIn;
