// Carousel big block's data example
export const CarouselBigDataForBlock = [
  {
    id: 1,
    title: "E-commerce web app",
    description: "An E-commerce web app for lighting store",
    image: "/blocks/carousel-big/block-1.png",
    link: "https://eg-artlighting.vercel.app",
  },
  {
    id: 2,
    title: "E-commerce web app",
    description: "An E-commerce web app for lighting store",
    image: "/blocks/carousel-big/block-2.png",
    link: "https://casescobra-cuxh.vercel.app/",
  },
  {
    id: 3,
    title: "E-commerce web app",
    description: "An E-commerce web app for lighting store",
    image: "/blocks/carousel-big/block-3.png",
    link: "https://modern-website-gold.vercel.app/",
  },
];
// Carousel block's data
export const CarouselsData = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "/blocks/carousel/design-process-2.jpg",
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "/blocks/carousel/design-process.jpg",
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "/blocks/carousel/design-process.jpg",
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "/blocks/carousel/design-process.jpg",
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "/blocks/carousel/design-process.jpg",
  },
];
// Timeline block's data
export const TimeLineData: TimeLineProps[] = [
  {
    title: "STEP 1: Discovery & Consultation",
    content: (
      <div className="md:space-y-5 space-y-2">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl">
            Deep Dive & Alignment
          </h2>
        </div>
        <div className="md:w-[80%] w-full">
          <p className="text-muted-foreground text-sm md:text-base">
            We initiate with a thorough consultation to understand your unique
            business needs, project goals, and desired outcomes for your
            web/mobile app, MVP, or ERP system.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "STEP 2: Planning & Strategy",
    content: (
      <div className="md:space-y-5 space-y-2">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl">
            Blueprint for Success
          </h2>
        </div>
        <div className="md:w-[80%] w-full">
          <p className="text-muted-foreground text-sm md:text-base">
            Our expert team meticulously plans the project roadmap, defining
            scope, timelines, budget, and key deliverables for your web/mobile
            app, MVP, or ERP system development.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "STEP 3: Design & Development",
    content: (
      <div className="md:space-y-5 space-y-2">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl">
            Crafting Your Solution
          </h2>
        </div>
        <div className="md:w-[80%] w-full">
          <p className="text-muted-foreground text-sm md:text-base">
            Our skilled developers and designers bring your vision to life. We
            focus on user-centered design, robust development, and seamless
            integration for your web/mobile app, MVP, or ERP system.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "STEP 4: Testing & Quality Assurance",
    content: (
      <div className="md:space-y-5 space-y-2">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl">
            Ensuring Excellence
          </h2>
        </div>
        <div className="md:w-[80%] w-full">
          <p className="text-muted-foreground text-sm md:text-base">
            Rigorous testing is conducted at every stage to identify and address
            any issues, ensuring the highest quality and performance for your
            web/mobile app, MVP, or ERP system.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "STEP 5: Launch & Beyond",
    content: (
      <div className="md:space-y-5 space-y-2">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl">
            Go-Live & Continuous Support
          </h2>
        </div>
        <div className="md:w-[80%] w-full">
          <p className="text-muted-foreground text-sm md:text-base">
            We seamlessly launch your web/mobile app, MVP, or ERP system and
            provide ongoing support, maintenance, and updates to ensure its
            continued success and meet your evolving business needs.
          </p>
        </div>
      </div>
    ),
  },
];
// Services block's data
export const services: Service[] = [
  {
    id: "uiux-design",
    link: "/services/uiux-design",
    title: "UI&UX Design",
    subtitle: "Creating seamless user experiences",
    description: "We specialize in crafting intuitive and visually appealing digital experiences that align with user needs and business goals. Our design process ensures your product stands out while delivering exceptional usability.",
    showTags: true,
    iconColor: "text-teal-500",
  },
  {
    id: "web-development",
    link: "/services/web-development",
    title: "Web Development",
    subtitle: "Building modern, high-performing websites",
    description: "Our team develops high-performance and scalable websites and web applications tailored to meet your business requirements, utilizing the latest technologies and best practices.",
    showTags: true,
    iconColor: "text-blue-500",
  },
  {
    id: "hosting-and-domain",
    link: "/services/hosting-and-domain",
    title: "Hosting & Domain",
    subtitle: "Reliable hosting and domain services",
    description: "Our hosting and domain registration services guarantee reliability, scalability, and security, providing the foundation your online presence needs to thrive.",
    showTags: false,
    iconColor: "text-yellow-500",
  },
  {
    id: "mvp-development",
    link: "/services/mvp",
    title: "MVP Development",
    subtitle: "Bring your ideas to life quickly",
    description: "Our MVP development service enables you to rapidly test market assumptions and gather user feedback with functional, prototype-level solutions designed to scale.",
    showTags: true,
    iconColor: "text-green-500",
  },
];