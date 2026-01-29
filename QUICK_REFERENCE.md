# Quick Reference

## Admin Dashboard Access
- **URL**: http://localhost:3000/admin
- **Password**: `tingroupadmin2024`

## Contact Form
- **URL**: http://localhost:3000/contact

## Database Configuration
1. Create Supabase project: https://supabase.com
2. Run the SQL script from SETUP_GUIDE.md in your SQL editor
3. Get credentials from Settings → API

## Email Configuration
1. Enable 2FA on Gmail: https://myaccount.google.com/account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows"

## Environment File Location
`tin-cleaning-website/.env.local`

### Template:
```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your_app_password
NOTIFICATION_EMAIL=your-email@gmail.com
```

## Development
- **Start server**: `npm run dev`
- **Build**: `npm run build`
- **Port**: http://localhost:3000

## Emergency: Reset Everything
```powershell
cd "c:\Users\LONER\Desktop\TIN GROUP\tin-cleaning-website"
npm run dev
```
