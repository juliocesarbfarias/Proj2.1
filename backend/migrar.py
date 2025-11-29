from database import engine
from models import Base, User
print("Atualizando banco de dados...")
Base.metadata.create_all(bind=engine)
print("Pronto! Tabela de usuários criada.")