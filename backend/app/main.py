from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base, SessionLocal
from app.routers import auth
from app.models.usuario import Usuario
from app.core.auth import get_password_hash

Base.metadata.create_all(bind=engine)


def seed_test_users():
    db = SessionLocal()
    evaluators = [
        {"email": "admin@utn.edu.ar", "password": "admin123", "rol": "ADMIN"},
        {"email": "user@utn.edu.ar", "password": "user123", "rol": "USER"},
    ]

    for eval_user in evaluators:
        if not db.query(Usuario).filter(Usuario.email == eval_user["email"]).first():
            new_user = Usuario(
                email=eval_user["email"],
                hashed_password=get_password_hash(eval_user["password"]),
                rol=eval_user["rol"],
            )
            db.add(new_user)
    db.commit()
    db.close()


seed_test_users()

app = FastAPI(title="Parcial 2 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
