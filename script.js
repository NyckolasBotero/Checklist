// Selecionar o botão "Adicionar Bloco"
const addButton = document.querySelector('.add-block');

// Selecionar o contêiner dos blocos
const contentContainer = document.querySelector('.content');

// Selecionar a lista de "Realizados"
const realizedList = document.querySelector('#realized-list');

// Função para criar um novo bloco com checkbox e botão de edição
function createBlock(text = "Novo bloco...") {
    // Criar o contêiner do bloco
    const newBlock = document.createElement('div');
    newBlock.className = 'block';

    // Criar o rótulo e a checkbox
    const label = document.createElement('label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'block-checkbox';

    const span = document.createElement('span');
    span.contentEditable = 'false'; // Inicialmente não editável
    span.innerText = text;

    // Criar botão de edição
    const editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.style.marginLeft = '10px';
    editButton.style.padding = '5px';
    editButton.style.cursor = 'pointer';

    // Criar botão de exclusão
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Excluir';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.padding = '5px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.backgroundColor = 'red'; // Cor de fundo vermelha
    deleteButton.style.color = 'white'; // Texto branco
    deleteButton.style.border = 'none'; // Sem borda
    deleteButton.style.borderRadius = '5px'; // Bordas arredondadas

    // Evento do botão de edição
    editButton.addEventListener('click', () => {
        if (editButton.innerText === 'Editar') {
            span.contentEditable = 'true';
            span.focus();
            editButton.innerText = 'Salvar';
        } else {
            span.contentEditable = 'false';
            editButton.innerText = 'Editar';
        }
    });

    // Evento do botão de exclusão
    deleteButton.addEventListener('click', () => {
        newBlock.remove(); // Remove o bloco da página
    });

    // Adicionar evento à checkbox
    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            moveToRealized(newBlock, span.innerText);
            newBlock.remove();
        }
    });

    // Montar o rótulo e adicionar ao bloco
    label.appendChild(checkbox);
    label.appendChild(span);
    newBlock.appendChild(label);
    newBlock.appendChild(editButton);
    newBlock.appendChild(deleteButton); // Adicionar o botão de excluir

    return newBlock;
}

// Função para mover um bloco para "Realizados"
function moveToRealized(block, text) {
    const listItem = document.createElement('li');
    listItem.innerText = text;

    // Criar botão para mover de volta
    const returnButton = document.createElement('button');
    returnButton.innerText = 'Voltar';
    returnButton.style.marginLeft = '10px';
    returnButton.style.padding = '5px';
    returnButton.style.cursor = 'pointer';

    

    // Evento para mover o item de volta
    returnButton.addEventListener('click', () => {
        const newBlock = createBlock(text);
        contentContainer.insertBefore(newBlock, addButton);
        listItem.remove();
    });

    // Desabilitar botão de edição no bloco original
    const editButton = block.querySelector('button');
    editButton.disabled = true;

    listItem.appendChild(returnButton);
    realizedList.appendChild(listItem);
}

// Adicionar evento de clique ao botão
addButton.addEventListener('click', () => {
    const description = prompt("Digite a descrição do bloco:");
    if (description && description.trim() !== "") {
        const newBlock = createBlock(description.trim());
        contentContainer.insertBefore(newBlock, addButton);
    } else {
        alert("A descrição do bloco não pode ser vazia.");
    }
});
