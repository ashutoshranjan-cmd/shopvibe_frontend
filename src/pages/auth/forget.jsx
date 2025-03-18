import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { resetPassword } from '../../store/reset/index';
import { useSearchParams } from 'react-router-dom';

const Forget = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
    const tokenParam = searchParams.get("token");
  
  // Extract token from URL parameters
  useEffect(() => {
    
    console.log(token);
    
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      toast.error('Invalid or missing reset token');
      setTimeout(() => navigate('/auth/login'), 3000);
    }
  }, [location, navigate]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Dispatch reset password action
        await dispatch(resetPassword({ 
          token, 
          newPassword: formData.newPassword 
        })).unwrap();
        
        toast.success('Password has been reset successfully!');
        setTimeout(() => navigate('/auth/login'), 3000);
      } catch (err) {
        toast.error(err?.message || 'Failed to reset password. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Handle cancel
  const handleCancel = () => {
    navigate('/login');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <motion.div
        className="w-full max-w-md p-8 rounded-xl bg-white/50 backdrop-blur-md shadow-lg "
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-1">
              Reset Your Password
            </h1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="text-gray-600 mb-6">
              Please enter a new password for your account.
            </p>
          </motion.div>
          
          <form onSubmit={handleSubmit}>
            <motion.div 
              variants={itemVariants}
              className="mb-4"
            >
              <TextField
                fullWidth
                type="password"
                name="newPassword"
                label="New Password"
                variant="outlined"
                value={formData.newPassword}
                onChange={handleChange}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                className={errors.newPassword ? 'border-red-500' : ''}
              />
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mb-6"
            >
              <TextField
                fullWidth
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-all w-full sm:w-auto"
                sx={{ 
                  borderRadius: '0.375rem',
                  textTransform: 'none',
                  backgroundColor: '#2563eb',
                  '&:hover': {
                    backgroundColor: '#1d4ed8',
                  }
                }}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleCancel}
                className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-all w-full sm:w-auto"
                sx={{ 
                  borderRadius: '0.375rem',
                  textTransform: 'none',
                }}
              >
                Cancel
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Forget;