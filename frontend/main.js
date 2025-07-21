
/*
async function carregarEstudantes() {
    const resposta = await fetch('http://localhost:3000/api/estudantes');
    const estudantes = await resposta.json();
    const lista = document.getElementById('lista-estudantes');
    lista.innerHTML = '<ul>' + estudantes.map(e => `<li>${e.nome} (${e.matricula})</li>`).join('') + '</ul>';
}
*/
async function carregarEstudantes() {
    const resposta = await fetch('http://localhost:3000/api/estudantes');
    const estudantes = await resposta.json();
    const lista = document.getElementById('lista-estudantes');
    if (Array.isArray(estudantes)) {
        lista.innerHTML = '<ul>' + estudantes.map(e => 
            `<li>${e.nome} (${e.matricula})</li>`
        ).join('') + '</ul>';
    } else {
        lista.innerHTML = 'Nenhum estudante encontrado ou erro na API.';
    }
}

function abrirFormulario(tipo) {
    // Exemplo de formulário para cadastrar estudante
    if (tipo === 'estudante') {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-estudante" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;display:flex;align-items:center;justify-content:center;">
                <form id="form-estudante" style="background:#fff;padding:20px;border-radius:8px;">
                    <h3>Cadastrar Estudante</h3>
                    <input type="text" id="nome" placeholder="Nome" required><br><br>
                    <input type="text" id="matricula" placeholder="Matrícula" required><br><br>
                    <input type="text" id="sexo" placeholder="Sexo"><br><br>
                    <input type="date" id="nascimento" placeholder="Data de Nascimento"><br><br>
                    <input type="text" id="telefone" placeholder="Telefone"><br><br>
                    <input type="email" id="email" placeholder="Email"><br><br>
                    <input type="number" id="curso_id" placeholder="ID do Curso"><br><br>
                    <button type="submit">Cadastrar</button>
                    <button type="button" onclick="fecharModal()">Cancelar</button>
                </form>
            </div>
        `);
        document.getElementById('form-estudante').onsubmit = async function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const matricula = document.getElementById('matricula').value;
            const sexo = document.getElementById('sexo').value;
            const nascimento = document.getElementById('nascimento').value;
            const telefone = document.getElementById('telefone').value;
            const email = document.getElementById('email').value;
            const curso_id = document.getElementById('curso_id').value;
            // Validar campos obrigatórios
            if (!nome || !matricula) {
                alert('Nome e Matrícula são obrigatórios!');
                return;
            }
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@ ]+$/;
            if (email && !emailRegex.test(email)) {
                alert('Email inválido!');
                return;
            }
            // Enviar dados do estudante para a API
            await fetch('http://localhost:3000/api/estudantes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, matricula, sexo, nascimento, telefone, email, curso_id }) // Enviar dados do estudante
            });
            fecharModal();
            carregarEstudantes();
        }
    }
    // Exemplo de formulário para cadastrar curso
    if (tipo === 'curso') {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-curso" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;display:flex;align-items:center;justify-content:center;">
                <form id="form-curso" style="background:#fff;padding:20px;border-radius:8px;">
                    <h3>Cadastrar Curso</h3>
                    <input type="text" id="nome" placeholder="Nome do Curso" required><br><br>
                    <input type="text" id="nivel" placeholder="Nível do Curso"><br><br>
                    <input type="date" id="ano_inicio" placeholder="Ano de Início"><br><br>
                    <button type="submit">Cadastrar</button>
                    <button type="button" onclick="fecharModal()">Cancelar</button>
                </form>
            </div>
        `);
        document.getElementById('form-curso').onsubmit = async function(e) {
            e.preventDefault();
            const nomeCurso = document.getElementById('nome').value;
            const nivelCurso = document.getElementById('nivel').value;
            const anoInicio = document.getElementById('ano_inicio').value;
            // Enviar dados do curso para a API
            await fetch('http://localhost:3000/api/cursos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: nomeCurso, nivel: nivelCurso, ano_inicio: anoInicio }) // Enviar dados do curso
            });
            fecharModal();
            carregarCursos(); // Função para atualizar a lista de cursos
        }
    }
}

function fecharModal() {
    const modal = document.getElementById('modal-estudante');
    if (modal) modal.remove();
}

// Carregar estudantes ao abrir a página
window.onload = carregarEstudantes;
document.getElementById('cadastrar-estudante').addEventListener('click', () => abrirFormulario('estudante'));
document.getElementById('cadastrar-curso').addEventListener('click', () => abrirFormulario('curso'));
