import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosApiInstance } from "../../app/axiosInstance"
import { API_URL } from "../../app/config"


export const createReminder = createAsyncThunk('calendar/create', async(formData) => {
    return await axiosApiInstance.post(`${API_URL}/calendar/create`, formData);
})

export const updateReminder = createAsyncThunk('calendar/update', async(formData) => {
    return await axiosApiInstance.post(`${API_URL}/calendar/update`, formData);
})


export const getCurrentMonthReminders = createAsyncThunk('calendar/getData', async(formData) => {
    return await axiosApiInstance.get(`${API_URL}/calendar/getData?month=${formData.month +1}&year=${formData.year}`);
})