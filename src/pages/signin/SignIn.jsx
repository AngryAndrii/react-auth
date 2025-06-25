import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import useRedirect from "../../hooks/useRedirect";

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
        // const token = await user.getIdToken();
        // console.log(token);
        goTo("/profile");
      })
      .catch((error) => {
        console.error("Error:", error.code, error.message);
      });
  };

  return (
    <Box sx={{ paddingTop: "150px" }}>
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
          {...register("email", { required: true })}
          label="Email"
          type="mail"
          variant="filled"
          sx={fieldStyle}
        />
        <TextField
          {...register("password", { required: true })}
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          sx={fieldStyle}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "primary.main" }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}

export default SignIn;
