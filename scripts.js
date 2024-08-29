document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const form = document.getElementById('contact-form');

    // Función para animar secciones al hacer scroll
    function animateOnScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight / 1.3;
            if (sectionTop < triggerPoint) {
                section.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Añadir animaciones iniciales
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Inicializar la animación en el primer renderizado

    // Efecto de resalte en el menú de navegación al hacer scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Manejo del formulario de contacto
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        fetch('YOUR_BACKEND_ENDPOINT', { // Cambia esto por la URL de tu backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
            .then(response => response.json())
            .then(data => {
                alert('¡Mensaje enviado con éxito!');
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al enviar el mensaje.');
            });
    });
});
