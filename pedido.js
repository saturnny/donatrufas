// Função para preencher as opções com base no tipo de item selecionado
function populateOptions() {
    const tipoItem = document.getElementById('tipoItem').value;
    const tamanhoSelect = document.getElementById('tamanho');
    const saborSelect = document.getElementById('sabor');

    // Limpar opções anteriores
    tamanhoSelect.innerHTML = '';
    saborSelect.innerHTML = '';

    // Preencher opções de tamanho e sabor
    trufasData[tipoItem]["Tamanho"].forEach(tamanho => {
        const option = document.createElement('option');
        option.value = tamanho;
        option.text = tamanho;
        tamanhoSelect.add(option);
    });

    trufasData[tipoItem]["Sabor"].forEach(sabor => {
        const option = document.createElement('option');
        option.value = sabor;
        option.text = sabor;
        saborSelect.add(option);
    });

    // Habilitar botão ao selecionar opções
    document.getElementById('adicionarAoCarrinhoBtn').disabled = false;
}

// Função para adicionar o item ao carrinho
function adicionarAoCarrinho() {
    const tipoItem = document.getElementById('tipoItem').value;
    const tamanho = document.getElementById('tamanho').value;
    const sabor = document.getElementById('sabor').value;
    const quantidade = document.getElementById('quantidade').value;

    // Criar objeto representando o item e suas informações
    const item = {
        tipoItem: tipoItem,
        tamanho: tamanho,
        sabor: sabor,
        quantidade: quantidade
    };

    // Obter o carrinho do LocalStorage ou criar um novo array vazio
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Adicionar o item ao carrinho
    carrinho.push(item);

    // Armazenar o carrinho atualizado no LocalStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualizar mensagem na página com o tipo do item selecionado
    updateCartMessage(tipoItem);
}

// Função para atualizar mensagem na página
function updateCartMessage(tipoItem) {
    const mensagemElement = document.getElementById('mensagem');
    mensagemElement.textContent = `Item adicionado ao carrinho: ${tipoItem}!`;
}

// Função para exibir os detalhes do pedido na página de confirmação
function exibirDetalhesPedido() {
    // Obter o carrinho do LocalStorage
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Se o carrinho estiver vazio, exibir mensagem e retornar
    if (!carrinho || carrinho.length === 0) {
        document.getElementById('pedidos').innerHTML = "<p>Carrinho vazio</p>";
        return;
    }

    // Limpar pedidos anteriores
    document.getElementById('pedidos').innerHTML = '';

    // Exibir os detalhes de cada item do carrinho
    carrinho.forEach((item, index) => {
        const divPedido = document.createElement('div');
        divPedido.classList.add('pedido');

        divPedido.innerHTML = `
            <p>Item: ${item.tipoItem}</p>
            <p>Tamanho: ${item.tamanho}</p>
            <p>Sabor: ${item.sabor}</p>
            <p>Quantidade: ${item.quantidade}</p>
            <button onclick="removerItem(${index})">Remover</button>
        `;

        document.getElementById('pedidos').appendChild(divPedido);
    });
}

// Função para remover um item do carrinho
function removerItem(index) {
    // Obter o carrinho do LocalStorage
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Remover o item do carrinho com base no índice
    carrinho.splice(index, 1);

    // Atualizar o carrinho no LocalStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualizar os detalhes do pedido na página
    exibirDetalhesPedido();
}

// Função para concluir o pedido e enviar mensagem no WhatsApp
function concluirPedido() {
    // Obter informações do pedido
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const nome = document.getElementById('nome').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cep = document.getElementById('cep').value;
    const telefone = document.getElementById('telefone').value;

    // Verificar se há itens no carrinho
    if (!carrinho || carrinho.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de concluir o pedido.");
        return;
    }

    // Preparar mensagem para o WhatsApp
    let mensagem = `Olá! Gostaria de fazer um pedido:\n`;

    carrinho.forEach(item => {
        mensagem += `Item: ${item.tipoItem}\nTamanho: ${item.tamanho}\nSabor: ${item.sabor}\nQuantidade: ${item.quantidade}\n\n`;
    });

    mensagem += `Nome: ${nome}\nEndereço: ${rua}, ${numero}, ${bairro}, CEP: ${cep}\nTelefone: ${telefone}`;

    // Enviar mensagem para o WhatsApp
    window.open(`https://api.whatsapp.com/send?phone=+5571984773854&text=${encodeURIComponent(mensagem)}`);

    // Limpar o carrinho
    localStorage.removeItem('carrinho');

    // Redirecionar para a página de realizar pedido
    window.location.href = "index.html";
}

// Mostrar os detalhes do pedido ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    exibirDetalhesPedido();
});
