# Parcial 2 - para correr

# Back

docker compose up -d

cd backend

macOS/Linux:
python -m venv .venv
source .venv/bin/activate

Windows:
python -m venv .venv
.venv\Scripts\activate

pip install -r requirements.txt
uvicorn app.main:app --reload


# Front

cd frontend
npm install
npm run dev

El front está en http://localhost:5173.

# Credenciales

Admin:
Email: admin@utn.edu.ar
Password: admin123

User:
Email: user@utn.edu.ar
Password: user123