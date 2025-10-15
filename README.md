# AuthentiCode AI 🧩

**Your Code, Verified.**

A full-stack SaaS platform that detects AI-generated code and text across any programming language using advanced AI detection APIs.

## 🚀 Features

- **Multi-API Detection**: Integrates GPTZero, Copyleaks, and Hive Moderation
- **Universal Support**: Detects AI in Python, JavaScript, C++, Java, and text files
- **Credit System**: 15 free credits per user, then pay-as-you-go
- **Stripe Integration**: Flexible pricing with subscription options
- **Real-time Analysis**: Confidence scores with detailed explanations
- **User Dashboard**: Track usage, view history, manage subscriptions

## 💰 Pricing

- **Free Tier**: 15 detections
- **Pay-per-use**: $5 = 100 credits
- **Personal**: $19/month = Unlimited personal use
- **Team**: $49/month = Team features + API access

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Hosting**: Vercel (Frontend) + Render (Backend)
- **AI APIs**: GPTZero, Copyleaks, Hive Moderation

## 🏗️ Project Structure

```
authenticode-ai/
├── frontend/          # Next.js React app
├── backend/           # FastAPI Python server
├── database/          # SQL schemas and migrations
├── docs/              # Documentation
└── deploy/            # Deployment configs
```

## 🚀 Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## 📊 API Endpoints

- `POST /api/detect` - AI detection analysis
- `GET /api/credits` - User credit balance
- `POST /api/payment` - Stripe payment processing
- `GET /api/history` - Detection history

## 🔒 Security Features

- Input sanitization
- Rate limiting (10 requests/min)
- Result caching
- Secure file uploads

## 📈 Roadmap

- [ ] Batch file processing
- [ ] AI model identification
- [ ] PDF report generation
- [ ] Enterprise API keys
- [ ] Referral system

## 📄 License

MIT License - see LICENSE file for details.