
document.addEventListener("DOMContentLoaded", function(e){
    mostraPagina();
});

const homeBtn = document.querySelector('.home_btn');
if(homeBtn){
    homeBtn.addEventListener("click", function(e){
        e.preventDefault();
        navigate("/");
    });
}

const account_btn = document.querySelector('.account_btn');
if(account_btn){
    account_btn.addEventListener('click', function(e){
        e.preventDefault();
        navigate("/login");
    });
}