"use client";

import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Edit, Trash2 } from 'lucide-react';
import { eventModel } from '@/types/event.type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteEvent } from '@/actions/events.actions';
import { useToast } from "@/components/ui/use-toast";

interface EventCardProps {
  event: eventModel;
  onDelete?: (id: string) => void;
}

export default function EventCard({ event, onDelete }: EventCardProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const deleted = await deleteEvent(event.id);
        if (deleted) {
          toast({
            title: "Success",
            description: `Event "${event.name}" has been deleted.`,
          });
          if (onDelete) {
            onDelete(event.id);
          } else {
          
            router.refresh();
          }
        } else {
          toast({
            title: "Info",
            description: "The event no longer exists or has already been deleted.",
          });
          if (onDelete) {
            onDelete(event.id);
          } else {
       
            router.refresh();
          }
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        toast({
          title: "Error",
          description: "Failed to delete event. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-lg dark:bg-gray-800">
      <CardHeader className="p-0">
        <img
          src={event.banner}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">{event.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={event.isPaid ? 'bg-red-500' : 'bg-green-500'}>
            {event.isPaid ? "Paid" : "Free"}
          </Badge>
          <Badge variant={event.isOnline ? "default" : "outline"}>
            {event.isOnline ? "Online" : "In-person"}
          </Badge>
          {event.isPrivate && <Badge variant="secondary">Private</Badge>}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{format(new Date(event.eventDate), 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.eventTime}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.venue}</span>
          </div>
          {event.guest && (
            <div className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-2" />
              <span>{event.guest}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 dark:bg-gray-700 flex flex-col sm:flex-row gap-2">
        <Link href={event.id} className="w-full sm:w-auto">
          <Button className="w-full">View Details</Button>
        </Link>
        <Link href={`/edit-event/${event.id}`} className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="w-full"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Event
          </Button>
        </Link>
        <Button
          variant="destructive"
          className="w-full sm:w-auto"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}