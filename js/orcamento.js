document.addEventListener("DOMContentLoaded", function () {

    const formulario =
        document.getElementById("formOrcamento");

    const mensagem =
        document.getElementById("mensagemOrcamento");


    if (!formulario) {
        return;
    }


    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const nome =
                document
                    .getElementById("orcNome")
                    .value
                    .trim();

            const telefone =
                document
                    .getElementById("orcTelefone")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("orcEmail")
                    .value
                    .trim();

            const servico =
                document
                    .getElementById("orcServico")
                    .value;

            const cidade =
                document
                    .getElementById("orcCidade")
                    .value
                    .trim();

            const uf =
                document
                    .getElementById("orcUf")
                    .value;

            const area =
                document
                    .getElementById("orcArea")
                    .value
                    .trim();

            const prazo =
                document
                    .getElementById("orcPrazo")
                    .value;

            const detalhes =
                document
                    .getElementById("orcDetalhes")
                    .value
                    .trim();


            mensagem.textContent = "";


            if (
                !nome ||
                !telefone ||
                !servico ||
                !cidade ||
                !uf
            ) {

                mensagem.textContent =
                    "Preencha os campos obrigatórios antes de enviar.";

                return;
            }


            let texto =
                "Olá! Gostaria de solicitar um orçamento com a TOPOMUNDI.\n\n";


            texto +=
                "*DADOS DO CLIENTE*\n";

            texto +=
                "Nome: " +
                nome +
                "\n";

            texto +=
                "Telefone: " +
                telefone +
                "\n";


            if (email) {

                texto +=
                    "E-mail: " +
                    email +
                    "\n";
            }


            texto +=
                "\n*SERVIÇO SOLICITADO*\n";

            texto +=
                "Serviço: " +
                servico +
                "\n";

            texto +=
                "Localização: " +
                cidade +
                " - " +
                uf +
                "\n";


            if (area) {

                texto +=
                    "Área aproximada: " +
                    area +
                    "\n";
            }


            if (prazo) {

                texto +=
                    "Prazo desejado: " +
                    prazo +
                    "\n";
            }


            if (detalhes) {

                texto +=
                    "\n*INFORMAÇÕES ADICIONAIS*\n";

                texto +=
                    detalhes +
                    "\n";
            }


            texto +=
                "\nMensagem enviada pelo site da TOPOMUNDI.";


            const numeroWhatsApp =
                "5562982642023";


            const url =
                "https://wa.me/" +
                numeroWhatsApp +
                "?text=" +
                encodeURIComponent(texto);


            /*
             * Redireciona diretamente para o WhatsApp.
             * Evita bloqueio de pop-up do navegador.
             */

            window.location.href = url;

        }
    );

});
