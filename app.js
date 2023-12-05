
// callback func can observe multiple elements or entries at same time,this func will run anytime
// the visibility of one the observed elemen changes
// we use foreach to loop multiple elemen

const observer = new IntersectionObserver((entries)=> {
    entries.forEach((entry)=>{
   console.log(entry)
   if(entry.isIntersecting){
    entry.target.classList.add('show');
   }else{
    entry.target.classList.remove('show');
   }

    });
});


const hiddenElementsX =  document.querySelectorAll('.hiddenX');
hiddenElementsX.forEach((el) => observer.observe(el));

const hiddenElementsY =  document.querySelectorAll('.hiddenY');
hiddenElementsY.forEach((el) => observer.observe(el));