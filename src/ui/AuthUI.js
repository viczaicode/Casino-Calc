export class AuthUI {
    constructor(onSuccess) {
        this.secretCode = 'casino777'; // Ez a titkos kód
        this.onSuccess = onSuccess;
        this.createAuthModal();
    }

    createAuthModal() {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        
        const content = document.createElement('div');
        content.className = 'auth-content';
        
        const title = document.createElement('h2');
        title.textContent = 'Belépés';
        
        const input = document.createElement('input');
        input.type = 'password';
        input.placeholder = 'Add meg a kódot...';
        input.className = 'auth-input';
        
        const button = document.createElement('button');
        button.textContent = 'Belépés';
        button.className = 'auth-button';
        
        const errorMsg = document.createElement('p');
        errorMsg.className = 'auth-error';
        
        content.appendChild(title);
        content.appendChild(input);
        content.appendChild(button);
        content.appendChild(errorMsg);
        modal.appendChild(content);
        
        button.addEventListener('click', () => {
            if (input.value === this.secretCode) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                    this.onSuccess();
                }, 500);
            } else {
                errorMsg.textContent = 'Hibás kód!';
                input.value = '';
                input.focus();
            }
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                button.click();
            }
        });

        document.body.appendChild(modal);
        input.focus();
    }
} 