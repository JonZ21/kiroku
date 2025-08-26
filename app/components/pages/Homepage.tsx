import RecentMatches from '../ui/RecentMatches';

export default function Homepage() {
  return (
    <div className="min-h-screen">
      <section className="h-[40vh] flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-foreground animate-fadeInUp">
            Kiroku
          </h1>
          <p className="font-sans text-lg md:text-xl text-foreground/70 mt-2">
            Super Smash Bros Match Counter
          </p>
          <div className="mt-12">
            <button className="bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform duration-200 animate-pulse-slow">
              Start Tracking
            </button>
          </div>
        </div>
      </section>

      <RecentMatches />
    </div>
  );
}