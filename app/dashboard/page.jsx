import AddNewInterview from '@/components/ui/AddNewInterview'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import InterviewList from './_components/InterviewList'

const Dasboard = ({children}) => {
  return (
    <div className='p-10'>
     
        <h2 className='font-bold text-2xl'>DashBoard</h2>
        <h2 className='text-gray-500'>Create and start your AI Interview</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
          <AddNewInterview/>
        </div>
        {/* Previous Interview List */}
        <InterviewList/>
    </div>
  )
}

export default Dasboard