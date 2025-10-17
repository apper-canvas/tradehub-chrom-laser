import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { useAuth } from "@/layouts/Root";

const LoginPage = () => {
  const { isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized) {
      const { ApperUI } = window.ApperSDK;
      ApperUI.showLogin("#authentication");
    }
  }, [isInitialized]);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ApperIcon name="ShoppingBag" size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2">Sign in to your TradeHub account</p>
          </div>

<div id="authentication" />

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-primary hover:text-primary/80 font-medium">
              Sign up
            </Link>
          </p>

          <div className="mt-6 p-4 bg-info/10 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Demo Account:</strong>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Email: demo@tradehub.com
            </p>
            <p className="text-sm text-gray-600">
              Password: demo123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;