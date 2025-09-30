<ComponentPreview name="separator-demo" />

## التثبيت

<div className="not-prose px-4 md:px-0">
  <Step>
    <StepItem title="تثبيت التبعيات">
      أولاً، تحتاج إلى تثبيت التبعيات التالية:

      <Pre>
        {`npm install clsx tailwind-merge @radix-ui/react-separator`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكوّن Separator">
      <ComponentSource name="separator-demo" />
    </StepItem>
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre>
    {`import { Separator } from "@/components/ui/separator"`}
  </Pre>

  <Pre>
    {`<Separator />`}
  </Pre>
</div>

## أمثلة

### عمودي

<ComponentPreview name="separator-demo" variant="vertical" />

### الوزن

#### فائق الخفة

<ComponentPreview name="separator-demo" variant="ultralight" />

#### خفيف

<ComponentPreview name="separator-demo" variant="light" />

#### عادي

<ComponentPreview name="separator-demo" variant="regular" />
