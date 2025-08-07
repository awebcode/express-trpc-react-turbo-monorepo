import { ArrowRight } from "lucide-react";
import "./App.css";
import { Button } from "@repo/ui/components/button";
import { trpc } from "./utils/trpc";
function App() {
  const { data } = trpc.auth.helloGet.useQuery();

  return (
    <div className="container mx-auto px-4 flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-6xl my-4">Hello world</h1>
      <Button variant={"outline"} size={"lg"}>
        Click Me {data?.name}
        <ArrowRight />
      </Button>
    </div>
  );
}

export default App;
