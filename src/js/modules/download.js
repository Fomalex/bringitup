export default class Download {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
        this.path = 'assets/img/mainbg.jpg'
    }

    downloadItem(path) {
        const link = document.createElement('a');

        link.setAttribute('href', path);
        link.setAttribute('download', 'nice_picture');
        link.style.display = 'none';
        document.body.appendChild(link);

        //чтобы событие вызвалось само на ссылке:
        link.click();

        document.body.removeChild(link);
    }

    init() {
        this.triggers.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                this.downloadItem(this.path);
            });
        });
    }

}