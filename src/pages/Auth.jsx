import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const [params] = useSearchParams();
  const [tab, setTab] = useState(params.get("tab") === "signup" ? "signup" : "signin");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);

    await new Promise((r) => setTimeout(r, 400));

    if (tab === "signin") {
      const res = await signIn({ email: form.email, password: form.password });
      if (!res.success) { setError(res.error); setLoading(false); return; }
      navigate("/");
    } else {
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match."); setLoading(false); return;
      }
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters."); setLoading(false); return;
      }
      const res = await signUp({ name: form.name, email: form.email, password: form.password });
      if (!res.success) { setError(res.error); setLoading(false); return; }
      setSuccess("Account created! Redirecting…");
      setTimeout(() => navigate("/"), 1000);
    }
    setLoading(false);
  };

  const switchTab = (t) => {
    setTab(t); setError(""); setSuccess("");
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white outline-none transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5 placeholder:text-gray-400";
  const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider";

  return (
    <div className="min-h-screen flex pt-16 font-sans">

      {/* Left Visual Panel */}
      <div className="hidden md:flex flex-1 bg-gray-900 text-white items-center justify-center relative overflow-hidden px-12 py-16">

        {/* Background Blob */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-700/40 blur-3xl -top-24 -right-36 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-sm">
          <div className="text-3xl font-extrabold tracking-tighter mb-10 opacity-50">
            Arcè
          </div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tighter mb-5">
            Your curated lifestyle,<br />starts here.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-9">
            Sign in to save favorites, track orders, and discover new arrivals crafted for modern living.
          </p>

          {/* Animated Dots */}
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-white opacity-30 animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-sm">

          {/* Tabs */}
          <div className="flex bg-gray-200 rounded-xl p-1 mb-7">
            <button
              onClick={() => switchTab("signin")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                ${tab === "signin"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchTab("signup")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                ${tab === "signup"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              Create Account
            </button>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
            {tab === "signin" ? "Welcome back 👋" : "Join us today 🎉"}
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            {tab === "signin"
              ? "Sign in to your account to continue."
              : "Create an account and start exploring."}
          </p>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-4 py-3 rounded-xl mb-5">
              ⚠ {error}
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-3 rounded-xl mb-5">
              ✓ {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

            {/* Full Name — signup only */}
            {tab === "signup" && (
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  placeholder="VK"
                  value={form.name}
                  onChange={update("name")}
                  className={inputClass}
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Email</label>
              <input
                type="email"
                placeholder="vk@example.com"
                value={form.email}
                onChange={update("email")}
                className={inputClass}
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={update("password")}
                className={inputClass}
                required
              />
            </div>

            {/* Confirm Password — signup only */}
            {tab === "signup" && (
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={update("confirmPassword")}
                  className={inputClass}
                  required
                />
              </div>
            )}

            {/* Forgot Password — signin only */}
            {tab === "signin" && (
              <div className="text-right -mt-1">
                <a href="#" className="text-xs font-semibold text-violet-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-bold tracking-wide
                flex items-center justify-center min-h-[52px]
                transition-all duration-200
                hover:bg-gray-700 hover:-translate-y-0.5
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                tab === "signin" ? "Sign In" : "Create Account"
              )}
            </button>
          </form>

          {/* Switch Tab */}
          <p className="text-center text-sm text-gray-400 mt-6">
            {tab === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => switchTab(tab === "signin" ? "signup" : "signin")}
              className="text-gray-900 font-bold underline underline-offset-2 cursor-pointer bg-transparent border-none text-sm hover:text-violet-600 transition-colors duration-200"
            >
              {tab === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Auth;