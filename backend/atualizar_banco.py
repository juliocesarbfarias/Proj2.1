from database import engine
from models import Base

# Importar o User é essencial para o sistema reconhecer a nova tabela
from models import User 

print("Conectando ao banco de dados existente...")

# O create_all é inteligente: ele olha o banco. 
# Se a tabela 'historico_simulados' já existe, ele não toca nela.
# Se a tabela 'users' não existe, ele cria.
Base.metadata.create_all(bind=engine)

print("---------------------------------------------------")
print("SUCESSO! A tabela 'users' foi criada.")
print("Seu histórico de simulados antigos continua salvo.")
print("---------------------------------------------------")