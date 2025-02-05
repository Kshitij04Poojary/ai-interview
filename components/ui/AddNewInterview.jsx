"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from './button'
import { Textarea } from './textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router=useRouter()
  const { user } = useUser()
  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    console.log(jobPosition, jobDesc, jobExperience)

    const InputPrompt = "Job Position: " + jobPosition + ", Job Description: " + jobDesc + ", Years Of Experience: " + jobExperience + ". Depending on this information give me 5 interview question with their answers in json format"
    const result=await chatSession.sendMessage(InputPrompt);
    const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        }).returning({ mockId: MockInterview.mockId })

      console.log("Inserted Id: ", resp)
      if(resp)
      {
        setOpenDialog(false)
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }
    }
    else{
      console.log("error")
    }

    setLoading(false)
  }
  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary 
      hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => { setOpenDialog(true) }}>
        <h2 className='font-bold text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog}>

        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about job interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>

                  <h2>Add Details about your job position/role, Job description and years of experience</h2>
                  <div className='mt-7 my-2'>
                    <label>Job Role/Job Position</label>
                    < Input placeholder="Eg: Full Stack Developer" required
                      onChange={(e) => setJobPosition(e.target.value)} />
                  </div>
                  <div className=' my-3'>
                    <label>Job Description/ Tech Stack (In short)</label>
                    <Textarea className="resize-none" placeholder="Eg: React, Angular, Node Js, MySql etc" required
                      onChange={(e) => setJobDesc(e.target.value)} />
                  </div>
                  <div className='my-3'>
                    <label>Years of experience</label>
                    < Input placeholder="Eg: 5" type="number" max="50" required
                      onChange={(e) => setJobExperience(e.target.value)} />
                  </div>
                </div>
                <div className='flex gap-5 justify-end'>
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ?
                      <>
                        <LoaderCircle className='animate-spin' />
                        'Generating from AI'
                      </>
                      : 'Start Interview'}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddNewInterview