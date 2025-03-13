"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const userSession = useSession();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (userSession?.status === "authenticated") {
      router.push("/");
    }
  }, [userSession]);

  const handleLogin = async () => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("something went wrong" + error);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await fetch("/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.statusCode === 400) {
        setError(data.message);
      } else {
        handleLogin();
      }
    } catch (error) {
      console.error("something went wrong" + error);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  const handleGoogleLogin = async () => {
    signIn("google");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <form
        onSubmit={handleAuth}
        className="bg-white p-6 rounded shadow-md m-2"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2 text-black"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2 text-black"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          {isLogin ? "Login" : "Sign Up"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <button
        onClick={handleGoogleLogin}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Sign in with Google
      </button>

      <p className="mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 ml-2"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
