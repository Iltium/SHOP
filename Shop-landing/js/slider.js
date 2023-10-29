let offset = 0
const sliderLine = document.querySelector('.cards-product')

document.querySelector('.bth-next').addEventListener('click', function(){
    offset += 530
    if(offset > 530){
        offset = 0
    }

    sliderLine.style.left = -offset + 'px'
})

document.querySelector('.bth-prev').addEventListener('click', function(){
    offset -= 530
    if(offset < 0){
        offset = 530
    }

    sliderLine.style.left = -offset + 'px'
})