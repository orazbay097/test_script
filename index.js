window.addEventListener("message", function messageHandler(e) {
    try {
        const data = JSON.parse(e.data);

        if (data.event != "getId") return

        window.removeEventListener("message", messageHandler);
        setAppId(data.value || createId());
    } catch (e) {
        console.error(e)
    }
})

addIframe();

function setAppId(id) {
    window.userId = id;
    alert(id)
}

const addIframe = () => {
    var iframe = document.createElement('iframe');
    iframe.style.display = "none";
    iframe.src = 'https://orazbay097.github.io/test_iframe/'
    document.body.appendChild(iframe);
}
