import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { eventModel } from '@/types/event.type';

import Link from 'next/link';

export default function EventCard ({ event }:{
    event:eventModel
})  {
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
          <Badge className={event.isPaid ?'bg-red-500':'bg-green-500'}>
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
            <span>{format(event.eventDate, 'MMMM d, yyyy')}</span>
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
      <CardFooter className="p-4  bg-gray-50 dark:bg-gray-700">
      <Link href={event.id}>
      <Button className="w-full">View Details</Button>
      </Link>
        
      </CardFooter>
    </Card>
  );
};
