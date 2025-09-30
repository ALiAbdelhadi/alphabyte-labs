<ComponentPreview name="accordion-demo" />

## التثبيت

<div className="not-prose px-4 md:px-0">
  <Step>
    <StepItem title="تثبيت الاعتمادات">
      أولاً، تحتاج إلى تثبيت الاعتمادات:

      <Pre className="language-bash">
        {`npm install clsx tailwind-merge @radix-ui/react-accordion`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكوّن Accordion">
      <ComponentSource name="accordion-demo" />
    </StepItem>
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre className="language-typescript">
    {`import {
      Accordion,
      AccordionContent,
      AccordionItem,
      AccordionTrigger,
      } from "@/components/ui/accordion"`}
  </Pre>

  <Pre className="language-typescript">
    {`<Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section Title</AccordionTrigger>
        <AccordionContent>
          Content goes here
        </AccordionContent>
      </AccordionItem>
      </Accordion>`}
  </Pre>
</div>
