document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const taskForm = document.getElementById('taskForm');
    const fetchTasksBtn = document.getElementById('fetchTasksBtn');
    const fetchTodayTasksBtn = document.getElementById('fetchTodayTasksBtn');
    const taskList = document.getElementById('taskList');
    const loginMessage = document.getElementById('loginMessage');
    const taskMessage = document.getElementById('taskMessage');
    const fetchAllTasksBtn = document.getElementById('fetchAllTasksBtn');
    // fetchAllTasksBtn

    const apiUrl = 'http://localhost:3000/api'; // Altere conforme a configuração do seu servidor

    // Função para enviar requisições para a API
    async function apiRequest(endpoint, method = 'GET', body = null) {
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const data = await apiRequest('login', 'POST', { email, password });
                localStorage.setItem('token', data.token);
                loginMessage.textContent = 'Login bem-sucedido!';
                window.location.href = 'tasks.html'; // Redirecionar para a página de tarefas
            } catch (error) {
                loginMessage.textContent = `Erro: ${error.message}`;
            }
        });
    }

    // Criação de Tarefas
    if (taskForm) {
        taskForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            const startTime = document.getElementById('startTime').value;
            const endTime = document.getElementById('endTime').value;

            try {
                await apiRequest('tasks', 'POST', { name, description, startDate, endDate, startTime, endTime });
                taskMessage.textContent = 'Tarefa criada com sucesso!';
                taskForm.reset();
            } catch (error) {
                taskMessage.textContent = `Erro: ${error.message}`;
            }
        });
        
    }

    // Buscar Tarefas Relevantes
    if (fetchTasksBtn) {
        fetchTasksBtn.addEventListener('click', async () => {
            try {
                const tasks = await apiRequest('tasks/relevant');
                taskList.innerHTML = tasks.map(task => `
                    <li>
                        <strong>${task.name}</strong><br>
                        Descrição: ${task.description}<br>
                        Data Inicial: ${new Date(task.startDate).toLocaleDateString()}<br>
                        Data Final: ${new Date(task.endDate).toLocaleDateString()}<br>
                        Hora Inicial: ${new Date(task.startTime).toLocaleTimeString()}<br>
                        Hora Final: ${new Date(task.endTime).toLocaleTimeString()}
                    </li>
                `).join('');
            } catch (error) {
                taskList.innerHTML = `Erro: ${error.message}`;
            }
        });
    }

    // Buscar Tarefas do Dia
    if (fetchTodayTasksBtn) {
        fetchTodayTasksBtn.addEventListener('click', async () => {
            try {
                const tasks = await apiRequest('tasks/today');
                taskList.innerHTML = tasks.map(task => `
                    <li>
                        <strong>${task.name}</strong><br>
                        Descrição: ${task.description}<br>
                        Data Inicial: ${new Date(task.startDate).toLocaleDateString()}<br>
                        Data Final: ${new Date(task.endDate).toLocaleDateString()}<br>
                        Hora Inicial: ${new Date(task.startTime).toLocaleTimeString()}<br>
                        Hora Final: ${new Date(task.endTime).toLocaleTimeString()}
                    </li>
                `).join('');
            } catch (error) {
                taskList.innerHTML = `Erro: ${error.message}`;
            }
        });
    }

    if(fetchAllTasksBtn){

        fetchAllTasksBtn.addEventListener("click", async()=>{

        
                // Obtenha o token do localStorage
        const token = localStorage.getItem('token');

        // Crie os headers da requisição
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        // Defina a URL da API
        const apiUrl = 'http://localhost:3000/api/tasks/all';

        // Faça a requisição GET
        fetch(apiUrl, {
            method: 'GET',
            headers: headers
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {

            taskList.innerHTML = data.map(task => `
                <li>
                    <strong>${task.name}</strong><br>
                    Descrição: ${task.description}<br>
                    Data Inicial: ${new Date(task.startDate).toLocaleDateString()}<br>
                    Data Final: ${new Date(task.endDate).toLocaleDateString()}<br>
                    Hora Inicial: ${new Date(task.startTime).toLocaleTimeString()}<br>
                    Hora Final: ${new Date(task.endTime).toLocaleTimeString()}
                </li>
            `).join('');
            console.log('Success:', data);
        })
        .catch(error => {
            // Manipule os erros da requisição
            console.error('There was a problem with the fetch operation:', error);
        });

    })

    }
});



// fetchAllTasksBtn