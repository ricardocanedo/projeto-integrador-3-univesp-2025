// global.js

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        
        fetch("/subscription/subscribe/", {
            method: "POST",
            headers: {
                "X-CSRFToken": "{{ csrf_token }}"
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            alert("Erro ao cadastrar.");
        });
    });
});