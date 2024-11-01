"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Event } from "@/types/event.type";

export async function getEvents() {
  try {
    const events = await prisma.event.findMany()
    return events
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function getEventById(id: string) {
    try {
      const event = await prisma.event.findUnique({ where: { id } }) 
      return event
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  }

export async function createEvent(data: Omit<Event, 'id'>) {
    try {
      const createdEvent = await prisma.event.create({ data });
      revalidatePath('/')
      return createdEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  export async function updateEvent(id: string, data: any) {
    try {
      const updatedEvent = await prisma.event.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          venue: data.venue,
          isPaid: data.isPaid,
          isOnline: data.isOnline,
          guest: data.guest,
          eventDate: data.eventDate,
          eventTime: data.eventTime,
          banner: data.banner,
          imageUrls: data.imageUrls,
          isPrivate: data.isPrivate,
        },
      });

      revalidatePath('/');
      return updatedEvent;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }
  
  export async function deleteEvent(id: string): Promise<boolean> {
    try {
      const event = await prisma.event.findUnique({ where: { id } });
      if (!event) {
        return false; 
      }
      await prisma.event.delete({ where: { id } });
      revalidatePath('/');
      return true;
    } catch (err) {
      console.error('Error deleting event:', err);
      return false; 
    }
  }