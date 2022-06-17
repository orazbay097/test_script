const idGetter = isSafari() ? getIdFromFingerprint : getIdFromIframe;

idGetter().then(id => setAppId(id));


function isSafari() { return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)); }

function setAppId(id) {
    window.userId = id;
    alert(id)
}


function getIdFromIframe() {
    return new Promise((resolve, reject) => {
        window.addEventListener("message", function messageHandler(e) {
            try {
                const data = JSON.parse(e.data);

                if (data.event != "getId") return

                window.removeEventListener("message", messageHandler);
                resolve(data.value)
            } catch (e) {
                reject(e);
            }
        })

        const iframe = document.createElement('iframe');
        iframe.style.display = "none";
        iframe.src = 'https://orazbay097.github.io/test_iframe/'
        document.body.appendChild(iframe);
    })
}

function getIdFromFingerprint() {
    const KEY_USER_ID = 'fingerprint-userid';
    const id = localStorage.getItem(KEY_USER_ID);

    if (id) return Promise.resolve(id);

    import('https://fpcdn.io/v3/1ItjaKwplSsZ3CpiS7pJ')
        .then(FingerprintJS => FingerprintJS.load())
        .then(fp => fp.get())
        .then(result => {
            localStorage.setItem(KEY_USER_ID, result.visitorId);
            return result.visitorId
        });
}
