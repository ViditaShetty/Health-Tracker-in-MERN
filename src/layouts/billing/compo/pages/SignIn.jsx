import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../components/Button";
import Divider from "../components/Divider";
import Input from "../components/Input";
import { useAuth } from "../contexts/auth/AuthContext";

function SignIn() {
  const { signIn, signInWithGoogle, resetPassword } = useAuth();
  const history = useHistory();

  const initialValues = { email: "", password: "" };

  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      history.push("/");
    } catch (error) {
      setError(error.message);
    }

    setGoogleLoading(false);
  };


  return (
<>
      <h1 className="text-5xl" style={{color:"white"}}>Sign In</h1>
      <Button
        value="Continue with Google"
        type="submit"
        variant="frame"
        action={handleGoogleSignIn}
        loading={googleLoading}
        fullWidth
      />
</>
  );
}

export default SignIn;
