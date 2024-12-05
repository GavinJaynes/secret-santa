import { Participant } from '../types/participant';

export function matchParticipants(participants: Participant[]): Participant[] {
  if (participants.length < 2) return participants;

  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  
  return shuffled.map((participant, index) => ({
    ...participant,
    assignedTo: shuffled[(index + 1) % shuffled.length]
  }));
}