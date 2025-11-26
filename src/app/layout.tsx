import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'CryptoLotto.fun – Play & Win with Blockchain Lottery | Bitcoin, Ethereum, Solana Lottery',
  description: 'CryptoLotto.fun is a next-generation blockchain lottery platform where you play, win, and own your tickets on-chain. Buy crypto lottery tickets using Bitcoin, Ethereum, Solana, and USDT. Fair, transparent, provably verifiable draws.',
  keywords: ['crypto lottery', 'blockchain lottery', 'bitcoin lottery', 'ethereum lottery', 'solana lottery', 'decentralized lottery', 'web3 lottery', 'crypto lotto', 'NFT lottery ticket', 'provably fair lottery', 'online crypto lottery', 'win crypto prizes'],
  openGraph: {
    title: 'CryptoLotto.fun – Blockchain Lottery Platform',
    description: 'Play, collect, and win in a decentralized blockchain lottery using Bitcoin, Ethereum, and Solana. Transparent & verifiable draws.',
    type: 'website',
    url: 'https://cryptolotto.fun',
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://cryptolotto.fun",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤑</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "CryptoLotto.fun",
              "url": "https://cryptolotto.fun",
              "description": "A decentralized blockchain-based lottery platform for Bitcoin, Ethereum and Solana users.",
              "keywords": [
                "crypto lottery",
                "blockchain lottery",
                "bitcoin lottery",
                "solana lottery",
                "ethereum lottery",
                "web3 gaming",
                "decentralized lottery"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
