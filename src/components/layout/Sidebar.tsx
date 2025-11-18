"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  HomeIcon,
  ClockIcon,
  CalendarIcon,
  Squares2X2Icon,
  ArrowPathIcon,
  ChartBarIcon,
  ChevronDownIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/auth.store";
import CreateTopicForm from "@/components/topics/CreateTopicForm";

interface Topic {
  id: number;
  name: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "REVIEWING" | "COMPLETED";
  category?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
  description?: string;
  tags?: string;
  color?: string;
}

interface SidebarProps {
  topics: Topic[];
  onTopicCreated: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({
  topics,
  onTopicCreated,
  isMobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isEditaisExpanded, setIsEditaisExpanded] = useState(true);
  const [showCreateTopicForm, setShowCreateTopicForm] = useState(false);

  const navigationItems = [
    { name: "Página Inicial", icon: HomeIcon, path: "/dashboard" },
    { name: "Meu Estudo Diário", icon: ClockIcon, path: "/dashboard/daily" },
    { name: "Calendário", icon: CalendarIcon, path: "/dashboard/calendar" },
    {
      name: "Sessão de Estudos",
      icon: Squares2X2Icon,
      path: "/dashboard/stats",
    },
    { name: "Revisões", icon: ArrowPathIcon, path: "/dashboard/reviews" },
    {
      name: "Hábitos",
      icon: ChartBarIcon,
      path: "/dashboard/habits",
    },
    {
      name: "Contato",
      icon: ChatBubbleLeftRightIcon,
      path: "/dashboard/suggestions",
    },
  ];

  const handleTopicCreated = () => {
    setShowCreateTopicForm(false);
    onTopicCreated();
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleNavClick = (path: string) => {
    router.push(path);
    onMobileClose?.();
  };

  const getStatusColor = (status: Topic["status"]) => {
    switch (status) {
      case "NOT_STARTED":
        return "bg-amber-400";
      case "IN_PROGRESS":
        return "bg-blue-500";
      case "REVIEWING":
        return "bg-orange-500";
      case "COMPLETED":
        return "bg-emerald-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-sm z-50 transition-all duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-base sm:text-lg">
                  ✓
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                Plano Mestre
              </h1>
            </div>
            {/* Mobile Close Button */}
            <button
              onClick={onMobileClose}
              className="lg:hidden p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium relative group ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? "text-emerald-600 dark:text-emerald-400" : ""
                      }`}
                    />
                    <span className="flex-1 text-left whitespace-nowrap">
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* MEUS ASSUNTOS Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3 px-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Meus Assuntos
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowCreateTopicForm(!showCreateTopicForm)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  title="Adicionar novo assunto"
                >
                  <PlusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
                <button
                  onClick={() => setIsEditaisExpanded(!isEditaisExpanded)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ChevronDownIcon
                    className={`w-4 h-4 text-slate-600 dark:text-slate-400 transition-transform ${
                      isEditaisExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Create Topic Form */}
            {showCreateTopicForm && (
              <div className="mb-3 px-3">
                <CreateTopicForm
                  onTopicCreated={handleTopicCreated}
                  isExpanded={false}
                />
              </div>
            )}

            {isEditaisExpanded && (
              <ul className="space-y-1">
                {topics.length > 0 ? (
                  topics.map((topic) => (
                    <li key={topic.id}>
                      <button
                        onClick={() => {
                          router.push(`/dashboard/topics/${topic.id}`);
                          onMobileClose?.();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left group"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(
                            topic.status
                          )} flex-shrink-0`}
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300 truncate group-hover:text-slate-900 dark:group-hover:text-slate-100">
                          {topic.name}
                        </span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                    Nenhum assunto cadastrado
                  </li>
                )}
              </ul>
            )}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  {user?.name || "Usuário"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
              title="Sair"
            >
              Sair
            </button>
          </div>

          {/* Developer Credits */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[10px] text-slate-400 dark:text-slate-600 text-center mb-1">
              Desenvolvido por
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://github.com/luiznascimentodev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-slate-500 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
                title="GitHub"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <a
                href="https://www.linkedin.com/in/luiz-felippe-nascimento/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-slate-500 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
                title="LinkedIn"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
