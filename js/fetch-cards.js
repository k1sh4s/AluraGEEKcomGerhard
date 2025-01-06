// Cards pré-definidos
const defaultCards = [
    { id: Date.now() + 1, nome: "Produto 1", valor: "100.00", imagem: "assets/plushee.jpg" },
    { id: Date.now() + 2, nome: "Produto 2", valor: "45.00", imagem: "assets/shanks.jpg" },
];

// Inicializa o localStorage com cards pré-definidos, se vazio
if (!localStorage.getItem("cards")) {
    localStorage.setItem("cards", JSON.stringify(defaultCards));
}

const cardsContainer = document.querySelector(".corpo_produtos--card");

// Função global para renderizar os cards na tela
const renderCards = () => {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    cardsContainer.innerHTML = ""; // Limpa o container antes de renderizar
    
    if (cards.length === 0) {
        cardsContainer.innerHTML = "<p class='mensagem-vazia'>Nenhum produto cadastrado.</p>";
    } else {
        cards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("corpo--card");
            cardElement.innerHTML = `
                <img class="imagem_produto" src="${card.imagem}" alt="Imagem do produto">
                <div class="card_container--info">
                    <p>${card.nome}</p>
                    <div class="card_container--value">
                        <p>$ ${card.valor}</p>
                        <button class="icone_lixo" data-id="${card.id}">
                            <img src="assets/icone-lixo.png" alt="Ícone de lixeira">
                        </button>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(cardElement);
        });
    }
};

// Event listener para remover cards
cardsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".icone_lixo")) {
        const cardId = parseInt(event.target.closest(".icone_lixo").dataset.id, 10);
        let cards = JSON.parse(localStorage.getItem("cards")) || [];
        cards = cards.filter((card) => card.id !== cardId);
        localStorage.setItem("cards", JSON.stringify(cards));
        renderCards();
    }
});

// Renderiza os cards ao carregar a página
document.addEventListener("DOMContentLoaded", renderCards);
