// ======== TROQUE AQUI PELA SUA KEY =========
const API_KEY = "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";
// ===========================================

function mostrarTela(tela) {
    const telas = document.querySelectorAll(".tela");
    telas.forEach(t => t.classList.remove("ativa"));
    document.getElementById(tela).classList.add("ativa");
}

// TREINO
function gerarTreino() {
    const treino = `
        <h3>Treino da Semana</h3>
        <p><strong>Segunda:</strong> Peito + Tríceps</p>
        <p><strong>Terça:</strong> Costas + Bíceps</p>
        <p><strong>Quarta:</strong> Pernas</p>
        <p><strong>Quinta:</strong> Ombro + Trapézio</p>
        <p><strong>Sexta:</strong> Full Body</p>
    `;
    document.getElementById("resultadoTreino").innerHTML = treino;
}

// IMC
function calcularIMC() {
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value) / 100;

    if (!peso || !altura) {
        document.getElementById("resultadoIMC").innerText = "Preencha peso e altura.";
        return;
    }

    let imc = peso / (altura * altura);
    document.getElementById("resultadoIMC").innerText = "Seu IMC: " + imc.toFixed(2);
}

// Preview da Foto
function previewFoto() {
    const file = document.getElementById("uploadFoto").files[0];
    if (file) {
        document.getElementById("fotoPreview").src = URL.createObjectURL(file);
    }
}

// CHAT GPT
async function enviarParaChatGPT() {
    const pergunta = document.getElementById("mensagemUsuario").value;
    const respostaDiv = document.getElementById("respostaIA");

    if (!pergunta.trim()) {
        respostaDiv.innerHTML = "<p>Digite uma pergunta primeiro.</p>";
        return;
    }

    respostaDiv.innerHTML = "<p><em>Gerando resposta...</em></p>";

    try {
        const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "Você é o assistente DougFit. Você responde como treinador profissional, especialista em treino, dieta, performance e avaliação física."
                    },
                    {
                        role: "user",
                        content: pergunta
                    }
                ]
            })
        });

        const data = await resposta.json();

        respostaDiv.innerHTML = `
            <p><strong>Resposta da IA:</strong></p>
            <p>${data.choices?.[0]?.message?.content || "Erro ao obter resposta."}</p>
        `;

    } catch (error) {
        respostaDiv.innerHTML = "<p>Erro ao conectar com a IA.</p>";
        console.error(error);
    }
}
