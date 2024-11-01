import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const createDishApi=createAsyncThunk(
    'create-dish',
    async(dish)=>{
      try {
        const { data,status}=await axios.post('https://food-delivery-backend-dbku.onrender.com/menu/upload',dish, {
            headers: {
              "Content-Type": "multipart/form-data",
            },})
           console.log(status);
           
        toast.success(data.message)
      } catch (error) {
        toast.error(error.message)
      } 
    } 

)

const DishSlice=createSlice({
    initialState:{},
    name:"dish",
    reducers:{
        Dish:(state,actions)=>{
          return {...state,...actions.payload}
        }},
        extraReducers:(builder)=>{
               builder.addCase(createDishApi.fulfilled,(state,payload)=>{
                      return state={}
               }).addCase(createDishApi.pending,(state,payload)=>{
                return state=true
               })
        }
    })

export  default DishSlice.reducer
export const {Dish }=DishSlice.actions