-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "isOnline" BOOLEAN NOT NULL,
    "guest" TEXT,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "imageUrls" TEXT[],
    "isPrivate" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
