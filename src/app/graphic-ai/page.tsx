"use client";

import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";

export default function GraphicAISelection() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-4">
          <Link href="/" className="inline-block mb-6 mt-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Графический ИИ
            </h1>
            <p className="text-white/80 text-sm mb-8">
              Выберите раздел для изучения
            </p>
          </div>
        </div>

        {/* Selection Options */}
        <div className="flex flex-col gap-4">
          <Link href="/graphic-ai/sprint-september-2025">
            <GlassButton 
              size="lg" 
              className="text-white w-full text-center p-6 h-auto"
              variant="primary"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <h3 className="text-xl font-semibold text-white">
                    Спринт Сентябрь 2025
                  </h3>
                </div>
                <p className="text-white/70 text-sm text-center">
                  Актуальные уроки текущего спринта по графическому ИИ
                </p>
              </div>
            </GlassButton>
          </Link>

          <Link href="/graphic-ai/archive">
            <GlassButton 
              size="lg" 
              className="text-white w-full text-center p-6 h-auto"
              variant="default"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                  </svg>
                  <h3 className="text-xl font-semibold text-white">
                    Архив уроков
                  </h3>
                </div>
                <p className="text-white/70 text-sm text-center">
                  Все предыдущие уроки и материалы по графическому ИИ
                </p>
              </div>
            </GlassButton>
          </Link>
        </div>
      </div>
    </div>
  );
}