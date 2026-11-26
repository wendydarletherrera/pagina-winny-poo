import random
from datetime import date

from flask import Flask, jsonify, render_template

app = Flask(__name__)

# ✏️ Cambia estos datos si quieres
NOMBRE = "Sebastián"
APODO = "Winny Poo"
REMITENTE = "Alguien que te quiere (y te molesta)"

FRASES = [
    "No llores, Winny Poo, que se te oxida la miel.",
    "Tu auto tiene un rayón. Yo hice una página web entera para molestarte. ¿Quién tiene más tiempo libre?",
    "Mira el lado bueno: ahora tu auto tiene personalidad.",
    "Los rayones son como los tatuajes: cuentan una historia. La tuya se llama 'no vi el poste'.",
    "Respira. Inhala miel, exhala drama.",
    "Llorar no arregla el auto, pero sí te deja cara de peluche mojado.",
    "Si la tristeza fuera deporte, ya tendrías medalla. De bronce, no te emociones.",
    "Las familias pelean porque se quieren. La tuya te debe querer muchísimo.",
    "El auto se arregla con pintura. Esa cara se arregla con helado.",
    "No llores, Winny Poo. Las abejas te están mirando y da vergüenza.",
    "Hoy no es tu día. Pero tranquilo, mañana tampoco promete mucho. 🙃",
    "Tranquilo, el rayón casi ni se nota. Bueno, desde el espacio no se nota.",
    "Llora todo lo que quieras, pero después vamos por comida. Es el trato.",
    "Te peleaste con tu familia y rayaste el auto el mismo día. Eficiencia pura.",
]

EXCUSAS = [
    "La pared se movió. Tengo testigos (no tengo testigos).",
    "Fue un ataque organizado de abejas.",
    "Estaba comprobando si la pintura era original.",
    "El auto quería un look más rudo.",
    "Mercurio retrógrado, obviamente.",
    "Lo rayó la envidia de los otros autos.",
    "El GPS dijo 'gira a la derecha' pero no dijo cuánto.",
    "Es arte moderno. La obra se llama 'Encuentro con poste, 2026'.",
    "Un oso hambriento buscaba miel en la puerta.",
    "Yo no fui, fue mi yo del pasado. Ese tipo es un irresponsable.",
    "El poste estaba mal estacionado.",
    "Fue a propósito: ahora nadie me lo va a querer robar.",
]


@app.route("/")
def inicio():
    return render_template(
        "index.html",
        nombre=NOMBRE,
        apodo=APODO,
        remitente=REMITENTE,
        anio=date.today().year,
    )


@app.route("/api/frase")
def frase():
    return jsonify(texto=random.choice(FRASES))


@app.route("/api/excusa")
def excusa():
    return jsonify(texto=random.choice(EXCUSAS))


if __name__ == "__main__":
    app.run(debug=True)
