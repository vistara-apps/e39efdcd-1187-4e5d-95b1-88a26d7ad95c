# PayNoti - Base Mini App

Never miss a payment. Track everything, pay smarter.

## Overview

PayNoti is a smart payment notification and aggregation app for Web3 users built on Base. It helps users manage all their bills and subscriptions effortlessly with automated reminders, cross-platform aggregation, and intelligent spending insights.

## Features

### Core Features
- **Automated Payment Reminders**: Proactive notifications about upcoming bills and missed payments
- **Cross-Platform Payment Aggregation**: Unified dashboard for all payment obligations
- **Spending Anomaly Detection**: Identifies unusual spending patterns and potential fraud
- **Subscription Management**: Track and optimize recurring subscriptions

### Premium Features ($5/month)
- Advanced analytics and insights
- Subscription optimization recommendations
- Enhanced anomaly detection
- Priority support

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **State Management**: React hooks
- **Wallet Integration**: OnchainKit MiniKit

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd paynoti-base-miniapp
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```
Add your OnchainKit API key to `.env.local`

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main dashboard page
│   ├── providers.tsx      # MiniKit provider setup
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── AppShell.tsx       # Main app layout
│   ├── PaymentCard.tsx    # Payment item display
│   ├── NotificationBubble.tsx # Notification component
│   └── ...
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript interfaces
│   ├── utils.ts           # Helper functions
│   └── mock-data.ts       # Sample data
└── public/                # Static assets
```

## Key Components

### MiniKit Integration
The app uses OnchainKit's MiniKit for Base blockchain integration:
- Wallet connection
- Transaction monitoring
- Frame-ready notifications

### Data Model
- **User**: Wallet address, preferences, premium status
- **PaymentAccount**: Connected accounts and wallets
- **Transaction**: Payment records with due dates
- **Subscription**: Recurring payment tracking

### Design System
- **Colors**: Blue/purple gradient theme
- **Typography**: Clean, readable fonts
- **Components**: Glass morphism cards
- **Animations**: Smooth transitions and micro-interactions

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - OnchainKit API key for Base integration

## Deployment

The app is optimized for deployment on Vercel or similar platforms that support Next.js 15.

1. Build the application
```bash
npm run build
```

2. Deploy to your preferred platform
3. Set environment variables in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ for the Base ecosystem
