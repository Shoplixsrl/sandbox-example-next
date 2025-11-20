# E-Commerce Next.js - Production Ready

A modern, production-ready e-commerce platform built with Next.js 15, following TDD principles.

## Tech Stack

### Core
- **Framework**: Next.js 16 (App Router, React Server Components, Server Actions)
- **Runtime**: Bun
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS + shadcn/ui

### Database & Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Cache**: Redis (sessions, rate limiting, cart caching)
- **Search**: Elasticsearch/OpenSearch (planned)
- **File Storage**: S3-compatible (planned)

### Authentication & Payments
- **Auth**: NextAuth v5 (OAuth2, magic link, JWT)
- **Payments**: Stripe

### Testing
- **Unit/Integration**: Bun test + Testing Library
- **E2E**: Playwright
- **Load**: k6 (planned)
- **Contract**: Pact (planned)

### Deployment & Monitoring
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel / Kubernetes
- **Monitoring**: OpenTelemetry (planned)
- **Logging**: Pino

## Getting Started

### Prerequisites

- Bun >= 1.0
- PostgreSQL >= 14
- Redis >= 6

### Installation

\`\`\`bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env

# Configure your .env file with actual values

# Run database migrations
bun db:generate
bun db:migrate

# Start development server
bun dev
\`\`\`

### Database Setup

\`\`\`bash
# Generate migrations from schema
bun db:generate

# Apply migrations
bun db:migrate

# Push schema changes (dev only)
bun db:push

# Open Drizzle Studio
bun db:studio
\`\`\`

## Development

### Running Tests

\`\`\`bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run E2E tests
bun test:e2e

# Run load tests
bun test:load
\`\`\`

### Code Quality

\`\`\`bash
# Type checking
bun typecheck

# Linting
bun lint

# Formatting
bun format
bun format:check
\`\`\`

### Development Server

\`\`\`bash
# Start dev server with Turbopack
bun dev

# Build for production
bun build

# Start production server
bun start
\`\`\`

## Project Structure

\`\`\`
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (marketing)/  # Marketing pages
│   │   ├── (store)/      # Store pages
│   │   ├── dashboard/    # Admin dashboard
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── features/    # Feature components
│   ├── db/              # Database
│   │   ├── schema/      # Drizzle schema
│   │   └── migrations/  # DB migrations
│   ├── lib/             # Utilities
│   ├── hooks/           # React hooks
│   ├── actions/         # Server actions
│   ├── types/           # TypeScript types
│   └── config/          # Configuration
├── tests/
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests
│   ├── e2e/             # E2E tests
│   └── load/            # Load tests
└── public/              # Static assets
\`\`\`

## Features

### Implemented
- ✅ Bun runtime setup
- ✅ TypeScript strict mode
- ✅ Drizzle ORM with complete schema
- ✅ Redis caching layer
- ✅ shadcn/ui design system
- ✅ Test environment (Bun test + Playwright)

### In Progress
- 🚧 NextAuth v5 authentication
- 🚧 Product API routes
- 🚧 Shopping cart
- 🚧 Checkout flow
- 🚧 Admin panel

### Planned
- ⏳ Elasticsearch integration
- ⏳ Stripe payment processing
- ⏳ Image optimization
- ⏳ Email notifications
- ⏳ Order management
- ⏳ Analytics dashboard
- ⏳ CI/CD pipelines
- ⏳ Docker + Kubernetes deployment

## Database Schema

The database includes the following main entities:

- **Users & Auth**: Users, accounts, sessions, verification tokens, addresses
- **Products**: Products, variants, categories, images, reviews
- **Shopping**: Carts, cart items
- **Orders**: Orders, order items, payments, refunds
- **Inventory**: Inventory movements, alerts
- **Audit**: Audit logs

## API Routes

### Products
- \`GET /api/products\` - List products with filters
- \`GET /api/products/[id]\` - Get product details
- \`POST /api/products\` - Create product (admin)
- \`PATCH /api/products/[id]\` - Update product (admin)

### Cart
- \`GET /api/cart\` - Get user cart
- \`POST /api/cart\` - Add item to cart
- \`PATCH /api/cart/[id]\` - Update cart item
- \`DELETE /api/cart/[id]\` - Remove cart item

### Orders
- \`GET /api/orders\` - List user orders
- \`GET /api/orders/[id]\` - Get order details
- \`POST /api/checkout\` - Create order

### Payments
- \`POST /api/payments/webhook\` - Stripe webhook

## Contributing

This project follows TDD principles:
1. Write failing tests first
2. Implement minimal code to pass tests
3. Refactor while keeping tests green

## License

MIT
