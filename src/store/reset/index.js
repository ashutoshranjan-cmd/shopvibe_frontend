import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for password reset
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://shop-vibe-server.onrender.com/api/auth/forget', { 
        token, 
        newPassword 
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Something went wrong' }
      );
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Password reset failed';
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk for password reset
// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async ({ token, newPassword }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/auth/',
//         { newPassword }, // Send only new password in body
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send token in headers
//           },
//         }
//       );

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || { message: 'Something went wrong' }
//       );
//     }
//   }
// );

// const initialState = {
//   loading: false,
//   success: false,
//   error: null,
//   user: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     clearAuthState: (state) => {
//       state.error = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Reset Password
//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Password reset failed';
//       });
//   },
// });

// export const { clearAuthState } = authSlice.actions;
// export default authSlice.reducer;
