// Dados das trufas, barras e corações
const trufasData = {
    "Trufa": {
        "Tamanho": ["Tamanho Único (40g)"],
        "Sabor": ["Mousse de Maracujá", 
        "Mousse de Limão", 
        "Mousse de Morango", 
        "Dois Amores", 
        "Sensação", 
        "Beijinho", 
        "Chocolate", 
        "Paçoca", 
        "Moraninho", 
        "Napolitano"]
    },
    "Barra Trufada": {
        "Tamanho": ["100g", "200g"],
        "Sabor": ["Mousse de Maracujá", 
        "Mousse de Limão", 
        "Mousse de Morango", 
        "Dois Amores", 
        "Sensação", 
        "Beijinho", 
        "Chocolate", 
        "Paçoca", 
        "Moraninho", 
        "Napolitano"]
    },
    "Coração Trufado": {
        "Tamanho": ["250g"],
        "Sabor": ["Mousse de Maracujá", 
        "Mousse de Limão", 
        "Mousse de Morango", 
        "Dois Amores", 
        "Sensação", 
        "Beijinho", 
        "Chocolate", 
        "Paçoca", 
        "Moraninho", 
        "Napolitano"]
    },
    "Coração com Trufas": {
        "Tamanho": ["150g"],
        "Sabor": ["Mousse de Maracujá", 
        "Mousse de Limão", 
        "Mousse de Morango", 
        "Dois Amores", 
        "Sensação", 
        "Beijinho", 
        "Chocolate", 
        "Paçoca", 
        "Moraninho", 
        "Napolitano"]
    }
};

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

// Ao carregar a página, selecionar a primeira opção de trufa e preencher as opções
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("tipoItem").value = "Trufa";
    populateOptions();
});
