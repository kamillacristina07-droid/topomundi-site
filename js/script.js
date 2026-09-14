// =====================================================
// TOPOMUNDI TOPOGRAFIA LTDA
// JAVASCRIPT PRINCIPAL
// =====================================================

document.addEventListener("DOMContentLoaded", function () {


    // =================================================
    // FUNÇÕES GERAIS
    // =================================================

    function lerNumero(valor) {

        return parseFloat(
            String(valor)
                .trim()
                .replace(",", ".")
        );
    }


    function formatarNumero(
        valor,
        casas = 2
    ) {

        return valor.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: casas,
                maximumFractionDigits: casas
            }
        );
    }


    function grausParaRad(graus) {

        return graus *
            Math.PI / 180;
    }


    function radParaGraus(rad) {

        return rad *
            180 / Math.PI;
    }



    // =================================================
    // MENU MOBILE
    // =================================================

    const menuMobile =
        document.getElementById("menuMobile");

    const menuPrincipal =
        document.getElementById("menuPrincipal");


    if (menuMobile && menuPrincipal) {

        menuMobile.addEventListener(
            "click",
            function () {

                menuPrincipal.classList.toggle(
                    "ativo"
                );


                const aberto =
                    menuPrincipal.classList.contains(
                        "ativo"
                    );


                menuMobile.setAttribute(
                    "aria-expanded",
                    aberto
                );


                menuMobile.textContent =
                    aberto ? "✕" : "☰";
            }
        );


        document
            .querySelectorAll(
                ".menu-principal a"
            )
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        menuPrincipal
                            .classList
                            .remove("ativo");


                        menuMobile.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        menuMobile.textContent =
                            "☰";
                    }
                );

            });
    }



    // =================================================
    // TROCA DAS FERRAMENTAS
    // =================================================

    const botoesFerramenta =
        document.querySelectorAll(
            ".ferramenta-menu"
        );


    const paineisFerramenta =
        document.querySelectorAll(
            ".painel-ferramenta"
        );


    botoesFerramenta.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    botoesFerramenta
                        .forEach(function (item) {

                            item.classList.remove(
                                "ativa"
                            );

                        });


                    paineisFerramenta
                        .forEach(function (painel) {

                            painel.classList.remove(
                                "ativo"
                            );

                        });


                    botao.classList.add(
                        "ativa"
                    );


                    const ferramenta =
                        botao.getAttribute(
                            "data-ferramenta"
                        );


                    const painelSelecionado =
                        document.getElementById(
                            "painel-" +
                            ferramenta
                        );


                    if (painelSelecionado) {

                        painelSelecionado
                            .classList
                            .add("ativo");

                    }

                }
            );

        }
    );



    // =================================================
    // CALCULADORA DE ÁREA
    // =================================================

    const listaPontos =
        document.getElementById(
            "listaPontos"
        );


    const botaoAdicionar =
        document.getElementById(
            "adicionarPonto"
        );


    const botaoCalcularArea =
        document.getElementById(
            "calcularArea"
        );


    const resultadoM2 =
        document.getElementById(
            "resultadoM2"
        );


    const resultadoHa =
        document.getElementById(
            "resultadoHa"
        );


    const resultadoPerimetro =
        document.getElementById(
            "resultadoPerimetro"
        );


    const mensagemCalculadora =
        document.getElementById(
            "mensagemCalculadora"
        );


    function atualizarNumeracao() {

        if (!listaPontos) return;


        const linhas =
            listaPontos.querySelectorAll(
                ".linha-coordenada"
            );


        linhas.forEach(
            function (linha, indice) {

                const ponto =
                    linha.querySelector(
                        ".numero-ponto"
                    );


                ponto.textContent =
                    "P" + (indice + 1);

            }
        );
    }


    function adicionarPonto() {

        const linha =
            document.createElement(
                "div"
            );


        linha.className =
            "linha-coordenada";


        linha.innerHTML = `

            <span class="numero-ponto"></span>

            <input
                type="number"
                step="any"
                class="coordenada-e"
                placeholder="Coordenada E"
            >

            <input
                type="number"
                step="any"
                class="coordenada-n"
                placeholder="Coordenada N"
            >

            <button
                type="button"
                class="botao-remover"
            >
                ×
            </button>

        `;


        listaPontos.appendChild(
            linha
        );


        atualizarNumeracao();


        mensagemCalculadora.textContent =
            "";
    }


    function calcularArea() {

        const linhas =
            listaPontos.querySelectorAll(
                ".linha-coordenada"
            );


        const pontos = [];


        for (const linha of linhas) {

            const e =
                parseFloat(
                    linha.querySelector(
                        ".coordenada-e"
                    ).value
                );


            const n =
                parseFloat(
                    linha.querySelector(
                        ".coordenada-n"
                    ).value
                );


            if (
                Number.isNaN(e) ||
                Number.isNaN(n)
            ) {

                mensagemCalculadora.textContent =
                    "Preencha todas as coordenadas.";

                return;
            }


            pontos.push({
                x: e,
                y: n
            });
        }


        if (pontos.length < 3) {

            mensagemCalculadora.textContent =
                "São necessários pelo menos três pontos.";

            return;
        }


        let somaArea = 0;
        let perimetro = 0;


        for (
            let i = 0;
            i < pontos.length;
            i++
        ) {

            const atual =
                pontos[i];


            const proximo =
                pontos[
                    (i + 1) %
                    pontos.length
                ];


            somaArea +=
                atual.x *
                proximo.y
                -
                proximo.x *
                atual.y;


            const dx =
                proximo.x -
                atual.x;


            const dy =
                proximo.y -
                atual.y;


            perimetro +=
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );
        }


        const area =
            Math.abs(
                somaArea
            ) / 2;


        resultadoM2.textContent =
            formatarNumero(
                area
            );


        resultadoHa.textContent =
            formatarNumero(
                area / 10000,
                4
            );


        resultadoPerimetro.textContent =
            formatarNumero(
                perimetro
            );


        mensagemCalculadora.textContent =
            "Cálculo realizado com sucesso.";
    }


    if (
        botaoAdicionar &&
        listaPontos
    ) {

        botaoAdicionar.addEventListener(
            "click",
            adicionarPonto
        );

    }


    if (
        botaoCalcularArea &&
        listaPontos
    ) {

        botaoCalcularArea.addEventListener(
            "click",
            calcularArea
        );

    }


    if (listaPontos) {

        listaPontos.addEventListener(
            "click",
            function (evento) {

                if (
                    evento.target
                        .classList
                        .contains(
                            "botao-remover"
                        )
                ) {

                    const linhas =
                        listaPontos
                            .querySelectorAll(
                                ".linha-coordenada"
                            );


                    if (
                        linhas.length <= 3
                    ) {

                        mensagemCalculadora.textContent =
                            "É necessário manter pelo menos três pontos.";

                        return;
                    }


                    evento.target
                        .closest(
                            ".linha-coordenada"
                        )
                        .remove();


                    atualizarNumeracao();

                }

            }
        );

    }


    atualizarNumeracao();



    // =================================================
    // CONVERSOR - TROCA DE MODALIDADE
    // =================================================

    const botoesConversao =
        document.querySelectorAll(
            ".botao-tipo-conversao"
        );


    const formUtmLatLon =
        document.getElementById(
            "formUtmLatLon"
        );


    const formLatLonUtm =
        document.getElementById(
            "formLatLonUtm"
        );


    botoesConversao.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    botoesConversao
                        .forEach(function (item) {

                            item.classList.remove(
                                "ativo"
                            );

                        });


                    botao.classList.add(
                        "ativo"
                    );


                    if (
                        !formUtmLatLon ||
                        !formLatLonUtm
                    ) return;


                    formUtmLatLon
                        .classList
                        .remove("ativo");


                    formLatLonUtm
                        .classList
                        .remove("ativo");


                    if (
                        botao.dataset.tipo ===
                        "utm-latlon"
                    ) {

                        formUtmLatLon
                            .classList
                            .add("ativo");

                    } else {

                        formLatLonUtm
                            .classList
                            .add("ativo");

                    }

                }
            );

        }
    );



    // =================================================
    // ELIPSOIDE
    // =================================================

    function obterElipsoide() {

        const campoDatum =
            document.getElementById(
                "datum"
            );


        const datum =
            campoDatum
                ? campoDatum.value
                : "sirgas2000";


        if (
            datum === "sirgas2000"
        ) {

            return {
                a: 6378137.0,
                invF: 298.257222101
            };

        }


        return {
            a: 6378137.0,
            invF: 298.257223563
        };
    }



    // =================================================
    // LAT/LON → UTM
    // =================================================

    function latLonParaUtm(
        latitude,
        longitude,
        elipsoide
    ) {

        const a =
            elipsoide.a;


        const f =
            1 /
            elipsoide.invF;


        const e2 =
            f *
            (2 - f);


        const ep2 =
            e2 /
            (1 - e2);


        const k0 =
            0.9996;


        const lat =
            grausParaRad(
                latitude
            );


        const lon =
            grausParaRad(
                longitude
            );


        let zona =
            Math.floor(
                (longitude + 180) /
                6
            ) + 1;


        if (zona < 1) zona = 1;

        if (zona > 60) zona = 60;


        const lon0 =
            grausParaRad(
                (zona - 1) *
                6 -
                180 +
                3
            );


        const N =
            a /
            Math.sqrt(
                1 -
                e2 *
                Math.sin(lat) ** 2
            );


        const T =
            Math.tan(lat) ** 2;


        const C =
            ep2 *
            Math.cos(lat) ** 2;


        const A =
            Math.cos(lat) *
            (lon - lon0);


        const M =
            a *
            (
                (
                    1 -
                    e2 / 4 -
                    3 * e2 ** 2 / 64 -
                    5 * e2 ** 3 / 256
                ) *
                lat

                -

                (
                    3 * e2 / 8 +
                    3 * e2 ** 2 / 32 +
                    45 * e2 ** 3 / 1024
                ) *
                Math.sin(
                    2 * lat
                )

                +

                (
                    15 * e2 ** 2 / 256 +
                    45 * e2 ** 3 / 1024
                ) *
                Math.sin(
                    4 * lat
                )

                -

                (
                    35 * e2 ** 3 /
                    3072
                ) *
                Math.sin(
                    6 * lat
                )
            );


        const E =
            k0 *
            N *
            (
                A

                +

                (
                    1 -
                    T +
                    C
                ) *
                A ** 3 /
                6

                +

                (
                    5 -
                    18 * T +
                    T ** 2 +
                    72 * C -
                    58 * ep2
                ) *
                A ** 5 /
                120
            )
            +
            500000;


        let Nnorth =
            k0 *
            (
                M

                +

                N *
                Math.tan(lat) *
                (
                    A ** 2 / 2

                    +

                    (
                        5 -
                        T +
                        9 * C +
                        4 * C ** 2
                    ) *
                    A ** 4 /
                    24

                    +

                    (
                        61 -
                        58 * T +
                        T ** 2 +
                        600 * C -
                        330 * ep2
                    ) *
                    A ** 6 /
                    720
                )
            );


        const hemisferio =
            latitude < 0
                ? "S"
                : "N";


        if (
            latitude < 0
        ) {

            Nnorth +=
                10000000;

        }


        return {

            easting: E,

            northing: Nnorth,

            zona: zona,

            hemisferio: hemisferio

        };
    }



    // =================================================
    // UTM → LAT/LON
    // =================================================

    function utmParaLatLon(
        easting,
        northing,
        zona,
        hemisferio,
        elipsoide
    ) {

        const a =
            elipsoide.a;


        const f =
            1 /
            elipsoide.invF;


        const e2 =
            f *
            (2 - f);


        const ep2 =
            e2 /
            (1 - e2);


        const k0 =
            0.9996;


        const x =
            easting -
            500000;


        let y =
            northing;


        if (
            hemisferio
                .toUpperCase()
                === "S"
        ) {

            y -=
                10000000;

        }


        const lon0 =
            grausParaRad(
                (zona - 1) *
                6 -
                180 +
                3
            );


        const M =
            y /
            k0;


        const mu =
            M /
            (
                a *
                (
                    1 -
                    e2 / 4 -
                    3 * e2 ** 2 / 64 -
                    5 * e2 ** 3 / 256
                )
            );


        const e1 =
            (
                1 -
                Math.sqrt(
                    1 - e2
                )
            )
            /
            (
                1 +
                Math.sqrt(
                    1 - e2
                )
            );


        const phi1 =
            mu

            +

            (
                3 * e1 / 2 -
                27 * e1 ** 3 /
                32
            ) *
            Math.sin(
                2 * mu
            )

            +

            (
                21 * e1 ** 2 /
                16 -
                55 * e1 ** 4 /
                32
            ) *
            Math.sin(
                4 * mu
            )

            +

            (
                151 * e1 ** 3 /
                96
            ) *
            Math.sin(
                6 * mu
            )

            +

            (
                1097 * e1 ** 4 /
                512
            ) *
            Math.sin(
                8 * mu
            );


        const N1 =
            a /
            Math.sqrt(
                1 -
                e2 *
                Math.sin(
                    phi1
                ) ** 2
            );


        const T1 =
            Math.tan(
                phi1
            ) ** 2;


        const C1 =
            ep2 *
            Math.cos(
                phi1
            ) ** 2;


        const R1 =
            a *
            (1 - e2)
            /
            (
                1 -
                e2 *
                Math.sin(
                    phi1
                ) ** 2
            ) ** 1.5;


        const D =
            x /
            (N1 * k0);


        const latitude =
            phi1

            -

            (
                N1 *
                Math.tan(
                    phi1
                )
                /
                R1
            )

            *

            (
                D ** 2 /
                2

                -

                (
                    5 +
                    3 * T1 +
                    10 * C1 -
                    4 * C1 ** 2 -
                    9 * ep2
                ) *
                D ** 4 /
                24

                +

                (
                    61 +
                    90 * T1 +
                    298 * C1 +
                    45 * T1 ** 2 -
                    252 * ep2 -
                    3 * C1 ** 2
                ) *
                D ** 6 /
                720
            );


        const longitude =
            lon0

            +

            (
                D

                -

                (
                    1 +
                    2 * T1 +
                    C1
                ) *
                D ** 3 /
                6

                +

                (
                    5 -
                    2 * C1 +
                    28 * T1 -
                    3 * C1 ** 2 +
                    8 * ep2 +
                    24 * T1 ** 2
                ) *
                D ** 5 /
                120
            )

            /
            Math.cos(
                phi1
            );


        return {

            latitude:
                radParaGraus(
                    latitude
                ),

            longitude:
                radParaGraus(
                    longitude
                )

        };
    }



    // =================================================
    // EVENTOS DO CONVERSOR
    // =================================================

    const resultadoCoord1 =
        document.getElementById(
            "resultadoCoord1"
        );


    const resultadoCoord2 =
        document.getElementById(
            "resultadoCoord2"
        );


    const resultadoCoord3 =
        document.getElementById(
            "resultadoCoord3"
        );


    const labelResultado1 =
        document.getElementById(
            "labelResultado1"
        );


    const labelResultado2 =
        document.getElementById(
            "labelResultado2"
        );


    const labelResultado3 =
        document.getElementById(
            "labelResultado3"
        );


    const mensagemConversor =
        document.getElementById(
            "mensagemConversor"
        );


    const converterUtm =
        document.getElementById(
            "converterUtmLatLon"
        );


    const converterLatLon =
        document.getElementById(
            "converterLatLonUtm"
        );


    if (converterUtm) {

        converterUtm.addEventListener(
            "click",
            function () {

                const E =
                    lerNumero(
                        document
                            .getElementById(
                                "utmE"
                            ).value
                    );


                const N =
                    lerNumero(
                        document
                            .getElementById(
                                "utmN"
                            ).value
                    );


                const zona =
                    parseInt(
                        document
                            .getElementById(
                                "utmFuso"
                            ).value
                    );


                const hemisferio =
                    document
                        .getElementById(
                            "utmHemisferio"
                        ).value;


                if (
                    Number.isNaN(E) ||
                    Number.isNaN(N) ||
                    Number.isNaN(zona)
                ) {

                    mensagemConversor.textContent =
                        "Preencha corretamente os campos.";

                    return;
                }


                if (
                    zona < 1 ||
                    zona > 60
                ) {

                    mensagemConversor.textContent =
                        "O fuso deve estar entre 1 e 60.";

                    return;
                }


                const resultado =
                    utmParaLatLon(
                        E,
                        N,
                        zona,
                        hemisferio,
                        obterElipsoide()
                    );


                labelResultado1.textContent =
                    "Latitude";


                labelResultado2.textContent =
                    "Longitude";


                labelResultado3.textContent =
                    "Fuso / Hemisfério";


                resultadoCoord1.textContent =
                    resultado
                        .latitude
                        .toFixed(8)
                    +
                    "°";


                resultadoCoord2.textContent =
                    resultado
                        .longitude
                        .toFixed(8)
                    +
                    "°";


                resultadoCoord3.textContent =
                    zona +
                    hemisferio;


                mensagemConversor.textContent =
                    "Conversão realizada com sucesso.";

            }
        );

    }


    if (converterLatLon) {

        converterLatLon.addEventListener(
            "click",
            function () {

                const latitude =
                    lerNumero(
                        document
                            .getElementById(
                                "latitude"
                            ).value
                    );


                const longitude =
                    lerNumero(
                        document
                            .getElementById(
                                "longitude"
                            ).value
                    );


                if (
                    Number.isNaN(
                        latitude
                    ) ||
                    Number.isNaN(
                        longitude
                    )
                ) {

                    mensagemConversor.textContent =
                        "Informe latitude e longitude válidas.";

                    return;
                }


                if (
                    latitude < -80 ||
                    latitude > 84
                ) {

                    mensagemConversor.textContent =
                        "A projeção UTM convencional é utilizada entre 80°S e 84°N.";

                    return;
                }


                if (
                    longitude < -180 ||
                    longitude > 180
                ) {

                    mensagemConversor.textContent =
                        "A longitude deve estar entre -180° e 180°.";

                    return;
                }


                const resultado =
                    latLonParaUtm(
                        latitude,
                        longitude,
                        obterElipsoide()
                    );


                labelResultado1.textContent =
                    "Coordenada E";


                labelResultado2.textContent =
                    "Coordenada N";


                labelResultado3.textContent =
                    "Fuso / Hemisfério";


                resultadoCoord1.textContent =
                    formatarNumero(
                        resultado.easting,
                        3
                    );


                resultadoCoord2.textContent =
                    formatarNumero(
                        resultado.northing,
                        3
                    );


                resultadoCoord3.textContent =
                    resultado.zona +
                    resultado.hemisferio;


                mensagemConversor.textContent =
                    "Conversão realizada com sucesso.";

            }
        );

    }



    // =================================================
    // CALCULADORA DE DECLIVIDADE
    // =================================================

    const botaoDeclividade =
        document.getElementById(
            "calcularDeclividade"
        );


    const botaoLimparDeclividade =
        document.getElementById(
            "limparDeclividade"
        );


    const resultadoDesnivel =
        document.getElementById(
            "resultadoDesnivel"
        );


    const resultadoDeclividade =
        document.getElementById(
            "resultadoDeclividade"
        );


    const resultadoAngulo =
        document.getElementById(
            "resultadoAngulo"
        );


    const resultadoRazao =
        document.getElementById(
            "resultadoRazao"
        );


    const resultadoSentido =
        document.getElementById(
            "resultadoSentido"
        );


    const mensagemDeclividade =
        document.getElementById(
            "mensagemDeclividade"
        );


    function calcularDeclividade() {

        const cotaInicial =
            lerNumero(
                document
                    .getElementById(
                        "cotaInicial"
                    ).value
            );


        const cotaFinal =
            lerNumero(
                document
                    .getElementById(
                        "cotaFinal"
                    ).value
            );


        const distancia =
            lerNumero(
                document
                    .getElementById(
                        "distanciaHorizontal"
                    ).value
            );


        mensagemDeclividade.textContent =
            "";


        if (
            Number.isNaN(
                cotaInicial
            ) ||
            Number.isNaN(
                cotaFinal
            ) ||
            Number.isNaN(
                distancia
            )
        ) {

            mensagemDeclividade.textContent =
                "Preencha todos os campos.";

            return;
        }


        if (
            distancia <= 0
        ) {

            mensagemDeclividade.textContent =
                "A distância horizontal deve ser maior que zero.";

            return;
        }


        const desnivel =
            cotaFinal -
            cotaInicial;


        const declividade =
            (
                desnivel /
                distancia
            ) *
            100;


        const angulo =
            radParaGraus(
                Math.atan(
                    desnivel /
                    distancia
                )
            );


        resultadoDesnivel.textContent =
            (
                desnivel > 0
                    ? "+"
                    : ""
            )
            +
            formatarNumero(
                desnivel,
                2
            );


        resultadoDeclividade.textContent =
            (
                declividade > 0
                    ? "+"
                    : ""
            )
            +
            formatarNumero(
                declividade,
                2
            );


        resultadoAngulo.textContent =
            (
                angulo > 0
                    ? "+"
                    : ""
            )
            +
            formatarNumero(
                angulo,
                2
            )
            +
            "°";


        if (
            Math.abs(
                desnivel
            ) < 0.000001
        ) {

            resultadoRazao.textContent =
                "Plano";


            resultadoSentido.textContent =
                "Trecho praticamente plano.";


            resultadoSentido.className =
                "resultado-sentido plano";

        } else {

            const razao =
                distancia /
                Math.abs(
                    desnivel
                );


            resultadoRazao.textContent =
                "1 : " +
                formatarNumero(
                    razao,
                    2
                );


            if (
                desnivel > 0
            ) {

                resultadoSentido.textContent =
                    "Trecho ascendente: a cota final é superior à cota inicial.";


                resultadoSentido.className =
                    "resultado-sentido ascendente";

            } else {

                resultadoSentido.textContent =
                    "Trecho descendente: a cota final é inferior à cota inicial.";


                resultadoSentido.className =
                    "resultado-sentido descendente";

            }

        }


        mensagemDeclividade.textContent =
            "Cálculo realizado com sucesso.";
    }


    function limparDeclividade() {

        document
            .getElementById(
                "cotaInicial"
            ).value = "";


        document
            .getElementById(
                "cotaFinal"
            ).value = "";


        document
            .getElementById(
                "distanciaHorizontal"
            ).value = "";


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


        mensagemDeclividade.textContent =
            "";
    }


    if (botaoDeclividade) {

        botaoDeclividade.addEventListener(
            "click",
            calcularDeclividade
        );

    }


    if (
        botaoLimparDeclividade
    ) {

        botaoLimparDeclividade
            .addEventListener(
                "click",
                limparDeclividade
            );

    }

});
