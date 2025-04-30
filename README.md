# 🌐 Serverless Translation App

A full-stack serverless web application that translates text using a self-hosted translation engine on docker. Built with Next.js, AWS Lambda (simulated using LocalStack), and Dockerized infrastructure for both frontend and backend development.

## 🚀 Features

- 🧑‍💻 **Frontend** built with [Next.js](https://nextjs.org/) using App Router
- 🔐 **Authentication** via NextAuth.js with SSR support
- 🌍 **Text Translation** powered by self-hosted [Apertium] API in Docker
- 🧠 **Serverless Functions** (AWS Lambda) for handling translation logic: (Lambda, DynamoDB, API Gateway, S3)
- 🛠️ **Infrastructure-as-Code** with AWS CDK
- 📦 **Modular Project Structure** using monorepo setup

## 🐳 Dockerized Setup

- The app runs in a **Docker container** to support NextAuth.js SSR.
- **Apertium**, the translation engine, is also self-hosted in a separate Docker container.
- **LocalStack** is used to simulate AWS services locally for development and testing.

## 🔧 Technologies Used

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Auth**: NextAuth.js (with SSR + Docker support)
- **Backend**: AWS Lambda (in `packages/lambdas`)
- **Dev Tools**: LocalStack, Docker, AWS CDK

-
## 🧱 Architecture
project/
├── frontend/
│   └── apps/
│       ├── src/
│       ├── public/
│       ├── .env.local
│       └── Dockerfile       <-- Dockerized SSR for Next.js + NextAuth
├── packages/
│   ├── shared-types/        <-- Shared TypeScript types
│   ├── lambdas/             <-- AWS Lambda functions for backend logic
│   └── lambda-layers/       <-- Shared Lambda layers (e.g., for utilities/dependencies)
├── infrastructure/          <-- CDK infra (ignored in Git)
├── .gitignore
├── package.json
└── README.md

---
