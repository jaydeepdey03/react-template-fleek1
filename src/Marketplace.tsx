import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {ArrowRight, Home, LayoutDashboard} from "lucide-react";
import {Button} from "./components/ui/button";
import {Line, LineChart, ResponsiveContainer} from "recharts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useContractHook} from "./Context/ContractContract";

// const data = [
//   {
//     average: 400,
//     today: 240,
//   },
//   {
//     average: 300,
//     today: 139,
//   },
//   {
//     average: 200,
//     today: 980,
//   },
//   {
//     average: 278,
//     today: 390,
//   },
//   {
//     average: 189,
//     today: 480,
//   },
//   {
//     average: 239,
//     today: 380,
//   },
//   {
//     average: 349,
//     today: 430,
//   },
// ];

const generateRandomData = () => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    data.push({
      average: Math.floor(Math.random() * 500), // Random value between 0 and 500
      today: Math.floor(Math.random() * 500), // Random value between 0 and 1000
    });
  }
  return data;
};

const ChartCard = () => {
  const data = generateRandomData(); // Generate random data for each card
  const navigate = useNavigate();
  const {chainId, currentAccount} = useContractHook();
  useEffect(() => {
    if (chainId === "" && currentAccount === "") {
      navigate("/");
    }
  }, [chainId, currentAccount, navigate]);
  return (
    <div className="h-full w-full">
      <Card className="h-full w-full">
        <CardHeader className="">
          <div className="flex justify-between w-full items-center">
            <div>
              <CardTitle>Analysis Title</CardTitle>
              <CardDescription>Analysis Description</CardDescription>
            </div>
            <div className="flex">
              <Avatar className="h-8 w-8 -ml-4 first:ml-0">
                <AvatarImage src="/usdc.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 -ml-4">
                <AvatarImage src="/dai.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 -ml-4">
                <AvatarImage src="/eth.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[150px] relative">
            <div className="z-10 absolute inset-0 w-full h-full flex justify-center items-center">
              <p className="font-semibold">Purchase this analysis to reveal</p>
            </div>
            <div className="absolute inset-0 w-full h-full blur-sm">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <Line type="monotone" dataKey="average" />
                  <Line type="monotone" dataKey="today" aria-disabled />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm">Author</p>
            <Button size="sm" variant={"outline"} className="group">
              Buy{" "}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 duration-150 ease-in-out  " />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default function Marketplace() {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      <div className="min-w-[350px] bg-black h-full p-5 flex flex-col items-center gap-7">
        <div className="flex flex-col items-center gap-7 mt-10">
          <img src="/loom.png" alt="loom" className="h-20 w-20" />
          <p className="text-3xl font-bold text-white text-center font-Poppins tracking-wider">
            LoomHub Marketplace
          </p>
        </div>

        <div className="w-full h-full flex flex-col text-white">
          <div className="mt-5 flex items-center justify-between gap-3 w-full px-4 h-[70px] rounded-lg border border-gray-600 group">
            <div className="flex items-center gap-2">
              <Home />
              <p className="text-lg font-semibold">Home</p>
            </div>
            <ArrowRight className="group-hover:translate-x-1 duration-150 ease-in-out" />
          </div>
          <div className="mt-5 flex items-center justify-between gap-3 w-full px-4 h-[70px] rounded-lg border border-gray-600 group">
            <div className="flex items-center gap-2">
              <LayoutDashboard />
              <p className="text-lg font-semibold">Marketplace</p>
            </div>
            <ArrowRight className="group-hover:translate-x-1 duration-150 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="h-full w-full p-5">
        <div className="pb-5 text-lg font-semibold text-gray-800">
          All Analysis
        </div>
        <div
          className="grid h-fit w-full gap-4"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr)`,
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <ChartCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
