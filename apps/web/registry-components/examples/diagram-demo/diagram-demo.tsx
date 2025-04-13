import Mermaid from "@/components/library/mermaid"

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
