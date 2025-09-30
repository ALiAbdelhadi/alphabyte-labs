<ComponentPreview name="alert-dialog-demo" />

## التثبيت

<div className="not-prose px-4 md:px-0">
  <Step>
    <StepItem title="تثبيت الاعتمادات">
      أولاً، تحتاج إلى تثبيت الاعتمادات:

      <Pre className="language-bash">
        {`npm install clsx tailwind-merge @radix-ui/react-alert-dialog class-variance-authority`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكوّن Alert dialog">
      <ComponentSource name="alert-dialog-demo" />
    </StepItem>
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre>
    {`import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
      } from "@/components/ui/alert-dialog"
      import { Button } from "@/components/ui/button"`}
  </Pre>

  <Pre>
    {`export default function AlertDialogDemo() {
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The data will be permanently deleted
                from the servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
      }`}
  </Pre>
</div>

## الأمثلة

### الإجراء المدمر

<ComponentPreview name="alert-dialog" variant="destructive" />
