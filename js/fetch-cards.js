document.addEventListener("DOMContentLoaded", () => {
    const defaultCards = [
        { id: Date.now() + 1, nome: "Hunter plushee", valor: "100.00", imagem: "assets/plushee.jpg" },
        { id: Date.now() + 2, nome: "Shanks", valor: "45.00", imagem: "assets/shanks.jpg" },
    ];

    const cardsContainer = document.querySelector(".corpo_produtos--card");

    // Inicializa o localStorage com cards padrão, se vazio
    if (!localStorage.getItem("cards") || JSON.parse(localStorage.getItem("cards")).length === 0) {
        localStorage.setItem("cards", JSON.stringify(defaultCards));
    }

    // Função para renderizar os cards
    const renderCards = () => {
        const cards = JSON.parse(localStorage.getItem("cards")) || [];
        cardsContainer.innerHTML = ""; // Limpa o container

        if (cards.length === 0) {
            cardsContainer.innerHTML = `<p style="text-align: center; font-size: 1.25rem; color: grey;">Nenhum produto cadastrado!</p>`;
            return;
        }

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
    };

    // Evento para remover cards
    cardsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".icone_lixo")) {
            const cardId = parseInt(event.target.closest(".icone_lixo").dataset.id, 10);
            let cards = JSON.parse(localStorage.getItem("cards")) || [];
            cards = cards.filter((card) => card.id !== cardId);
            localStorage.setItem("cards", JSON.stringify(cards));
            renderCards();
        }
    });

    renderCards();
});
