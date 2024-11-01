    // Attach showDialog function to the global window object
    window.showDialog = function ({ title, message, type }) {
        return new Promise((resolve) => {
            // Access the elements
            const overlay = document.getElementById('dialog-overlay');
            const dialogBox = document.getElementById('dialog-box');
            const dialogHeader = document.getElementById('dialog-header');
            const dialogMessage = document.getElementById('dialog-message');
            const dialogButtons = document.getElementById('dialog-buttons');
            
            // Clear existing buttons and message
            dialogButtons.innerHTML = '';
            dialogMessage.innerHTML = '';

            // Set the content
            dialogHeader.textContent = title;

            if (type === 'confirm') {
                dialogMessage.textContent = message;

                const yesButton = document.createElement('button');
                yesButton.textContent = 'Yes';
                yesButton.classList.add('dialog-button', 'button-yes');
                yesButton.onclick = () => {
                    closeDialog();
                    resolve(true);
                };

                const noButton = document.createElement('button');
                noButton.textContent = 'No';
                noButton.classList.add('dialog-button', 'button-no');
                noButton.onclick = () => {
                    closeDialog();
                    resolve(false);
                };

                dialogButtons.appendChild(yesButton);
                dialogButtons.appendChild(noButton);
            } else if (type === 'alert') {
                dialogMessage.textContent = message;

                const okButton = document.createElement('button');
                okButton.textContent = 'Ok';
                okButton.classList.add('dialog-button', 'button-ok');
                okButton.onclick = () => {
                    closeDialog();
                    resolve(true);
                };

                dialogButtons.appendChild(okButton);
            } else if (type === 'processing') {
                dialogMessage.classList.add('dialog-processing');
                dialogMessage.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processing...`;
            }

            // Show the dialog
            overlay.classList.add('show');

            // Function to close the dialog
            function closeDialog() {
                overlay.classList.remove('show');
                dialogMessage.classList.remove('dialog-processing');
            }
        });
    };

    // Attach showProcessingDialog and hideProcessingDialog functions to the global window object
    window.showProcessingDialog = function () {
        window.showDialog({ title: 'Please Wait', type: 'processing' });
    };

    window.hideProcessingDialog = function () {
        document.getElementById('dialog-overlay').classList.remove('show');
    };

 