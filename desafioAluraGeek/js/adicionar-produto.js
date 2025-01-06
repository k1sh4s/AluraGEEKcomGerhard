document.addEventListener("DOMContentLoaded", () => { 
    const formulario = document.querySelector(".formulario_campo--inputs");
    const limparBtn = document.querySelector(".formulario_botao--limpar");
    const guardarBtn = document.querySelector(".formulario_botao--guardar");

    // Função para adicionar um novo produto
    const adicionarProduto = async () => {
        const nome = document.querySelector("#nome").value.trim();
        const valor = document.querySelector("#valor").value.trim();
        const imagem = document.querySelector("#imagem").value.trim();

        if (!nome || !valor || !imagem) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        const novoProduto = {
            id: Date.now(),
            nome,
            valor,
            imagem,
        };

        const cards = JSON.parse(localStorage.getItem("cards")) || [];
        cards.push(novoProduto);
        localStorage.setItem("cards", JSON.stringify(cards));

        // Re-renderiza os cards para refletir a adição
        await renderCards();

        // Limpar os campos após salvar
        formulario.reset();
    };

    // Limpar os campos sem adicionar o produto
    limparBtn.addEventListener("click", () => {
        formulario.reset();
    });

    // Salvar o produto ao clicar no botão "Guardar"
    guardarBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        await adicionarProduto();
    });
});
