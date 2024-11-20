import { CountdownItem } from "@/components/CountdownItem";
import { useCountdown } from "@/hooks/useCountdown";

export function Hero() {
  const countdown = useCountdown("2024-12-05T16:39:00");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 select-none">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mb-16" style={{ marginTop: '8rem' }}>
        
        <CountdownItem value={countdown.days} label="Days" />
        <CountdownItem value={countdown.hours} label="Hours" />
        <CountdownItem value={countdown.minutes} label="Minutes" />
        <CountdownItem value={countdown.seconds} label="Seconds" />
      </div>
    </section>
  );
}
