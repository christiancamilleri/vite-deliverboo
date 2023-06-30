<script>

export default {
    data() {
        return {

        }
    },
}
</script>

<template>
    <div>
        <footer class="my-footer text-center text-lg-start bg-primary py-5">
            <section class="container d-flex justify-content-center justify-content-md-between mb-5">
                <div class="d-none d-md-block">
                    <span>Connettiti con noi sui nostri social:</span>
                </div>

                <div class="d-flex justify-content-center gap-3">
                    <a href="" class="text-reset">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="" class="text-reset">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="" class="text-reset">
                        <i class="fab fa-google"></i>
                    </a>
                    <a href="" class="text-reset">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="" class="text-reset">
                        <i class="fab fa-linkedin"></i>
                    </a>
                </div>
            </section>

            <section
                class="container text-center text-md-start d-flex flex-column flex-md-row justify-content-md-between align-items-center align-items-md-start gap-3 gap-md-0 mb-5">
                <div id="footer-text">
                    <h6 class="text-uppercase fw-bold mb-3">
                        <i class="fas fa-gem me-3"></i>DeliveBoo
                    </h6>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                    </p>
                </div>

                <div>
                    <h6 class="text-uppercase fw-bold mb-3">
                        Servizio
                    </h6>

                    <ul class="link-list d-flex flex-column gap-2">
                        <li>
                            <a href="#!" class="text-reset">Rapido</a>
                        </li>
                        <li>
                            <a href="#!" class="text-reset">Puntuale</a>
                        </li>
                        <li>
                            <a href="#!" class="text-reset">Sicuro</a>
                        </li>
                        <li>
                            <a href="#!" class="text-reset">Preciso</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h6 class="text-uppercase fw-bold mb-3">
                        Link Utili
                    </h6>

                    <ul class="link-list d-flex flex-column gap-2">
                        <li>
                            <a href="#!" class="text-reset">Prezzi</a>
                        </li>
                        <li>
                            <a href="#!" class="text-reset">Impostazioni</a>
                        </li>
                        <li>
                            <a href="#!" class="text-reset">Ordini</a>
                        </li>
                        <li>
                            <a href="#!" class="text-reset">Aiuto</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h6 class="text-uppercase fw-bold mb-3">Contatto</h6>
                    <p><i class="fas fa-home me-3"></i>Milano, MI 20123</p>
                    <p>
                        <i class="fas fa-envelope me-3"></i>
                        info@deliveboo.com
                    </p>
                    <p><i class="fas fa-phone me-3"></i>+ 39 123 25 36</p>
                    <p><i class="fas fa-print me-3"></i>+ 39 234 567 89</p>
                </div>
            </section>

            <section class="copyright text-center">
                <p>© 2023 Copyright: Team 6 - Classe#88 - Boolean</p>
            </section>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
#footer-text {
    width: 80%;
}

.link-list {
    padding: 0;
    list-style-type: none;
}

@media screen and (min-width: 768px) {
    #footer-text {
        width: 30%;
    }
}
</style>