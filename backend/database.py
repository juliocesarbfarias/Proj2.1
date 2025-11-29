# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Nome do arquivo do banco de dados (será criado automaticamente)
SQLALCHEMY_DATABASE_URL = "sqlite:///./simulados.db"

# Cria a conexão
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Cria a sessão (o canal de comunicação)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para criar os modelos
Base = declarative_base()