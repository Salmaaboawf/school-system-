// import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const MarkSlice = createSlice({
//     name: 'Marks',
//     initialState: {
//         Marks: [],
//         Loading: true
//     },
//     extraReducers: builder => {
//         builder.addCase()
//     }
// })

// export default MarkSlice.reducer


// errors are because addCase() is empty , I guess :)
// I supposed that marks will be added to DB so I created the slice Async
// this slice supposed to dispatch in the teacher component to add students' marks and useSelector with it to show marks in student and parent accounts