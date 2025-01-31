"use client";
import InterviewScheduleUI from "@/components/InterviewScheduleUI";
import LoaderUI from "@/components/LoaderUi";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";

function SchedulePage(){
    const router=useRouter();
    const {isInterviewer,isLoading}=useUserRole()
    if(isLoading) return <LoaderUI/>
    if(!isInterviewer) return router.push('/')


    return <div><InterviewScheduleUI/></div>
}
export default SchedulePage;