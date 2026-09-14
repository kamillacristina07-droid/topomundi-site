document.addEventListener("DOMContentLoaded", function () {

    const cotaInicial =
        document.getElementById("cotaInicial");

    const cotaFinal =
        document.getElementById("cotaFinal");

    const distanciaHorizontal =
        document.getElementById("distanciaHorizontal");

    const botaoCalcular =
        document.getElementById("calcularDeclividade");

    const botaoLimpar =
        document.getElementById("limparDeclividade");

    const resultadoDesnivel =
        document.getElementById("resultadoDesnivel");

    const resultadoDeclividade =
        document.getElementById("resultadoDeclividade");

    const resultadoAngulo =
        document.getElementById("resultadoAngulo");

    const resultadoRazao =
        document.getElementById("resultadoRazao");

    const resultadoSentido =
        document.getElementById("resultadoSentido");

    const mensagem =
        document.getElementById("mensagemDeclividade");


    /*
     * Aceita:
     * 750
     * 750.50
     * 750,50
     */
    function converterNumero(valor) {

        if (!valor) {
            return NaN;
        }

        return Number(
            String(valor)
                .trim()
                .replace(",", ".")
        );
    }


    function formatar(valor, casas = 2) {

        return valor.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: casas,
                maximumFractionDigits: casas
            }
        );
    }


    function calcular() {

        const inicial =
            converterNumero(cotaInicial.value);

        const final =
            converterNumero(cotaFinal.value);

        const distancia =
            converterNumero(
                distanciaHorizontal.value
            );


        mensagem.textContent = "";


        if (
            Number.isNaN(inicial) ||
            Number.isNaN(final) ||
            Number.isNaN(distancia)
        ) {

            mensagem.textContent =
                "Preencha corretamente os três campos.";

            return;
        }


        if (distancia <= 0) {

            mensagem.textContent =
                "A distância horizontal deve ser maior que zero.";

            return;
        }


        /*
         * DESNÍVEL
         */

        const desnivel =
            final - inicial;


        /*
         * DECLIVIDADE %
         *
         * i = Δh / D × 100
         */

        const declividade =
            (desnivel / distancia) * 100;


        /*
         * ÂNGULO
         */

        const anguloRad =
            Math.atan(
                desnivel / distancia
            );

        const anguloGraus =
            anguloRad *
            180 /
            Math.PI;


        /*
         * RAZÃO 1:n
         */

        let razaoTexto;


        if (
            Math.abs(desnivel) <
            0.0000001
        ) {

            razaoTexto =
                "Plano";

        } else {

            const razao =
                distancia /
                Math.abs(desnivel);

            razaoTexto =
                "1 : " +
                formatar(razao, 2);
        }


        /*
         * RESULTADOS
         */

        resultadoDesnivel.textContent =
            (
                desnivel > 0
                    ? "+"
                    : ""
            ) +
            formatar(desnivel, 2);


        resultadoDeclividade.textContent =
            (
                declividade > 0
                    ? "+"
                    : ""
            ) +
            formatar(
                declividade,
                2
            );


        resultadoAngulo.textContent =
            (
                anguloGraus > 0
                    ? "+"
                    : ""
            ) +
            formatar(
                anguloGraus,
                2
            ) +
            "°";


        resultadoRazao.textContent =
            razaoTexto;


        /*
         * SENTIDO
         */

        if (
            Math.abs(desnivel) <
            0.0000001
        ) {

            resultadoSentido.textContent =
                "Trecho praticamente plano.";

            resultadoSentido.className =
                "resultado-sentido plano";

        }

        else if (desnivel > 0) {

            resultadoSentido.textContent =
                "Trecho ascendente: a cota final é superior à cota inicial.";

            resultadoSentido.className =
                "resultado-sentido ascendente";

        }

        else {

            resultadoSentido.textContent =
                "Trecho descendente: a cota final é inferior à cota inicial.";

            resultadoSentido.className =
                "resultado-sentido descendente";

        }


        mensagem.textContent =
            "Cálculo realizado com sucesso.";
    }


    function limpar() {

        cotaInicial.value = "";

        cotaFinal.value = "";

        distanciaHorizontal.value = "";


        resultadoDesnivel.textContent =
            "—";

        resultadoDeclividade.textContent =
            "—";

        resultadoAngulo.textContent =
            "—";

        resultadoRazao.textContent =
            "—";


        resultadoSentido.textContent =
            "Informe os dados para calcular.";

        resultadoSentido.className =
            "resultado-sentido";


        mensagem.textContent = "";
    }


    /*
     * EVENTOS
     */

    if (botaoCalcular) {

        botaoCalcular.addEventListener(
            "click",
            calcular
        );
    }


    if (botaoLimpar) {

        botaoLimpar.addEventListener(
            "click",
            limpar
        );
    }

});
