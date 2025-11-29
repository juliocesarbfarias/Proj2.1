# backend/models.py
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class SimuladoDB(Base):
    __tablename__ = "historico_simulados"
    id = Column(Integer, primary_key=True, index=True)
    vestibular = Column(String, index=True)
    materia = Column(String)
    dificuldade = Column(String)
    num_questoes = Column(Integer)
    data_criacao = Column(DateTime, default=datetime.utcnow)

# --- ADICIONE ISTO NO FINAL: ---
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="free")