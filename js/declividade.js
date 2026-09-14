document.addEventListener("DOMContentLoaded", function () {

    const botaoCalcular =
        document.getElementById("calcularDeclividade");

    const botaoLimpar =
        document.getElementById("limparDeclividade");


    if (botaoCalcular) {

        botaoCalcular.addEventListener("click", function () {

            const cotaInicial =
                parseFloat(
                    document
                        .getElementById("cotaInicial")
                        .value
                        .replace(",", ".")
                );

            const cotaFinal =
                parseFloat(
                    document
                        .getElementById("cotaFinal")
                        .value
                        .replace(",", ".")
                );

            const distancia =
                parseFloat(
                    document
                        .getElementById("distanciaHorizontal")
                        .value
                        .replace(",", ".")
                );


            if (
                Number.isNaN(cotaInicial) ||
                Number.isNaN(cotaFinal) ||
                Number.isNaN(distancia)
            ) {

                alert("Preencha todos os campos.");

                return;
            }


            if (distancia <= 0) {

                alert(
                    "A distância deve ser maior que zero."
                );

                return;
            }


            const desnivel =
                cotaFinal - cotaInicial;


            const declividade =
                (desnivel / distancia) * 100;


            const angulo =
                Math.atan(
                    desnivel / distancia
                ) *
                180 /
                Math.PI;


            const razao =
                desnivel === 0
                    ? 0
                    : distancia /
                      Math.abs(desnivel);


            document
                .getElementById("resultadoDesnivel")
                .textContent =
                desnivel.toFixed(2);


            document
                .getElementById("resultadoDeclividade")
                .textContent =
                declividade.toFixed(2);


            document
                .getElementById("resultadoAngulo")
                .textContent =
                angulo.toFixed(2) + "°";


            document
                .getElementById("resultadoRazao")
                .textContent =
                desnivel === 0
                    ? "Plano"
                    : "1 : " +
                      razao.toFixed(2);


            document
                .getElementById("resultadoSentido")
                .textContent =
                desnivel > 0
                    ? "Trecho ascendente"
                    : desnivel < 0
                        ? "Trecho descendente"
                        : "Trecho plano";

        });
    }


    if (botaoLimpar) {

        botaoLimpar.addEventListener("click", function () {

            document
                .getElementById("cotaInicial")
                .value = "";

            document
                .getElementById("cotaFinal")
                .value = "";

            document
                .getElementById("distanciaHorizontal")
                .value = "";


            document
                .getElementById("resultadoDesnivel")
                .textContent = "—";

            document
                .getElementById("resultadoDeclividade")
                .textContent = "—";

            document
                .getElementById("resultadoAngulo")
                .textContent = "—";

            document
                .getElementById("resultadoRazao")
                .textContent = "—";

            document
                .getElementById("resultadoSentido")
                .textContent =
                "Informe os dados para calcular.";

        });
    }

});
