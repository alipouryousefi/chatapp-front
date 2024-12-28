"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LoginFormValues, loginSchema } from "@/validation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onLogin = async (data: LoginFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login submitted:", data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onSignup = async (data: LoginFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Signup submitted:", data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const loginFields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const signupFields = [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const renderForm = (
    fields: typeof loginFields,
    register: any,
    errors: any,
    isSubmitting: boolean,
    onSubmit: any
  ) => (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map((field, index) => (
        <motion.div
          key={field.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-slate-300"
          >
            {field.label}
          </label>
          <div className="relative">
            <input
              {...register(field.name)}
              type={
                field.name === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : field.type
              }
              id={field.name}
              className={`mt-1 block w-full rounded-md bg-slate-800 border 
                ${errors[field.name] ? "border-red-500" : "border-slate-700"} 
                shadow-sm p-2 text-white placeholder-slate-400
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            />
            {field.name === "password" && (
              <div className="absolute right-3 inset-y-0 flex justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-300 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            )}
          </div>
          <AnimatePresence mode="wait">
            {errors[field.name] && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-1 text-sm text-red-400"
              >
                {errors[field.name]?.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent 
          rounded-md shadow-sm text-sm font-medium text-white 
          bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 
          disabled:cursor-not-allowed focus:ring-offset-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {isSubmitting ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign up")}
      </motion.button>

      <div className="text-center mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-blue-400 hover:text-blue-300 focus:outline-none"
        >
          {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
        </motion.button>
      </div>
    </form>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md p-6 bg-slate-800 border-slate-700">
          <CardHeader>
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CardTitle className="text-2xl font-bold text-center text-white">
                {isLogin ? "Login" : "Sign up"}
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 100 : -100 }}
                transition={{ duration: 0.3 }}
              >
                {isLogin
                  ? renderForm(
                      loginFields,
                      registerLogin,
                      loginErrors,
                      isLoginSubmitting,
                      handleLoginSubmit(onLogin)
                    )
                  : renderForm(
                      signupFields,
                      registerSignup,
                      signupErrors,
                      isSignupSubmitting,
                      handleSignupSubmit(onSignup)
                    )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthForm;