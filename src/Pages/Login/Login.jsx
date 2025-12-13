import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveOrUpdateUser } from "../../utils";
import logo from "/logoImg.png";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace />;

  const onSubmit = async (data) => {
    try {
      const { user } = await signIn(data.email, data.password);

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error(err?.message || "Google Sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="w-full max-w-md shadow-2xl rounded-2xl p-8 border border-indigo-50">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="BookCourier Logo" className="h-14" />
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-800">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to your BookCourier account 📚
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="example@mail.com"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              type="password"
              placeholder="Your Password"
              className="w-full border p-3 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-br from-red-800 via-red-900 to-red-950 py-3 rounded-md font-semibold transition"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        {/* Google Login */}
        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 border py-3 rounded-md cursor-pointer hover:bg-gray-50 transition"
        >
          <FcGoogle size={28} />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </div>

        {/* Signup Redirect */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Don&apos;t have an account yet?{" "}
          <Link to="/auth/register" className="text-red-800 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
