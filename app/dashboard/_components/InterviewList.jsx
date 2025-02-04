"use client"
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import React , {useState,useEffect} from 'react'
import { eq,desc } from 'drizzle-orm';
import { db } from '@/utils/db';
import InterviewItemCard from './InterviewItemCard';

const InterviewList = () => {
    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);
    useEffect(()=>{
        user && GetInterviewList();
    },[user])

    const GetInterviewList=async()=>{
        const result=await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id))

        console.log(result);
        setInterviewList(result);
    }
  return (
    <div>
        <h2 className='text-xl font-medium'>Previous Mock Interview</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {interviewList&& interviewList.map((interview,index)=>(
                <InterviewItemCard 
                interview={interview}
                key={index}/>
            ))}
        </div>
    </div>
  )
}

export default InterviewList