document.addEventListener("DOMContentLoaded", function () {

    const botoesProjeto =
        document.querySelectorAll(".botao-ver-projeto");


    botoesProjeto.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const idProjeto =
                this.getAttribute("data-projeto");

            const modal =
                document.getElementById(idProjeto);


            if (!modal) {

                console.error(
                    "Modal não encontrado:",
                    idProjeto
                );

                return;
            }


            modal.classList.add("ativo");

            document.body.style.overflow =
                "hidden";

        });

    });


    const botoesFechar =
        document.querySelectorAll(".fechar-modal");


    botoesFechar.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const modal =
                this.closest(".modal-projeto");

            fecharProjeto(modal);

        });

    });


    const modais =
        document.querySelectorAll(".modal-projeto");


    modais.forEach(function (modal) {

        modal.addEventListener("click", function (evento) {

            if (evento.target === modal) {

                fecharProjeto(modal);

            }

        });

    });


    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {

            const modalAberto =
                document.querySelector(
                    ".modal-projeto.ativo"
                );


            if (modalAberto) {

                fecharProjeto(modalAberto);

            }

        }

    });


    function fecharProjeto(modal) {

        if (!modal) {
            return;
        }


        modal.classList.remove("ativo");

        document.body.style.overflow =
            "";


        const videos =
            modal.querySelectorAll("video");


        videos.forEach(function (video) {

            video.pause();

        });

    }

});
