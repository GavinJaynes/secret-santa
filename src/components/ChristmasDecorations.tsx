import { Snowflake } from "lucide-react";

export function ChristmasDecorations() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Snowflake
            key={i}
            className="absolute text-gray-200 animate-snow-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>
    </>
  );
}
