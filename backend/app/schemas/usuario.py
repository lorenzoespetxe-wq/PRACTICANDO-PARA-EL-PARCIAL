from pydantic import BaseModel, EmailStr


class UsuarioBase(BaseModel):
    email: EmailStr
    rol: str = "USER"


class UsuarioCreate(UsuarioBase):
    password: str


class Usuario(UsuarioBase):
    id: int

    class Config:
        from_attributes = True
