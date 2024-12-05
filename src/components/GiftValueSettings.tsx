import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GiftValueSettingProps {
  value: string;
  onChange: (value: string) => void;
}

export function GiftValueSetting({ value, onChange }: GiftValueSettingProps) {
  return (
    <div className="mb-8 p-4 bg-christmas-green/5 rounded-lg border border-christmas-green/20">
      <Label
        htmlFor="globalGiftValue"
        className="text-christmas-green font-semibold"
      >
        Suggested Gift Value for All Participants ($)
      </Label>
      <Input
        type="number"
        id="globalGiftValue"
        min="1"
        step="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2"
        required
      />
    </div>
  );
}
