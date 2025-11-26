
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BitcoinIcon, EthereumIcon, SolanaIcon, DogeIcon } from "./crypto-icons";
import { Copy } from "lucide-react";

// Wallet addresses are now fetched from environment variables
const wallets = {
  bitcoin: process.env.NEXT_PUBLIC_BITCOIN_ADDRESS || "3ESz5o1tygKGQT89AkkuXSCoXwqzjvDFYH",
  ethereum: process.env.NEXT_PUBLIC_ETHEREUM_ADDRESS || "0x1B4800790B7817DD8B795874Bc061d26B929c817",
  solana: process.env.NEXT_PUBLIC_SOLANA_ADDRESS || "8ve1dU3Ab22WtQ5sSUJChSwcGqViJ55YwNqDqxL6j8ZS",
  dogecoin: process.env.NEXT_PUBLIC_DOGECOIN_ADDRESS || "DNj6RNvdmEV8G4suC9SRtwNDFq2STmHCcT",
  shibainu: process.env.NEXT_PUBLIC_SHIBAINU_ADDRESS || "0xC8792Ca4BDaa0b350f7A0D33416Fdb919ded5016", // Shiba Inu is an ERC-20 token, so it uses an Ethereum address
};

const QRCode = ({ address }: { address: string }) => {
  if (!address) return null;
  return (
    <div className="flex items-center justify-center p-4 bg-white rounded-md">
      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`} alt="QR Code" />
    </div>
  );
};

const WalletTabContent = ({
  name,
  address,
  icon,
}: {
  name: string;
  address: string;
  icon: React.ReactNode;
}) => {
  const { toast } = useToast();

  if (!address) {
    return (
        <div className="flex flex-col items-center gap-4 text-center text-muted-foreground py-8">
            <p>The {name} wallet address has not been configured.</p>
        </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Copied to clipboard!",
      description: `${name} address copied.`,
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <QRCode address={address} />
      <div className="flex w-full items-center space-x-2">
        <Input type="text" value={address} readOnly className="text-sm" />
        <Button variant="outline" size="icon" onClick={handleCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export function SupportDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Support the Fun!</DialogTitle>
          <DialogDescription>
            If you enjoy the game, consider supporting its development. Thank you!
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="bitcoin" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bitcoin"><BitcoinIcon className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="ethereum"><EthereumIcon className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="solana"><SolanaIcon className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="dogecoin"><DogeIcon className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="shibainu">SHIB</TabsTrigger>
          </TabsList>
          <TabsContent value="bitcoin">
            <WalletTabContent name="Bitcoin" address={wallets.bitcoin} icon={<BitcoinIcon />} />
          </TabsContent>
          <TabsContent value="ethereum">
            <WalletTabContent name="Ethereum" address={wallets.ethereum} icon={<EthereumIcon />} />
          </TabsContent>
          <TabsContent value="solana">
             <WalletTabContent name="Solana" address={wallets.solana} icon={<SolanaIcon />} />
          </TabsContent>
          <TabsContent value="dogecoin">
             <WalletTabContent name="Dogecoin" address={wallets.dogecoin} icon={<DogeIcon />} />
          </TabsContent>
          <TabsContent value="shibainu">
             <WalletTabContent name="Shiba Inu (ERC-20)" address={wallets.shibainu} icon={<span>SHIB</span>} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
