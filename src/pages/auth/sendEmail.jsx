import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import CommonForm from "@/components/common/form";
import { sendEmailFormControls } from "@/config/index";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { sendEmail } from "@/store/auth-slice";

const initialState = {
  email: "",
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function SendEmail() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await dispatch(sendEmail(formData));

      toast({
        title: data?.payload?.message,
        variant: data?.payload?.success ? "default" : "destructive",
        className: data?.payload?.success ? "bg-green-50" : "bg-red-50",
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div initial="initial" animate="animate" className="mx-auto w-full max-w-md space-y-8 relative">
      {/* Close Button */}
      <button onClick={() => navigate("/")} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors">
        <X className="w-6 h-6" />
      </button>

      {/* Heading */}
      <motion.div {...fadeInUp} className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Forgot Password?
        </h1>
        <p className="text-lg text-gray-600">Enter your email to receive a reset link</p>
      </motion.div>

      {/* Form */}
      <motion.div variants={fadeInUp} className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 space-y-6">
        <CommonForm
          formControls={sendEmailFormControls}
          buttonText={isLoading ? "Sending email..." : "Get link"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          disabled={isLoading}
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="text-center text-sm text-gray-500">
        Remembered your password? {" "}
        <Link to="/auth/login" className="text-primary hover:underline">
          Sign in here
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default SendEmail;
