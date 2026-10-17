document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const menu = document.querySelector('[data-menu]');
  const links = document.querySelector('.nav-links');
  if (menu && links) {
    menu.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Quote form
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const record = {
      name: String(data.get('name') || '').trim(),
      company: String(data.get('company') || '').trim() || null,
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim() || null,
      product: String(data.get('product') || '').trim(),
      quantity: String(data.get('quantity') || '').trim() || null,
      destination: String(data.get('destination') || '').trim() || null,
      packaging: String(data.get('packaging') || '').trim() || null,
      message: String(data.get('message') || '').trim() || null
    };

    if (!record.name || !record.email || !record.product) {
      if (status) status.textContent = 'Please enter your name, email address and product.';
      return;
    }

    const configured =
      typeof window.VILLAGE_SUPABASE_URL === 'string' &&
      window.VILLAGE_SUPABASE_URL.startsWith('https://') &&
      typeof window.VILLAGE_SUPABASE_ANON_KEY === 'string' &&
      window.VILLAGE_SUPABASE_ANON_KEY.length > 0 &&
      !window.VILLAGE_SUPABASE_ANON_KEY.includes('PASTE_YOUR_') &&
      window.supabase && typeof window.supabase.createClient === 'function';

    if (button) button.disabled = true;

    if (configured) {
      if (status) status.textContent = 'Submitting your enquiry securely…';
      try {
        const client = window.supabase.createClient(
          window.VILLAGE_SUPABASE_URL,
          window.VILLAGE_SUPABASE_ANON_KEY
        );
        const { error } = await client.from('enquiries').insert([record]);
        if (error) throw error;
        form.reset();
        if (status) status.textContent = 'Thank you. Your enquiry has been submitted to Village Commerce. Our team will contact you soon.';
      } catch (error) {
        console.error('Village Commerce enquiry submission failed:', error);
        if (status) status.textContent = 'We could not submit your enquiry right now. Please email sales@villagecommerce.in or contact us through WhatsApp.';
      } finally {
        if (button) button.disabled = false;
      }
      return;
    }

    // Safe fallback while Supabase configuration is missing: prepare an email draft.
    const emailBody = [
      `Name: ${record.name}`,
      `Company: ${record.company || '-'}`,
      `Email: ${record.email}`,
      `WhatsApp/Phone: ${record.phone || '-'}`,
      `Product: ${record.product}`,
      `Quantity: ${record.quantity || '-'}`,
      `Destination: ${record.destination || '-'}`,
      `Packaging: ${record.packaging || '-'}`,
      `Message: ${record.message || '-'}`
    ].join('\n');

    if (status) status.textContent = 'Opening your email app. If it does not open, please email sales@villagecommerce.in directly.';
    window.location.href = `mailto:sales@villagecommerce.in?subject=${encodeURIComponent('Village Commerce - New Quote Request')}&body=${encodeURIComponent(emailBody)}`;
    if (button) button.disabled = false;
  });
});
