import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "@/libraries/axios";
import useResponse from "@/hooks/useResponse";

export default function Login() {
  const navigate = useNavigate();
  const [response, dispatch] = useResponse();

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    try {
      dispatch({
        loading: true,
      });

      const loginResponse = await post("login", {
        email,
        password,
      });

      dispatch({
        loading: false,
        status: loginResponse.status,
        message: loginResponse.data?.message,
        data: loginResponse.data?.data,
      });

      event.target.reset();
    } catch (error) {
      dispatch({
        loading: false,
        status: error.response.status,
        message: error.response.data?.message,
        errors: error.response.data?.errors,
      });
    }
  };

  useEffect(() => {
    if (response.success && response.data?.token) {
      window.localStorage.setItem("token", response.data?.token);
      navigate("/");
    }
  }, [response]);

  return (
    <>
      {response.message && (
        <p className={response.success ? "text-green-700" : "text-red-700"}>
          {response.message}
        </p>
      )}

      <form onSubmit={handleLogin}>
        <label htmlFor="email">Enter your email.</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="you@email.com"
          required
        />

        <label htmlFor="password">Enter your password.</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required
        />

        <button type="submit" disabled={response.loading === true}>
          {response.loading === true ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>Don't have an account?</p>
      <Link to="/register">Register</Link>
    </>
  );
}
