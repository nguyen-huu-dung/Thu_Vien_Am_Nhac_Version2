// Form đăng bài hát

import { style } from "../../CSS/style.js";

class UploadForm extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: 'open',
        })
    }

    static get observedAttributes() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    connectedCallback() {
        const template = `
        ${style}
        <div id="upload">
            <div class="container-form">
                <div class="form col-6">
                    <div class="form-icon-close"><i class="far fa-times-circle"></i></div>
                    <div class="form-name">Đăng bài hát</div>
                    <div class="form-note">Những trường có dấu (<span style="color: red;">*</span>) bắt buộc điền</div>
                    <form>
                        <label>Tên bài hát<span style="color: red;">*</span></label>
                        <input type="text" id="name" placeholder="Name music..." autocomplete="off"><br><br>
                        <label>Ca sĩ<span style="color: red;">*</span></label>
                        <input type="text" id="singer" placeholder="Singer..." autocomplete="off"><br><br>
                        <label>Tác giả<span style="color: red;">*</span></label>
                        <input type="text" id="author" placeholder="Author..." autocomplete="off"><br><br>
                        <label>Thể loại</label>
                        <input type="text" id="genre" placeholder="Genre..." autocomplete="off"><br><br>
                        <label>Link bài hát<span style="color: red;">*</span></label>
                        <input type="text" id="link" placeholder="Link music..." autocomplete="off"><br><br>
                        <label>Lời bài hát</label><br>
                        <textarea id="lyrics" placeholder="Lyrics of musis..." autocomplete="off"></textarea><br><br>
                    </form>
                    <div class="form-process">
                        <div class="form-result"></div>
                        <button class="form-access button">Đăng bài hát</button>
                    </div>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;
        
        this.shadow.querySelector('.form-icon-close').addEventListener('click', () => {
            document.querySelector('main-screen').shadow.querySelector('upload-form').style.display = 'none';
        })

        // Process upload music
        this.shadow.querySelector('.form-access').addEventListener('click', async () => {
            const name = this.shadow.getElementById('name').value;
            const singer = this.shadow.getElementById('singer').value;
            const author = this.shadow.getElementById('author').value;
            const genre = this.shadow.getElementById('genre').value;
            const iframeUrl = this.shadow.getElementById('link').value;
            const lyrics = this.shadow.getElementById('lyrics').value;
            const result = this.shadow.querySelector('.form-result');
            result.style.color = 'red';
            if(name == "" || singer == "" || author == "" || iframeUrl == "") {
                result.textContent = 'Cần nhập đủ các trường có dấu *';
                setTimeout(() => {
                    result.textContent = '';
                }, 1000);
            }
            else {
                const email = localStorage.getItem('emailLoggin');
                await firebase.firestore().collection('uploads').add({email, name, singer, author, genre, iframeUrl, lyrics}).then(() => {
                    result.style.color = 'green';
                    result.textContent = 'Cảm ơn bạn đã đóng góp cho thư viện âm nhạc';
                    setTimeout(() => {
                        result.textContent = '';
                        this.shadow.querySelector('form').reset();
                    }, 1000);
                })
            }
        })
    }
}

window.customElements.define('upload-form', UploadForm);