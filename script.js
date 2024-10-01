//La validación del formulário con javascript es considerada un desafío extra, no es obligatório realizar esta validación para realizar su entrega

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM completamente cargado y analizado");
    document.getElementById('formulario').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío por defecto del formulario
        
        console.log("Formulario enviado");

        // Mostrar mensaje de carga
        Swal.fire({
            title: 'Enviando...',
            text: 'Por favor, espera un momento.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Obtener los datos del formulario
        const formData = new FormData(document.getElementById('formulario'));

        // Configurar un temporizador de tiempo de espera de 10 segundos
        const timeout = setTimeout(() => {
            Swal.fire({
                title: 'Error',
                text: 'El servidor está tardando mucho en responder. Inténtalo de nuevo más tarde.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }, 10000); // 10 segundos

        // Realizar el envío utilizando fetch
        fetch('https://formsubmit.co/kiarazoe7@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log("Respuesta recibida", response);
            clearTimeout(timeout); // Limpiar el temporizador si la respuesta llega antes del tiempo de espera
            
            if (response.ok) {
                Swal.fire({
                    title: '¡Mensaje enviado!',
                    text: 'En breve me estaré contactando.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    document.getElementById('formulario').reset();
                });
            } else {
                throw new Error('Error al enviar los datos');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            clearTimeout(timeout); // Limpiar el temporizador en caso de error
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar tu mensaje. Inténtalo nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        });
    });
});

// Para poder descargar como PDF

// Escuchar el evento de clic en el botón para descargar el PDF
document.getElementById('descargarPDF').addEventListener('click', function() {
    const element = document.getElementById('convertir-a-pdf');
    if (element) {
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5], // Ajusta los márgenes si es necesario
            filename: 'Ester_Mosquera_portafolio.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 3,          // Aumenta la escala para mayor calidad
                useCORS: true,     // Activa CORS si hay imágenes externas
                logging: true,     // Activa el logging para depuración
                onrendered: function(canvas) {
                    document.body.appendChild(canvas); // Visualiza el canvas generado antes de crear el PDF
                }
            },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // Asegura que las páginas se dividan correctamente
        };

        html2pdf().set(opt).from(element).save();
    } else {
        console.error('Elemento no encontrado');
    }
});








  