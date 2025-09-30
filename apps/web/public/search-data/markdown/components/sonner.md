<ComponentPreview name="sonner-demo" />

## حول المكوّن

<MdxBadge>سونر</MdxBadge> مبني على مكتبة
[Sonner](https://sonner.emilkowal.ski/) بواسطة
[emilkowalski\_](https://x.com/emilkowalski_).

## التثبيت

<div className="not-prose px-4 md:px-0">
  <Step>
    <StepItem title="تثبيت التبعيات">
      أولاً، قم بتثبيت التبعيات:

      <Pre>
        {`npm install clsx tailwind-merge sonner`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكوّن Sonner">
      <ComponentSource name="sonner-demo" />
    </StepItem>

    <StepItem title="تعديل layout.tsx لإضافة مكوّن Toaster">
      في ملف <MdxBadge>layout.tsx</MdxBadge> الرئيسي لديك، أضف{" "}
      <MdxBadge>\<Toaster /></MdxBadge>{" "} لعرض التنبيهات (toasts):

      <Pre highlightLines={[8]}>
        {`import { Toaster } from "@/components/ui/sonner"

          export default function RootLayout({ children }) {
          return (
            <html lang="ar">
              <body>
                <main>{children}</main>
                <Toaster />
              </body>
            </html>
           )
          }`}
      </Pre>
    </StepItem>
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre>
    {`import { toast } from "sonner"`}
  </Pre>

  <Pre>
    {`toast("تم إنشاء الحدث بنجاح.")`}
  </Pre>
</div>

## الأنواع

### نجاح

<ComponentPreview name="sonner-demo" variant="success" />

### معلومات

<ComponentPreview name="sonner-demo" variant="info" />

### تحذير

<ComponentPreview name="sonner-demo" variant="warning" />

### خطأ

<ComponentPreview name="sonner-demo" variant="error" />

### تحميل

<ComponentPreview name="sonner-demo" variant="loading" />

### مخصص

<ComponentPreview name="sonner-demo" variant="custom" />
