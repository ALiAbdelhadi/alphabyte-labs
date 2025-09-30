<ComponentPreview name="switch-demo" />

<div className="not-prose px-4 md:px-0">
  <Step>
    <StepItem title="تثبيت المكتبات المطلوبة">
      أولاً، قم بتثبيت المكتبات اللازمة:

      <Pre className="language-bash">
        {`npm i clsx tailwind-merge`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكون Switch">
      <ComponentSource name="switch-demo" />
    </StepItem>

    <StepItem title="قم بتخصيصه ليكون مناسباً لمشروعك" />
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-4">
  <Pre>
    {`import { Switch } from "@/components/ui/switch"`}
  </Pre>

  <Pre>
    {`<Switch
            size="md"
            color="default"
            label="تفعيل الإشعارات"
            tooltip="قم بالتبديل لتفعيل أو إيقاف الإشعارات"
            checked={switches.notifications}
            onCheckedChange={updateSwitch("notifications")}
        />`}
  </Pre>
</div>
