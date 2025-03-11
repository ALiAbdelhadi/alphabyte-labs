import Mermaid from '@/components/library/mermaid'
import React from 'react'

const DiagramsDemo = () => {
  return (
    <Mermaid
      chart={`graph TD;
    Start --> Task1;
    Task1 --> Task2;
    Task2 --> End;`}
    />
  )
}

export default DiagramsDemo