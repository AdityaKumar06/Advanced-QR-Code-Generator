const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const qrColor = document.getElementById('qr-color');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const qrContainer = document.getElementById('qr-container');
const toast = document.getElementById('toast');

let currentQRCode = null;


qrText.addEventListener('input', () => {
    if (qrText.value.trim().length > 0) {
        generateQRCode();
    } else {
        resetQR();
    }
});


clearBtn.addEventListener('click', () => {
    qrText.value = '';
    resetQR();
    qrText.focus();
});


generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    generateQRCode();
});


sizes.addEventListener('change', () => {
    if (qrText.value.trim()) generateQRCode();
});
qrColor.addEventListener('change', () => {
    if (qrText.value.trim()) generateQRCode();
});

function generateQRCode() {
    const text = qrText.value.trim();
    if (text.length === 0) {
        showToast('Please enter text or URL', 'error');
        resetQR();
        return;
    }

   
    qrContainer.innerHTML = '<div class="spinner"></div>';

    setTimeout(() => {
        qrContainer.innerHTML = '';
        currentQRCode = new QRCode(qrContainer, {
            text: text,
            width: parseInt(sizes.value),
            height: parseInt(sizes.value),
            colorDark: qrColor.value,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        downloadBtn.disabled = false;
        copyBtn.disabled = false;
    }, 300);
}

function resetQR() {
    qrContainer.innerHTML = '<div class="placeholder"><p>Your QR code will appear here</p></div>';
    downloadBtn.disabled = true;
    copyBtn.disabled = true;
}


downloadBtn.addEventListener('click', () => {
    const canvas = qrContainer.querySelector('canvas');
    if (canvas) {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement('a');
        a.href = url;
        a.download = 'QR_Code_By_Aditya_Kumar.png';
        a.click();
        showToast('Downloaded successfully!');
    }
});


copyBtn.addEventListener('click', async () => {
    const canvas = qrContainer.querySelector('canvas');
    if (canvas) {
        try {
            canvas.toBlob(async (blob) => {
                const item = new ClipboardItem({ "image/png": blob });
                await navigator.clipboard.write([item]);
                showToast('Copied to clipboard!');
            });
        } catch (err) {
            showToast('Copy failed', 'error');
        }
    }
});

function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}


qrText.focus();