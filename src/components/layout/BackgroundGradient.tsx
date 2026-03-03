import { memo } from 'react';

const BackgroundGradient = memo(() => {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: `linear-gradient(to bottom right, 
          rgb(22 22 22) 40%, 
          rgb(15 118 110) 55%, 
          rgb(17 94 89) 70%, 
          rgb(154 52 18) 90%, 
          rgb(127 29 29) 100%)`,
      }}
    >
      {/* Grainy texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  );
});

BackgroundGradient.displayName = 'BackgroundGradient';

export default BackgroundGradient;
