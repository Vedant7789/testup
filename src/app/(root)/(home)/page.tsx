"use client"
import { QUICK_ACTIONS } from "@/constansts";
import { useUserRole } from "@/hooks/useUserRole";
import { action } from "../../../../convex/_generated/server";
import ActionCard from "@/components/ActionCard";
import { getMyInterviews } from '../../../../convex/interviews';
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUi";


export default function Home() {

  const router=useRouter();
  const {isInterviewer,isCandidate,isLoading}=useUserRole();
  const interviews=useQuery(api.interviews.getMyInterviews);

  const[showModal,setShowModal]=useState(false);
  const [modalType,setModalType]=useState<"start"|"join">();


   
  
  const handleQuickAction=(title:string)=>{
    switch(title){
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join interview":
        setModalType("join");
        setShowModal(true);
        break;

          default:
            router.push(`/${title.toLowerCase()}`);
           


    }

  };
  if (isLoading) return <LoaderUI/>;
  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="rounded-lg bg-card p-6 border shawdow-sm mb-10">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Welcome back!
        </h1>

        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>

      </div>
      {isInterviewer?(
        <>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_ACTIONS.map((action)=>(
            <ActionCard
             key={action.title}
             action={action}
             onClick={()=>handleQuickAction(action.title)}
          />))} 
          </div>
          <MeetingModal
          isOpen={showModal}
          onClose={()=>setShowModal(false)}
          title={modalType==="join"?"join meeting":"start meeting"}
          isJoinMeeting={modalType==="join"}/>
        
        </>
      ):(
        <>
        <div>candidate view</div></>
      )}
      
    </div>
  
  );
}
