<ComponentPreview name="calendar-demo" />

## حول المكوّن

مكوّن <MdxBadge>Calendar</MdxBadge> مبني بالاعتماد على\
[ReactDayPicker](https://daypicker.dev/).

## التثبيت

<div className="not-prose px-4 md:px-0">
  <Step>
    <StepItem title="تثبيت الاعتمادات (Dependencies)">
      أولاً، تحتاج إلى تثبيت الاعتمادات:

      <Pre className="language-bash">
        {`npm install clsx tailwind-merge react-day-picker@8.10.1 date-fns`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكوّن التقويم (Calendar Component)">
      <ComponentSource name="calendar-demo" />
    </StepItem>
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre>
    {`import { Calendar } from "@/components/ui/calendar"`}
  </Pre>

  <Pre>
    {`const [date, setDate] = React.useState<Date | undefined>(new Date())

      return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      )`}
  </Pre>
</div>

## أمثلة

<ComponentPreview name="date-picker-demo" />
