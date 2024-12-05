import { useState } from "react";
import { Gift, CandyCane } from "lucide-react";
import { Participant } from "@/types/participant";
import { ParticipantForm } from "@/components/ParticipantForm";
import { ParticipantList } from "@/components/ParticipantList";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ChristmasDecorations } from "@/components/ChristmasDecorations";
import { matchParticipants } from "@/utils/secretSantaMatch";
import { sendSecretSantaEmail } from "@/services/emailService";
import { Button } from "@/components/ui/button";
import { GiftValueSetting } from "@/components/GiftValueSettings";

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [globalGiftValue, setGlobalGiftValue] = useState("20");

  const handleAddParticipant = (participant: Participant) => {
    setParticipants([...participants, participant]);
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const handleAssignSecretSanta = async () => {
    if (participants.length < 2) {
      setError(
        "You need at least 2 participants to spread the Christmas cheer!"
      );
      return;
    }

    setIsAssigning(true);
    setError(null);

    try {
      const matched = matchParticipants(participants);
      await Promise.all(
        matched.map((participant) =>
          sendSecretSantaEmail(participant, participant.assignedTo!)
        )
      );

      setParticipants(matched);
      alert(
        "Ho ho ho! Secret Santa assignments have been made and emails have been sent! 🎄"
      );
    } catch (err) {
      setError("Oh no! The elves encountered an error. Please try again.");
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-christmas-red/20 to-christmas-green/10">
      <ChristmasDecorations />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-4">
            <CandyCane className="w-10 h-10 text-christmas-red" />
            <Gift className="w-12 h-12 text-christmas-green" />
            <CandyCane className="w-10 h-10 text-christmas-red transform scale-x-[-1]" />
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-christmas-green sm:text-5xl">
            Secret Santa
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            ✨ Spread the Christmas cheer! 🎄
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 space-y-8 border border-gray-200">
          {error && (
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          )}

          <GiftValueSetting
            value={globalGiftValue}
            onChange={setGlobalGiftValue}
          />

          <ParticipantForm onAdd={handleAddParticipant} />

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-christmas-green mb-4">
              Santa's List ({participants.length})
            </h2>
            <ParticipantList
              participants={participants}
              onRemove={handleRemoveParticipant}
            />
          </div>

          {participants.length >= 2 && (
            <div className="text-center">
              <Button
                onClick={handleAssignSecretSanta}
                disabled={isAssigning}
                size="lg"
                className="font-semibold"
              >
                {isAssigning
                  ? "The elves are working..."
                  : "Assign Secret Santa 🎅"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
