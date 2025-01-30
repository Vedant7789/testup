import Link from "next/link";
import { Button } from "./button";
import { SparklesIcon } from "lucide-react";

function DashboardBtn(){
    const isCandidate=false;
    const isInterviewer=true;
    if (isCandidate) return null;

    return(
        <Link href={"/dashboard"}>
         <Button className="gap-2 font-medium" size={"sm"}>
            <SparklesIcon className="size-4"/>
            Dashboard
            </Button>   
        </Link>
    )

}

export default DashboardBtn;