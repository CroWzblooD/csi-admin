import { PrismaClient } from '@prisma/client';
import { eventModel } from '@/types/event.type';

const prisma = new PrismaClient();

export async function getEventById(id: string): Promise<eventModel | null> {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    return event;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}