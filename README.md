# 🌍 SOS Localiza - Sistema de Prevenção a Desastres Naturais

SOS Localiza é um aplicativo web desenvolvido com o objetivo de auxiliar usuários em situações de risco, como enchentes e outros desastres naturais. Ele permite visualizar áreas de risco em mapas interativos, identificar a localização do usuário e fornecer orientações sobre segurança com base em dados geográficos.

---

## 🚀 Finalidade do Projeto

O projeto foi desenvolvido como parte da disciplina de Desenvolvimento Web para promover o uso de tecnologia na prevenção de desastres. SOS Localiza oferece:

- Visualização de áreas de risco (ex: inundações)
- Geolocalização do usuário
- Classificação de risco baseado na proximidade
- Interface otimizada para dispositivos móveis
- Simplicidade e acessibilidade

---

## 🧪 Tecnologias Utilizadas

- **Next.js** (Framework React)
- **TypeScript**
- **Tailwind CSS** (via NativeWind)
- **Leaflet.js** (para mapas interativos)
- **Day.js** (tratamento de datas)
- **Nominatim API** (geocodificação)
- **Geolib** (cálculo de distância geográfica)
- **Vercel** (para deploy, opcional)
- **Font: Geist da Vercel**

---

## 👩‍💻 Participantes

| Nome               | RM       |
|--------------------|----------|
| Amanda Galdino     | 560066   |
| Bruno Cantacini    | 560242   |
| Gustavo Gonçalves  | 556823   |

---

## 📦 Instalação e Uso

### Pré-requisitos

- Node.js (versão 18+ recomendada)
- npm, yarn ou pnpm

### Passos para rodar localmente

```bash
# Clone o repositório
git clone <URL-do-repositório>

# Acesse a pasta do projeto
cd front_gs_02-main

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```
Depois, abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🗺️ Funcionalidades Principais

- Mapa interativo exibindo áreas de risco (dados em `public/dados_para_mapa.json`)
- Ícone do usuário mostrando sua localização
- Círculos de risco com cores diferentes (verde, laranja, vermelho)
- Identificação automática de:
  - Se está em uma área de risco
  - Se há risco próximo
  - Se está em local seguro
- Modal com orientações de segurança
- Tela de busca por CEP

---
## 🧩 Estrutura de Pastas

```
📁 front_gs_02-main
├── app/                 # Páginas e rotas do Next.js
├── components/          # Componentes reutilizáveis (Header, Modal, Cards)
├── public/              # Arquivos estáticos (imagens, JSON com dados)
├── styles/              # Estilos globais
├── utils/               # Funções auxiliares
├── tsconfig.json        # Configuração TypeScript
└── package.json         # Dependências do projeto
```

---
## 📍 APIs Utilizadas

- **Nominatim OpenStreetMap** – para buscar coordenadas via CEP.
- **Geolib** – cálculo de distância entre o usuário e áreas de risco.

---
## 🔐 Considerações de Segurança

- Não são utilizadas autenticações, pois o foco está na acessibilidade e demonstração.
- O app pode ser facilmente integrado a sistemas mais robustos com backend e login.

---
## 📤 Deploy

Você pode subir esse projeto no [Vercel](https://vercel.com) facilmente:

1. Crie uma conta no Vercel.
2. Conecte seu repositório GitHub.
3. A Vercel detectará o uso de Next.js automaticamente.
4. Clique em **Deploy** e aguarde.

---

## 🧠 Aprendizados

Este projeto permitiu aos alunos aplicar conceitos como:

- Componentização em React
- Consumo de APIs externas
- Trabalhar com mapas geográficos
- UX focado em situações críticas

---

## 📌 Observações Finais

Este projeto é uma **prova de conceito**. Futuramente pode ser expandido com:

- Backend com banco de dados
- Cadastro de alertas em tempo real
- Integração com Defesa Civil
- App mobile com push notifications

---

💡 **SOS Localiza** — porque estar preparado faz toda a diferença!
