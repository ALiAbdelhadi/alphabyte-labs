import { Separator } from "@/components/library/separator"

const SeparatorLightDemo = () => {
  return (
    <div className="p-4 rounded-lg ">
      <div className="p-4">Content Above</div>
      <Separator weight="light" />
      <div className="p-4">Content Below</div>
    </div>
  )
}

export default SeparatorLightDemo
