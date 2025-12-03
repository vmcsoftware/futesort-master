import { Trophy } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative py-8 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Trophy className="w-10 h-10 text-secondary animate-float" />
          <h1 className="font-display text-4xl md:text-6xl tracking-wider text-gradient-gold">
            SORTEIO DE CAMPEONATOS
          </h1>
          <Trophy className="w-10 h-10 text-secondary animate-float" style={{ animationDelay: '0.5s' }} />
        </div>
        <p className="text-muted-foreground text-lg">
          Simule sorteios de Copa do Mundo, Libertadores, Brasileirão e mais
        </p>
      </div>
      
      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
    </header>
  );
};
