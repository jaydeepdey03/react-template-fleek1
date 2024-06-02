import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChartBig,
  Briefcase,
  LayoutDashboard,
  Pencil,
} from "lucide-react";
import {Button} from "./components/ui/button";
import {Line, LineChart, ResponsiveContainer} from "recharts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useContractHook} from "./Context/ContractContract";
import {initializeProject} from "./components/api";
import {LoadingSpinner} from "./components/ui/LoadingSpinner";

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

const ChartCard = ({
  id,
  title,
  owner,
}: {
  id: number;
  title: string;
  owner: string;
}) => {
  const data = generateRandomData(); // Generate random data for each card
  const navigate = useNavigate();
  return (
    <div className="h-full w-full">
      <Card className="h-full w-full">
        <CardHeader className="">
          <div className="flex justify-between w-full items-center">
            <div>
              <CardTitle>
                <p className="text-lg font-semibold">{title}</p>
              </CardTitle>
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
            {/* <div className="z-10 absolute inset-0 w-full h-full flex justify-center items-center">
              <p className="font-semibold">Purchase this analysis to reveal</p>
            </div> */}
            <div className="absolute inset-0 w-full h-full">
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
            <div className="flex flex-col items-start">
              <p className="text-sm">Author</p>
              <p className="text-sm font-semibold">
                {owner.slice(0, 6) + "..." + owner.slice(owner.length - 4)}
              </p>
            </div>
            <Button
              size="sm"
              variant={"outline"}
              className="group"
              onClick={() => navigate(`/analysis/${id}`)}
            >
              View{" "}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 duration-150 ease-in-out  " />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

interface Workbook {
  id: number;
  owner: string;
  ipns: string;
  name: string;
}

export default function UserAnalysis() {
  const navigate = useNavigate();
  const {chainId, currentAccount, contract} = useContractHook();
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);

  useEffect(() => {
    const viewMyWorkbooks = async () => {
      try {
        if (contract) {
          const workbooks = await contract.viewMyWorkbooks();
          setWorkbooks(workbooks);
        }
      } catch (error) {
        console.log(error);
      }
    };
    viewMyWorkbooks();
  }, [contract]);

  useEffect(() => {
    if (chainId === "" && currentAccount === "") {
      navigate("/");
    }
  }, [chainId, currentAccount, navigate]);

  const [createLoading, setCreateLoading] = useState(false);
  const handleNewAnalysis = async () => {
    setCreateLoading(true);
    try {
      const response = await initializeProject();
      console.log("response", response);
      const res = await contract.addIPNS("test", response.ipnsName);
      await res.wait();
      console.log(res, "res");
      if (res) {
        navigate("/analysis/" + Number(res.id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCreateLoading(false);
    }
  };

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
          <div
            className="mt-5 flex items-center justify-between gap-3 w-full px-4 h-[70px] rounded-lg border border-gray-600 group cursor-pointer"
            onClick={() => navigate("/marketplace")}
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard />
              <p className="text-lg font-semibold">Marketplace</p>
            </div>
            <ArrowRight className="group-hover:translate-x-1 duration-150 ease-in-out" />
          </div>
          <div
            className="mt-5 flex items-center justify-between gap-3 w-full px-4 h-[70px] rounded-lg border border-gray-600 group cursor-pointer"
            onClick={() => handleNewAnalysis()}
          >
            <div className="flex items-center gap-2">
              <Pencil />
              <p className="text-lg font-semibold">Create New Analysis</p>
            </div>
            {createLoading ? (
              <LoadingSpinner />
            ) : (
              <ArrowRight className="group-hover:translate-x-1 duration-150 ease-in-out" />
            )}
          </div>
          <div className="mt-5 flex items-center justify-between gap-3 w-full px-4 h-[70px] rounded-lg border border-gray-600 group cursor-pointer">
            <div className="flex items-center gap-2">
              <BarChartBig />
              <p className="text-lg font-semibold">Your Analysis</p>
            </div>
            <ArrowRight className="group-hover:translate-x-1 duration-150 ease-in-out" />
          </div>
          <div
            className="mt-5 flex items-center justify-between gap-3 w-full px-4 h-[70px] rounded-lg border border-gray-600 group cursor-pointer"
            onClick={() => navigate("/purchased-analysis")}
          >
            <div className="flex items-center gap-2">
              <Briefcase />
              <p className="text-lg font-semibold">Your Purchased Analysis</p>
            </div>
            <ArrowRight className="group-hover:translate-x-1 duration-150 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="h-full w-full p-5">
        <div className="pb-5 text-lg font-semibold text-gray-800">
          Your Analysis ({workbooks.length})
        </div>
        <div
          className="grid h-fit w-full gap-4"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr)`,
          }}
        >
          {workbooks.map((value, index) => (
            <ChartCard
              key={index}
              id={value.id}
              title={value.name}
              owner={value.owner.toLowerCase()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
