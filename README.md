<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 900px; margin: 40px auto;">

  <h1>Calcify</h1>
  <p>
    <strong>Calcify</strong> is an AI-powered mathematics problem solver inspired by modern educational tools such as PhotoMath.
    It provides instant solutions with step-by-step explanations through a modern, responsive, and user-friendly interface.
    The system is designed to assist students and professionals by combining artificial intelligence, OCR, and symbolic mathematics.
  </p>

  <hr />

  <h2>Overview</h2>
  <p>
    Calcify enables users to upload or type mathematical expressions, which are processed using an AI reasoning engine and OCR recognition.
    It offers both symbolic and numeric computation capabilities while maintaining a clean, distraction-free design.
  </p>

  <h2>Key Features</h2>
  <ul>
    <li>AI-based math problem solving with detailed reasoning</li>
    <li>OCR (Optical Character Recognition) for image-based equation detection</li>
    <li>Step-by-step explanation engine powered by AI models</li>
    <li>Equation editor and symbolic computation</li>
    <li>Dashboard for performance tracking and solved history</li>
    <li>Responsive layout for web and mobile devices</li>
    <li>Modern, minimal interface using a scientific color palette (#022B3A, #1F7A8C, #BFDBF7, #E1E5F2, #FFFFFF)</li>
  </ul>

  <h2>Technology Stack</h2>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
    <tr>
      <th>Category</th>
      <th>Technologies</th>
    </tr>
    <tr>
      <td>Frontend</td>
      <td>React.js / Next.js 16, TypeScript, Tailwind CSS, shadcn/ui</td>
    </tr>
    <tr>
      <td>Backend</td>
      <td>Python (FastAPI) or Node.js (Express)</td>
    </tr>
    <tr>
      <td>AI & OCR</td>
      <td>Tesseract OCR, OpenAI API, SymPy</td>
    </tr>
    <tr>
      <td>Database</td>
      <td>Supabase / PostgreSQL</td>
    </tr>
    <tr>
      <td>Deployment</td>
      <td>Vercel (Frontend) and Railway or Render (Backend)</td>
    </tr>
  </table>

  <h2>Folder Structure</h2>
  <pre style="background:#f5f5f5; padding:15px; border-radius:5px;">
calcify/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── solve/
│   │   ├── login/
│   │   └── settings/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── styles/
├── public/
├── .env.local
├── package.json
└── README.md
  </pre>

  <h2>Installation</h2>
  <ol>
    <li>
      <strong>Clone the repository</strong><br />
      <code>git clone https://github.com/Sahancoder/Calcify-.git</code><br />
      <code>cd Calcify-</code>
    </li>
    <li>
      <strong>Install dependencies</strong><br />
      <code>npm install</code>
    </li>
    <li>
      <strong>Run the development server</strong><br />
      <code>npm run dev</code>
    </li>
    <li>
      Visit <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>
    </li>
  </ol>

  <h2>Future Enhancements</h2>
  <ul>
    <li>Handwritten equation recognition</li>
    <li>3D graph visualization and interactive plots</li>
    <li>Voice input and speech-to-math functionality</li>
    <li>PDF and image export of solution reports</li>
    <li>AI tutor assistant for learning support</li>
  </ul>

  <h2>Author</h2>
  <p>
    Developed by <strong>Sahan Kodithuwakku (Sahancoder)</strong><br />
    GitHub: <a href="https://github.com/Sahancoder" target="_blank">https://github.com/Sahancoder</a>
  </p>

  <h2>License</h2>
  <p>
    This project is licensed under the MIT License.  
    You are free to use, modify, and distribute this software with proper attribution.
  </p>

  <blockquote>
    “Empower your learning. Simplify your math with precision.”
  </blockquote>

</body>
</html>
