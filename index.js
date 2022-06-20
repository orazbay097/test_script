getIdFromIframe().then(id => setAppId(id));



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

                resolve(data.value)
            } catch (e) {
                reject(e);
            } finally {
                window.removeEventListener("message", messageHandler);
            }
        })

        const iframe = document.createElement('iframe');
        iframe.style.display = "none";
        iframe.src = 'https://orazbay097.github.io/test_iframe/'
        document.body.appendChild(iframe);
    })
}


