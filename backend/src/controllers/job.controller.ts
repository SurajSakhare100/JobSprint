// src/controllers/jobController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Fetch featured jobs filtered by category
export const getFeaturedJobs = async (req: Request, res: Response) => {
  const { categoryId } = req.query; 
  try {
    const featuredJobs = await prisma.job.findMany({
      where: {
        featured: true,
        ...(categoryId ? { categoryId: parseInt(categoryId as string) } : {}), // Filter by categoryId if provided
      },
      include: {
        category: true, // Include category data in the response
      },
      orderBy: {
        createdAt: 'desc', // Order by most recent
      },
    });
    console.log(featuredJobs)

    res.status(200).json(featuredJobs);
  } catch (error) {
    console.error('Error fetching featured jobs:', error);
    res.status(500).json({ error: 'Failed to fetch featured jobs' });
  }
};

// 2. Fetch all job categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc', // Sort categories alphabetically
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// 3. Mock job application
export const applyForJob = async (req: Request, res: Response) => {
  const { jobId, applicantName, applicantEmail } = req.body;

  // Simulate a job application (no actual persistence in this mock implementation)
  try {
    // In a real-world scenario, this data would be saved to a database
    console.log(`Application received for Job ID: ${jobId}`);
    console.log(`Applicant: ${applicantName}, Email: ${applicantEmail}`);

    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};
