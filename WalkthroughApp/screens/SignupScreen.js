import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
function SignupScreen({ email, password }) {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler() {
    setIsAuthenticate(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch {
      Alert.alert(
        "Authentication failed!",
        "Could not create user something went wrong!!"
      );
      setIsAuthenticate(false);
    }
  }
  if (isAuthenticate) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
