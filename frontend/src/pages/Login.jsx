import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function Login() {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        try {
            const response = await fetch(`${BASE_URL}/store/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                saveTokens(data);
                setMsg("Login successful! Redirecting...");

                setTimeout(() => {
                    navigate("/");
                }, 800);
            } else {
                setMsg(data.detail || "Login failed. Please try again.");
            }
        } catch (error) {
            setMsg("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
                
                <h2 className="text-2xl font-bold text-center">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                username: e.target.value,
                            })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value,
                            })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full p-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Login
                    </button>

                </form>

                {msg && (
                    <p className="mt-3 text-sm text-center text-red-500">
                        {msg}
                    </p>
                )}

                <div className="mt-4 text-sm text-center">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Register
                    </a>
                </div>

            </div>
        </div>
    );
}

export default Login;
