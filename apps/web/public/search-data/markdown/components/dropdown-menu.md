<ComponentPreview name="dropdown-menu-demo" />

## التثبيت

<div className="not-prose px-4">
  <Step>
    <StepItem title="تثبيت الحزم المطلوبة">
      <Pre className="language-bash">
        {`npm install clsx tailwind-merge @radix-ui/react-dropdown-menu class-variance-authority`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكون القائمة المنسدلة">
      <ComponentSource name="dropdown-menu-demo" />
    </StepItem>
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre>
    {`import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger
      } from '@/components/ui/dropdown-menu'`}
  </Pre>

  <Pre>
    {`<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">فتح القائمة</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>حسابي</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>تعديل الملف الشخصي</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>تنزيل</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
                <Share className="mr-2 h-4 w-4" />
                <span>مشاركة (معطل)</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      `}
  </Pre>
</div>

## أمثلة

### صندوق اختيار (Checkbox)

<ComponentPreview name="dropdown-menu-demo" variant="checkbox" />

### أزرار اختيار (Radio)

<ComponentPreview name="dropdown-menu-demo" variant="radio" />

### قائمة متداخلة (Nested)

<ComponentPreview name="dropdown-menu-demo" variant="nested" />
