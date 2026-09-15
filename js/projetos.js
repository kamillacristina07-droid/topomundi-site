document.addEventListener("DOMContentLoaded", function () {

    const botoes =
        document.querySelectorAll(".botao-ver-projeto");

    const modais =
        document.querySelectorAll(".modal-projeto");

    const botoesFechar =
        document.querySelectorAll(".fechar-modal");


    botoes.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const id =
                botao.getAttribute("data-projeto");

            const modal =
                document.getElementById(id);

            if (modal) {

                modal.classList.add("ativo");

                document.body.style.overflow =
                    "hidden";
            }

        });

    });


    function fecharModal(modal) {

        modal.classList.remove("ativo");

        document.body.style.overflow =
            "";

        const videos =
            modal.querySelectorAll("video");

        videos.forEach(function (video) {

            video.pause();

        });
    }


    botoesFechar.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const modal =
                botao.closest(".modal-projeto");

            fecharModal(modal);

        });

    });


    modais.forEach(function (modal) {

        modal.addEventListener("click", function (evento) {

            if (evento.target === modal) {

                fecharModal(modal);

            }

        });

    });


    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {

            document
                .querySelectorAll(".modal-projeto.ativo")
                .forEach(function (modal) {

                    fecharModal(modal);

                });

        }

    });

});
