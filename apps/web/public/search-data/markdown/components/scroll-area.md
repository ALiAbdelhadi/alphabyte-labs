<ComponentPreview name="scroll-area-demo" />

## التثبيت

<div className="not-prose md:px-0 px-4">
  <Step>
    <StepItem title="تثبيت التبعيات">
      أولاً، ستحتاج إلى تثبيت التبعيات اللازمة للتنسيق ووظائف الأدوات. تتضمن هذه الحزم <MdxBadge>clsx</MdxBadge> لإدارة أسماء الأصناف الشرطية و<MdxBadge>tailwind-merge</MdxBadge> لمعالجة تعارضات أصناف Tailwind CSS بكفاءة.

      <Pre className="language-bash">
        {`npm install clsx tailwind-merge @radix-ui/react-scroll-area`}
      </Pre>
    </StepItem>

    <StepItem title="إنشاء ملف utils.ts">
      <ComponentUtilsText />

      <ComponentUtils />
    </StepItem>

    <StepItem title="إنشاء مكوّن Scroll-Area">
      <ComponentSource name="scroll-area" />
    </StepItem>
  </Step>
</div>

## الاستخدام

<div className="not-prose space-y-6">
  <Pre>
    {`import { ScrollArea } from "@/components/ui/scroll-area"`}
  </Pre>

  <Pre>
    {`<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      بدأ المهرّج بالتسلل إلى القلعة في منتصف الليل وترك النكات في كل مكان: تحت
      وسادة الملك، في حسائه، وحتى في مرحاضه الملكي. كان الملك غاضبًا، لكنه لم
      يتمكّن من إيقاف المهرّج. وفي يوم من الأيام، اكتشف شعب المملكة أن النكات
      التي يتركها المهرّج كانت مضحكة لدرجة أنهم لم يستطيعوا التوقف عن الضحك.
      وبمجرد أن بدأوا بالضحك، لم يتمكّنوا من التوقف.
      </ScrollArea>`}
  </Pre>
</div>

## أمثلة

### أفقي

<ComponentPreview name="scroll-area-demo" variant="horizontal" />
