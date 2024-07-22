const allIndicator = document.querySelectorAll('.indicator li'); const allContent = document.querySelectorAll('.content li'); allIndicator.forEach(item => {
    item.addEventListener('click', function () {
        const content = document.querySelector(this.dataset.target); allIndicator.forEach(i => { i.classList.remove('active'); })
        allContent.forEach(i => { i.classList.remove('active'); })
        content.classList.add('active'); this.classList.add('active');
    })
})
let intro=document.querySelector(".intro");
let logo=document.querySelector(".logo-header",);
let loader=document.querySelector(".loader")
let LogoSpan=document.querySelectorAll(".logo");


window.addEventListener("DOMContentLoaded", ()=>{

    setTimeout(()=>{

        LogoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add("active");
                
            }, (idx+1)*400)
        });

        setTimeout(()=>{
            LogoSpan.forEach((span, idx)=>{
                setTimeout(()=>{
                    span.classList.remove("active")
                    span.classList.add("fade");
                    
                }, (idx+1)*50)
            })
        },1000)
        
        setTimeout(()=>{
            intro.style.top="-100vh"
        },1300)
    })
}
)







