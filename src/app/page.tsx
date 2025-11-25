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
        <p className="mt-8 max-w-2xl font-body text-lg md:text-xl text-foreground/60 leading-relaxed animate-fade-in-up animation-delay-500">
          Get ready for the most thrilling cryptocurrency lottery experience! Win big with your favorite coins in a provably fair and transparent gaming environment. We're putting the finishing touches on our platform. Sign up below to be the first to know when we go live!
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
