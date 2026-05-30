import React from 'react'
import { TestCase } from './UserRepoList'

type props = {
    testCase?: TestCase,
    setReload: any
}



function TestCaseSettingDialog({ testCase, setReload }: props) {
  return (
    <div>TestCaseSettingDialog</div>
  )
}

export default TestCaseSettingDialog