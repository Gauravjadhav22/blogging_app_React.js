import axios from "axios"

const BASE_URL = 'http://localhost:5050'
// const BASE_URL = 'https://blogging-app-backend-nodejs.herokuapp.com'

const CLOUDINARY='https://api.cloudinary.com/v1_1/dwmm1r1ph/upload/blogApp'

export default axios.create({
    baseURL: BASE_URL
})


export const privateRequest = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const cloudinaryUpload= axios.create({
    baseURL:CLOUDINARY,
})