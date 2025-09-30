<ComponentPreview name="drawer-demo" />

## حول المكون

<MdxBadge>الدرج (Drawer)</MdxBadge> مبني على مكتبة\
[Vaul](https://github.com/emilkowalski/vaul) من تطوير\
[emilkowalski\_](https://x.com/emilkowalski_).

## التثبيت

<div className="not-prose px-4 md:px-0">
  <Step>
    <StepItem title="تثبيت الحزم المطلوبة">
      أولاً، تحتاج إلى تثبيت الحزم التالية:

      <Pre>
        {`npm install clsx tailwind-merge vaul`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكون الدرج">
      <ComponentSource name="drawer-demo" />
    </StepItem>

    <StepItem title="تعديل ملف layout.tsx لدعم خاصية الخلفية المتحركة">
      في ملف <MdxBadge>layout.tsx</MdxBadge> الرئيسي، أضف\
      <MdxBadge>vaul-drawer-wrapper</MdxBadge> لدعم خاصية تحريك/تكبير الخلفية:

      <Pre highlightLines={[4]}>
        {`<html lang="ar" suppressHydrationWarning>
          <body className="bg-background font-medium antialiased min-h-svh" suppressHydrationWarning>
              {/* أنشئ div وأضف له خاصية vaul-drawer-wrapper بهذه الطريقة */}
              <div vaul-drawer-wrapper="">
                 <div className="relative flex min-h-svh flex-col bg-background">
                    {children}
                 </div>
              </div>
           </body>
          </html>`}
      </Pre>
    </StepItem>
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre>
    {`import {
      Drawer,
      DrawerClose,
      DrawerContent,
      DrawerDescription,
      DrawerFooter,
      DrawerHeader,
      DrawerTitle,
      DrawerTrigger,
      } from "@/components/ui/drawer"
      `}
  </Pre>

  <Pre>
    {`<Drawer>
      <DrawerTrigger>فتح</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>هل أنت متأكد تمامًا؟</DrawerTitle>
          <DrawerDescription>هذا الإجراء لا يمكن التراجع عنه.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>تأكيد</Button>
          <DrawerClose>
            <Button variant="outline">إلغاء</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
      </Drawer>`}
  </Pre>
</div>

## أمثلة

### درج متداخل (Nested Drawer)

<ComponentPreview name="drawer-demo" variant="nested" />
