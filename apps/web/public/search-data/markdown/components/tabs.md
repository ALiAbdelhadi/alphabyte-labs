<ComponentPreview name="tabs-demo" />

## التثبيت

<div className="not-prose px-4 md:px-0">
  <Step>
    <StepItem title="تثبيت المكتبات المطلوبة">
      أولاً، قم بتثبيت المكتبات التالية:

      <Pre className="language-bash">
        {`npm install clsx tailwind-merge @radix-ui/react-tabs framer-motion`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكون Tabs">
      <ComponentSource name="tabs-demo" />
    </StepItem>

    <StepItem title="الآن يمكنك تعديله ليناسب مشروعك" />
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-4">
  <p className="text-base">
    أولاً، قم باستيراد مكون الـ Tabs في ملفك:
  </p>

  <Pre>
    {`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tab"`}
  </Pre>

  <p className="text-base">ثم استخدمه بالشكل التالي:</p>

  <Pre>
    {`<Tabs defaultValue="preview" className="mt-4">
             <TabsList className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0 mb-2">
                <TabsTrigger value="preview" className="active:shadow-none text-base">
                   تبويب 1
                </TabsTrigger>
                <TabsTrigger value="code" className="active:shadow-none text-base">
                   تبويب 2
                </TabsTrigger>
             </TabsList>
             <div>
                <TabsContent value="preview" className={cn("border rounded-xl", className)}>
                  <div>المحتوى الأول</div>
                </TabsContent>
                <TabsContent value="code" className="rounded-xl">
                  <div>المحتوى الثاني</div>
                </TabsContent>
             </div>
          </Tabs>`}
  </Pre>
</div>

## أمثلة

### تبويبات عمودية

<ComponentPreview name="tabs-vertical-demo" />
