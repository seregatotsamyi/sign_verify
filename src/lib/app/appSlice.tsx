import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  init: boolean;
  isShowMenu: boolean;
  typeApp: "mob" | "desk";
  lang: "ru" | "en";
}

const initialState: InitialStateType = {
  init: false,
  isShowMenu: false,
  typeApp: "desk",
  lang: "ru",
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setTypeApp: (state, action: PayloadAction<"mob" | "desk">) => {
      state.typeApp = action.payload;
    },
    setShowMenu: (state, action: PayloadAction<boolean>) => {
      state.isShowMenu = action.payload;
    },
  },
});

export const { setInit, setShowMenu, setTypeApp } = appReducer.actions;

export default appReducer.reducer;
