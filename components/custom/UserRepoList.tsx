import React, { useContext, useState } from 'react'
import { UserRepo } from './WorkspaceBody'
import Image from 'next/image'
import { Button } from '../ui/button'
import { CheckCircle2, Globe2Icon, Link2Icon, ListChecks, Loader2, Loader2Icon, Settings2, Sparkles, TrendingUp, XCircle } from 'lucide-react'
import { UserDetailContext } from '@/context/UserDetailContext'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
type props = {
    repoList: UserRepo[],
    setReload: () => void;
}
type StatusData = {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    passRate: number;
}

export type TestCase = {
    id: number;
    title: string;
    description: string;
    type: string;
    repoId: number;
    targetFiles: string[];
    expectedResult: string;
    repoName: string;
    repoOwner: string;
    targetRoute: string;
    status: string;
    browserbaseScript: string;
}



function UserRepoList({repoList}:props) {
    const [statusData, setStatusData] = useState<StatusData>({
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        passRate: 0
    });

    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);
    const [testCaseLoading, setTestCaseLoading] = useState(false);
    const [testCases, setTestCases] = useState<TestCase[]>([]);
  return (
    <div className='mt-10'>
         <h2 className='my-3 font-medium'>REPOSITORIES</h2>
        {repoList.map((repo,index)=>(
            <Accordion type="single" collapsible key={index}>
  <AccordionItem value="item-1" className='border px-5 rounded-xl mb-5'>
    <AccordionTrigger>
      <div className="flex items-center gap-2">
        <Image
          src={'/github.png'}
          alt='github'
          width={20}
          height={30}
        />

        <div className='flex flex-col items-start gap-8'>
          <h2>{repo.fullName}</h2>

          <p className='text-xs text-gray-500'>
            {repo.defaultBranch} • {repo.language}
          </p>
        </div>
      </div>
    </AccordionTrigger>

    <AccordionContent>
                            <div className='pt-4 space-y-5'>

                                <div className='bg-gray-50 p-3 border rounded-xl flex justify-between items-center'>
                                    <div className='flex gap-3 items-center'>
                                        <Link2Icon className='text-primary' />
                                        <h2>Target Domain:</h2>
                                        <h2 className='bg-white p-1 px-2 border rounded-md text-primary font-medium'>{repo?.targetDomain}</h2>
                                    </div>
                                   
                                </div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>

                                    <StatusCard
                                        title="Total Tests"
                                        value={statusData?.totalTests}
                                        icon={<ListChecks className='h-5 w-5 text-blue-600' />}
                                        bgColor="bg-blue-50"
                                    />

                                    <StatusCard
                                        title="Passed"
                                        value={statusData?.passedTests}
                                        icon={<CheckCircle2 className='h-5 w-5 text-green-600' />}
                                        bgColor="bg-green-50"
                                    />

                                    <StatusCard
                                        title="Failed"
                                        value={statusData?.failedTests}
                                        icon={<XCircle className='h-5 w-5 text-red-600' />}
                                        bgColor="bg-red-50"
                                    />

                                    <StatusCard
                                        title="Pass Rate"
                                        value={`${statusData?.passRate}%`}
                                        icon={<TrendingUp className='h-5 w-5 text-purple-600' />}
                                        bgColor="bg-purple-50"
                                    />
                                </div>

                               

                                {testCaseLoading ?
                                    <h2 className='flex gap-3 items-center'> <Loader2Icon className='animate-spin' /> Please Wait... </h2>
                                    :
                                    testCases?.length == 0 && <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-xl p-4 bg-gray-50'>
                                        <div>
                                            <h3 className='font-medium'>
                                                {loading ? 'Generating Test Cases...' :
                                                    'Generate AI Test Cases'}</h3>
                                            <p className='text-sm text-gray-500 mt-1'>
                                                Analyze this repository and generate automated test cases using AI.
                                            </p>
                                        </div>

                                        <Button className='gap-2'
                                            disabled={loading}
                                            >
                                            {loading ? <Loader2 className='animate-spin' /> : <Sparkles className='h-4 w-4' />}
                                            Generate Test Cases
                                        </Button>
                                    </div>}
                            </div>
                        </AccordionContent>

  </AccordionItem>
</Accordion>
        ))

        }

    </div>
  )
}

export default UserRepoList

function StatusCard({
    title,
    value,
    icon,
    bgColor
}: {
    title: string
    value: string | number
    icon: React.ReactNode
    bgColor: string
}) {
    return (
        <div className='border rounded-xl p-4 flex items-center justify-between bg-white'>
            <div>
                <p className='text-sm text-gray-500'>{title}</p>
                <h3 className='text-2xl font-semibold mt-1'>{value}</h3>
            </div>

            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${bgColor}`}>
                {icon}
            </div>
        </div>
    )
}