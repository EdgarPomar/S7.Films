import { useEffect, useRef } from 'react';

export default function CinemaAmbience() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // ✅ volumen aquí

      const playAudio = () => {
        audio.play().catch(() => {});
        document.removeEventListener('click', playAudio);
      };
      document.addEventListener('click', playAudio);
    }
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/cinema-ambience.mp3" type="audio/mpeg" />
    </audio>
  );
}
