
/*
* Este arquivo é responsável por toda a lógica do frontend da aplicação, incluindo a abertura e manipulação de formulários modais para cadastro, 
* edição e exclusão de estudantes, cursos, categorias e requerimentos. Ele também gerencia a geração e exibição de relatórios, 
* faz requisições à API backend para buscar e enviar dados, valida campos dos formulários e formata informações para apresentação ao usuário. 
* Além disso, contém funções utilitárias para manipulação de modais e formatação de datas.
*/


async function abrirFormulario(tipo) {
    // Formulário para cadastrar estudante
    if (tipo === 'estudante') {
        // Buscar cursos para preencher o select
        const respostaCursos = await fetch('http://localhost:3000/api/cursos');
        const cursos = await respostaCursos.json();
        const selectCurso = `<select id="curso_id" required>
            <option value="">Selecione o curso</option>
            ${cursos.map(c => `<option value="${c.id}">${c.id} - ${c.nome}</option>`).join('')}
        </select>`;

        document.body.insertAdjacentHTML('beforeend', `
                    <div id="modal-estudante" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;display:flex;align-items:center;justify-content:center;">
                        <form id="form-estudante" style="background:#fff;padding:20px;border-radius:8px;">
                            <h3>Cadastrar Estudante</h3>
                            <input type="text" id="nome" placeholder="Nome" required style="width:350px;"><br><br>
                            <input type="text" id="matricula" placeholder="Matrícula" required><br><br>
                            <select id="sexo" required>
                                <option value="">Selecione o sexo</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select><br><br>
                            <input type="date" id="nascimento" placeholder="Data de Nascimento"><br><br>
                            <input type="text" id="telefone" placeholder="Telefone"><br><br>
                            <input type="email" id="email" placeholder="Email"><br><br>
                            ${selectCurso}<br><br>
                            <button type="submit">Cadastrar</button>
                            <button type="button" onclick="fecharModal()">Cancelar</button>
                        </form>
                    </div>
                `);      document.getElementById('form-estudante').onsubmit = async function(e) {
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
            const resposta = await fetch('http://localhost:3000/api/estudantes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, matricula, sexo, nascimento, telefone, email, curso_id }) // Enviar dados do estudante
            });

            const resultado = await resposta.json();
            if (resposta.ok) {
                alert(resultado.mensagem); // Exibe mensagem de sucesso
                fecharModal();
            } else {
                alert(resultado.erro || 'Erro ao cadastrar estudante!');
            }
        }
    }
    // Formulário para cadastrar curso
    if (tipo === 'curso') {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-curso" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;display:flex;align-items:center;justify-content:center;">
                <form id="form-curso" style="background:#fff;padding:20px;border-radius:8px;">
                    <h3>Cadastrar Curso</h3>
                    <input type="text" id="nome" placeholder="Nome do Curso" required><br><br>
                    <select id="nivel" required>
                        <option value="">Selecione o nível</option>
                        <option value="Fundamental">Fundamental</option>
                        <option value="Médio">Médio</option>
                        <option value="Técnico">Técnico</option>
                        <option value="Tecnológico">Tecnológico</option>
                        <option value="Superior">Superior</option>
                    </select><br><br>
                    <input type="date" id="ano_inicio" placeholder="Ano de Início"><br><br>
                    <button type="submit">Cadastrar</button>
                    <button type="button" onclick="fecharModal()">Cancelar</button>
                </form>
            </div>
        `);      document.getElementById('form-curso').onsubmit = async function(e) {
            e.preventDefault();
            const nomeCurso = document.getElementById('nome').value;
            const nivelCurso = document.getElementById('nivel').value;
            const anoInicio = document.getElementById('ano_inicio').value;
            // Enviar dados do curso para a API
            const resposta = await fetch('http://localhost:3000/api/cursos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: nomeCurso, nivel: nivelCurso, ano_inicio: anoInicio }) // Enviar dados do curso
            });

            const resultado = await resposta.json();
            if (resposta.ok) {
                console.log(resultado);
                alert(resultado.mensagem);
                fecharModal();
            } else {
                alert(resultado.erro || 'Erro ao cadastrar curso!');
            }
        }
    }

    // Formulário para cadastrar Categoria de Requerimento
    if (tipo === 'categoria') {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-categoria" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;display:flex;align-items:center;justify-content:center;">
                <form id="form-categoria" style="background:#fff;padding:20px;border-radius:8px;">
                    <h3>Cadastrar Categoria de Requerimento</h3>
                    <input type="text" id="nome-categoria" placeholder="Nome da Categoria" required><br><br>
                    <input type="text" id="instancia-responsavel" placeholder="Instância Responsável" required><br><br>
                    <button type="submit">Cadastrar</button>
                    <button type="button" onclick="fecharModal()">Cancelar</button>
                </form>
            </div>
        `);
        document.getElementById('form-categoria').onsubmit = async function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome-categoria').value;
            const instancia_responsavel = document.getElementById('instancia-responsavel').value;
            if (!nome || !instancia_responsavel) {
                alert('Preencha todos os campos!');
                return;
            }
            const resposta = await fetch('http://localhost:3000/api/categorias-requerimento', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, instancia_responsavel })
            });

            const resultado = await resposta.json();
            if (resposta.ok) {
                console.log(resultado);
                alert(resultado.mensagem);
                fecharModal();
            } else {
                alert(resultado.erro || 'Erro ao cadastrar curso!');
            }            
        }
    }

    // Formulário para registrar Requerimento
    if (tipo === 'requerimento') {
        // Carregar estudantes e categorias para os selects
        const respostaEstudantes = await fetch('http://localhost:3000/api/estudantes');
        const estudantes = await respostaEstudantes.json();        
        const respostaCategorias = await fetch('http://localhost:3000/api/categorias-requerimento');
        const categorias = await respostaCategorias.json();

        const selectEstudante = `<select id="estudante-id" required>
            <option value="">Selecione o estudante</option>
            ${estudantes.map(e => `<option value="${e.id}">${e.nome} (${e.matricula})</option>`).join('')}
        </select>`;

        const selectCategoria = `<select id="categoria-id" required>
            <option value="">Selecione a categoria</option>
            ${categorias.map(c => `<option value="${c.id}">${c.nome}</option>`).join('')}
        </select>`;

        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-requerimento" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;display:flex;align-items:center;justify-content:center;">
                <form id="form-requerimento" style="background:#fff;padding:20px;border-radius:8px;">
                    <h3>Registrar Requerimento</h3>
                    <label>Estudante:</label><br>
                    ${selectEstudante}<br><br>
                    <label>Categoria de Requerimento:</label><br>
                    ${selectCategoria}<br><br>
                    <label>Data da Solicitação:</label><br>
                    <input type="date" id="data-solicitacao" required><br><br>
                    <label>Observações:</label><br>
                    <textarea id="observacoes" rows="3" placeholder="Observações"></textarea><br><br>
                    <button type="submit">Registrar</button>
                    <button type="button" onclick="fecharModal()">Cancelar</button>
                </form>
            </div>
        `);

        document.getElementById('form-requerimento').onsubmit = async function(e) {
            e.preventDefault();
            const estudante_id = document.getElementById('estudante-id').value;
            const categorias_requerimento_id = document.getElementById('categoria-id').value;
            const data_solicitacao = document.getElementById('data-solicitacao').value;
            const observacoes = document.getElementById('observacoes').value;
            if (!estudante_id || !categorias_requerimento_id || !data_solicitacao) {
                alert('Preencha todos os campos obrigatórios!');
                return;
            }

            alert( 'Data de Solicitação: ' +  data_solicitacao + ', Observações: ' + observacoes + ' Estudante ID: ' + estudante_id + ', Categoria ID: ' + categorias_requerimento_id );
            const resposta = await fetch('http://localhost:3000/api/requerimentos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data_solicitacao,
                    observacoes,
                    estado: "Em Aberto", // Estado inicial do requerimento
                    estudante_id,
                    categorias_requerimento_id,
                })
            });

            const resultado = await resposta.json();
            if (resposta.ok) {
                console.log(resultado);
                alert(resultado.mensagem);
                fecharModal();
            } else {
                alert(resultado.erro || 'Erro ao cadastrar requerimento!');
            }
        }
    }
}

async function abrirFormularioEditar(tipo) {

    if (tipo === 'estudante') {
        // Modal para buscar estudante pela matrícula
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-buscar" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;display:flex;align-items:center;justify-content:center;">
                <form id="form-buscar-editar" style="background:#fff;padding:20px;border-radius:8px;">
                    <h3>Buscar Estudante por Matrícula</h3>
                    <input type="text" id="matricula_busca" placeholder="Digite a matrícula" required><br><br>
                    <button type="submit">Buscar</button>
                    <button type="button" onclick="fecharModalBuscar()">Cancelar</button>
                </form>
                <div id="editar-estudante-container"></div>
            </div>
        `);

        document.getElementById('form-buscar-editar').onsubmit = async function(e) {
            e.preventDefault();
            const matricula = document.getElementById('matricula_busca').value;
            // Buscar estudante pela matrícula
            const resposta = await fetch(`http://localhost:3000/api/estudantes?matricula=${encodeURIComponent(matricula)}`);
            const estudantes = await resposta.json();
            if (!Array.isArray(estudantes) || estudantes.length === 0) {
                alert('Estudante não encontrado!');
                return;
            }
            const estudante = estudantes[0];

            // Buscar cursos para preencher o select
            const respostaCursos = await fetch('http://localhost:3000/api/cursos');
            const cursos = await respostaCursos.json();
            const selectCurso = `<select id="curso_id_editar" required>
                <option value="">Selecione o curso</option>
                ${cursos.map(c => `<option value="${c.id}" ${c.id === estudante.curso_id ? 'selected' : ''}>${c.id} - ${c.nome}</option>`).join('')}
            </select>`;

            
            document.getElementById('editar-estudante-container').innerHTML = `
                <form id="form-editar-encontrado" style="margin-top:20px;background:#f9f9f9;padding:20px;border-radius:8px;">
                    <h4>Editar Dados do Estudante</h4>
                    <input type="text" id="nome_editar" value="${estudante.nome}" required style="width:350px;"><br><br>
                    <input type="text" id="matricula_editar" value="${estudante.matricula}" required readonly><br><br>
                    <select id="sexo_editar" required>
                        <option value="">Selecione o sexo</option>
                        <option value="Masculino" ${estudante.sexo === 'Masculino' ? 'selected' : ''}>Masculino</option>
                        <option value="Feminino" ${estudante.sexo === 'Feminino' ? 'selected' : ''}>Feminino</option>
                    </select><br><br>
                    <input type="date" id="nascimento_editar" value="${estudante.nascimento ? estudante.nascimento.split('T')[0] : ''}"><br><br>
                    <input type="text" id="telefone_editar" value="${estudante.telefone || ''}"><br><br>
                    <input type="email" id="email_editar" value="${estudante.email || ''}"><br><br>
                    ${selectCurso}<br><br>
                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onclick="excluirEstudante(${estudante.id})">Excluir</button>
                    <button type="button" onclick="fecharModalEditar()">Cancelar</button>                
                </form>
            `;        
            
            document.getElementById('form-editar-encontrado').onsubmit = async function(ev) {
            ev.preventDefault();
            const nome = document.getElementById('nome_editar').value;
                const sexo = document.getElementById('sexo_editar').value;
                const nascimento = document.getElementById('nascimento_editar').value;
                const telefone = document.getElementById('telefone_editar').value;
                const email = document.getElementById('email_editar').value;
                const curso_id = document.getElementById('curso_id_editar').value;

                const resposta = await fetch(`http://localhost:3000/api/estudantes/${estudante.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, sexo, nascimento, telefone, email, curso_id })
                });
                const resultado = await resposta.json();
                if (resposta.ok) {
                    alert(resultado.mensagem || 'Estudante atualizado com sucesso!');
                    fecharModalBuscarEditar();
                    // Atualize a lista se desejar, ex: carregarEstudantes();
                } else {
                        alert(resultado.erro || 'Erro ao atualizar estudante!');
                }
            } 
        }
        
    }
    
    if (tipo === 'requerimento') {

        // Modal para buscar requerimento por ID
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-buscar-requerimento" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;display:flex;align-items:center;justify-content:center;">
                <form id="form-buscar-requerimento" style="background:#fff;padding:20px;border-radius:8px;">
                    <h3>Buscar Requerimento por ID</h3>
                    <input type="text" id="id_requerimento_busca" placeholder="Digite o ID do requerimento" required><br><br>
                    <button type="submit">Buscar</button>
                    <button type="button" onclick="fecharModalEditar()">Cancelar</button>
                </form>
                <div id="editar-requerimento-container"></div>
            </div>
        `);

        document.getElementById('form-buscar-requerimento').onsubmit = async function(e) {
            e.preventDefault();
            const id = document.getElementById('id_requerimento_busca').value;
            // Buscar requerimento pelo ID
            const resposta = await fetch(`http://localhost:3000/api/requerimentos?id=${encodeURIComponent(id)}`);
            const requerimentos = await resposta.json();
            if (!Array.isArray(requerimentos) || requerimentos.length === 0) {
                alert('Requerimento não encontrado!');
                return;
            }

            const requerimento = requerimentos[0];

            document.getElementById('editar-requerimento-container').innerHTML = `
                <form id="form-editar-encontrado" style="margin-top:20px;background:#f9f9f9;padding:20px;border-radius:8px;">
                    <h4>Editar Requerimento N°:  ${requerimento.id}</h4>
                    <label for="estudante_id">Estudante:</label>
                    <input type="text" id="estudante_id" value="${requerimento.estudante ? requerimento.estudante.nome : ''}" readonly style="width:350px;"><br><br>
                    <label for="categoria_id">Categoria:</label>
                    <input type="text" id="categoria_id" value="${requerimento.categorias_requerimento ? requerimento.categorias_requerimento.nome : ''}" readonly style="width:350px;"><br><br>                    
                    <label for="data_solicitacao">Data de Solicitação:</label>
                    <input type="text" id="data_solicitacao" value="${formatarDataBR(requerimento.data_solicitacao) || ''}" readonly><br><br>
                    <label for="estado_atual">Estado Atual:</label>
                    <input type="text" id="nome_estado" value="${requerimento.estado || ''}" required style="width:350px;" readonly><br><br>
                    <label for="novo_estado">Selecione Novo Estado:</label>
                    <select id="estado_editar" required>
                        <option value="">Selecione o estado</option>
                        <option value="Em Aberto" ${requerimento.estado === 'Em Aberto' ? 'selected' : ''}>Em Aberto</option>
                        <option value="Em Análise" ${requerimento.estado === 'Em Análise' ? 'selected' : ''}>Em Análise</option>
                        <option value="Deferido" ${requerimento.estado === 'Deferido' ? 'selected' : ''}>Deferido</option>
                        <option value="Indeferido" ${requerimento.estado === 'Indeferido' ? 'selected' : ''}>Indeferido</option>
                        <option value="Finalizado" ${requerimento.estado === 'Finalizado' ? 'selected' : ''}>Finalizado</option>
                    </select><br><br>
                    <button type="submit">Salvar Alterações</button>                    
                    <button type="button" onclick="deletarRequerimento(${requerimento.id})">Excluir</button>
                    <button type="button" onclick="fecharModalEditar()">Cancelar</button>               
                </form>
            `;

            document.getElementById('form-editar-encontrado').onsubmit = async function(ev) {
                ev.preventDefault();
                const novoEstado = document.getElementById('estado_editar').value;
                if (!novoEstado) {
                    alert('Selecione o novo estado!');
                    return;
                }
                const resposta = await fetch(`http://localhost:3000/api/requerimentos/${requerimento.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ estado: novoEstado })
                });
                const resultado = await resposta.json();
                if (resposta.ok) {
                    alert(resultado.mensagem || 'Requerimento atualizado com sucesso!');
                    fecharModalEditar();
                } else {
                    alert(resultado.erro || 'Erro ao atualizar requerimento!');
                }
            };
        }
        
    }
}

async function gerarRelatorio(tipo) {

    if (tipo === 'estudantesPorCurso') {
        // Buscar cursos para preencher o select
        const respostaCursos = await fetch('http://localhost:3000/api/cursos');
        const cursos = await respostaCursos.json();

        const selectCurso = `<select id="curso_id" required>
            <option value="">Selecione o curso</option>
            ${cursos.map(c => `<option value="${c.id}">${c.id} - ${c.nome}</option>`).join('')}
        </select>`;        

        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-estudantesPorCurso" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;display:flex;align-items:center;justify-content:center;">
                <form id="form-relatorioPorCurso" style="background:#fff;padding:20px;border-radius:8px;">
                    <h3>Listar Estudantes Por Curso</h3>
                    <label>Curso:</label><br>
                    ${selectCurso}<br><br>
                    <button type="submit">Buscar</button>
                    <button type="button" onclick="fecharModalRelatorio()">Cancelar</button>
                </form>
            </div>
        `);

        
        document.getElementById('form-relatorioPorCurso').onsubmit = async function(e) {
            e.preventDefault();

            const curso_id = document.getElementById('curso_id').value;           

            if (!curso_id) {
                alert('Selecione um curso!');
                return;
            }
            // Buscar estudantes por curso
            const resposta = await fetch(`http://localhost:3000/api/estudantes?curso_id=${encodeURIComponent(curso_id)}`);
            const estudantes = await resposta.json();
            if (!Array.isArray(estudantes) || estudantes.length === 0) {
                alert('Nenhum estudante encontrado para este curso!');
                return;
            }
            /// Pegua o nome do curso selecionado
            const cursoSelecionado = cursos.find(c => c.id == curso_id);
            const nomeCurso = cursoSelecionado ? cursoSelecionado.nome : '';      
    
            
            let html = `
                <h3>Estudantes Encontrados no curso de <span style="color:#0074d9">${nomeCurso}</span></h3>
                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Matrícula</th>
                            <th>Sexo</th>
                            <th>Nascimento</th>
                            <th>Telefone</th>
                            <th>Email</th>                            
                        </tr>
                    </thead>
                    <tbody>
            `;

            estudantes.forEach(item => {
                html += `
                    <tr>
                        <td>${item.nome}</td>
                        <td>${item.matricula}</td>
                        <td>${item.sexo}</td>
                        <td>${item.nascimento ? item.nascimento.split('T')[0] : ''}</td>
                        <td>${item.telefone || ''}</td>
                        <td>${item.email || ''}</td>                        
                    </tr>
                `;
            });

            html += `
                    </tbody>
                </table>
            `;

            // Salva o relatório no localStorage
            localStorage.setItem('relatorioHtml', html);

            // Abre a página de relatórios em uma nova aba
            window.open('relatorios.html', '_blank');
        }
    }
    

    if (tipo === 'requerimentos') {
        // Exibe quantidade de requerimentos por coordenação
        const resposta = await fetch('http://localhost:3000/api/requerimentos');
        const dados = await resposta.json();
        
        if (!Array.isArray(dados) || dados.length === 0) {
            alert('Nenhum requerimento encontrado!');
            return;
        }

            let html = `
                <h3>Requerimentos</h3>
                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Data da Solicitação</th>
                            <th>Categoria</th>
                            <th>Nome do Estudante</th>
                            <th>Matrícula</th>
                            <th>Curso</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            dados.forEach(item => {
                html += `
                    <tr>
                        <td>${formatarDataBR(item.data_solicitacao)}</td>
                        <td>${item.categorias_requerimento ? item.categorias_requerimento.nome : ''}</td>
                        <td>${item.estudante ? item.estudante.nome : ''}</td>
                        <td>${item.estudante ? item.estudante.matricula : ''}</td>
                        <td>${item.estudante && item.estudante.curso ? item.estudante.curso.nome : ''}</td>
                        <td>${item.estado || ''}</td>
                    </tr>
                `;        
            });

            html += `
                    </tbody>
                </table>
            `;        
            // Salva o relatório no localStorage
            localStorage.setItem('relatorioHtml', html);

            // Abre a página de relatórios em uma nova aba
            window.open('relatorios.html', '_blank');        
    }

    if(tipo === 'quatRequerimentos'){

         // Buscar cursos para preencher o select
        const respostaCursos = await fetch('http://localhost:3000/api/cursos');
        const cursos = await respostaCursos.json();

        const respostaCategorias = await fetch('http://localhost:3000/api/categorias-requerimento');
        const categorias = await respostaCategorias.json();

        const selectCurso = `<select id="curso_id" required>
            <option value="">Selecione o curso</option>
            ${cursos.map(c => `<option value="${c.id}">${c.id} - ${c.nome}</option>`).join('')}
        </select>`;

        // Gera um select apenas com as instâncias responsáveis únicas das categorias
        const instancias = [...new Set(categorias.map(c => c.instancia_responsavel))];
        const select_instancia_responsavel = `<select id="instancia-responsavel" required>
            <option value="">Selecione a instância responsável</option>
            ${instancias.map(inst => `<option value="${inst}">${inst}</option>`).join('')}
        </select>`;

        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-quatRequerimentos" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;display:flex;align-items:center;justify-content:center;">
                <form id="form-quatRequerimentos" style="background:#fff;padding:20px;border-radius:8px;">
                    <h3>Quantidade de Requerimentos Por Curso e Instância Responsável</h3>
                    <label>Curso:</label><br>
                    ${selectCurso}<br><br>
                    <label>Instância Responsável:</label><br>
                     ${select_instancia_responsavel}<br><br>
                    <button type="submit">Buscar</button>
                    <button type="button" onclick="fecharModalRelatorio()">Cancelar</button>
                </form>
            </div>
        `);

        document.getElementById('form-quatRequerimentos').onsubmit = async function(e) {
            e.preventDefault();

            const curso_id = document.getElementById('curso_id').value;
            const instancia_responsavel = document.getElementById('instancia-responsavel').value;
            console.log('Curso ID:', curso_id);
            console.log('Instância Responsável:', instancia_responsavel);


            if (!curso_id) {
                alert('Selecione um curso!');
                return;
            }
            const resposta = await fetch(`http://localhost:3000/api/requerimentos?curso_id=${encodeURIComponent(curso_id)}&instancia_responsavel=${encodeURIComponent(instancia_responsavel)}`);
            const dados = await resposta.json();

             if (!Array.isArray(dados) || dados.length === 0) {
                alert('Nenhum requerimento encontrado!');
                return;
            }

            const cursoSelecionado = cursos.find(c => c.id == curso_id);
            const nomeCurso = cursoSelecionado ? cursoSelecionado.nome : '';

            let html = `
                <h3>Requerimentos encontrados para o curso <span style="color:#0074d9">${nomeCurso}</span> e Instância Responsável <span style="color:#0074d9">${instancia_responsavel}</span></h3>
                <p>Total: <b>${dados.length}</b></p>
                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Data da Solicitação</th>
                            <th>Categoria</th>
                            <th>Nome do Estudante</th>
                            <th>Matrícula</th>
                            <th>Curso</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            dados.forEach(item => {
                html += `
                    <tr>
                        <td>${formatarDataBR(item.data_solicitacao)}</td>
                        <td>${item.categorias_requerimento ? item.categorias_requerimento.nome : ''}</td>
                        <td>${item.estudante ? item.estudante.nome : ''}</td>
                        <td>${item.estudante ? item.estudante.matricula : ''}</td>
                        <td>${item.estudante && item.estudante.curso ? item.estudante.curso.nome : ''}</td>
                        <td>${item.estado || ''}</td>
                    </tr>
                `;
            });

            html += `
                    </tbody>
                </table>
            `;
            // Salva o relatório no localStorage
            localStorage.setItem('relatorioHtml', html);
            // Abre a página de relatórios em uma nova aba
            window.open('relatorios.html', '_blank');
        }

    }
    
}

function fecharModal() {
    const modal = document.getElementById('modal-estudante');
    if (modal) modal.remove();

    const modalCurso = document.getElementById('modal-curso');
    if (modalCurso) modalCurso.remove();

    const modalCategoria = document.getElementById('modal-categoria');
    if (modalCategoria) modalCategoria.remove();
    
    const modalRequerimento = document.getElementById('modal-requerimento');
    if (modalRequerimento) modalRequerimento.remove();    
}

function fecharModalBuscar() {
    const modalBuscar = document.getElementById('modal-buscar');
    if (modalBuscar) modalBuscar.remove();
}

function fecharModalEditar() {
    const modalEditar = document.getElementById('editar-estudante-container');
    if (modalEditar) modalEditar.innerHTML = '';

    const editarRequerimento = document.getElementById('form-editar-encontrado');
    if (editarRequerimento) editarRequerimento.remove();

    const buscarRequerimento = document.getElementById('modal-buscar-requerimento');
    if (buscarRequerimento) buscarRequerimento.remove();
}


function fecharModalRelatorio() {
    const modal = document.getElementById('modal-estudantesPorCurso');
    if (modal) modal.remove();
    const modalQuant = document.getElementById('modal-quatRequerimentos');
    if (modalQuant) modalQuant.remove();
}

function excluirEstudante(id) {
    if (confirm('Tem certeza que deseja excluir este estudante?')) {
            fetch(`http://localhost:3000/api/estudantes/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.status === 204) {
                alert('Estudante excluído com sucesso!');
            } else {
                res.json().then(data => alert(data.erro || 'Erro ao excluir estudante!'));
            }
        });
    }
}

function excluirRequerimento(id) {
    if (confirm('Tem certeza que deseja excluir este requerimento?')) {
        fetch(`http://localhost:3000/api/requerimentos/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.status === 204) {
                alert('Requerimento excluído com sucesso!');
            } else {
                res.json().then(data => alert(data.erro || 'Erro ao excluir requerimento!'));
            }
        });
    }
}

function exibirRelatorio(html) {
    let container = document.getElementById('relatorio-container');
    if (!container) {
        // Cria o container se não existir
        container = document.createElement('div');
        container.id = 'relatorio-container';
        document.body.appendChild(container);
    }
    container.innerHTML = html;
}

function formatarDataBR(dataISO) {
    if (!dataISO) return '';
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}