# Smart Parent AI

A comprehensive AI-powered parenting assistant that helps parents manage their children's education, track progress, and provide personalized learning support.

## 🌟 Features

### 🎯 **Core Functionality**
- **Multi-Child Dashboard**: Manage multiple children from a single parent account
- **AI-Powered Learning Plans**: Personalized study schedules and recommendations
- **Smart Homework Scanner**: Upload homework photos for instant AI assistance
- **Progress Tracking**: Real-time insights into academic performance
- **Intelligent Notifications**: Context-aware alerts and reminders

### 🔐 **Authentication & Security**
- **Google OAuth Integration**: Secure sign-in with Google accounts
- **Row-Level Security**: Each parent can only access their own data
- **Multi-Device Sync**: Seamless data synchronization across devices
- **Extensible Auth**: Ready for OTP and Apple Sign-In integration

### 📱 **User Experience**
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Dark Mode Support**: Automatic theme switching
- **Multi-Language Ready**: Currently English, with support for Indian languages
- **Intuitive Navigation**: Clean, modern interface with smooth transitions

## 🛠️ Technology Stack

### **Frontend**
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for fast development

### **Backend & Database**
- **Supabase** for backend services
- **PostgreSQL** with Row-Level Security
- **Real-time subscriptions** for live data updates
- **Edge Functions** for serverless computing

### **Authentication**
- **Supabase Auth** with OAuth providers
- **Google OAuth 2.0** integration
- **JWT tokens** with automatic refresh
- **PKCE flow** for enhanced security

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-parent-ai.git
   cd smart-parent-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp src/.env.example .env
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration files in `supabase/migrations/`
   - Configure Google OAuth in Authentication → Providers

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📊 Database Schema

### **Parents Table**
```sql
- id (uuid, primary key)
- google_id (text, unique)
- first_name (text)
- last_name (text)
- email (text, unique)
- phone (text)
- created_at (timestamp)
```

### **Children Table**
```sql
- id (uuid, primary key)
- parent_id (uuid, foreign key)
- first_name (text)
- last_name (text)
- dob (date)
- grade (text)
- board (text)
- subjects (jsonb)
- created_at (timestamp)
```

### **Preferences Table**
```sql
- id (uuid, primary key)
- parent_id (uuid, foreign key)
- language_preference (text)
- notifications_on (boolean)
- whatsapp_on (boolean)
- created_at (timestamp)
```

## 🔄 Onboarding Flow

1. **Welcome Screen** - Introduction to Smart Parent AI
2. **Authentication** - Google OAuth sign-in
3. **Profile Setup** - Parent details and children information
4. **Language Selection** - Choose preferred language
5. **Permissions** - Configure notifications and integrations
6. **Welcome Dashboard** - Personalized completion

## 📱 App Structure

```
src/
├── components/
│   ├── onboarding/          # Onboarding flow components
│   ├── tabs/                # Main app tabs
│   ├── layout/              # Layout components
│   └── common/              # Shared components
├── services/                # API and business logic
├── lib/                     # Configuration and utilities
├── types/                   # TypeScript type definitions
└── styles/                  # Global styles
```

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **Code Style**
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Conventional commits for git history

## 🚀 Deployment

### **Netlify (Recommended)**
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### **Vercel**
1. Import project from GitHub
2. Configure build settings automatically detected
3. Add environment variables in project settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend platform
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **React Team** for the amazing framework

## 📞 Support

For support, email support@smartparentai.com or join our Discord community.

---

**Made with ❤️ for parents who want the best for their children's education**