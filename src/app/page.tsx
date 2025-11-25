"use client";

import FallingCrypto from '@/components/falling-crypto';
import SignupForm from '@/components/signup-form';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-8 text-center">
      <FallingCrypto />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-primary animate-fade-in-down">
          Crypto Lotto Fun
        </h1>
        <p className="mt-4 font-headline text-2xl md:text-3xl text-foreground/80 animate-fade-in-down animation-delay-300">
          Coming Soon
        </p>
        <div className="mt-12 w-full max-w-md animate-fade-in-up animation-delay-700">
          <SignupForm />
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        h1, p {
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .w-full {
            opacity: 0;
            animation-fill-mode: forwards;
        }
      `}</style>
    </main>
  );
}
