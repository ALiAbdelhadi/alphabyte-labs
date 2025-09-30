<ComponentPreview name="button" />

## التثبيت

<div className="not-prose px-4 md:px-0">
  <Step>
    <StepItem title="تثبيت الاعتمادات (Dependencies)">
      أولاً، تحتاج إلى تثبيت الاعتمادات:

      <Pre className="language-bash">
        {`npm install clsx tailwind-merge`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكوّن الزر (Button Component)">
      <ComponentSource name="button" />
    </StepItem>

    <StepItem title="الآن أصبح المكوّن جاهزًا، ويمكنك تعديله وتخصيصه ليتناسب مع احتياجاتك." />
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre className="language-typescript">
    {`import { Button } from "@/components/ui/button"`}
  </Pre>

  <Pre className="language-typescript">
    {`export default function ButtonDemo() {
      return <Button variant={"default"}>البدء</Button>
      }`}
  </Pre>
</div>

## أمثلة

### أساسي (Primary)

<ComponentPreview name="button" variant="primary" />

### ثانوي (Secondary)

<ComponentPreview name="button" variant="secondary" />

### مدمر (Destructive)

<ComponentPreview name="button" variant="destructive" />

### شفاف (Ghost)

<ComponentPreview name="button" variant="ghost" />

### رابط (Link)

<ComponentPreview name="button" variant="link" />

### محدد الإطار (Outline)

<ComponentPreview name="button" variant="outline" />

### محايد (Neural)

<ComponentPreview name="button" variant="neural" />

### تحميل (Loading)

<ComponentPreview name="button" variant="loading" />

### أيقونة (Icon)

<ComponentPreview name="button" variant="icon" />

### حركة Bounce

<ComponentPreview name="button" variant="bounce" />

### حركة Pulse

<ComponentPreview name="button" variant="pulse" />
