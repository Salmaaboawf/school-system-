// import { getGrades } from './subjectSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {getSubjectsGrades} from "../../services/subjectService"
// import { string } from 'yup';

export const getGrades = createAsyncThunk("students/getGrades", async (studentEmail:string)=>{
    try{

        const subjects = await getSubjectsGrades(studentEmail);
          return subjects;
    }
    catch(err) {
console.log(err);
    }
})

const getGradesSlice = createSlice({
    name: "student",
    initialState:{
        grades:[],
        // loading : true
    },
    reducers: {}, // Provide an empty reducers object
    extraReducers: (builder) => {
        // builder.addCase(getGrades.pending,(state)=>{
        //     state.loading = true
        // })
        builder.addCase(getGrades.fulfilled,(state,action)=>{
            state.grades.push = action.payload;
            // state.loading = false
        })
        // .addCase(getGrades.rejected,(state)=>{
        // //     state.loading = false
        // // })
    }
})

export default getGradesSlice.reducer