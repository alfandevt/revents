export type Attendee = {
  id: string;
  name: string;
  photoURL: string;
};

export type AppEvent = {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  venue: string;
  hostedBy: string;
  hostPhotoURL: string;
  attendees: Attendee[];
};
