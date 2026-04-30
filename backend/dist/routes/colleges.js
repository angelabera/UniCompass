"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
// GET /colleges (with search, filter, pagination)
router.get('/', async (req, res) => {
    try {
        const { search, location, maxFees, type, page = '1', limit = '10' } = req.query;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const whereClause = {};
        if (search) {
            whereClause.name = {
                contains: search
            };
        }
        if (location) {
            whereClause.location = {
                contains: location
            };
        }
        if (maxFees) {
            whereClause.fees = {
                lte: parseFloat(maxFees)
            };
        }
        if (type && type !== 'All Types') {
            whereClause.type = type;
        }
        const colleges = await db_1.prisma.college.findMany({
            where: whereClause,
            skip,
            take: limitNumber,
            include: {
                courses: true,
            }
        });
        const totalCount = await db_1.prisma.college.count({ where: whereClause });
        res.json({
            data: colleges,
            meta: {
                total: totalCount,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(totalCount / limitNumber)
            }
        });
    }
    catch (error) {
        console.error('Error fetching colleges:', error);
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        res.status(500).json({ error: 'Internal server error', details: errorMessage });
    }
});
// GET /colleges/compare (needs to be above /:id to not be treated as an id)
router.get('/compare', async (req, res) => {
    try {
        const { ids } = req.query;
        if (!ids || typeof ids !== 'string') {
            return res.status(400).json({ error: 'Please provide a comma-separated list of college IDs' });
        }
        const idArray = ids.split(',').map(id => id.trim());
        if (idArray.length < 2 || idArray.length > 4) {
            return res.status(400).json({ error: 'Please provide between 2 and 4 college IDs for comparison' });
        }
        const colleges = await db_1.prisma.college.findMany({
            where: {
                id: { in: idArray }
            },
            include: {
                courses: true,
                placements: true
            }
        });
        res.json(colleges);
    }
    catch (error) {
        console.error('Error comparing colleges:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// GET /colleges/:id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const college = await db_1.prisma.college.findUnique({
            where: { id },
            include: {
                courses: true,
                placements: {
                    orderBy: { year: 'desc' }
                }
            }
        });
        if (!college) {
            return res.status(404).json({ error: 'College not found' });
        }
        res.json(college);
    }
    catch (error) {
        console.error('Error fetching college details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
