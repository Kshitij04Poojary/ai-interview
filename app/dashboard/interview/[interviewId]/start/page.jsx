"use client"
import React, { act, useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { MockInterview } from '@/utils/schema'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const StartInterview = ({params}) => {

    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
    useEffect(()=>{
        GetInterviewDetails();
    },[])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId))
        
        const jsonMockResp=JSON.parse(result[0].jsonMockResp)
        setMockInterviewQuestion(jsonMockResp)
        setInterviewData(result[0]);
    }
  return (
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <QuestionsSection 
        activeQuestionIndex={activeQuestionIndex}
        mockInterviewQuestion={mockInterviewQuestion}/>

        <RecordAnswerSection
        activeQuestionIndex={activeQuestionIndex}
        mockInterviewQuestion={mockInterviewQuestion}
        interviewData={interviewData}/>
    </div>
    <div className='flex justify-end gap-6'>
        {activeQuestionIndex>0 &&
         <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>
        }
        {activeQuestionIndex!=mockInterviewQuestion?.length-1 &&
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>
        }
        {activeQuestionIndex==mockInterviewQuestion?.length-1 
        && 
        <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
            <Button>End Interview</Button>
        </Link>
        }
    </div>
    </div>
  )
}

export default StartInterview