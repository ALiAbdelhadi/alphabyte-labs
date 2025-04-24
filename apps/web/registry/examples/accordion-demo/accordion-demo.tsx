import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/library/accordion"

const AccordionDemo = () => {
  return (
    <Accordion type="multiple" className="w-full max-w-2xl">
      <AccordionItem value="tech-1">
        <AccordionTrigger>MacOS</AccordionTrigger>
        <AccordionContent>
          macOS is Apple's desktop operating system that powers Mac computers.
          It features a sleek user interface, robust security features, and
          seamless integration with other Apple devices and services.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tech-2">
        <AccordionTrigger>iOS</AccordionTrigger>
        <AccordionContent>
          iOS is Apple's mobile operating system for iPhone. It's known for its
          intuitive interface, app ecosystem, security, and consistent
          performance across devices.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tech-3">
        <AccordionTrigger>iPadOS</AccordionTrigger>
        <AccordionContent>
          iPadOS is a variant of iOS designed specifically for iPad, with
          features optimized for the larger display, including improved
          multitasking, Apple Pencil support, and desktop-class browsing.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AccordionDemo
