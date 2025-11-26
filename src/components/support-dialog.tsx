
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

// NOTE: Replace with your actual wallet addresses
const wallets = {
  bitcoin: "bc1q...",
  ethereum: "0x...",
  solana: "SoL...",
  dogecoin: "Doge...",
  shibainu: "0x...", // Shiba Inu is an ERC-20 token, so it uses an Ethereum address
};

const QRCode = ({ address }: { address: string }) => {
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
