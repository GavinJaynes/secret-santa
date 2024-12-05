export interface Participant {
  id: string;
  name: string;
  email: string;
  assignedTo?: Participant;
}