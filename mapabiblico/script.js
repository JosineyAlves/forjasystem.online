document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       0. FECHA DINÁMICA EN ESPAÑOL (Para la barra de urgencia superior)
       ========================================================================== */
    const urgencyText = document.getElementById('urgencyText');
    if (urgencyText) {
        const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
        // Formateador de fecha local en español
        const fechaHoy = new Date().toLocaleDateString('es-ES', opciones).toUpperCase();
        urgencyText.innerHTML = `<span class="urgency-line">OFERTA POR TIEMPO LIMITADO</span><span class="urgency-line">— DESCUENTO DEL 80% SOLO HOY, ${fechaHoy}</span>`;
    }



    /* ==========================================================================
       1. PROPAGACIÓN DE PARÁMETROS DE URL (UTMs, SRC, etc.) PARA HOTMART
       ========================================================================== */
    const hotmartLinks = document.querySelectorAll('a[href*="pay.hotmart.com"]');
    hotmartLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            let targetUrl = link.getAttribute('href');
            const searchParams = window.location.search;

            if (searchParams) {
                // Quitar el '?' inicial
                const cleanParams = searchParams.substring(1);

                // Si el link de destino ya tiene parámetros ('?'), concatenar con '&', de lo contrario con '?'
                if (targetUrl.includes('?')) {
                    targetUrl += '&' + cleanParams;
                } else {
                    targetUrl += '?' + cleanParams;
                }
            }

            // Redirigir forzando window.location.href
            window.location.href = targetUrl;
        });
    });



    /* ==========================================================================
       2. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Cerrar otros acordeones abiertos
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       3. ANIMACIONES SUTILES AL SCROLL (Cards fade-in & slide-up)
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.benefit-card-ideal, .problem-card, .solution-card, .demo-card, .testimonial-card, .step-card, .bonus-item-showcase');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
        animatedElements.forEach(el => {
            el.classList.add('scroll-animate');
            el.classList.add('animate-in');
        });
    }

    /* ==========================================================================
       4. LITURGIA DEL DÍA (Bono #5 - Salmo Diario Interactivo)
       ========================================================================== */
    const salmosDeMes = [
        {
            tema: "Confianza en el Señor",
            referencia: "Salmo 23,1",
            versiculo: "“El Señor es mi pastor, nada me faltará.”",
            reflexion: "Descansar en la providencia de Dios es un acto de fe."
        },
        {
            tema: "Fortaleza y Valor",
            referencia: "Salmo 27,1",
            versiculo: "“El Señor es mi luz y mi salvación, ¿a quién temeré?”",
            reflexion: "Enfrenta tus temores sabiendo que la luz divina guía tus pasos."
        },
        {
            tema: "Refugio en la Tormenta",
            referencia: "Salmo 46,1",
            versiculo: "“Dios es nuestro refugio y nuestra fuerza, un auxilio siempre presente en las dificultades.”",
            reflexion: "En los momentos difíciles, confía en el Dios que calma la tempestad."
        },
        {
            tema: "Protección Divina",
            referencia: "Salmo 121,1-2",
            versiculo: "“Levanto mis ojos a los montes: ¿de dónde me vendrá el auxilio? Mi auxilio viene del Señor, que hizo el cielo y la tierra.”",
            reflexion: "Dirige tu mirada al cielo; tu ayuda no viene del mundo, sino del Creador."
        },
        {
            tema: "Entrega y Confianza",
            referencia: "Salmo 37,5",
            versiculo: "“Encomienda tu camino al Señor, confía en él, y él actuará.”",
            reflexion: "Deja tus planes en las manos de Dios y verás su gracia actuar."
        },
        {
            tema: "Bondad de Dios",
            referencia: "Salmo 34,8",
            versiculo: "“Gusten y vean qué bueno es el Señor; dichoso el hombre que se refugia en él.”",
            reflexion: "Experimenta el amor de Dios buscando consuelo en su presencia."
        },
        {
            tema: "Gratitud Diaria",
            referencia: "Salmo 103,1-2",
            versiculo: "“Bendice, alma mía, al Señor, y todo mi ser a su santo nombre. Bendice, alma mía, al Señor, y no olvides ninguno de sus beneficios.”",
            reflexion: "Agradecer a Dios por sus bendiciones es el camino hacia la paz interior."
        },
        {
            tema: "Amparo Divino",
            referencia: "Salmo 91,1-2",
            versiculo: "“Tú que habitas al amparo del Altísimo, que vives a la sombra del Omnipotente, di al Señor: 'Refugio mío, alcázar mío, Dios mío, en quien confío'.”",
            reflexion: "Vivir bajo la protección de Dios nos llena de una paz inquebrantable."
        },
        {
            tema: "Guía de la Palabra",
            referencia: "Salmo 119,105",
            versiculo: "“Tu palabra es una lámpara para mis pasos, una luz en mi sendero.”",
            reflexion: "Deja que la Palabra de Dios sea la luz que dirija tus decisiones diarias."
        },
        {
            tema: "Renovación Interior",
            referencia: "Salmo 51,10",
            versiculo: "“Crea en mí, oh Dios, un corazón puro, y renueva un espíritu firme dentro de mí.”",
            reflexion: "La reconciliación y el deseo de cambiar alegran el corazón del Padre."
        },
        {
            tema: "Conocidos por Dios",
            referencia: "Salmo 139,1-3",
            versiculo: "“Señor, tú me sondeas y me conoces; me conoces cuando me siento o me levanto, de lejos penetras mis pensamientos.”",
            reflexion: "No estás solo; Dios te conoce íntimamente y te ama como eres."
        },
        {
            tema: "Oración Matutina",
            referencia: "Salmo 143,8",
            versiculo: "“Hazme escuchar tu amor por la mañana, porque en ti confío; muéstrame el camino que debo seguir, porque hacia ti levanto mi alma.”",
            reflexion: "Empieza tu día entregando tu alma al Señor y pidiendo su guía."
        },
        {
            tema: "Camino de la Vida",
            referencia: "Salmo 16,11",
            versiculo: "“Me darás a conocer la senda de la vida; en tu presencia hay plenitud de gozo, delicias a tu derecha para siempre.”",
            reflexion: "El verdadero gozo no se encuentra en las cosas del mundo, sino en la cercanía de Dios."
        },
        {
            tema: "Descanso Espiritual",
            referencia: "Salmo 62,1",
            versiculo: "“Solo en Dios descansa mi alma, de él viene mi salvación.”",
            reflexion: "En medio del ruido diario, encuentra un momento de silencio para reposar en el Señor."
        },
        {
            tema: "Anhelo de Dios",
            referencia: "Salmo 84,1-2",
            versiculo: "“¡Qué deseables son tus moradas, Señor del universo! Mi alma se consume y anhela los atrios del Señor.”",
            reflexion: "El alma humana fue creada para Dios y solo en Él encuentra su verdadera patria."
        },
        {
            tema: "Alegría en el Señor",
            referencia: "Salmo 28,7",
            versiculo: "“El Señor es mi fuerza y mi escudo, en él confía mi corazón; he sido ayudado y mi corazón se alegra, le daré gracias con mi canto.”",
            reflexion: "La alabanza a Dios ahuyenta la tristeza y fortalece el espíritu."
        },
        {
            tema: "Paz al Descansar",
            referencia: "Salmo 4,8",
            versiculo: "“En paz me acuesto y en seguida me duermo, porque solo tú, Señor, me haces vivir confiado.”",
            reflexion: "Entrega tus preocupaciones del día antes de dormir y descansa bajo su mirada protectora."
        },
        {
            tema: "Fortaleza Firme",
            referencia: "Salmo 18,2",
            versiculo: "“El Señor es mi roca, mi fortaleza y mi libertador; mi Dios, la peña en que me refugio, mi escudo, la fuerza de mi salvación.”",
            reflexion: "Cuando sientas que todo tiembla a tu alrededor, apóyate en la Roca eterna."
        },
        {
            tema: "Sabiduría y Dirección",
            referencia: "Salmo 25,4",
            versiculo: "“Muéstrame, Señor, tus caminos, enséñame tus sendas.”",
            reflexion: "Pedir dirección al Señor es el primer paso para caminar con rectitud."
        },
        {
            tema: "Celebración de la Vida",
            referencia: "Salmo 118,24",
            versiculo: "“Este es el día en que actuó el Señor, sea nuestra alegría y nuestro gozo.”",
            reflexion: "Cada nuevo amanecer es un regalo de la misericordia de Dios; vívelo con alegría."
        },
        {
            tema: "Cercanía de Dios",
            referencia: "Salmo 145,18",
            versiculo: "“El Señor está cerca de los que lo invocan, de todos los que lo invocan con sinceridad.”",
            reflexion: "Dios no está lejos; escucha cada oración que brota de un corazón sincero."
        },
        {
            tema: "Esperanza en la Prueba",
            referencia: "Salmo 30,5",
            versiculo: "“Porque su enojo dura un instante, pero su favor toda la vida. Por la tarde entra el llanto, pero al amanecer llega la alegría.”",
            reflexion: "Las dificultades son temporales; la gracia de Dios y su gozo son eternos."
        },
        {
            tema: "Sed de Dios",
            referencia: "Salmo 63,1",
            versiculo: "“Oh Dios, tú eres mi Dios, por ti madrugo; mi alma tiene sed de ti, mi carne desfallece por ti.”",
            reflexion: "Reconoce la necesidad profunda que tienes de Dios en tu rutina diaria."
        },
        {
            tema: "Corazón Firme",
            referencia: "Salmo 112,7",
            versiculo: "“No temerá las malas noticias; su corazón está firme, confiado en el Señor.”",
            reflexion: "Quien confía plenamente en Dios no se desmorona ante las adversidades del mundo."
        },
        {
            tema: "Paciencia y Espera",
            referencia: "Salmo 130,5",
            versiculo: "“Espero en el Señor, mi alma espera, y en su palabra confío.”",
            reflexion: "Saber esperar el tiempo de Dios es una de las mayores virtudes del creyente."
        },
        {
            tema: "Guardar la Palabra",
            referencia: "Salmo 119,11",
            versiculo: "“En mi corazón he guardado tus dichos, para no pecar contra ti.”",
            reflexion: "Meditar la Escritura nos da la fuerza para tomar decisiones sabias y agradables a Dios."
        },
        {
            tema: "Consuelo Divino",
            referencia: "Salmo 34,18",
            versiculo: "“El Señor está cerca de los corazones quebrantados, y salva a los de espíritu abatido.”",
            reflexion: "En tu dolor, Dios está más cerca que nunca, sanando tus heridas con amor."
        },
        {
            tema: "Misericordia Eterna",
            referencia: "Salmo 100,5",
            versiculo: "“Porque el Señor es bueno; su misericordia es eterna, y su fidelidad por todas las generaciones.”",
            reflexion: "La fidelidad de Dios no depende de nuestras debilidades; Él siempre nos espera."
        },
        {
            tema: "Sanidad Interior",
            referencia: "Salmo 147,3",
            versiculo: "“Él sana a los quebrantados de corazón, y venda sus heridas.”",
            reflexion: "Abre tu corazón herido al Señor; Él es el Médico divino que todo lo cura."
        },
        {
            tema: "Fidelidad del Señor",
            referencia: "Salmo 138,8",
            versiculo: "“El Señor completará lo que ha empezado en mí; tu misericordia, Señor, es eterna, ¡no abandones la obra de tus manos!”",
            reflexion: "Confía en que el plan que Dios comenzó en tu vida llegará a su plenitud."
        },
        {
            tema: "Promesa de Paz",
            referencia: "Salmo 23,6",
            versiculo: "“El bien y la misericordia me acompañarán todos los días de mi vida, y habitaré en la casa del Señor por largos días.”",
            reflexion: "Camina con la seguridad de que la bondad del Señor te escolta a cada paso."
        }
    ];

    // Obtener salmo correspondiente al día del mes (1 a 31)
    const getSalmoDelDia = () => {
        const hoy = new Date();
        const dia = hoy.getDate(); // 1 a 31
        // Restar 1 para el índice del array (0 a 30)
        const indice = (dia - 1) % salmosDeMes.length;
        return salmosDeMes[indice];
    };

    // Actualizar elementos visuales de la interfaz
    const actualizarInterfazSalmo = () => {
        const salmo = getSalmoDelDia();
        const hoy = new Date();

        // Formateador de fecha en español
        const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
        const fechaFormateada = hoy.toLocaleDateString('es-ES', opcionesFecha).toUpperCase();

        // Elementos del Modal
        const modalDate = document.getElementById('liturgiaModalDate');
        const modalTitle = document.getElementById('liturgiaModalTitle');
        const modalRef = document.getElementById('liturgiaModalRef');
        const modalQuote = document.getElementById('liturgiaModalQuote');
        const modalReflection = document.getElementById('liturgiaModalReflection');

        if (modalDate) modalDate.textContent = fechaFormateada;
        if (modalTitle) modalTitle.textContent = salmo.tema;
        if (modalRef) modalRef.textContent = salmo.referencia;
        if (modalQuote) modalQuote.textContent = salmo.versiculo;
        if (modalReflection) modalReflection.textContent = salmo.reflexion;

        // Elementos del Mini-Card Mockup (en el grid de bonos)
        const miniDate = document.getElementById('mini-card-date');
        const miniTitle = document.getElementById('mini-card-title');
        const miniRef = document.getElementById('mini-card-ref');
        const miniQuote = document.getElementById('mini-card-quote');

        // Formatear mes corto para el mini-card
        const opcionesMesCorto = { day: 'numeric', month: 'short' };
        const fechaMiniCorto = hoy.toLocaleDateString('es-ES', opcionesMesCorto).toUpperCase();

        if (miniDate) miniDate.textContent = fechaMiniCorto;
        if (miniTitle) miniTitle.textContent = salmo.tema;
        if (miniRef) miniRef.textContent = salmo.referencia;
        if (miniQuote) miniQuote.textContent = salmo.versiculo;
    };

    // Eventos del Modal
    const liturgiaModal = document.getElementById('liturgiaModal');
    const btnDemoLiturgia = document.getElementById('btn-demo-liturgia');
    const liturgiaCloseBtn = document.getElementById('liturgiaCloseBtn');
    const liturgiaCloseLink = document.getElementById('liturgiaCloseLink');
    const liturgiaConfirmBtn = document.getElementById('liturgiaConfirmBtn');

    // Inicializar los datos del salmo en pantalla
    actualizarInterfazSalmo();

    const abrirModalLiturgia = () => {
        actualizarInterfazSalmo();
        if (liturgiaModal) {
            liturgiaModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Evita scroll de fondo
        }
    };

    const cerrarModalLiturgia = () => {
        if (liturgiaModal) {
            liturgiaModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (btnDemoLiturgia) {
        btnDemoLiturgia.addEventListener('click', (e) => {
            e.preventDefault();
            abrirModalLiturgia();
        });
    }

    if (liturgiaCloseBtn) {
        liturgiaCloseBtn.addEventListener('click', cerrarModalLiturgia);
    }

    if (liturgiaCloseLink) {
        liturgiaCloseLink.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarModalLiturgia();
        });
    }

    // Cerrar modal al hacer clic en el overlay (fuera de la tarjeta)
    if (liturgiaModal) {
        liturgiaModal.addEventListener('click', (e) => {
            if (e.target === liturgiaModal) {
                cerrarModalLiturgia();
            }
        });
    }

    // Acción del botón "Marcar como leído"
    if (liturgiaConfirmBtn) {
        liturgiaConfirmBtn.addEventListener('click', () => {
            // Animación de éxito rápida
            liturgiaConfirmBtn.innerHTML = '✓ ¡Leído hoy!';
            liturgiaConfirmBtn.style.backgroundColor = '#2E7D32';
            liturgiaConfirmBtn.style.boxShadow = '0 4px 15px rgba(46, 125, 80, 0.3)';

            // Guardar estado en localStorage
            const hoyString = new Date().toDateString();
            localStorage.setItem('salmoLeidoFecha', hoyString);

            // Cambiar texto de botón de prueba en la landing
            if (btnDemoLiturgia) {
                btnDemoLiturgia.innerHTML = '📅 Salmo de Hoy Completado';
                btnDemoLiturgia.style.opacity = '0.85';
            }

            setTimeout(() => {
                cerrarModalLiturgia();
                // Restaurar botón original en modal después de cerrar
                setTimeout(() => {
                    liturgiaConfirmBtn.innerHTML = 'Marcar como leído';
                    liturgiaConfirmBtn.style.backgroundColor = '';
                    liturgiaConfirmBtn.style.boxShadow = '';
                }, 300);
            }, 1000);
        });
    }

    // Comprobar si ya se leyó el salmo hoy al cargar la página
    const hoyStringEncoded = new Date().toDateString();
    if (localStorage.getItem('salmoLeidoFecha') === hoyStringEncoded) {
        if (btnDemoLiturgia) {
            btnDemoLiturgia.innerHTML = '📅 Salmo de Hoy Completado';
            btnDemoLiturgia.style.opacity = '0.85';
        }
    }

});
