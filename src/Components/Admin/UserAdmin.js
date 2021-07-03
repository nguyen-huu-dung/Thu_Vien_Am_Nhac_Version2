// User admin content

import { adminStyle } from "../../CSS/style.js";
import { getData, xoa_dau, delData } from "../../utils.js";

class UserAdmin extends HTMLElement {
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
        ${adminStyle}
        <div id="admin-user">
            <div class="admin-content">
                <div class="admin-name">Quản lý tài khoản người dùng</div>
                <div class="admin-list">
                    <form>
                        <label for="admin-music-search">Tìm kiếm</label>
                        <input type="search" id="search-user-admin" placeholder="Tìm tài khoản..."
                            aria-label="Username" aria-describedby="basic-addon1">
                    </form>
                    <table>
                        <tr>
                            <th class="col-4">Gmail</th>
                            <th class="col-4">Tên tài khoản</th>
                            <th class="col-4">Chức năng</th>
                        </tr>
                    </table>
                    <div class="admin-change">
                        <button class="button-change button admin-pre"><i class="fas fa-arrow-left"></i></button>
                        <p class="admin-count-page">1</p>
                        <button class="button-change button admin-next"><i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
        this.shadow.innerHTML = template;

        // Sreen
        this.shadow.querySelector('.admin-content').style.minHeight = `${screen.height-100}px`;

        getData('users').then((res) => {
            const listUser = [];
            res.forEach((data) => {
                if(data.role == "user") listUser.push(data);
            })
            printList(listUser);

            // Search user admin
            this.shadow.getElementById('search-user-admin').addEventListener('input', () => {
                const keyWord = this.shadow.getElementById('search-user-admin').value;
                const listSearch = [];
                for(let x of listUser) {
                    if (xoa_dau(x.email).toLowerCase().search(keyWord.toLowerCase()) != -1 || xoa_dau(x.username).toLowerCase().search(keyWord.toLowerCase()) != -1) {
                        listSearch.push(x);
                    }
                }
                printList(listSearch);
            })
        })

        // Print list
        const printList = (listUser) => {
            removeList();
            const countPage = this.shadow.querySelector('.admin-count-page');
            if (countPage.textContent == "1") {
                this.shadow.querySelector('.admin-pre').style.visibility = 'hidden';
            }
            else {
                this.shadow.querySelector('.admin-pre').style.visibility = 'visible';
            }
            let index = 1;
            let i;
            const max = listUser.length;
            for (i = index - 1; i < index + 9; ++i) {
                this.shadow.querySelector('table').insertAdjacentHTML('beforeend', `
            <tr>
                <td>${listUser[i].email}</span></td>
                <td>${listUser[i].username}</td>
                <td>
                    <button class="button form-delUser button-delete">Xóa tài khoản</button>
                </td>
            </tr>`);
                if (i == max - 1) {
                    this.shadow.querySelector('.admin-next').style.visibility = 'hidden';
                    break;
                }
            }
            index += i;

            // Process next page 
            this.shadow.querySelector('.admin-next').addEventListener('click', () => {
                if (index != max+1) {
                    const countPage = this.shadow.querySelector('.admin-count-page');
                    countPage.textContent = Number(countPage.textContent) + 1;
                    this.shadow.querySelector('.admin-pre').style.visibility = 'visible';
                    removeList();
                    for (let i = index - 1; i < index + 9; ++i) {
                        this.shadow.querySelector('table').insertAdjacentHTML('beforeend', `
                    <tr>
                        <td>${listUser[i].email}</span></td>
                        <td>${listUser[i].username}</td>
                        <td>
                            <button class="button form-delUser button-delete">Xóa tài khoản</button>
                        </td>
                    </tr>`);
                        if (i == max - 1) {
                            this.shadow.querySelector('.admin-next').style.visibility = 'hidden';
                            break;
                        }
                    }
                    index += i;
                }
            })

            // Process pre page
            this.shadow.querySelector('.admin-pre').addEventListener('click', () => {
                index -= 20;
                if (index == 1) {
                    this.shadow.querySelector('.admin-pre').style.visibility = 'hidden';
                }
                const countPage = this.shadow.querySelector('.admin-count-page');
                countPage.textContent = Number(countPage.textContent) - 1;
                this.shadow.querySelector('.admin-next').style.visibility = 'visible';
                removeList();
                for (let i = index - 1; i < index + 9; ++i) {
                    this.shadow.querySelector('table').insertAdjacentHTML('beforeend', `
                    <tr>
                        <td>${listUser[i].email}</span></td>
                        <td>${listUser[i].username}</td>
                        <td>
                            <button class="button form-delUser button-delete">Xóa tài khoản</button>
                        </td>
                    </tr>`);
                }
                index += i;
            })
        }

        // Remove list table

        const removeList = () => {
            const listTr = this.shadow.querySelectorAll('tr');
            for (let i = 1; i < listTr.length; ++i) {
                listTr[i].remove();
            }
        }
    }
}

window.customElements.define('user-admin', UserAdmin);