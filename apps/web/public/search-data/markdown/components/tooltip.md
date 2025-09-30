<ComponentPreview name="tooltip-demo" />

## التثبيت

<div className="not-prose px-4 md:px-0">
  <Step>
    <StepItem title="تثبيت الاعتماديات">
      أولاً، تحتاج إلى تثبيت الاعتماديات (Dependencies):

      <Pre className="language-bash">
        {`npm install clsx tailwind-merge @radix-ui/react-tooltip`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكون التلميح">
      <ComponentSource name="tooltip-demo" />
    </StepItem>
  </Step>
</div>

## الاستخدام

<div className="space-y-6">
  <Pre>
    {`import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"`}
  </Pre>

  <Pre>
    {`<TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>مرر الفأرة</TooltipTrigger>
            <TooltipContent>
              <p>تلميح افتراضي</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      `}
  </Pre>
</div>

## الأمثلة

### تلميح علوي

<ComponentPreview name="tooltip-demo" variant="top" />

### تلميح أيمن

<ComponentPreview name="tooltip-demo" variant="right" />

### تلميح سفلي

<ComponentPreview name="tooltip-demo" variant="bottom" />

### تلميح أيسر

<ComponentPreview name="tooltip-demo" variant="left" />

### تلميح بتأخير

يمكنك تعيين تأخير لظهور التلميح بعد تمرير مؤشر الفأرة فوق العنصر المحفز. قد يكون هذا مفيدًا لمنع ظهور التلميح بسرعة كبيرة.

<ComponentPreview name="tooltip-demo" variant="delay" />
