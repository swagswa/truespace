"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedGradientBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: 190 + Math.random() * 70,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
}

export function BeamsBackground({
    className,
    intensity = "strong",
}: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const isMobileRef = useRef<boolean>(false);
    const MINIMUM_BEAMS = 20;

    const opacityMap = {
        subtle: 0.7,
        medium: 0.85,
        strong: 1,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            // Определяем мобильное устройство
            isMobileRef.current = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            const dpr = window.devicePixelRatio || 1;
            // Ограничиваем DPR на мобильных для производительности
            const mobileDpr = isMobileRef.current ? Math.min(dpr, 2) : dpr;
            
            canvas.width = window.innerWidth * mobileDpr;
            canvas.height = window.innerHeight * mobileDpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(mobileDpr, mobileDpr);

            // Адаптивное количество лучей
            const beamMultiplier = isMobileRef.current ? 0.7 : 1.5;
            const totalBeams = Math.floor(MINIMUM_BEAMS * beamMultiplier);
            beamsRef.current = Array.from({ length: totalBeams }, () =>
                createBeam(canvas.width, canvas.height)
            );
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function resetBeam(beam: Beam, index: number, totalBeams: number) {
            if (!canvas) return beam;
            
            const column = index % 3;
            const spacing = canvas.width / 3;

            beam.y = canvas.height + 100;
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 0.5 + Math.random() * 0.4;
            beam.hue = 190 + (index * 70) / totalBeams;
            beam.opacity = 0.2 + Math.random() * 0.1;
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            // Calculate pulsing opacity
            const pulsingOpacity =
                beam.opacity *
                (0.8 + Math.sin(beam.pulse) * 0.2) *
                opacityMap[intensity];

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

            // Custom color palette - сдержанные но насыщенные цвета
            const colors = ['#2A3441', '#434F68', '#6B5A7A', '#5D6B73', '#434F68', '#434F68', '#434F68', '#434F68'];
            const colorIndex = Math.floor(beam.hue / 90) % colors.length;
            const beamColor = colors[colorIndex];

            // Enhanced gradient with multiple color stops using custom colors
            gradient.addColorStop(0, `${beamColor}00`);
            gradient.addColorStop(
                0.1,
                `${beamColor}${Math.floor(pulsingOpacity * 0.5 * 255).toString(16).padStart(2, '0')}`
            );
            gradient.addColorStop(
                0.4,
                `${beamColor}${Math.floor(pulsingOpacity * 255).toString(16).padStart(2, '0')}`
            );
            gradient.addColorStop(
                0.6,
                `${beamColor}${Math.floor(pulsingOpacity * 255).toString(16).padStart(2, '0')}`
            );
            gradient.addColorStop(
                0.9,
                `${beamColor}${Math.floor(pulsingOpacity * 0.5 * 255).toString(16).padStart(2, '0')}`
            );
            gradient.addColorStop(1, `${beamColor}00`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Адаптивное размытие для мобильных
            const blurAmount = isMobileRef.current ? "20px" : "35px";
            ctx.filter = `blur(${blurAmount})`;

            const totalBeams = beamsRef.current.length;
            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                // Reset beam when it goes off screen
                if (beam.y + beam.length < -100) {
                    resetBeam(beam, index, totalBeams);
                }

                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [intensity]);

    return (
        <div
            className={cn(
                "relative min-h-screen w-full overflow-hidden bg-neutral-950",
                "touch-action-manipulation", // Улучшает производительность на мобильных
                className
            )}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ 
                    filter: "blur(10px)", // Уменьшено для мобильных
                    willChange: "transform", // Оптимизация для GPU
                    transform: "translateZ(0)" // Принудительное использование GPU
                }}
            />

            <motion.div
                className="absolute inset-0 bg-neutral-950/5"
                animate={{
                    opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                }}
                style={{
                    backdropFilter: "blur(30px)", // Уменьшено для мобильных
                    WebkitBackdropFilter: "blur(30px)", // Поддержка Safari
                    willChange: "opacity",
                    transform: "translateZ(0)"
                }}
            />


        </div>
    );
}