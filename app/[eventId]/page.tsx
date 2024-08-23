import React from "react";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getEventById } from "@/actions/events.actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
interface EventPageProps {
  params: { eventId: string };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">{event.name}</h1>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ImageCarousel images={event.imageUrls} />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              About this event
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {event.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant={event.isPaid ? "destructive" : "secondary"}>
              {event.isPaid ? "Paid" : "Free"}
            </Badge>
            <Badge variant={event.isOnline ? "default" : "outline"}>
              {event.isOnline ? "Online" : "In-person"}
            </Badge>
            {event.isPrivate && <Badge variant="secondary">Private</Badge>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{format(event.eventDate, "MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{event.eventTime}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{event.venue}</span>
            </div>
            {event.guest && (
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>{event.guest}</span>
              </div>
            )}
          </div>

          

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Created: {format(event.createdAt, "MMMM d, yyyy")}</p>
            <p>Last updated: {format(event.updatedAt, "MMMM d, yyyy")}</p>
          </div>
          
          <Dialog>
      <DialogTrigger asChild>
      <Button>See Banner</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Event Banner</DialogTitle>
        </DialogHeader>
        <img src={event.banner} alt={event.name} className="rounded-lg"/>
        
      </DialogContent>
    </Dialog>
        </div>
      </div>
    </div>
  );
}
