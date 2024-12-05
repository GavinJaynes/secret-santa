import { Trash2 } from "lucide-react";
import { Participant } from "@/types/participant";
import { Button } from "@/components/ui/button";

interface ParticipantListProps {
  participants: Participant[];
  onRemove: (id: string) => void;
}

export function ParticipantList({
  participants,
  onRemove,
}: ParticipantListProps) {
  if (participants.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No participants added yet
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {participants.map((participant) => (
        <li
          key={participant.id}
          className="py-4 flex justify-between items-center"
        >
          <div>
            <p className="text-sm font-medium text-gray-900">
              {participant.name}
            </p>
            <p className="text-sm text-gray-500">{participant.email}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(participant.id)}
            className="text-christmas-red hover:text-christmas-red/90 hover:bg-christmas-red/10"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </li>
      ))}
    </ul>
  );
}
