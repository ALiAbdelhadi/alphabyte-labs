<ComponentPreview name="sheet-demo" />

<div className="not-prose mdx:px-0 px-4">
  <Step>
    <StepItem title="تثبيت التبعيات">
      أولاً، تحتاج إلى تثبيت التبعيات التالية:

      <Pre>
        {`npm install clsx tailwind-merge @radix-ui/react-dialog`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكوّن Sheet">
      <ComponentSource name="sheet-demo" />
    </StepItem>
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre>
    {`import {
        Sheet,
        SheetClose,
        SheetContent,
        SheetDescription,
        SheetFooter,
        SheetHeader,
        SheetTitle,
        SheetTrigger
      } from '@/components/ui/sheet';`}
  </Pre>

  <Pre>
    {`<Sheet>
        <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
                <Settings size={16} />
                فتح الإعدادات
            </Button>
        </SheetTrigger>
        <SheetContent side="right">
        <SheetHeader>
            <SheetTitle>الإعدادات</SheetTitle>
            <SheetDescription>قم بتخصيص تفضيلات تطبيقك هنا</SheetDescription>
        </SheetHeader>
        <div className="py-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">الوضع الداكن</Label>
                    <Checkbox id="dark-mode" />
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="notification" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">الإشعارات</Label>
                    <Checkbox id="notification" />
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="email-updates" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">تحديثات البريد الإلكتروني</Label>
                    <Checkbox id="email-updates" />
                </div>
            </div>
        </div>
        <SheetFooter>
            <SheetClose asChild>
                <Button>حفظ التغييرات</Button>
            </SheetClose>
        </SheetFooter>
      </SheetContent>
      </Sheet>`}
  </Pre>
</div>

## أمثلة

### التحكم في الاتجاه

#### الأعلى

<ComponentPreview name="sheet-demo" variant="top" />

#### اليمين

<ComponentPreview name="sheet-demo" variant="right" />

#### الأسفل

<ComponentPreview name="sheet-demo" variant="bottom" />

#### اليسار

<ComponentPreview name="sheet-demo" variant="left" />
