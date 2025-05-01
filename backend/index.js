import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import searchRoutes from './routes/searchRoutes.js';
import path from 'path'
dotenv.config();
connectDB();


console.log("come")

const app = express();

 const _dirname = path.resolve();
// middleware

console.log("dirname", _dirname)



app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
    origin:'https://stalthai-thon.onrender.com/',
    credentials:true
}

app.use(cors(corsOptions));

console.log("goes to use");



const PORT = process.env.PORT || 3000;



// api's
app.use('/api', searchRoutes);

console.log("goes to static");

app.use(express.static(path.join(_dirname, "/my-app/dist")));

console.log("goes to static doosra");
// app.get('*', (_ , res) => {
//     res.sendFile(path.resolve(_dirname, "my-app", "dist", "index.html"));
// })

console.log("goes to static doosra 3");

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})





