interface EventData {
    eventDate: string; // Timestamp with time
    location: string;
    guests: Guest[]
    photos: Photo[];
    photosByGuests: Photo[];
    type: EventType;
}

interface Guest {
    id: string;
    name: string;
    phone: string;
    visitResponse: VisitResponse;
}

interface VisitResponse {
    id: string;
    guestId: string; // Guest ID
    response: "confirmed" | "declined" | "maybe";
    message: string;
}

interface Photo {
    id: string;
    url: string;
}

type EventType = "wedding" | "birthday" | "anniversary" | "kyz-uzatuu";
