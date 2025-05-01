// server/routes/searchRoutes.js
import express from 'express';
import {handleSearch} from '../controllers/searchController.js';
console.log("goes to searchRoutes");
const router = express.Router();
console.log("goes to searchRoutes");
router.get('/search', handleSearch);
export default router;

