# DeerHacks

[![DeerHacks Banner](public/backgrounds/banner.jpg)](https://deerhacks.ca)

> DeerHacks Hackathon 2024 Dashboard

[![Build Status](https://api.netlify.com/api/v1/badges/e85686f6-63b4-4028-94f2-c27d34c488d7/deploy-status)](https://app.netlify.com/sites/deerhacks/deploys)
[![Website Status](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https%3A%2F%2Fdeerhacks.ca)](https://deerhacks.ca)

## Setup

1. Run `yarn install` to install dependencies
2. Install all the required workspace `@recommended` extensions
3. Add the required `.env` files from the discord / mcss drive

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Run the commands to catch any linting / type errors:

```bash
yarn lint
yarn check-types
```

Note that these commands are also run before pushing with `husky` and in our CI/CD pipeline with `GitHub Actions`.
