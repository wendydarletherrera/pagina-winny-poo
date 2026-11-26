const nombre = document.body.dataset.nombre;
const apodo = document.body.dataset.apodo;

const burbuja = document.getElementById("burbuja");
const contador = document.getElementById("contador");
const msgContador = document.getElementById("msg-contador");
const slider = document.getElementById("tristeza");
const valorTristeza = document.getElementById("tristeza-valor");
const textoTristeza = document.getElementById("tristeza-texto");
const boca = document.getElementById("boca");
const cejaIzq = document.getElementById("ceja-izq");
const cejaDer = document.getElementById("ceja-der");
const lagrimas = document.getElementById("lagrimas");
const excusa = document.getElementById("excusa");
const lluvia = document.getElementById("lluvia");

let totalLagrimas = 0;

const mensajesContador = {
  1: "Una lágrima. Aceptable.",
  3: "Tres. Ya puedes regar una planta.",
  5: "Cinco. A este ritmo lavas el auto gratis.",
  10: "Diez. Ya, que se te oxida la miel.",
  15: "Quince. Las abejas están pidiendo paraguas.",
  20: "Veinte. Esto ya es una cascada turística.",
  30: "Treinta. Ok, oficialmente eres un oso de peluche empapado.",
};

async function pedir(url) {
  try {
    const r = await fetch(url);
    const d = await r.json();
    return d.texto;
  } catch {
    return `No llores, ${apodo}. (El servidor también está llorando.)`;
  }
}

function decir(texto) {
  burbuja.textContent = texto;
  burbuja.classList.remove("pop");
  void burbuja.offsetWidth;
  burbuja.classList.add("pop");
}

function lluviaDe(emojis, cantidad) {
  for (let i = 0; i < cantidad; i++) {
    const g = document.createElement("span");
    g.className = "gota";
    g.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    g.style.left = Math.random() * 100 + "vw";
    g.style.animationDuration = 2 + Math.random() * 2.5 + "s";
    g.style.animationDelay = Math.random() * 0.6 + "s";
    lluvia.appendChild(g);
    setTimeout(() => g.remove(), 5500);
  }
}

function actualizarCara(t) {
  // t = tristeza de 0 a 100
  const curva = 12 - (t / 100) * 22; // +12 sonrisa, -10 puchero
  boca.setAttribute("d", `M88 134 Q100 ${134 + curva} 112 134`);
  const inclinacion = (t / 100) * 5;
  cejaIzq.setAttribute("d", `M68 ${75 + inclinacion} L88 ${75 - inclinacion}`);
  cejaDer.setAttribute("d", `M132 ${75 + inclinacion} L112 ${75 - inclinacion}`);
  lagrimas.style.opacity = t > 50 ? (t - 50) / 50 : 0;

  valorTristeza.textContent = t;
  let msg;
  if (t <= 10) msg = `Felicidad detectada. ¿Quién eres y qué hiciste con ${nombre}?`;
  else if (t <= 30) msg = "Casi bien. Un helado más y listo.";
  else if (t <= 60) msg = "Triste, pero funcional. Igual que el auto.";
  else if (t <= 85) msg = "Nivel: osito mojado bajo la lluvia.";
  else msg = "Drama máximo. Hasta las abejas están preocupadas.";
  textoTristeza.textContent = msg;
}

document.getElementById("btn-llorar").addEventListener("click", async () => {
  totalLagrimas++;
  contador.textContent = totalLagrimas;
  if (mensajesContador[totalLagrimas]) msgContador.textContent = mensajesContador[totalLagrimas];

  const nuevo = Math.min(100, Number(slider.value) + 5);
  slider.value = nuevo;
  actualizarCara(nuevo);

  decir(await pedir("/api/frase"));
  lluviaDe(["💧", "🍯", "💧"], 8);
});

document.getElementById("btn-feliz").addEventListener("click", () => {
  slider.value = 0;
  actualizarCara(0);
  decir(`¡Eso, ${apodo}! Así me gusta. 🎉`);
  msgContador.textContent = "Récord personal: dejaste de llorar. Histórico.";
  lluviaDe(["🍯", "🐝", "🎉", "✨"], 30);
});

slider.addEventListener("input", (e) => actualizarCara(Number(e.target.value)));

document.getElementById("btn-excusa").addEventListener("click", async () => {
  excusa.textContent = "📝 " + (await pedir("/api/excusa"));
});

actualizarCara(Number(slider.value));
