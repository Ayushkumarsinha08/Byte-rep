document.getElementById('check-access').addEventListener('click', async () => {
    const userId = document.getElementById('userId').value;
    const messageElement = document.getElementById('message');
    const privateContent = document.getElementById('private-content');

    try {
        const response = await fetch('http://localhost:3000/check-access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        const data = await response.json();

        if (data.access) {
            messageElement.textContent = "Access granted!";
            privateContent.classList.remove('hidden');
        } else {
            messageElement.textContent = data.message;
            privateContent.classList.add('hidden');
        }
    } catch (error) {
        messageElement.textContent = "An error occurred. Please try again later.";
        privateContent.classList.add('hidden');
    }
});
