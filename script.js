
document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('[data-menu]');
  const links=document.querySelector('.nav-links');
  if(menu && links) menu.addEventListener('click',()=>links.classList.toggle('open'));

  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

  const form=document.querySelector('[data-quote-form]');
  if(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const data=new FormData(form);
      const body=[
        `Name: ${data.get('name')}`,
        `Company: ${data.get('company') || '-'}`,
        `Email: ${data.get('email')}`,
        `WhatsApp/Phone: ${data.get('phone')}`,
        `Product: ${data.get('product')}`,
        `Quantity: ${data.get('quantity') || '-'}`,
        `Destination: ${data.get('destination') || '-'}`,
        `Message: ${data.get('message') || '-'}`
      ].join('\n');
      window.location.href=`mailto:sales@villagecommerce.in?subject=${encodeURIComponent('Village Commerce — New Quote Request')}&body=${encodeURIComponent(body)}`;
      const status=document.querySelector('[data-form-status]');
      if(status) status.textContent='Your email app should open with the enquiry prepared. If it does not, email sales@villagecommerce.in directly.';
    });
  }
});
