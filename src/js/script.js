window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    menuBtn = document.querySelector('.menu_btn');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('menu_btn_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            menuBtn.classList.toggle('menu_btn_active');
            menu.classList.toggle('menu_active');
        })
    })
})