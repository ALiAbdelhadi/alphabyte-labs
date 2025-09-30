<ComponentPreview name="dialog-demo" />

## التثبيت

<div className="not-prose px-4 md:px-0">
  <Step>
    <StepItem title="تثبيت الحزم المطلوبة">
      أولاً، تحتاج إلى تثبيت الحزم التالية:

      <Pre className="language-bash">
        {`npm install @radix-ui/react-dialog clsx tailwind-merge`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />

      <p className="text-gray-600 mt-2">
        إذا كان لديك ملف <code>utils.ts</code> بالفعل في مشروعك، يمكنك تجاوز هذه الخطوة.
      </p>
    </StepItem>

    <StepItem title="إنشاء مكون الحوار">
      <ComponentSource name="dialog-demo" />
    </StepItem>
  </Step>
</div>

## الاستخدام

<Pre className="language-tsx">
  {`import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"

    export default function Example() {
    return (
      <Dialog>
        <DialogTrigger>فتح</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>هل أنت متأكد تمامًا؟</DialogTitle>
            <DialogDescription>
              لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك نهائيًا
              وإزالة جميع بياناتك من خوادمنا.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    }`}
</Pre>

## أمثلة

### حوار مدمر (Destructive)

<ComponentPreview name="dialog-demo" variant="destructive" />

### تحديد موقع مخصص

#### أعلى الصفحة

<ComponentPreview name="dialog-demo" variant="top" />

#### أسفل الصفحة

<ComponentPreview name="dialog-demo" variant="bottom" />

### مثال مع نموذج (Form)

<ComponentPreview name="dialog-demo" variant="form" />
