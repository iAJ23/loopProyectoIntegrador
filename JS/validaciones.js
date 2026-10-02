// validaciones
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('status');
    if (!form) {
        console.log("No se encontró el form");
        return;
    }

    
    form.setAttribute('novalidate', 'true');
    form.noValidate = true;
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.type = 'text'; 
        emailInput.removeAttribute('required');
    }
    document.getElementById('name')?.removeAttribute('required');
    document.getElementById('message')?.removeAttribute('required');
    console.log("novalidate activado desde JS");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        let errores = [];
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.length < 2) errores.push('Nombre mínimo 2 letras');
        if (!regexEmail.test(email)) errores.push('Email no válido');
        if (phone && !/^\d{10}$/.test(phone)) errores.push('Teléfono debe tener 10 dígitos');
        if (message.length < 4) errores.push('Mensaje mínimo 4 caracteres');

        if (errores.length > 0) {
            statusDiv.textContent = errores.join(' | ');
            statusDiv.style.color = 'red';
            statusDiv.style.display = 'block';
            return;
        }

        statusDiv.textContent = '¡Validación OK! Ya puedes conectar EmailJS';
        statusDiv.style.color = '#00ff88';
        statusDiv.style.display = 'block';
        console.log({ name, email, phone, message });
        
        
    });
});