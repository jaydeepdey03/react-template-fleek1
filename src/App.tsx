import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Analysis from "./Analysis";
import Marketplace from "./Marketplace";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {useContractHook} from "./Context/ContractContract";
import {Button} from "./components/ui/button";

function App() {
  const [open, setOpen] = useState(false);
  const {chainId, switchNetwork} = useContractHook();
  console.log(chainId, "chainId");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (chainId !== "" && chainId !== "0xaa36a7" && mounted) {
      setOpen(true);
    }
  }, [chainId, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Switch Network</DialogTitle>

            <DialogDescription className="h-[100px] flex justify-center items-center">
              <Button
                onClick={() => switchNetwork("0xaa36a7")}
                className="focus-visible:ring-0 w-full"
                variant={"outline"}
                size={"lg"}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/768px-Ethereum-icon-purple.svg.png"
                  alt="sepolia"
                  className="mr-2 h-6 w-6"
                />{" "}
                Switch to Sepolia
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/analysis/:id" element={<Analysis />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
