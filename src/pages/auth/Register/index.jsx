import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "@/libraries/axios";
import useResponse from "@/hooks/useResponse";

export default function Register() {
  const navigate = useNavigate();
  const [response, dispatch] = useResponse();

  const handleRegistration = async (event) => {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const passwordConfirmation =
      event.target.password_confirmation.value.trim();

    try {
      dispatch({
        loading: true,
      });

      const registrationResponse = await post("register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      dispatch({
        loading: false,
        status: registrationResponse.status,
        message: registrationResponse.data?.message,
        data: registrationResponse.data?.data,
      });

      event.target.reset();

      window.localStorage.setItem(
        "token",
        registrationResponse.data?.data.token
      );
      navigate("/");
    } catch (error) {
      dispatch({
        loading: false,
        status: error.response.status,
        message: error.response.data?.message,
        errors: error.response.data?.errors,
      });
    }
  };

  return (
    <>
      {response.message && (
        <p className={response.success ? "text-green-700" : "text-red-700"}>
          {response.message}
        </p>
      )}

      <form onSubmit={handleRegistration}>
        {response.errors?.name && (
          <p className="text-red-700">{response.errors?.name}</p>
        )}
        <label htmlFor="name">Enter your name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your name"
          required
        />

        {response.errors?.email && (
          <p className="text-red-700">{response.errors?.email}</p>
        )}
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="you@email.com"
          required
        />

        {response.errors?.password && (
          <p className="text-red-700">{response.errors?.password}</p>
        )}
        <label htmlFor="password">Enter your password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required
        />
        <label htmlFor="password_confirmation">Confirm your password:</label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          placeholder="password"
          required
        />

        <button type="submit" disabled={response.loading === true}>
          {response.loading === true ? "Registering..." : "Register"}
        </button>
      </form>

      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
    </>
  );
}
