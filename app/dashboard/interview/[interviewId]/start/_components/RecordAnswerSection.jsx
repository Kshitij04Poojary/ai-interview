"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import moment from 'moment'

const RecordAnswerSection = ({activeQuestionIndex,mockInterviewQuestion,interviewData}) => {
    const [userAnswer, setUserAnswer] = useState('');
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });
    useEffect(() => {
        results?.map((result) => (
            setUserAnswer(prevAns => prevAns + result?.transcript)
        ))
    },[results])

    useEffect(()=>{
        if(!isRecording && userAnswer?.length>10)
        {
            UpdateUserAnswer();
        }
    },[userAnswer]);

    const StartStopRecording=async()=>{
        if(isRecording)
        {
            stopSpeechToText()
        }
        else
        {
            startSpeechToText()
        }
    }

    const UpdateUserAnswer=async()=>{
        setLoading(true);
        const feedbackPrompt="Question: "+mockInterviewQuestion[activeQuestionIndex]?.question+
            ", User Answer: "+userAnswer+", Depending on question and user answer for given interview question"+
            "please give us rating for answer and feedback as area of improvement in just 3 to 5 lines to improve it in JSON format with rating field and feedback field"
            const result=await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
            console.log(mockJsonResp);
            const JsonFeedbackResp=JSON.parse(mockJsonResp);
            const resp=await db.insert(UserAnswer)
            .values({
                mockIdRef:interviewData?.mockId,
                question:mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns:userAnswer,
                feedback:JsonFeedbackResp?.feedback,
                rating:JsonFeedbackResp?.rating,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format('DD-MM-yyyy')
            })

            if(resp)
            {
                toast('User Answer recorded successfully');
                setUserAnswer('');
                setResults([]);
            }
            setResults([]);
            setLoading(false);
    }
    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='mt-20 flex flex-col justify-center items-center bg-gray-500 rounded-lg p-5'>
                <Image src={'/webcam.png'} width={200} height={200}
                    className='absolute' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10
                    }}
                />
            </div>
            <Button disable={loading} className="my-10" onClick={StartStopRecording}>
                {isRecording ?
                    <h2 className='animate-pulse text-red-600 flex gap-2'>
                       <StopCircle/>'Stop Recording'
                    </h2>
                    : 
                    <h2 className=' flex gap-2 items-center'>
                        <Mic/>  'Record Answer'
                    </h2>
                    }
            </Button>

            {/* <Button onClick={()=>console.log(userAnswer)}>Show User Answer</Button> */}
        </div>
    )
}

export default RecordAnswerSection