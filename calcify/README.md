# 🧮 Calcify – Scan • Solve • Learn

**Calcify** is a mobile-first progressive web app (PWA) that lets you scan mathematical equations, solve them instantly, and understand the steps. Built with **Next.js 16**, **FastAPI**, **Tesseract OCR**, and **SymPy**.

## 📱 Features

- 📸 **Camera Capture** – Point, crop, capture
- 🤖 **OCR Recognition** – Tesseract extracts equations from images
- ✅ **Smart Solver** – SymPy solves equations, returns LaTeX + steps
- 📊 **Step-by-Step** – Understand each algebraic operation
- 🌐 **PWA Ready** – Install on Android, iOS, desktop
- ⚡ **Offline Mode** – UI works offline; results cached
- 🎨 **Beautiful UI** – Tailwind CSS, responsive, dark mode support
- 🔐 **Secure** – Supabase auth, Row-Level Security on data

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Python** 3.11+
- **Tesseract OCR** (system dependency)

### 1) Install Tesseract

**macOS:**
```bash
brew install tesseract
```

**Ubuntu/Debian:**
```bash
sudo apt install -y tesseract-ocr libgl1
```

**Windows:**
Download from [UB Mannheim Tesseract](https://github.com/UB-Mannheim/tesseract/wiki) and ensure it's in your PATH.

### 2) Backend (API)

```bash
cd api
python -m venv .venv

# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Test: `http://localhost:8000/health` → `{"ok": true}`

### 3) Frontend (Web)

```bash
cd web
cp .env.local.example .env.local
# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8000

npm install
npm run dev
```

Open `http://localhost:3000/solve` → allow camera → scan an equation → see the solution!

---

## 📦 Project Structure

```
calcify/
├─ web/                    # Next.js 16 PWA
│  ├─ app/                 # App Router (layout, page, solve)
│  ├─ components/          # BottomSheet, CropOverlay, Fab
│  ├─ lib/                 # api.ts, colors.ts
│  ├─ public/              # manifest.json, icons/
│  ├─ styles/              # globals.css, Tailwind
│  ├─ next.config.mjs      # next-pwa config
│  ├─ package.json
│  └─ .env.local.example
│
├─ api/                    # FastAPI + OCR + Solver
│  ├─ app/
│  │  ├─ main.py           # FastAPI app, CORS
│  │  ├─ routers/          # health, ocr, solve endpoints
│  │  └─ services/         # preprocess, ocr_engine, solver
│  ├─ requirements.txt
│  ├─ gunicorn_conf.py
│  └─ Dockerfile
│
├─ db/
│  ├─ 001_init.sql         # Schema (users, problems, bookmarks)
│  └─ 002_rls.sql          # Row-Level Security
│
├─ .github/workflows/
│  ├─ web-ci.yml           # Build & deploy to Vercel
│  └─ api-ci.yml           # Build & deploy to Render/Railway
│
└─ README.md
```

---

## 🌍 Deployment

### Frontend → Vercel

1. Push your code to GitHub
2. Connect `web/` folder to Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://<your-api-domain>`
4. Deploy → PWA ready!

### Backend → Render or Railway

1. Create a new service from the `api/` folder
2. Use the provided `Dockerfile` (installs Tesseract)
3. Set start command: `gunicorn --config gunicorn_conf.py app.main:app`
4. Render/Railway will auto-build and deploy

### Database → Supabase (optional)

1. Create Supabase project
2. Run migrations (`db/001_init.sql` and `db/002_rls.sql`)
3. Bookmark history + user accounts enabled

---

## 🎨 Brand Colors

```
Primary:      #022B3A (Deep ink)
Accent:       #1F7A8C (Teal)
Surface:      #E1E5F2 (Light)
Soft Blue:    #BFDBF7 (Info)
White:        #FFFFFF
```

---

## 📚 API Endpoints

### Health
```
GET /api/health
→ { "ok": true }
```

### Solve (Main)
```
POST /solve
Content-Type: application/json
Body: { "image": "data:image/jpeg;base64,..." }
→ { 
    "latex": "3(x+6)=24",
    "result": "x = 2",
    "steps": ["...", "...", "..."]
  }
```

### OCR Extract
```
POST /ocr/extract
Content-Type: multipart/form-data
File: image.jpg
→ { "success": true, "equation": "3x+6=24", "confidence": 0.92 }
```

---

## 🔧 Configuration

### Environment Variables

**web/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**api/** (via container env)
```
PORT=8000
```

---

## 🧪 Testing

### Backend
```bash
cd api
pip install pytest
pytest
```

### Frontend
```bash
cd web
npm run build
npm run lint
```

---

## 📝 Next Steps (Optional)

- Add Supabase auth (email/OTP signup)
- Enable handwriting OCR with TrOCR
- Animated steps with KaTeX + Framer Motion
- User dashboard with history & bookmarks
- Analytics on solving patterns

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. PR to `main`

---

## 📄 License

MIT License – see LICENSE file.

---

## ❓ Troubleshooting

**Camera not working?**
- Use HTTPS (required for `getUserMedia`)
- Check browser permissions
- Try Chrome/Edge on Windows, Safari on iOS

**"Tesseract not found"?**
- Install Tesseract on your OS (see Prerequisites)
- Or deploy with Docker (Dockerfile included)

**Slow solve?**
- Keep image < 1 MB
- Ensure good lighting
- Client crop improves OCR accuracy

**CORS error?**
- In production, update `api/app/main.py` to restrict CORS to your Vercel domain

---

## 🙋 Support

Questions? Open an issue on GitHub or reach out.

Happy solving! 🎓
