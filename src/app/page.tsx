import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";

export default function Home() {
  const courses = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
      ),
      title: "Для начинающих",
      description: "Основы ИИ и машинного обучения",
      href: "/beginners"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      title: "AI Агенты",
      description: "Создание и обучение ИИ-агентов",
      href: "/ai-agents"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: "No-Code",
      description: "Разработка без программирования",
      href: "/no-code"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      ),
      title: "Графический ИИ",
      description: "Создание изображений с помощью ИИ",
      href: "/graphic-ai"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
      ),
      title: "Вебинары",
      description: "Онлайн-обучение и мастер-классы",
      href: "/webinars"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-start p-4 pt-8">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link href="/admin" className="block mb-2 cursor-pointer hover:opacity-80 transition-opacity">
              <img src="/logo.svg" alt="TrueSpace Logo" className="w-24 h-24 mx-auto filter brightness-0 invert" />
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">
              TrueSpace
            </h1>
            <p className="text-white/80 text-sm mb-4">
              Образовательная платформа
            </p>
            
            {/* Navigation buttons */}
             <div className="flex gap-2 mb-6">
                <Link href="/favorites" className="flex-1">
                  <GlassButton variant="primary" size="md" className="w-full py-4 text-white">
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        Избранное
                      </div>
                    </GlassButton>
                </Link>
                <Link href="/completed" className="flex-1">
                    <GlassButton variant="secondary" size="md" className="w-full py-4 text-white">
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                        Завершенные
                      </div>
                    </GlassButton>
                </Link>
              </div>
          </div>

          {/* Course Cards */}
          <div className="flex flex-col gap-3">
            {courses.map((course, index) => {
              const CourseCard = (
                <GlassButton 
                  key={index}
                  size="lg" 
                  className="text-white w-full text-left p-4 h-auto hover:scale-102 transition-all duration-300"
                  variant="default"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-white">{course.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-base mb-1">{course.title}</div>
                      <div className="text-white/70 text-sm">{course.description}</div>
                    </div>
                  </div>
                </GlassButton>
              );
              
              return course.href ? (
                <Link key={index} href={course.href}>
                  {CourseCard}
                </Link>
              ) : (
                CourseCard
              );
            })}
          </div>
        </div>
    </div>
  );
}
