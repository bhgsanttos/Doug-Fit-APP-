/* ================================
    COLE SUA API KEY AQUI
=================================== */
const OPENAI_API_KEY = "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";

/* ===== Navegação ===== */
function openScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* ===== Função de chamada ao GPT ===== */
async function callGPT(prompt) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

/* ================================
       GERADOR DE TREINO IA
=================================== */
async function gerarTreinoIA() {
    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;
    const nivel = document.getElementById("nivel").value;
    const objetivo = document.getElementById("objetivo").value;
    const restricoes = document.getElementById("restricoes").value;
    const detalhes = document.getElementById("detalhes").value;

    document.getElementById("treinoContent").innerHTML = "Gerando treino com IA...";

    const prompt = `
Crie um TREINO COMPLETO com base nas seguintes informações:

Peso: ${peso} kg  
Altura: ${altura} cm  
Nível: ${nivel}  
Objetivo: ${objetivo}  
Restrições / doenças: ${restricoes || "nenhuma"}  
Detalhes adicionais: ${detalhes || "nenhum"}

Regras:
- Gere uma divisão completa (A/B/C ou ABCDE dependendo do nível)
- Explique cada exercício
- Inclua séries, repetições e descanso
- Adapte o treino às restrições
- Inclua recomendações finais
- Entregue tudo organizado e fácil de ler
`;

    const result = await callGPT(prompt);
    document.getElementById("treinoContent").innerHTML = result;
}

/* ================================
       GERADOR DE RECEITAS IA
=================================== */
async function gerarReceitasIA() {
    const alimentos = document.getElementById("alimentos").value;

    if (!alimentos.trim()) {
        alert("Digite os alimentos disponíveis.");
        return;
    }

    document.getElementById("receitasContent").innerHTML = "Gerando receitas com IA...";

    const prompt = `
Gere 5 RECEITAS usando SOMENTE estes alimentos:

Alimentos disponíveis: ${alimentos}

Para cada receita inclua:
- Nome da receita
- Ingredientes
- Modo de preparo COMPLETO
- Tempo total de preparo
- Uma variação extra
- Informação nutricional aproximada

Evite usar ingredientes que não foram citados.
`;

    const result = await callGPT(prompt);
    document.getElementById("receitasContent").innerHTML = result;
}

/* ================================
             CHAT
=================================== */
async function sendMessage() {
    const input = document.getElementById("userMessage");
    const msg = input.value.trim();
    if (!msg) return;

    appendMessage("user", msg);
    input.value = "";

    const resposta = await callGPT(msg);
    appendMessage("bot", resposta);
}

function appendMessage(type, text) {
    const box = document.getElementById("chatBox");
    const div = document.createElement("div");
    div.className = "message " + type;
    div.innerText = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}
