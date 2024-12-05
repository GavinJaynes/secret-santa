import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Participant } from "@/types/participant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ParticipantFormProps {
  onAdd: (participant: Participant) => void;
}

export function ParticipantForm({ onAdd }: ParticipantFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
    });

    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Participant
      </Button>
    </form>
  );
}
