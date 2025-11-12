# 🚀 Plano Mestre - Frontend

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

> Plataforma completa de estudos com Pomodoro, flashcards, analytics e planejamento inteligente.

## ✨ Features Principais

- ⏱️ **Pomodoro & Foco** - Timer integrado para sessões produtivas
- 📚 **Flashcards Inteligentes** - Sistema de repetição espaçada
- 📅 **Planejamento** - Organização automática de tópicos e agendamentos
- 📊 **Analytics** - Insights detalhados sobre desempenho e progresso
- 🎯 **Hábitos** - Sistema de acompanhamento de hábitos de estudo
- 🌙 **Dark Mode** - Tema escuro/claro com persistência

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [TailwindCSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Ícones**: [Heroicons](https://heroicons.com/)
- **Animações**: CSS3 Custom Animations

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/                      # App Router (Next.js 15)
│   │   ├── page.tsx              # Landing page (redesign minimalista)
│   │   ├── login/                # Página de login
│   │   ├── cadastro/             # Página de cadastro
│   │   └── dashboard/            # Área autenticada
│   │       ├── page.tsx          # Dashboard principal
│   │       ├── calendar/         # Calendário de estudos
│   │       ├── daily/            # Rotina diária
│   │       ├── habits/           # Gerenciamento de hábitos
│   │       ├── reviews/          # Sistema de revisões
│   │       ├── stats/            # Estatísticas detalhadas
│   │       ├── suggestions/      # Sugestões de estudo
│   │       └── topics/[id]/      # Detalhes do tópico
│   ├── components/               # Componentes reutilizáveis
│   │   ├── auth/                 # Componentes de autenticação
│   │   ├── dashboard/            # Componentes do dashboard
│   │   ├── layout/               # Layout (Sidebar, TopBar)
│   │   ├── theme/                # Theme Provider & Toggle
│   │   ├── timer/                # Timer Pomodoro global
│   │   └── topics/               # Componentes de tópicos
│   ├── hooks/                    # Custom React Hooks
│   │   └── useScrollReveal.ts    # Hook de animações no scroll
│   ├── lib/                      # Utilitários e configurações
│   │   ├── analytics.ts          # Analytics tracking
│   │   └── api.ts                # Axios instances
│   ├── store/                    # Zustand stores
│   │   ├── auth.store.ts         # Estado de autenticação
│   │   ├── theme.store.ts        # Estado do tema
│   │   └── timer.store.ts        # Estado do timer Pomodoro
│   ├── styles/                   # Estilos globais
│   │   ├── design-system.css     # Design tokens
│   │   └── landing-animations.css # Animações da landing page
│   └── types/                    # TypeScript types
│       └── analytics.ts          # Tipos de analytics
├── public/                       # Arquivos estáticos
├── package.json                  # Dependências do projeto
├── tsconfig.json                 # Configuração TypeScript
├── next.config.ts                # Configuração Next.js
├── tailwind.config.ts            # Configuração TailwindCSS
└── README.md                     # Este arquivo
```

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Backend da aplicação rodando (veja repositório backend)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/plano-mestre-frontend.git
cd plano-mestre-frontend

# Instale as dependências
npm install
# ou
yarn install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas configurações
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3001

# Google OAuth (opcional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=seu_google_client_id

# Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=seu_ga_id
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev

# Abra http://localhost:3000 no navegador
```

### Build para Produção

```bash
# Gere o build otimizado
npm run build
# ou
yarn build

# Inicie o servidor de produção
npm start
# ou
yarn start
```

## 🎨 Design System

O projeto segue um design system minimalista e elegante:

- **Paleta de Cores**: Emerald (primária), Slate (neutra)
- **Tipografia**: Inter (via Next.js Font Optimization)
- **Espaçamento**: Sistema de 4px base (Tailwind)
- **Animações**: Transições suaves com cubic-bezier
- **Responsividade**: Mobile-first approach

### Princípios de Design

- ✅ **Minimalismo** - Menos é mais, foco no essencial
- ✅ **Consistência** - Padrões visuais e de comportamento
- ✅ **Acessibilidade** - WCAG 2.1 AA compliance
- ✅ **Performance** - Otimizações de imagem e code splitting

## 🧪 Testes

```bash
# Rodar testes unitários
npm run test
# ou
yarn test

# Rodar testes com coverage
npm run test:coverage
# ou
yarn test:coverage
```

## 📦 Scripts Disponíveis

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit"
}
```

## 🏗️ Arquitetura e Padrões

### Clean Architecture

O projeto segue os princípios de **Clean Architecture**:

- **Separation of Concerns (SoC)**: CSS separado, lógica isolada
- **Single Responsibility Principle (SRP)**: Componentes focados
- **DRY (Don't Repeat Yourself)**: Reutilização de código
- **KISS (Keep It Simple, Stupid)**: Simplicidade em primeiro lugar
- **YAGNI (You Ain't Gonna Need It)**: Apenas o necessário

### Estrutura de Componentes

```
Component/
├── Component.tsx       # Componente principal
├── Component.types.ts  # TypeScript interfaces
├── Component.styles.ts # Styled components (se aplicável)
└── Component.test.tsx  # Testes unitários
```

## 🌐 Deployment

### Vercel (Recomendado)

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
# Build da imagem
docker build -t plano-mestre-frontend .

# Rodar o container
docker run -p 3000:3000 plano-mestre-frontend
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Convenção de Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação (sem mudança de código)
- `refactor:` - Refatoração de código
- `test:` - Adicionar/corrigir testes
- `chore:` - Tarefas de build/CI

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Seu Nome** - [GitHub](https://github.com/SEU_USUARIO)

## 🙏 Agradecimentos

- Next.js team pela framework incrível
- Vercel pela plataforma de deploy
- Comunidade open source

---

**Desenvolvido com ❤️ usando Next.js e TypeScript**

