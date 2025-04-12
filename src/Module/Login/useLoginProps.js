import { useState } from "react";

export const useLoginProps = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleToggle = () => {
    setType(type === "password" ? "text" : "password");
    setIcon(!icon);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: number,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("tizimga kirishda xatolik yuz berdi");
      } else {
        window.location.href = "/";
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.data.tokens.accessToken.token);
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    handleSubmit,
    setNumber,
    setPassword,
    error,
    handleToggle,
    type,
    icon,
  };
};
