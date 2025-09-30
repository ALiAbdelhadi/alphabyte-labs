**استخدم مكوّن الملاحظة للتواصل الفعّال وعرض المعلومات المهمة بشكل واضح داخل واجهتك.**

<ComponentPreview name="note-demo" />

## التثبيت

<div className="not-prose md:px-0 px-4">
  <Step>
    <StepItem title="تثبيت المتطلبات">
      قم بتثبيت الحزم المطلوبة:

      <Pre className="language-bash">
        {`npm install clsx tailwind-merge`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكوّن الملاحظة">
      <ComponentSource name="note-demo" />
    </StepItem>

    <StepItem title="التخصيص">
      يمكنك الآن تعديله وتخصيص تصميمه حسب احتياجاتك.
    </StepItem>
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre className="language-typescript">
    {`import { Note } from "@/components/ui/note"`}
  </Pre>

  <Pre className="language-tsx">
    {`const NoteDemo = () => {
      return <Note variant="info">هذه ملاحظة معلوماتية.</Note>
      }

      export default NoteDemo`}
  </Pre>
</div>

## أمثلة

### ملاحظة قياسية

<ComponentPreview name="note-demo" />

### ملاحظة نجاح

<ComponentPreview name="note-demo" variant="success" />

### ملاحظة تحذير

<ComponentPreview name="note-demo" variant="warning" />

### ملاحظة خطأ

<ComponentPreview name="note-demo" variant="error" />

## ملاحظات قابلة للإغلاق

لجعل الملاحظة قابلة للإغلاق من قِبل المستخدم، أضف الخاصية <MdxBadge>closable</MdxBadge> بالقيمة <MdxBadge>true</MdxBadge>.

<ComponentPreview name="note-demo" variant="closable" />
