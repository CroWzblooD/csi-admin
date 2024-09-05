import React from 'react';
import { EditEventForm } from '@/components/EditEvent/EditEventForm';
import { getEventById } from '@/actions/events.actions';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id);
  
  if (!event) {
    return <div>Event not found</div>;
  }

  return <EditEventForm event={event} />;
}