import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const authCtx = useContext(AuthContext);
  async function loginHandler() {
    setIsAuthenticate(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch {
      Alert.alert(
        "Authentication failed!!",
        "Could not log in. Please checck your credentials! or try again later"
      );
      setIsAuthenticate(false);
    }
  }
  if (isAuthenticate) {
    return <LoadingOverlay message="Log you in..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
