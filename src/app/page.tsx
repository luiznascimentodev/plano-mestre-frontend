"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import {
  ChartBarIcon,
  ClockIcon,
  FireIcon,
  ArrowRightIcon,
  BookOpenIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { analytics } from "@/lib/analytics";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "@/styles/landing-animations.css";

export default function HomePage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const authCheckedRef = useRef(false);
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    analytics.trackPageView("/", "Página Inicial");
    analytics.trackFeatureAccessed("landing_page");
  }, []);

  useEffect(() => {
    if (!isMounted || authCheckedRef.current || hasRedirectedRef.current) return;

    // Verificar autenticação apenas uma vez
    authCheckedRef.current = true;
    const checkAuth = setTimeout(() => {
      if (hasRedirectedRef.current) return;
      const { token, user } = useAuthStore.getState();
      if (token && user) {
        hasRedirectedRef.current = true;
        router.replace("/dashboard");
      }
    }, 150);

    return () => clearTimeout(checkAuth);
  }, [isMounted, router]);

  const handleGetStarted = () => {
    analytics.trackButtonClick("get_started", "landing_page");
    router.push("/cadastro");
  };

  const handleLogin = () => {
    analytics.trackButtonClick("login", "landing_page");
    router.push("/login");
  };

  const features = [
    {
      icon: ClockIcon,
      title: "Pomodoro & Foco",
      description: "Concentre-se com sessões cronometradas e produtivas",
      color: "emerald",
    },
    {
      icon: BookOpenIcon,
      title: "Flashcards Inteligentes",
      description: "Memorize mais com repetição espaçada",
      color: "blue",
    },
    {
      icon: CalendarIcon,
      title: "Planejamento",
      description: "Organize tópicos e agendamentos automaticamente",
      color: "purple",
    },
    {
      icon: ChartBarIcon,
      title: "Analytics",
      description: "Insights sobre seu desempenho e progresso",
      color: "rose",
    },
  ];

  // Hooks para animações de scroll reveal
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useScrollReveal({ threshold: 0.2 });
  const ctaRef = useScrollReveal({ threshold: 0.2 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900 relative overflow-hidden transition-colors">
      {/* Elementos decorativos sutis no background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-60 right-20 w-[32rem] h-[32rem] bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-float-fast" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Navigation - Ultra minimalista */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">Plano Mestre</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={handleGetStarted}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-medium rounded-lg hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-sm hover:shadow-md"
              >
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Ultra minimalista e impactante */}
      <section ref={heroRef as React.RefObject<HTMLElement>} className="pt-40 pb-32 px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-[1.1] tracking-tight animate-fade-in-up">
            Estude com{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              inteligência
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Pomodoro, flashcards, analytics e planejamento em uma plataforma
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={handleGetStarted}
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
            >
              Começar Grátis
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - Grid minimalista */}
      <section
        id="features"
        ref={featuresRef.elementRef as React.RefObject<HTMLElement>}
        className={`py-32 px-6 lg:px-8 relative z-10 transition-all duration-700 ${featuresRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    transitionDelay: `${idx * 0.05}s`
                  }}
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
                      feature.color === "emerald"
                        ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white"
                        : feature.color === "blue"
                        ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white"
                        : feature.color === "purple"
                        ? "bg-gradient-to-br from-purple-400 to-purple-600 text-white"
                        : "bg-gradient-to-br from-rose-400 to-rose-600 text-white"
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - Minimalista com métricas */}
      <section className="py-24 px-6 lg:px-8 relative z-10 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: ClockIcon, value: "Pomodoro", label: "Timer integrado" },
              { icon: BookOpenIcon, value: "Flashcards", label: "Repetição espaçada" },
              { icon: FireIcon, value: "Hábitos", label: "Acompanhamento" },
              { icon: ChartBarIcon, value: "Analytics", label: "Insights detalhados" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <Icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final - Ultra minimalista */}
      <section
        ref={ctaRef.elementRef as React.RefObject<HTMLElement>}
        className={`py-32 px-6 lg:px-8 relative z-10 transition-all duration-700 ${ctaRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-8 tracking-tight">
            Comece agora
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-light">
            Gratuito. Sem cartão de crédito. Cancele quando quiser.
          </p>
          <button
            onClick={handleGetStarted}
            className="group px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 inline-flex items-center gap-3"
          >
            Criar Conta Grátis
            <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer - Ultra minimalista */}
      <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800/50 py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">✓</span>
            </div>
            <span className="text-slate-400 font-medium text-sm">Plano Mestre</span>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
