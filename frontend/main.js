
async function carregarEstudantes() {
    const resposta = await fetch('http://localhost:3000/api/estudantes');
    const estudantes = await resposta.json();
    const lista = document.getElementById('lista-estudantes');
    lista.innerHTML = '<ul>' + estudantes.map(e => `<li>${e.nome} (${e.matricula})</li>`).join('') + '</ul>';
}

// Exemplo de formulário simples para cadastrar estudante
function abrirFormulario(tipo) {
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
            await fetch('http://localhost:3000/api/estudantes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, matricula })
            });
            fecharModal();
            carregarEstudantes();
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
