// =====================================================
// TOPOMUNDI TOPOGRAFIA
// Menu responsivo
// =====================================================

const menuMobile = document.getElementById("menuMobile");
const menuPrincipal = document.getElementById("menuPrincipal");

menuMobile.addEventListener("click", function () {

    menuPrincipal.classList.toggle("ativo");

    const menuAberto =
        menuPrincipal.classList.contains("ativo");

    menuMobile.setAttribute(
        "aria-expanded",
        menuAberto
    );

    menuMobile.textContent =
        menuAberto ? "✕" : "☰";
});


// Fecha o menu após clicar em um item no celular

const linksMenu = document.querySelectorAll(
    ".menu-principal a"
);

linksMenu.forEach(function (link) {

    link.addEventListener("click", function () {

        menuPrincipal.classList.remove("ativo");

        menuMobile.setAttribute(
            "aria-expanded",
            "false"
        );

        menuMobile.textContent = "☰";
    });

});
