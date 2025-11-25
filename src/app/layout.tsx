import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'CryptoLotto.fun – Play & Win with Blockchain Lottery | Bitcoin, Ethereum, Solana Lottery',
  description: 'CryptoLotto.fun is a next-generation blockchain lottery platform where you play, win, and own your tickets on-chain. Buy crypto lottery tickets using Bitcoin, Ethereum, Solana, and USDT. Fair, transparent, provably verifiable draws.',
  keywords: ['crypto lottery', 'blockchain lottery', 'bitcoin lottery', 'ethereum lottery', 'solana lottery', 'decentralized lottery', 'web3 lottery', 'crypto lotto', 'NFT lottery ticket', 'provably fair lottery', 'online crypto lottery', 'win crypto prizes']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
