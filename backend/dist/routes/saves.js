"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Middleware to ensure user is authenticated for all routes in this file
router.use(auth_1.authenticate);
// Get saved colleges for the authenticated user
router.get('/', async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const savedItems = await db_1.prisma.savedCollege.findMany({
            where: { userId },
            include: {
                college: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(savedItems.map(item => item.college));
    }
    catch (error) {
        console.error('Error fetching saved colleges:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Save a college
router.post('/', async (req, res) => {
    try {
        const userId = req.userId;
        const { collegeId } = req.body;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!collegeId) {
            return res.status(400).json({ error: 'College ID is required' });
        }
        // Check if college exists
        const collegeExists = await db_1.prisma.college.findUnique({ where: { id: collegeId } });
        if (!collegeExists) {
            return res.status(404).json({ error: 'College not found' });
        }
        // Create the saved item (will fail if already exists due to unique constraint, but we can handle it gracefully)
        const existingSave = await db_1.prisma.savedCollege.findUnique({
            where: {
                userId_collegeId: {
                    userId,
                    collegeId
                }
            }
        });
        if (existingSave) {
            return res.status(400).json({ error: 'College is already saved' });
        }
        const saved = await db_1.prisma.savedCollege.create({
            data: {
                userId,
                collegeId
            }
        });
        res.status(201).json({ message: 'College saved successfully', saved });
    }
    catch (error) {
        console.error('Error saving college:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Unsave a college
router.delete('/:collegeId', async (req, res) => {
    try {
        const userId = req.userId;
        const collegeId = req.params.collegeId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await db_1.prisma.savedCollege.delete({
            where: {
                userId_collegeId: {
                    userId,
                    collegeId
                }
            }
        });
        res.json({ message: 'College removed from saved list' });
    }
    catch (error) {
        // If it doesn't exist, prisma throws an error, we can just return success or generic error
        console.error('Error removing saved college:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
