import React from 'react'
import { TestCase } from "./UserRepoList";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    testCases: TestCase[];
    repository: any; // Connected repository config
};


function TestExecutionModal({ isOpen, onClose, testCases, repository }: Props) {
  return (
    <div>TestExecutionModal</div>
  )
}

export default TestExecutionModal