import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [], // ✅ MUST be array
  reducers: {
    addConnections: (state, action) => action.payload,
    clearConnections: () => [],
  },
});

export const { addConnections, clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
