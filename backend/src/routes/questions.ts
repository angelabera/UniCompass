import { Router } from 'express';
import { prisma } from '../db';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        college: {
          select: {
            id: true,
            name: true
          }
        },
        answers: {
          orderBy: { createdAt: 'asc' },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;
    const { content, collegeId } = req.body;
    const trimmedContent = typeof content === 'string' ? content.trim() : '';

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!trimmedContent) {
      return res.status(400).json({ error: 'Question content is required' });
    }

    if (collegeId) {
      const college = await prisma.college.findUnique({ where: { id: collegeId } });
      if (!college) {
        return res.status(404).json({ error: 'College not found' });
      }
    }

    const question = await prisma.question.create({
      data: {
        content: trimmedContent,
        userId,
        collegeId: collegeId || null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        college: {
          select: {
            id: true,
            name: true
          }
        },
        answers: true
      }
    });

    res.status(201).json(question);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:questionId/answers', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;
    const questionId = req.params.questionId as string;
    const { content } = req.body;
    const trimmedContent = typeof content === 'string' ? content.trim() : '';

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!trimmedContent) {
      return res.status(400).json({ error: 'Answer content is required' });
    }

    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const answer = await prisma.answer.create({
      data: {
        content: trimmedContent,
        userId,
        questionId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(answer);
  } catch (error) {
    console.error('Error creating answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
