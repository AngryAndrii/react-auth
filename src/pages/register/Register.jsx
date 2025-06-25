import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import useRedirect from "../../hooks/useRedirect";
import { useAuth } from "../../helpers/authContext";
import { ErrorMessage } from "@hookform/error-message";

function Register() {
  const goTo = useRedirect();
  const { setUser } = useAuth(); // дістаємо setUser з контексту
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
    const name = data.nickname;
    const email = data.email;
    const password = data.password;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            // Оновлюємо глобальний user у контексті з новим displayName
            setUser({ ...user, displayName: name });
            console.log("Нікнейм збережено:", name);
            // const token = await user.getIdToken();
            // console.log(token);
            goTo("/profile"); // переходимо на профіль
          })
          .catch((error) => {
            console.error("Помилка при оновленні профілю:", error.message);
          });

        console.log("User created:", user);
      })
      .catch((error) => {
        console.error("Error:", error.code, error.message);
      });
  };

  return (
    <Box sx={{ paddingTop: "100px" }}>
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
          {...register("nickname", {
            required: "This field is required",
            maxLength: { value: 20, message: "max lenght is 20 symbols" },
            minLength: 3,
            pattern: /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ0-9]+/,
          })}
          label="Nickname"
          variant="filled"
          type="text"
          sx={fieldStyle}
        />
        <ErrorMessage
          errors={errors}
          name="nickname"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />
        <TextField
          {...register("email", { required: true })}
          label="Email"
          type="email"
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

        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "primary.main" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Register;
