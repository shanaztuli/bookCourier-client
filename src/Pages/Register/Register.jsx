import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import {  saveOrUpdateUser } from "../../utils";
import logo from "/logoImg.png"; 
import { imageUpload } from "../../utils";



const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);

      const result = await createUser(email, password);

      await saveOrUpdateUser({ name, email, image: imageURL });
      await updateUserProfile(name, imageURL);

      toast.success("Account created successfully!");
      navigate(from, { replace: true });
      console.log(result);
    } catch (err) {
      toast.error(err?.message);
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

      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md  shadow-2xl rounded-2xl p-8 border border-indigo-50">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="BookCourier Logo" className="h-14" />
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-800">Create an Account</h1>
          <p className="text-sm text-gray-500 mt-1">
            Join BookCourier — Delivering Books, Delivering Joy 📚
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              {...register("name", {
                required: "Name is required",
                maxLength: { value: 30, message: "Name too long" },
              })}
              placeholder="Your Name"
              className="w-full  border p-3 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full border border-dashed p-2 rounded-md cursor-pointer"
            />
            <p className="text-xs text-gray-500">JPG, PNG — Max 2MB</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="example@mail.com"
              className="w-full  border p-3 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                  message:
                    "Password must include 1 uppercase, 1 lowercase, and 1 special character",
                },
              })}
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
              "Create Account"
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

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-red-800 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
