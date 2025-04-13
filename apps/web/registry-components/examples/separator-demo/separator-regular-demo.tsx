import { Separator } from "@/components/library/separator"

const SeparatorRegularDemo = () => {
  return (
    <div className="p-4 rounded-lg ">
      <div className="p-4">Content Above</div>
      <Separator weight="regular" />
      <div className="p-4">Content Below</div>
    </div>
  )
}

export default SeparatorRegularDemo
