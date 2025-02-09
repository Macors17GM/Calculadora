const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const botonApretado = boton.textContent;

    if (boton.id === "c") {
      pantalla.textContent = "0";
      return;
    }

    if (boton.id === "borrar" || botonApretado === "⌫") {
      if (pantalla.textContent.length <= 1 || pantalla.textContent === "ERROR!") {
        pantalla.textContent = "0";
      } else {
        pantalla.textContent = pantalla.textContent.slice(0, -1);
      }
      return;
    }

    if (boton.id === "igual") {
      try {
        pantalla.textContent = eval(pantalla.textContent);
      } catch {
        pantalla.textContent = "ERROR!";
      }
      return;
    }

    if (pantalla.textContent === "0" || pantalla.textContent === "ERROR!") {
      pantalla.textContent = botonApretado;
    } else {
      pantalla.textContent += botonApretado;
    }
  });
});

const toggleButton = document.getElementById("c-Cientifica");
const mainCalc = document.querySelector(".calculadora");
const sciCalc = document.querySelector(".calculator");

// Alternar visualización entre calculadoras
toggleButton.addEventListener("click", () => {
  if (window.getComputedStyle(mainCalc).display !== "none") {
    mainCalc.style.display = "none";
    sciCalc.style.display = "block";
    toggleButton.textContent = "Calculadora Principal";
  } else {
    mainCalc.style.display = "block";
    sciCalc.style.display = "none";
    toggleButton.textContent = "Calculadora Científica";
  }
});

const pantalla1 = document.getElementById("pantalla1");
const botones1 = document.querySelectorAll(".btn1");
let lastAnswer = 0; // Última respuesta (para "Ans")

// Función auxiliar: convertir grados a radianes
function degToRad(deg) {
  return deg * Math.PI / 180;
}

// Procesar expresiones científicas
function processExpression(expr) {
  return expr
    .replace(/\^/g, "**")
    .replace(/x²/g, "**2")
    .replace(/x³/g, "**3")
    .replace(/sin\(/g, "Math.sin(degToRad(")
    .replace(/cos\(/g, "Math.cos(degToRad(")
    .replace(/tan\(/g, "Math.tan(degToRad(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/√\(/g, "Math.sqrt(")
    .replace(/π/g, "Math.PI")
    .replace(/(?<![A-Za-z0-9_.])e(?![A-Za-z0-9_.])/g, "Math.E")
    .replace(/(\d+(\.\d+)?)%/g, "($1*0.01)");
}

// Manejadores de eventos para la calculadora científica
botones1.forEach(boton1 => {
  boton1.addEventListener("click", () => {
    const botonApretado1 = boton1.textContent.trim();

    if (botonApretado1 === "Cc") {
      pantalla1.textContent = "0";
      return;
    }

    if (botonApretado1 === "➖" || botonApretado1 === "⌫") {
      if (pantalla1.textContent.length <= 0 || pantalla1.textContent === "ERROR!") {
        pantalla1.textContent = "0";
      } else {
        pantalla1.textContent = pantalla1.textContent.slice(0, -1);
      }
      return;
    }

    if (botonApretado1 === "=") {
      try {
        let processedExpression1 = processExpression(pantalla1.textContent);
        const result = eval(processedExpression1);
        pantalla1.textContent = result;
        lastAnswer = result;
      } catch {
        pantalla1.textContent = "ERROR!";
      }
      return;
    }
    if (botonApretado1 === "Cc") {
      pantalla.textContent = "0";
      return;
    }

    if (botonApretado1 === "Ans") {
      pantalla1.textContent = 
        pantalla1.textContent === "0" || pantalla1.textContent === "ERROR!"
          ? lastAnswer
          : pantalla1.textContent + lastAnswer;
      return;
    }

    if (botonApretado1 === "±") {
      const current = parseFloat(pantalla1.textContent);
      if (!isNaN(current)) {
        pantalla1.textContent = -current;
      }
      return;
    }

    if (botonApretado1 === "1/x") {
      const current = parseFloat(pantalla1.textContent);
      pantalla1.textContent = (!isNaN(current) && current !== 0) ? (1 / current) : "ERROR!";
      return;
    }

    pantalla1.textContent = 
      pantalla1.textContent === "0" || pantalla1.textContent === "ERROR!"
        ? botonApretado1
        : pantalla1.textContent + botonApretado1;
  });
});
