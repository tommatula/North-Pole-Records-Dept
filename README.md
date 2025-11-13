# North Pole Records Department 🎅

A fun holiday web app that analyzes wish lists and determines Nice/Naughty status with AI-generated poems!

## Quick Deploy to Vercel (5 minutes)

**IMPORTANT: The app currently says "North Pole Records Department" - you can easily change this to match your domain name later. It's just a text find-and-replace!**

### Step 1: Get Your Files Ready
All files are already in: `/home/claude/north-pole-app/`

### Step 2: Create a GitHub Repository

1. Go to https://github.com/new
2. Name it: `north-pole-records` (or whatever you want)
3. Make it **Public** or **Private** (your choice)
4. **DON'T** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 3: Download Your Files

You have two options:

**Option A: Download the entire folder**
1. I'll create a ZIP file for you to download
2. Extract it on your computer
3. Open Terminal (Mac) or Command Prompt (Windows)
4. Navigate to the extracted folder: `cd path/to/north-pole-app`

**Option B: Copy files manually**
1. Create a new folder on your computer called `north-pole-app`
2. Copy each file from `/home/claude/north-pole-app/` to your local folder
3. Make sure to maintain the folder structure (pages/, styles/, etc.)

### Step 4: Push to GitHub

In your terminal, inside the `north-pole-app` folder:

```bash
git init
git add .
git commit -m "Initial commit - North Pole Records"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/north-pole-records.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 5: Deploy to Vercel

1. Go to https://vercel.com/signup
2. Sign up with your GitHub account (easiest)
3. Click "Add New..." → "Project"
4. Import your `north-pole-records` repository
5. Vercel will auto-detect it's a Next.js project
6. Click "Deploy" (that's it!)

**Deployment takes ~2 minutes**

### Step 6: Add Your Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain: `northpolerecords.com` (or whatever you bought)
4. Follow Vercel's instructions to update your domain's DNS settings
5. Wait 5-10 minutes for DNS to propagate

## Project Structure

```
north-pole-app/
├── pages/
│   ├── index.js          # Main app component
│   └── _app.js           # Next.js app wrapper
├── styles/
│   └── globals.css       # Tailwind CSS styles
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind configuration
└── postcss.config.js     # PostCSS configuration
```

## Making Updates

After deployment, to make changes:

1. Edit the code in your local folder
2. Test locally: `npm run dev` (runs on http://localhost:3000)
3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. Vercel will automatically redeploy! (takes ~30 seconds)

### Changing the App Name/Branding

To change "North Pole Records Department" to match your domain:

1. Open `pages/index.js` in a text editor
2. Find and replace all instances of:
   - "North Pole Records Department" → "Your New Name"
   - "Records Department" → "Your Short Name"
3. Save, commit, and push
4. Done!

Common replacements:
- santasdesk.app → "Santa's Desk"
- northpolerecordsdept.app → "North Pole Records Dept."
- santasfiles.app → "Santa's Files"

## Features

- ✅ AI-powered Nice/Naughty analysis with custom poems
- ✅ Personalized name input
- ✅ Santa chat feature (may have rate limits in artifact testing)
- ✅ Family-friendly humor with tight safety guardrails
- ✅ Responsive design works on mobile and desktop
- ✅ Handles tricky wishes (siblings, superpowers, emotional topics)

## Troubleshooting

**Issue: API calls failing (529 errors)**
- This is rate limiting from Anthropic API
- Add retry logic or wait between requests
- Consider upgrading API plan if going viral

**Issue: Site not updating after deploy**
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Check Vercel deployment logs for errors

**Issue: Domain not working**
- DNS can take 24-48 hours to fully propagate
- Use Vercel's temporary URL in the meantime

## Cost Estimate

- **Hosting (Vercel):** FREE for personal projects
- **Domain:** ~$12/year
- **Claude API:** ~$0.01 per user (cheap!)
  - 1,000 users = ~$10
  - 10,000 users = ~$100
  - 100,000 users = ~$1,000

## Support

Having trouble? Check:
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
- GitHub issues in your repo

Built with ❤️ for the holidays!
