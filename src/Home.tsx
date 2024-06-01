import {Button} from "./components/ui/button";
import {useContractHook} from "./Context/ContractContract";

export default function Home() {
  const {connectWallet} = useContractHook();
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen h-screen">
      <div className="hidden bg-muted lg:block">
        {/* <Image
        src="/placeholder.svg"
        alt="Image"
        width="1920"
        height="1080"
        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      /> */}
        <div className="w-full h-full flex justify-center pl-28 flex-col gap-4 items-center bg-hero-pattern text-white relative">
          <div className="flex flex-col gap-5">
            <p className="text-6xl font-bold">Data Hub.</p>
            <p className="text-6xl font-bold">for all your Crypto Analysis.</p>

            <div className="flex gap-3 items-center text-3xl">
              <p className="font-bold">Powered By Powerloom</p>
              <img src="/powerloom.png" alt="livepeer" className="h-16 w-16" />
            </div>
            {/* 
            <div className="bottom-7 left-1/4 flex gap-3 absolute items-center text-sm font-semibold">
              <img
                src="https://assets-global.website-files.com/6364e65656ab107e465325d2/637aede94d31498505bc9412_DpYIEpePqjDcHIbux04cOKhrRwBhi7F0-dBF_JCdCYY.png"
                alt="farcaster"
                className="w-7 aspect-square"
              />
              <p className="tracking-wide">Powered by Farcaster Network.</p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="mx-auto grid w-[450px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Get Started.</h1>
            {/* <p className="text-balance text-muted-foreground">
              Connect to Farcaster Network
            </p> */}
          </div>
          <div className="grid gap-4">
            <Button variant="outline" onClick={connectWallet}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
                alt="farcaster"
                className="w-5 aspect-square"
              />{" "}
              <span className="ml-2">Login with Metmask</span>
            </Button>
          </div>
          {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div> */}
        </div>
      </div>
    </div>
  );
}
