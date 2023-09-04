import { createSlice } from '@reduxjs/toolkit';
import {
userLoginAction,registerUserAction,getUsersAction,getUserFilterAction,getEventFilterAction,getNotificationsAction,seeNotificationAction
,seeAllNotificationsAction,getAllEventsAction,getMyEventsAction,getSingleEventAction,cancelEventAction,completeEventAction,deleteEventAction,updateEventAction,myJoinEventsAction,joinEventAction,acceptEventAction,cancelRequestEventAction} from './actions';

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    isLoading: false,
    user: {},
    isAuthenticated: false,
    errorMessage: null,
    successMessage: null,
    accessToken: {},
    userList: {},
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    clearLoading: (state) => {
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = { ...action.payload };
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
  extraReducers: {
   // register user
    [registerUserAction.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUserAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload;
    },
    [registerUserAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    //get noyifications of a user
 [getNotificationsAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getNotificationsAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload;
    },
    [getNotificationsAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
//seeNotificationAction
[seeNotificationAction.pending]: (state) => {
      state.isLoading = true;
    },
    [seeNotificationAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload;
    },
    [seeNotificationAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    //seeAllNotificationsAction
[seeAllNotificationsAction.pending]: (state) => {
      state.isLoading = true;
    },
    [seeAllNotificationsAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload;
    },
    [seeAllNotificationsAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    //getAllAction
    
    [getAllEventsAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllEventsAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload;
    },
    [getAllEventsAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    //getMyjoined
    
    [myJoinEventsAction.pending]: (state) => {
      state.isLoading = true;
    },
    [myJoinEventsAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload;
    },
    [myJoinEventsAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    [getUserFilterAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserFilterAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload;
    },
    [getUserFilterAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    //getMyEventsAction

    [getMyEventsAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyEventsAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload;
    },
    [getMyEventsAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    //get event filter action
     [getEventFilterAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getEventFilterAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.successMessage = payload;
      state.userList = payload.data;
    },
    [getEventFilterAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },


    //myJoinEventsAction
     [myJoinEventsAction.pending]: (state) => {
      state.isLoading = true;
    },
    [myJoinEventsAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.successMessage = payload;
      state.userList = payload.data;
    },
    [myJoinEventsAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    //get event filter action
     [joinEventAction.pending]: (state) => {
      state.isLoading = true;
    },
    [joinEventAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.successMessage = payload;
      state.userList = payload.data;
    },
    [joinEventAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
 
    //acceptEventAction

[acceptEventAction.pending]: (state) => {
      state.isLoading = true;
    },
    [acceptEventAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.successMessage = payload;
      state.userList = payload.data;
    },
    [acceptEventAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },


     //cancelRequestEventAction

[cancelRequestEventAction.pending]: (state) => {
      state.isLoading = true;
    },
    [cancelRequestEventAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.successMessage = payload;
      state.userList = payload.data;
    },
    [cancelRequestEventAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    //c

    //getSingleEventAction

     [getSingleEventAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleEventAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.successMessage = payload;
      state.userList = payload.data;
    },
    [getSingleEventAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    //cancelEventAction

     [cancelEventAction.pending]: (state) => {
      state.isLoading = true;
    },
    [cancelEventAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.successMessage = payload;
      state.userList = payload.data;
    },
    [cancelEventAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },


    //completeEventAction


     [completeEventAction.pending]: (state) => {
      state.isLoading = true;
    },
    [completeEventAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.successMessage = payload;
      state.userList = payload.data;
    },
    [completeEventAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    //deleteEventAction

     [deleteEventAction.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteEventAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.successMessage = payload;
      state.userList = payload.data;
    },
    [deleteEventAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },

    //updateEventAction

     [updateEventAction.pending]: (state) => {
      state.isLoading = true;
    },
    [updateEventAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.successMessage = payload;
      state.userList = payload.data;
    },
    [updateEventAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },


    ///get user by fiklter
    // // register user
    // [resigteroauthUserAction.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [resigteroauthUserAction.fulfilled]: (state) => {
    //   state.isLoading = false;
    //   state.errorMessage = null;
    // },
    // [resigteroauthUserAction.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = payload;
    // },
    // // Register admin and moderator
    // [resigterAdminModAction.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [resigterAdminModAction.fulfilled]: (state) => {
    //   state.isLoading = false;
    //   state.errorMessage = null;
    // },
    // [resigterAdminModAction.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = payload;
    // },
    // User Login action
    [userLoginAction.pending]: (state) => {
      state.isLoading = true;
    },
    [userLoginAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.accessToken = state.payload;
      state.successMessage = payload;
      state.isAuthenticated = true;
    },
    [userLoginAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    // User List
   

    [getUsersAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsersAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.successMessage = payload;
      state.userList = payload.data;
    },
    [getUsersAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    // // Update access moderator
    // [updateAccessAction.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [updateAccessAction.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = null;
    //   state.successMessage = payload;
    // },
    // [updateAccessAction.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = payload;
    // },
    // // Admin Ban the Moderator
    // [adminBanModAction.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [adminBanModAction.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = null;
    //   state.successMessage = payload;
    // },
    // [adminBanModAction.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = payload;
    // },
    // // Admin Edit the access of Moderator
    // [adminEditAccessModAction.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [adminEditAccessModAction.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = null;
    //   state.successMessage = payload;
    // },
    // [adminEditAccessModAction.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = payload;
    // },
    // // customerListAction list data
    // [customerListAction.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [customerListAction.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.errorMessage = null;
    //   state.userList = action.payload.data.data;
    // },
    // [customerListAction.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = payload;
    // },
    // // forgetPasswordAction
    // [forgetPasswordAction.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [forgetPasswordAction.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.errorMessage = null;
    //   state.userList = action.payload.data.data;
    // },
    // [forgetPasswordAction.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = payload;
    // },
    // // resetPasswordAction
    // [resetPasswordAction.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [resetPasswordAction.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.errorMessage = null;
    //   if (action.payload && action.payload.data) {
    //     state.userList = action.payload.data.data;
    //   } else {
    //     state.userList = [];
    //   }
    // },
    // [resetPasswordAction.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = payload;
    // },

    // [fetchEmojis.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [fetchEmojis.fulfilled]: (state) => {
    //   state.isLoading = false;
    //   state.errorMessage = null;
    // },
    // [fetchEmojis.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.errorMessage = payload;
    // },

  },
});

export const { setLoading, clearLoading, setUser, clearUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;
