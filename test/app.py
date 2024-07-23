token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyMTc0ODg2NCwiZXhwIjoxNzIxNzUyNDY0fQ.epCFMm6-8MEum1q02ufniD5isRkty2DVx3rEGmn0zng'


import requests
from datetime import datetime

# URL base da API
BASE_URL = 'http://localhost:3000/api/tasks'

# Token JWT para autenticação
TOKEN = token  # Substitua pelo seu token real

# Cabeçalhos da requisição
HEADERS = {
    'Authorization': f'Bearer {TOKEN}',
    'Content-Type': 'application/json'
}


def fetch_today_tasks():
    try:
        today = datetime.now().date().isoformat()
        response = requests.get(f'{BASE_URL}/today', headers=HEADERS, params={'date': today})
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f'Erro ao buscar tarefas do dia: {e}')
        return None

def fetch_relevant_tasks():
    try:
        response = requests.get(f'{BASE_URL}/relevant', headers=HEADERS)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f'Erro ao buscar tarefas relevantes: {e}')
        return None

# Exemplo de uso
if __name__ == '__main__':

    print("\nBuscando tarefas do dia...")
    today_tasks = fetch_today_tasks()
    print("Tarefas do dia:", today_tasks)

    print("\nBuscando tarefas relevantes...")
    relevant_tasks = fetch_relevant_tasks()
    print("Tarefas relevantes:", relevant_tasks)
