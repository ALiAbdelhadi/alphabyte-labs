import React from "react"

import Mermaid from "@/components/ui/mermaid"

const DiagramDecisionTreeDemo = () => {
  return (
    <Mermaid
      chart={`graph TD;
    A[Start] --> B{Is it raining?};
    B -->|Yes| C[Take an umbrella];
    B -->|No| D[Enjoy the weather];
    C --> E[Go outside];
    D --> E;`}
    />
  )
}

export default DiagramDecisionTreeDemo
