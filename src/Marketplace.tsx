/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {initializeProject} from "../src/components/api";
import {useContractHook} from "./Context/ContractContract";
import {toast} from "sonner";
import {LoadingSpinner} from "./components/ui/LoadingSpinner";
import {ethers} from "ethers";

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

type Workbook = {
  owner: string;
  ipns: string;
  name: string;
  id: number;
  published: boolean;
};

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
  purchasedIds,
  title,
  owner,
}: {
  id: number;
  purchasedIds: any;
  title: string;
  owner: string;
}) => {
  const data = generateRandomData(); // Generate random data for each card
  const {currentAccount, contractAddress, contract} = useContractHook();
  const navigate = useNavigate();

  const approveAndSendTokens = async (id: number) => {
    if (!currentAccount) {
      alert("Please connect your wallet first");
      return;
    }

    const tokenAddress = "0x2e5221B0f855Be4ea5Cefffb8311EED0563B6e87"; // Replace with your token contract address
    const amount = ethers.utils.parseUnits("0.001", 18); // Replace with the amount you want to send
    const abi = [
      // The contract ABI, replace with your contract's ABI
      "function approve(address spender, uint256 amount) public returns (bool)",
      "function transfer(address to, uint256 amount) public returns (bool)",
    ];

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, abi, signer);

      // Approve the transfer
      const approvalTx = await tokenContract.approve(contractAddress, amount);
      toast("Approval transaction sent, waiting for confirmation...");
      await approvalTx.wait();
      toast("Approval transaction confirmed");

      // Send the tokens
      const transferTx = await contract.addId(id, {
        value: ethers.utils.parseUnits("0.001", 18),
      });
      toast("Token transfer transaction sent, waiting for confirmation...");
      await transferTx.wait();
      toast("Token transfer transaction confirmed");
    } catch (error) {
      console.error("Error approving and sending tokens", error);
      toast("Error approving and sending tokens");
    }
  };

  console.log(purchasedIds, "purchasedIds");
  return (
    <div className="h-full w-full">
      <Card className="h-full w-full">
        <CardHeader className="">
          <div className="flex justify-between w-full items-center">
            <div>
              <CardTitle>{title}</CardTitle>
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
            {!purchasedIds.includes(id) ||
              (owner.toLowerCase() === currentAccount.toLowerCase() && (
                <div className="z-10 absolute inset-0 w-full h-full flex justify-center items-center">
                  <p className="font-semibold">
                    Purchase this analysis to reveal
                  </p>
                </div>
              ))}
            <div
              className={`absolute inset-0 w-full h-full ${
                !purchasedIds.includes(id) ||
                (owner.toLowerCase() === currentAccount.toLowerCase() &&
                  "blur-sm")
              }`}
            >
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
            {purchasedIds.includes(id) ||
            owner.toLowerCase() === currentAccount.toLowerCase() ? (
              <Button
                size="sm"
                variant={"outline"}
                className="group focus-visible:ring-0"
                onClick={() => navigate(`/analysis/${id}`)}
              >
                View{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 duration-150 ease-in-out  " />
              </Button>
            ) : (
              <Button
                size="sm"
                variant={"outline"}
                className="group"
                onClick={() => approveAndSendTokens(id)}
              >
                Buy{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 duration-150 ease-in-out  " />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default function Marketplace() {
  const navigate = useNavigate();
  const {chainId, currentAccount, contract} = useContractHook();
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);

  useEffect(() => {
    if (chainId === "" && currentAccount === "") {
      navigate("/");
    }
  }, [chainId, currentAccount, navigate]);

  useEffect(() => {
    console.log("contract", contract);
    const viewAllWorkBooks = async () => {
      try {
        const result = await contract.viewAllWorkbooks();
        console.log(result, "workbooks");
        const temp: Workbook[] = [];
        result.forEach((workbook: Workbook) => {
          if (workbook) {
            temp.push({
              owner: workbook.owner,
              ipns: workbook.ipns,
              name: workbook.name,
              id: Number(workbook.id),
              published: workbook.published,
            });
          }
        });
        setWorkbooks(temp);
      } catch (error: any) {
        console.log(error);
        toast(`Error: ${error.message}`);
      }
    };
    viewAllWorkBooks();
  }, [contract]);

  const [purchasedIds, setPurchasedIds] = useState<any>([]);
  useEffect(() => {
    console.log("contract", contract);
    const getId = async () => {
      try {
        const result = await contract.viewAllIds();
        console.log(result, "workbooks");
        const newResult = result.map((item: any) => Number(item));
        setPurchasedIds(newResult);
      } catch (error: any) {
        console.log(error);
        toast(`Error: ${error.message}`);
      }
    };
    getId();
  }, [contract]);

  console.log(purchasedIds, "purchasedIds");

  const [createLoading, setCreateLoading] = useState(false);
  const handleNewAnalysis = async () => {
    setCreateLoading(true);
    try {
      const response = await initializeProject();
      console.log("response", response);
      const currentId = await contract.currentId();
      console.log(currentId, "currentId");
      if (Number(currentId)) {
        const res = await contract.addIPNS(
          `Untitled${Number(currentId)}`,
          response.ipnsName
        );
        await res.wait();
        console.log(res, "res");
        if (res) {
          navigate("/analysis/" + Number(currentId));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCreateLoading(false);
    }
  };

  console.log(workbooks, "workbooks from marketplace");

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
          <div
            className="mt-5 flex items-center justify-between gap-3 w-full px-4 h-[70px] rounded-lg border border-gray-600 group cursor-pointer"
            onClick={() => navigate("/user-analysis")}
          >
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
          All Analysis
        </div>
        <div
          className="grid h-fit w-full gap-4"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr)`,
          }}
        >
          {/* {<pre>{JSON.stringify(currentAccount, null, 2)}</pre>} */}

          {workbooks &&
            workbooks.length > 0 &&
            workbooks
              .filter((item) => item.published === true)
              .map((item, index) => (
                <ChartCard
                  key={index}
                  id={Number(item.id)}
                  purchasedIds={purchasedIds}
                  title={item.name}
                  owner={item.owner.toLowerCase()}
                />
              ))}

          {workbooks &&
            workbooks.filter((item) => item.published === true).length ===
              0 && (
              <div className="w-full h-full flex justify-center items-center text-center">
                <p className="text-lg font-semibold">No Analysis found</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
