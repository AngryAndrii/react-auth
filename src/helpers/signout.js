import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log("Користувач вийшов з системи");
    // Наприклад: переадресувати на сторінку входу
    window.location.href = "/login";
  } catch (error) {
    console.error("Помилка при виході:", error.message);
  }
};

export default handleSignOut;
