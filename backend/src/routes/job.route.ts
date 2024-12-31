
import express from 'express';
import { applyForJob, getCategories, getFeaturedJobs } from '../controllers/job.controller';

const router = express.Router();

router.get('/featured', getFeaturedJobs);
router.get('/categories', getCategories);
router.post('/apply', applyForJob);

export default router;
