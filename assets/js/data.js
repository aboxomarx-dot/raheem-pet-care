/* ==========================================================
   مركز رحيم البيطري — بيانات الموقع والترجمات
   عدّل هذا الملف لتغيير الأرقام، أوقات الدوام، المنتجات، الأسعار والمقالات.
   ========================================================== */

/* ---------- 1) إعدادات العيادة (عدّلها بالبيانات الحقيقية) ---------- */
const CLINIC = {
  whatsapp: '962796768387',          // رقم واتساب العيادة بالصيغة الدولية بدون +
  whatsappDisplay: '+962 79 676 8387',
  phone: '+96264016431',              // رقم الاتصال المباشر (من خرائط Google وفيسبوك)
  phoneDisplay: '06 401 6431',
  mobile: '+962796768387',            // الجوال (من غلاف صفحة فيسبوك)
  mobileDisplay: '079 676 8387',
  slogan: { ar: 'صحة حيوانك بين أيادٍ رحيمة', en: "Your pet's health is in merciful hands" },
  email: 'raheem.pet.center@gmail.com',
  mapQuery: '31.979545,35.9862981',   // إحداثيات المركز في ماركا الشمالية
  mapsUrl: 'https://maps.app.goo.gl/a3jWfwWLxkikpUy28',
  facebookUrl: 'https://www.facebook.com/p/%D9%85%D8%B1%D9%83%D8%B2-%D8%B1%D8%AD%D9%8A%D9%85-%D8%A7%D9%84%D8%A8%D9%8A%D8%B7%D8%B1%D9%8A-Raheem-Pet-Care-Center-61580799140964/',
  googleRating: 4.2,                  // تقييم Google وعدد المراجعات (حدّثهما من حين لآخر)
  googleReviews: 53,
  currency: { ar: 'د.أ', en: 'JOD' },
  deliveryFee: 2,                     // رسوم التوصيل داخل عمّان (دينار)
  freeDeliveryOver: 35,               // توصيل مجاني للطلبات فوق هذا المبلغ
  slotMinutes: 30                     // مدة الموعد الواحد بالدقائق
};

/* أوقات الدوام — المفتاح هو رقم اليوم في JavaScript (0 = الأحد ... 5 = الجمعة، 6 = السبت)
   [ساعة الفتح، ساعة الإغلاق] بنظام 24 ساعة، أو null إذا كان اليوم عطلة */
const HOURS = {   // حسب خرائط Google وصفحة فيسبوك
  6: [11, 21],  // السبت
  0: [11, 21],  // الأحد
  1: [11, 21],  // الاثنين
  2: [11, 21],  // الثلاثاء
  3: [11, 21],  // الأربعاء
  4: [11, 21],  // الخميس
  5: [14, 18]   // الجمعة
};
const WEEK_ORDER = [6, 0, 1, 2, 3, 4, 5]; // ترتيب عرض الأيام (يبدأ بالسبت)

const AMMAN_AREAS = [
  { ar: 'عبدون', en: 'Abdoun' }, { ar: 'الصويفية', en: 'Sweifieh' }, { ar: 'دير غبار', en: 'Deir Ghbar' },
  { ar: 'خلدا', en: 'Khalda' }, { ar: 'تلاع العلي', en: "Tla' Al-Ali" }, { ar: 'الجبيهة', en: 'Jubeiha' },
  { ar: 'شفا بدران', en: 'Shafa Badran' }, { ar: 'دابوق', en: 'Dabouq' }, { ar: 'الرابية', en: 'Rabieh' },
  { ar: 'أم أذينة', en: 'Um Uthaina' }, { ar: 'جبل عمّان', en: 'Jabal Amman' }, { ar: 'اللويبدة', en: 'Weibdeh' },
  { ar: 'مرج الحمام', en: 'Marj Al-Hamam' }, { ar: 'طبربور', en: 'Tabarbour' }, { ar: 'ماركا', en: 'Marka' },
  { ar: 'الهاشمي', en: 'Hashmi' }, { ar: 'منطقة أخرى', en: 'Other area' }
];

/* ---------- 2) الترجمة الإنجليزية للنصوص الثابتة في الصفحة ----------
   النص العربي يُقرأ تلقائياً من index.html، لذا تكفي الإنجليزية هنا. */
const EN = {
  'a11y.skip': 'Skip to content',
  'top.location': 'North Marka, Amman',
  'top.emergency': 'Emergency? Message us now',
  'brand.name': 'Raheem Pet Care Center',
  'brand.sub': 'مركز رحيم البيطري',
  'nav.home': 'Home', 'nav.services': 'Services', 'nav.shop': 'Shop', 'nav.profile': 'Pet Profile',
  'nav.gallery': 'Gallery', 'nav.blog': 'Blog', 'nav.contact': 'Contact', 'nav.book': 'Book Now',
  'cart.open': 'Shopping cart',
  'hero.badge': "Your pet's health is in merciful hands",
  'hero.title': 'Complete veterinary care with the latest technology — <span class="text-brand">and all our love</span> for your pet',
  'hero.text': 'A complete pet care center in North Marka for cats, dogs and birds: check-ups, vaccinations, spay & neuter, grooming, boarding and a pharmacy. Our team welcomes you in a clean, sterile and warm space where you and your pet feel at ease.',
  'hero.cta1': 'Book a Check-up or Vaccine',
  'hero.cta2': 'Emergency WhatsApp',
  'hero.p1': 'Specialized veterinarians', 'hero.p2': 'Book online in a minute', 'hero.p3': 'Pharmacy & shop on site',
  'img.front': 'Raheem Pet Care Center front', 'img.waiting': 'Waiting area',
  'hero.float1': 'Fully sterile rooms', 'hero.float1s': 'Exam · Surgery · Care',
  'hero.float2': 'Care with love', 'hero.float2s': 'Cats · Dogs · Birds · More',
  'trust.1': 'Sterile exam & surgery rooms', 'trust.1s': 'Full sterilization to high standards',
  'trust.2': 'Specialized vet team', 'trust.2s': 'Expertise with compassion',
  'trust.3': 'Pharmacy & full pet shop', 'trust.3s': 'Medicine, food & supplies',
  'trust.4': 'Emergency cases received', 'trust.4s': 'Instant contact via WhatsApp',
  'services.kicker': 'Our Veterinary Services',
  'services.title': 'Everything your pet needs under one roof',
  'services.text': 'Pick a service and book it directly — we will confirm by phone or WhatsApp.',
  'booking.kicker': 'Smart Booking System',
  'booking.title': 'Book your appointment in under a minute',
  'booking.text': 'Choose your pet, the service and a convenient time. You get an instant confirmation and can send the details to the clinic on WhatsApp.',
  'booking.s1': 'Pet', 'booking.s2': 'Service & time', 'booking.s3': 'Owner details',
  'booking.petType': 'What kind of pet do you have?',
  'err.pet': 'Please choose the pet type.',
  'booking.petName': 'Pet name (optional)', 'ph.petName': 'e.g. Mishmish',
  'booking.petAge': 'Approximate age',
  'opt.unknown': 'Not specified', 'opt.baby': 'Young (under 1 year)', 'opt.adult': 'Adult (1 - 7 years)', 'opt.senior': 'Senior (7+ years)',
  'booking.service': 'Choose a service', 'err.service': 'Please choose a service.',
  'booking.date': 'Choose a day', 'err.date': 'Please choose a day.',
  'booking.time': 'Available times', 'err.time': 'Please choose a time.',
  'booking.owner': 'Owner details',
  'booking.name': 'Full name *', 'ph.name': 'Name', 'err.name': 'Please enter your name.',
  'booking.phone': 'Phone number *', 'err.phone': 'Enter a valid Jordanian number, e.g. 0791234567',
  'booking.notes': 'Notes or symptoms (optional)', 'ph.notes': 'e.g. Loss of appetite for two days',
  'btn.prev': 'Back', 'btn.next': 'Next', 'btn.confirm': 'Confirm booking', 'btn.save': 'Save', 'btn.cancel': 'Cancel',
  'booking.summary': 'Booking summary', 'booking.mine': 'My bookings',
  'shop.kicker': 'Pharmacy & Pet Shop',
  'shop.title': 'From our pharmacy shelves to your door',
  'shop.text': 'Food, vitamins, carriers and grooming supplies hand-picked by our vet team — delivery within Amman or pickup from the clinic.',
  'shop.delivery': 'Delivery in Amman', 'shop.pickup': 'Clinic pickup',
  'ph.search': 'Search products...', 'shop.none': 'No matching products.',
  'pp.kicker': 'Your Pet Profile Portal',
  'pp.title': 'Health record & smart vaccine tracker',
  'pp.text': "Add your pet's details to see their exact age and upcoming vaccinations, and turn on reminders so you never miss a date.",
  'pp.privacy': 'Data is stored on your device only (demo version)',
  'pp.myPets': 'My pets', 'pp.add': 'Add', 'pp.formTitle': 'Pet details',
  'pp.name': 'Name *', 'pp.species': 'Species *',
  'pet.cat': 'Cat', 'pet.dog': 'Dog', 'pet.rabbit': 'Rabbit', 'pet.bird': 'Bird', 'pet.other2': 'Other',
  'pp.sex': 'Sex', 'pp.male': 'Male', 'pp.female': 'Female',
  'pp.breed': 'Breed', 'ph.breed': 'e.g. Persian',
  'pp.birth': 'Date of birth *', 'pp.weight': 'Weight (kg)', 'pp.neutered': 'Spayed / neutered',
  'err.pp': 'Please enter a name and a valid date of birth.',
  'pp.remTitle': 'Reminders', 'pp.remText': 'Enable browser notifications or add the date to your phone calendar.',
  'pp.remBtn': 'Enable browser notifications',
  'gal.kicker': 'Inside the center', 'gal.title': 'A clean, warm and fully equipped space', 'gal.text': 'Tap any photo to enlarge it.',
  'blog.kicker': 'Pet Care Blog', 'blog.title': 'Vet tips that matter', 'blog.text': 'Short articles written by our team to help you care for your pet with confidence.',
  'contact.kicker': 'Contact us', 'contact.title': "We're here for you and your pet",
  'contact.hours': 'Opening hours',
  'contact.emNote': 'For emergencies outside opening hours, reach us on WhatsApp or by phone.',
  'contact.phone': 'Phone', 'contact.wa': 'Mobile & WhatsApp', 'contact.address': 'Address',
  'contact.addressVal': 'Marzouq Abu Jamous St., opposite Najm Mobile store — North Marka, Amman',
  'contact.email': 'Email',
  'hero.rating': 'on Google',
  'contact.directions': 'Get directions', 'contact.formTitle': 'Send us a message',
  'ph.msg': 'Your message...', 'err.contact': 'Please fill in your name, a valid phone number and your message.',
  'contact.send': 'Send via WhatsApp',
  'footer.about': "Your pet's health is in merciful hands. Complete pet health care in North Marka, Amman.",
  'footer.links': 'Quick links', 'footer.services': 'Services', 'footer.rights': 'All rights reserved.',
  'footer.made': 'Made with love for pets 🐾',
  'float.call': 'Call now', 'float.wa': 'Emergency WhatsApp', 'float.sos': 'SOS',
  'bnav.book': 'Book', 'bnav.cart': 'Cart', 'bnav.wa': 'WhatsApp',
  'cart.title': 'Shopping cart', 'cart.method': 'Delivery method', 'cart.pickup': 'Clinic pickup', 'cart.free': 'Free',
  'cart.delivery': 'Delivery in Amman', 'ph.address': 'Street, building no., nearest landmark',
  'cart.subtotal': 'Subtotal', 'cart.fee': 'Delivery fee', 'cart.total': 'Total', 'cart.checkout': 'Order via WhatsApp'
};

/* ---------- 3) نصوص الواجهة المولّدة بالبرمجة ---------- */
const UI = {
  ar: {
    'meta.title': 'مركز رحيم البيطري | عيادة بيطرية متكاملة في عمّان',
    'open.now': 'مفتوح الآن', 'open.closed': 'مغلق الآن', 'open.until': 'حتى',
    'svc.book': 'احجز هذه الخدمة', 'svc.more': 'التفاصيل', 'svc.less': 'إخفاء',
    'bk.closed': 'العيادة مغلقة في هذا اليوم', 'bk.noSlots': 'لا توجد أوقات متاحة في هذا اليوم، جرّب يوماً آخر.',
    'bk.taken': 'محجوز', 'bk.today': 'اليوم', 'bk.tomorrow': 'غداً', 'bk.hours': 'دوام اليوم:',
    'bk.pet': 'الحيوان', 'bk.service': 'الخدمة', 'bk.date': 'التاريخ', 'bk.time': 'الوقت', 'bk.owner': 'المالك', 'bk.phone': 'الهاتف', 'bk.notes': 'ملاحظات', 'bk.ref': 'رقم الحجز',
    'bk.notSet': '—', 'bk.none': 'لا توجد حجوزات بعد.', 'bk.cancel': 'إلغاء',
    'bk.cancelConfirm': 'هل تريد إلغاء هذا الحجز؟', 'bk.cancelled': 'تم إلغاء الحجز',
    'bk.successTitle': 'تم استلام حجزك بنجاح!',
    'bk.successText': 'سنتواصل معك لتأكيد الموعد. لتسريع التأكيد أرسل التفاصيل إلى واتساب العيادة الآن.',
    'bk.syncedText': 'تم تسجيل حجزك في نظام العيادة وسنتصل بك لتأكيده. يمكنك أيضاً إرسال التفاصيل عبر واتساب.',
    'bk.takenNow': 'عذراً، حُجز هذا الوقت للتو. اختر وقتاً آخر.',
    'bk.sendWa': 'إرسال التفاصيل عبر واتساب', 'bk.addCal': 'إضافة إلى التقويم', 'bk.close': 'إغلاق',
    'bk.waIntro': 'مرحباً مركز رحيم البيطري 👋\nأرغب بتأكيد حجز موعد:',
    'bk.prefilled': 'تم اختيار الخدمة، أكمل بيانات الحجز',
    'bk.past': 'موعد سابق',
    'shop.all': 'الكل', 'shop.add': 'أضف للسلة', 'shop.added': 'تمت الإضافة إلى السلة', 'cart.view': 'عرض السلة',
    'cart.empty': 'سلتك فارغة حالياً', 'cart.emptyText': 'تصفح المتجر وأضف ما يحتاجه حيوانك.', 'cart.browse': 'تصفح المتجر',
    'cart.remove': 'حذف', 'cart.freeHint': 'أضف {x} للحصول على توصيل مجاني', 'cart.freeYes': '🎉 طلبك مؤهل للتوصيل المجاني',
    'cart.errName': 'الرجاء إدخال الاسم.', 'cart.errPhone': 'الرجاء إدخال رقم هاتف أردني صحيح.', 'cart.errAddr': 'الرجاء اختيار المنطقة وكتابة العنوان.',
    'cart.waIntro': 'مرحباً مركز رحيم البيطري 👋\nأرغب بطلب المنتجات التالية:',
    'cart.method': 'طريقة الاستلام', 'cart.pickup': 'استلام من العيادة', 'cart.delivery': 'توصيل داخل عمّان',
    'cart.area': 'المنطقة', 'cart.address': 'العنوان', 'cart.chooseArea': 'اختر المنطقة',
    'cart.successTitle': 'تم تجهيز طلبك!', 'cart.successText': 'فُتحت محادثة واتساب مع العيادة تحتوي تفاصيل طلبك — اضغط إرسال لتأكيده.',
    'cart.orderNo': 'رقم الطلب', 'cart.free': 'مجاناً',
    'pp.empty': 'لم تُضف أي حيوان بعد', 'pp.emptyText': 'أضف حيوانك الأليف لتتبّع عمره وتطعيماته، أو جرّب ملفاً تجريبياً.',
    'pp.demo': 'جرّب ملفاً تجريبياً', 'pp.addFirst': 'أضف حيواني',
    'pp.age': 'العمر', 'pp.human': 'العمر البشري المقابل', 'pp.weight': 'الوزن', 'pp.birthday': 'عيد الميلاد القادم',
    'svc.min': 'دقيقة تقريباً', 'bk.pickDate': 'اختر اليوم أولاً لعرض الأوقات المتاحة.',
    'cart.subtotal': 'المجموع الفرعي', 'cart.fee': 'رسوم التوصيل', 'cart.total': 'الإجمالي',
    'pp.kg': 'كغ', 'pp.inDays': 'بعد {x}', 'pp.todayBday': 'اليوم! 🎂',
    'pp.humanYears': '≈ {x} بشرية',
    'pp.nextVax': 'التطعيم القادم', 'pp.overdue': 'متأخرة', 'pp.done': 'مكتملة', 'pp.noNext': 'لا يوجد',
    'pp.schedule': 'جدول التطعيمات والرعاية الوقائية', 'pp.primary': 'الجرعات الأساسية', 'pp.recurring': 'الجرعات الدورية والمعززة',
    'st.done': 'تم', 'st.overdue': 'متأخر', 'st.soon': 'قريباً', 'st.upcoming': 'قادم', 'st.pending': 'بعد إكمال الأساسية', 'st.due': 'مستحق الآن',
    'pp.markDone': 'تم', 'pp.undo': 'تراجع', 'pp.dueOn': 'الموعد:', 'pp.doneOn': 'أُعطي في:', 'pp.lastOn': 'آخر جرعة:', 'pp.every': 'كل {x} شهر',
    'pp.bookVax': 'احجز موعد التطعيم', 'pp.ics': 'أضف التذكير للتقويم', 'pp.edit': 'تعديل', 'pp.delete': 'حذف',
    'pp.deleteConfirm': 'هل تريد حذف ملف هذا الحيوان نهائياً؟', 'pp.saved': 'تم حفظ ملف الحيوان', 'pp.deleted': 'تم حذف الملف',
    'pp.markAllPrimary': 'أخذ الجرعات الأساسية سابقاً؟ سجّلها دفعة واحدة', 'pp.alerts': 'تنبيهات',
    'pp.alertOverdue': '{n}: «{v}» متأخر منذ {d}', 'pp.alertSoon': '{n}: «{v}» بعد {d}', 'pp.alertToday': '{n}: «{v}» مستحق اليوم',
    'pp.noAlerts': 'كل شيء على ما يرام ✅ لا توجد تطعيمات متأخرة أو قريبة.',
    'pp.noVax': 'لا توجد تطعيمات إلزامية شائعة لهذا النوع، لكن ننصح بفحص دوري ومضاد طفيليات.',
    'pp.disclaimer': 'الجدول استرشادي وفق البروتوكولات الشائعة؛ قد يعدّله الطبيب البيطري حسب حالة حيوانك.',
    'pp.notifOn': 'التنبيهات مفعّلة ✓', 'pp.notifDenied': 'تم رفض الإذن من المتصفح', 'pp.notifNA': 'المتصفح لا يدعم التنبيهات',
    'pp.notifTitle': 'تذكير من مركز رحيم البيطري',
    'pp.male': 'ذكر', 'pp.female': 'أنثى', 'pp.neutered': 'معقّم', 'pp.formAdd': 'إضافة حيوان جديد', 'pp.formEdit': 'تعديل البيانات',
    'gal.of': 'من',
    'blog.all': 'الكل', 'blog.read': 'اقرأ المقال', 'blog.min': 'دقائق قراءة', 'blog.share': 'مشاركة', 'blog.copied': 'تم نسخ رابط المقال', 'blog.book': 'احجز استشارة',
    'contact.sent': 'تم فتح واتساب لإرسال رسالتك',
    'contact.waIntro': 'مرحباً مركز رحيم البيطري 👋',
    'wa.emergency': 'مرحباً، لدي حالة طارئة لحيواني الأليف وأحتاج مساعدة فورية 🚨',
    'wa.general': 'مرحباً مركز رحيم البيطري، لدي استفسار:',
    'cal.bookingTitle': 'موعد في مركز رحيم البيطري',
    'cal.vaxTitle': 'تطعيم {v} — {n}',
    'lang.label': 'EN'
  },
  en: {
    'meta.title': 'Raheem Pet Care Center | Complete Veterinary Clinic in Amman',
    'open.now': 'Open now', 'open.closed': 'Closed now', 'open.until': 'until',
    'svc.book': 'Book this service', 'svc.more': 'Details', 'svc.less': 'Hide',
    'bk.closed': 'The clinic is closed on this day', 'bk.noSlots': 'No times left on this day, please try another day.',
    'bk.taken': 'Booked', 'bk.today': 'Today', 'bk.tomorrow': 'Tomorrow', 'bk.hours': "Today's hours:",
    'bk.pet': 'Pet', 'bk.service': 'Service', 'bk.date': 'Date', 'bk.time': 'Time', 'bk.owner': 'Owner', 'bk.phone': 'Phone', 'bk.notes': 'Notes', 'bk.ref': 'Booking no.',
    'bk.notSet': '—', 'bk.none': 'No bookings yet.', 'bk.cancel': 'Cancel',
    'bk.cancelConfirm': 'Cancel this booking?', 'bk.cancelled': 'Booking cancelled',
    'bk.successTitle': 'Your booking was received!',
    'bk.successText': 'We will contact you to confirm the appointment. For faster confirmation, send the details to the clinic on WhatsApp now.',
    'bk.syncedText': 'Your booking is registered in the clinic system and we will call you to confirm. You can also send the details via WhatsApp.',
    'bk.takenNow': 'Sorry, this time was just booked. Please choose another.',
    'bk.sendWa': 'Send details via WhatsApp', 'bk.addCal': 'Add to calendar', 'bk.close': 'Close',
    'bk.waIntro': 'Hello Raheem Pet Care Center 👋\nI would like to confirm an appointment:',
    'bk.prefilled': 'Service selected — complete your booking',
    'bk.past': 'Past appointment',
    'shop.all': 'All', 'shop.add': 'Add to cart', 'shop.added': 'Added to cart', 'cart.view': 'View cart',
    'cart.empty': 'Your cart is empty', 'cart.emptyText': 'Browse the shop and add what your pet needs.', 'cart.browse': 'Browse shop',
    'cart.remove': 'Remove', 'cart.freeHint': 'Add {x} more for free delivery', 'cart.freeYes': '🎉 Your order qualifies for free delivery',
    'cart.errName': 'Please enter your name.', 'cart.errPhone': 'Please enter a valid Jordanian phone number.', 'cart.errAddr': 'Please choose your area and enter the address.',
    'cart.waIntro': 'Hello Raheem Pet Care Center 👋\nI would like to order:',
    'cart.method': 'Delivery method', 'cart.pickup': 'Clinic pickup', 'cart.delivery': 'Delivery in Amman',
    'cart.area': 'Area', 'cart.address': 'Address', 'cart.chooseArea': 'Choose area',
    'cart.successTitle': 'Your order is ready!', 'cart.successText': 'A WhatsApp chat with the clinic has opened with your order details — press send to confirm it.',
    'cart.orderNo': 'Order no.', 'cart.free': 'Free',
    'pp.empty': 'No pets added yet', 'pp.emptyText': "Add your pet to track their age and vaccinations, or try a demo profile.",
    'pp.demo': 'Try a demo profile', 'pp.addFirst': 'Add my pet',
    'pp.age': 'Age', 'pp.human': 'Human-age equivalent', 'pp.weight': 'Weight', 'pp.birthday': 'Next birthday',
    'svc.min': 'min approx.', 'bk.pickDate': 'Pick a day first to see available times.',
    'cart.subtotal': 'Subtotal', 'cart.fee': 'Delivery fee', 'cart.total': 'Total',
    'pp.kg': 'kg', 'pp.inDays': 'in {x}', 'pp.todayBday': 'Today! 🎂',
    'pp.humanYears': '≈ {x} in human terms',
    'pp.nextVax': 'Next vaccine', 'pp.overdue': 'Overdue', 'pp.done': 'Completed', 'pp.noNext': 'None',
    'pp.schedule': 'Vaccination & preventive care schedule', 'pp.primary': 'Primary doses', 'pp.recurring': 'Recurring & booster doses',
    'st.done': 'Done', 'st.overdue': 'Overdue', 'st.soon': 'Soon', 'st.upcoming': 'Upcoming', 'st.pending': 'After primary series', 'st.due': 'Due now',
    'pp.markDone': 'Done', 'pp.undo': 'Undo', 'pp.dueOn': 'Due:', 'pp.doneOn': 'Given:', 'pp.lastOn': 'Last dose:', 'pp.every': 'Every {x} months',
    'pp.bookVax': 'Book vaccination', 'pp.ics': 'Add reminder to calendar', 'pp.edit': 'Edit', 'pp.delete': 'Delete',
    'pp.deleteConfirm': "Delete this pet's profile permanently?", 'pp.saved': 'Pet profile saved', 'pp.deleted': 'Profile deleted',
    'pp.markAllPrimary': 'Already had the primary doses? Record them all at once', 'pp.alerts': 'Alerts',
    'pp.alertOverdue': '{n}: “{v}” overdue by {d}', 'pp.alertSoon': '{n}: “{v}” in {d}', 'pp.alertToday': '{n}: “{v}” due today',
    'pp.noAlerts': 'All good ✅ No overdue or upcoming vaccines.',
    'pp.noVax': 'There are no common core vaccines for this species, but we recommend regular check-ups and parasite control.',
    'pp.disclaimer': 'This schedule is a guide based on common protocols; your vet may adjust it to your pet.',
    'pp.notifOn': 'Notifications enabled ✓', 'pp.notifDenied': 'Permission denied by the browser', 'pp.notifNA': 'This browser does not support notifications',
    'pp.notifTitle': 'Reminder from Raheem Pet Care Center',
    'pp.male': 'Male', 'pp.female': 'Female', 'pp.neutered': 'Neutered', 'pp.formAdd': 'Add a new pet', 'pp.formEdit': 'Edit details',
    'gal.of': 'of',
    'blog.all': 'All', 'blog.read': 'Read article', 'blog.min': 'min read', 'blog.share': 'Share', 'blog.copied': 'Article link copied', 'blog.book': 'Book a consultation',
    'contact.sent': 'WhatsApp opened to send your message',
    'contact.waIntro': 'Hello Raheem Pet Care Center 👋',
    'wa.emergency': 'Hello, I have an emergency with my pet and need urgent help 🚨',
    'wa.general': 'Hello Raheem Pet Care Center, I have a question:',
    'cal.bookingTitle': 'Appointment at Raheem Pet Care Center',
    'cal.vaxTitle': '{v} vaccine — {n}',
    'lang.label': 'عربي'
  }
};

/* ---------- 4) أنواع الحيوانات في نموذج الحجز ---------- */
const PET_TYPES = [
  { id: 'cat', icon: 'cat', ar: 'قط', en: 'Cat' },
  { id: 'dog', icon: 'dog', ar: 'كلب', en: 'Dog' },
  { id: 'bird', icon: 'bird', ar: 'طائر', en: 'Bird' },
  { id: 'other', icon: 'rabbit', ar: 'أخرى', en: 'Other' }
];

/* ---------- 5) الخدمات ---------- */
const SERVICES = [
  {
    id: 'checkup', icon: 'stethoscope', color: 'brand', minutes: 30,
    ar: { title: 'الفحص السريري والتشخيص', desc: 'فحص شامل من الرأس حتى الذيل مع تشخيص دقيق وخطة علاج واضحة.',
      points: ['فحص عام وقياس العلامات الحيوية', 'تحاليل مخبرية وأشعة عند الحاجة', 'متابعة الحالات المزمنة وكبار السن'] },
    en: { title: 'Clinical Exam & Diagnosis', desc: 'A nose-to-tail examination with an accurate diagnosis and a clear treatment plan.',
      points: ['General exam and vital signs', 'Lab tests and imaging when needed', 'Follow-up for chronic and senior cases'] }
  },
  {
    id: 'vaccination', icon: 'syringe', color: 'leaf', minutes: 20,
    ar: { title: 'التطعيمات الدورية', desc: 'برامج تطعيم كاملة للجراء والقطط الصغيرة والبالغين مع دفتر صحي.',
      points: ['مطاعيم أمريكية المنشأ (فايزر) للقطط والكلاب', 'تطعيمات أساسية ومعززة سنوية وداء الكلب', 'مضادات الطفيليات الداخلية والخارجية'] },
    en: { title: 'Routine Vaccinations', desc: 'Complete vaccination programs for puppies, kittens and adults, with a health booklet.',
      points: ['US-made (Pfizer) vaccines for cats and dogs', 'Core, annual booster and rabies vaccines', 'Internal and external parasite control'] }
  },
  {
    id: 'surgery', icon: 'heart-pulse', color: 'tang', minutes: 60,
    ar: { title: 'العمليات الجراحية', desc: 'غرفة عمليات معقمة وتخدير آمن ومراقبة دقيقة قبل وبعد العملية.',
      points: ['تعقيم ذكور وإناث القطط', 'تعقيم الإناث يشمل مبيت ليلة للمتابعة', 'رعاية ومتابعة ما بعد العملية'] },
    en: { title: 'Surgery', desc: 'A sterile operating room, safe anesthesia and close monitoring before and after surgery.',
      points: ['Spay and neuter for cats', 'Female spay includes an overnight stay', 'Post-operative care and follow-up'] }
  },
  {
    id: 'grooming', icon: 'bath', color: 'sky', minutes: 60,
    ar: { title: 'العناية والنظافة (Grooming)', desc: 'استحمام وحلاقة وتقليم أظافر وتنظيف أذنين بأيدٍ لطيفة ومنتجات آمنة.',
      points: ['باقة العناية: حلاقة أو حمام علاجي', 'الباقة الشاملة: حلاقة وحمام علاجي وتجفيف وتعطير', 'قص الأظافر وتنظيف الأذنين والعيون'] },
    en: { title: 'Grooming & Hygiene', desc: 'Bathing, haircuts, nail trims and ear cleaning by gentle hands with safe products.',
      points: ['Care package: haircut or medicated bath', 'Full package: haircut, medicated bath, drying and perfume', 'Nail trimming, ear and eye cleaning'] }
  },
  {
    id: 'boarding', icon: 'bed-double', color: 'sun', minutes: 30,
    ar: { title: 'الفندقة والإقامة', desc: 'إقامة مريحة وآمنة لحيوانك أثناء سفرك مع إشراف بيطري يومي.',
      points: ['غرف نظيفة ومكيفة', 'وجبات منتظمة حسب نظامه الغذائي', 'تحديثات وصور يومية لك'] },
    en: { title: 'Boarding & Pet Hotel', desc: 'A comfortable, safe stay for your pet while you travel, with daily vet supervision.',
      points: ['Clean, air-conditioned rooms', 'Regular meals following their diet', 'Daily updates and photos for you'] }
  },
  {
    id: 'dental', icon: 'sparkles', color: 'navy', minutes: 45,
    ar: { title: 'طب الأسنان', desc: 'فحص الفم وإزالة الجير وتلميع الأسنان للوقاية من الالتهابات ورائحة الفم.',
      points: ['فحص اللثة والأسنان', 'إزالة الجير بالموجات فوق الصوتية', 'خلع الأسنان التالفة عند الحاجة'] },
    en: { title: 'Dentistry', desc: 'Oral exams, scaling and polishing to prevent infections and bad breath.',
      points: ['Gum and teeth examination', 'Ultrasonic scaling', 'Extraction of damaged teeth when needed'] }
  }
];

/* ألوان البطاقات (تُستخدم لتلوين الخدمات والمنتجات) */
const COLORS = {
  brand: { soft: 'bg-brand/10', text: 'text-brand', solid: 'bg-brand', border: 'border-brand' },
  leaf:  { soft: 'bg-leaf/15', text: 'text-leaf', solid: 'bg-leaf', border: 'border-leaf' },
  tang:  { soft: 'bg-tang/15', text: 'text-tang', solid: 'bg-tang', border: 'border-tang' },
  sky:   { soft: 'bg-brand-sky/15', text: 'text-brand-sky', solid: 'bg-brand-sky', border: 'border-brand-sky' },
  sun:   { soft: 'bg-sun/20', text: 'text-amber-600', solid: 'bg-sun', border: 'border-sun' },
  navy:  { soft: 'bg-brand-navy/10', text: 'text-brand-navy', solid: 'bg-brand-navy', border: 'border-brand-navy' },
  wood:  { soft: 'bg-wood/40', text: 'text-wood-dark', solid: 'bg-wood-dark', border: 'border-wood-dark' }
};

/* ---------- 6) المتجر ---------- */
const CATEGORIES = [
  { id: 'food', icon: 'bone', ar: 'أطعمة جافة ورطبة', en: 'Dry & Wet Food' },
  { id: 'supplements', icon: 'pill', ar: 'فيتامينات ومكملات', en: 'Vitamins & Supplements' },
  { id: 'carriers', icon: 'briefcase', ar: 'أقفاص تنقل', en: 'Pet Carriers' },
  { id: 'care', icon: 'droplets', ar: 'شامبو ومستلزمات عناية', en: 'Shampoo & Care' }
];

/* لإضافة صورة حقيقية لمنتج: ضع الملف في images/products/ ثم أضف مثلاً  img: 'images/products/dry-cat-food.jpg' */
const PRODUCTS = [
  { id: 'p1', cat: 'food', icon: 'cat', color: 'tang', price: 12.5, badge: 'best',
    ar: { name: 'طعام جاف للقطط البالغة', desc: 'كيس 2 كغ — غني بالبروتين' }, en: { name: 'Adult Cat Dry Food', desc: '2 kg bag — high protein' } },
  { id: 'p2', cat: 'food', icon: 'dog', color: 'brand', price: 18,
    ar: { name: 'طعام جاف للكلاب', desc: 'كيس 3 كغ — لجميع السلالات' }, en: { name: 'Dog Dry Food', desc: '3 kg bag — all breeds' } },
  { id: 'p3', cat: 'food', icon: 'cat', color: 'sun', price: 9, badge: 'offer', oldPrice: 10.5,
    ar: { name: 'طعام رطب للقطط', desc: '12 ظرف × 85 غ' }, en: { name: 'Wet Cat Food Pouches', desc: '12 × 85 g pouches' } },
  { id: 'p4', cat: 'food', icon: 'dog', color: 'leaf', price: 2.25,
    ar: { name: 'علبة طعام رطب للكلاب', desc: '400 غ — بالدجاج' }, en: { name: 'Wet Dog Food Can', desc: '400 g — chicken' } },
  { id: 'p5', cat: 'food', icon: 'bird', color: 'sky', price: 4,
    ar: { name: 'خليط بذور للطيور', desc: '1 كغ — للكناري والبادجي' }, en: { name: 'Bird Seed Mix', desc: '1 kg — canaries & budgies' } },
  { id: 'p6', cat: 'supplements', icon: 'pill', color: 'leaf', price: 8, badge: 'vet',
    ar: { name: 'فيتامينات متعددة للقطط', desc: 'معجون 100 غ — يدعم المناعة' }, en: { name: 'Cat Multivitamin Paste', desc: '100 g — immune support' } },
  { id: 'p7', cat: 'supplements', icon: 'droplet', color: 'sun', price: 11,
    ar: { name: 'أوميغا 3 للجلد والشعر', desc: '60 كبسولة — لمعان الفرو' }, en: { name: 'Omega-3 Skin & Coat', desc: '60 capsules — shiny coat' } },
  { id: 'p8', cat: 'supplements', icon: 'circle-dot', color: 'tang', price: 6.5,
    ar: { name: 'معجون كرات الشعر', desc: 'للقطط — 70 غ' }, en: { name: 'Hairball Relief Paste', desc: 'For cats — 70 g' } },
  { id: 'p9', cat: 'supplements', icon: 'bone', color: 'brand', price: 13,
    ar: { name: 'مكمّل المفاصل للكلاب', desc: 'جلوكوزامين — 60 قرصاً' }, en: { name: 'Dog Joint Support', desc: 'Glucosamine — 60 tablets' } },
  { id: 'p10', cat: 'carriers', icon: 'briefcase', color: 'navy', price: 18,
    ar: { name: 'قفص تنقل صغير', desc: 'للقطط والكلاب الصغيرة حتى 6 كغ' }, en: { name: 'Small Pet Carrier', desc: 'Cats & small dogs up to 6 kg' } },
  { id: 'p11', cat: 'carriers', icon: 'luggage', color: 'brand', price: 32, badge: 'best',
    ar: { name: 'قفص تنقل كبير معتمد للسفر', desc: 'حتى 15 كغ — بباب معدني' }, en: { name: 'Large Travel Carrier', desc: 'Up to 15 kg — metal door' } },
  { id: 'p12', cat: 'carriers', icon: 'backpack', color: 'sky', price: 24,
    ar: { name: 'حقيبة ظهر شفافة للقطط', desc: 'تهوية ممتازة ونافذة بانورامية' }, en: { name: 'Cat Bubble Backpack', desc: 'Great ventilation, panoramic window' } },
  { id: 'p13', cat: 'care', icon: 'droplets', color: 'sky', price: 7,
    ar: { name: 'شامبو للبشرة الحساسة', desc: '250 مل — خالٍ من العطور' }, en: { name: 'Sensitive Skin Shampoo', desc: '250 ml — fragrance free' } },
  { id: 'p14', cat: 'care', icon: 'bug-off', color: 'leaf', price: 8.5, badge: 'vet',
    ar: { name: 'شامبو مضاد للبراغيث', desc: '250 مل — حماية فعالة' }, en: { name: 'Anti-Flea Shampoo', desc: '250 ml — effective protection' } },
  { id: 'p15', cat: 'care', icon: 'brush', color: 'wood', price: 5,
    ar: { name: 'فرشاة تمشيط ذاتية التنظيف', desc: 'لإزالة الشعر المتساقط' }, en: { name: 'Self-Cleaning Slicker Brush', desc: 'Removes loose fur' } },
  { id: 'p16', cat: 'care', icon: 'package', color: 'tang', price: 6,
    ar: { name: 'رمل قطط متكتل', desc: '10 لتر — يمنع الروائح' }, en: { name: 'Clumping Cat Litter', desc: '10 L — odor control' } }
];
const BADGES = {
  best: { ar: 'الأكثر طلباً', en: 'Best seller', cls: 'bg-tang text-white' },
  offer: { ar: 'عرض خاص', en: 'Special offer', cls: 'bg-red-500 text-white' },
  vet: { ar: 'ينصح به الطبيب', en: 'Vet recommended', cls: 'bg-leaf text-white' }
};

/* ---------- 7) جداول التطعيم (استرشادية — راجعها مع الطبيب البيطري للمركز) ----------
   weeks: عمر الحيوان بالأسابيع عند الجرعة.  months: الفاصل بين الجرعات الدورية.
   requiresPrimary: الجرعة المعززة تُحسب بعد اكتمال جرعات المجموعة الأساسية. */
const VAX = {
  cat: {
    primary: [
      { key: 'fvrcp1', group: 'fvrcp', weeks: 8,  ar: 'الثلاثي القططي (FVRCP) — الجرعة 1', en: 'FVRCP — dose 1' },
      { key: 'fvrcp2', group: 'fvrcp', weeks: 12, ar: 'الثلاثي القططي (FVRCP) — الجرعة 2', en: 'FVRCP — dose 2' },
      { key: 'fvrcp3', group: 'fvrcp', weeks: 16, ar: 'الثلاثي القططي (FVRCP) — الجرعة 3', en: 'FVRCP — dose 3' },
      { key: 'rabies1', group: 'rabies', weeks: 16, ar: 'داء الكلب (السعار) — الجرعة الأولى', en: 'Rabies — first dose' }
    ],
    recurring: [
      { key: 'fvrcpB', groups: ['fvrcp'], months: 12, requiresPrimary: true, ar: 'معزز الثلاثي القططي السنوي', en: 'Annual FVRCP booster' },
      { key: 'rabiesB', groups: ['rabies'], months: 12, requiresPrimary: true, ar: 'معزز داء الكلب السنوي', en: 'Annual rabies booster' },
      { key: 'deworm', groups: [], months: 3, startWeeks: 4, ar: 'مضاد الديدان الداخلية', en: 'Deworming' }
    ]
  },
  dog: {
    primary: [
      { key: 'dhpp1', group: 'dhpp', weeks: 8,  ar: 'الخماسي/السداسي (DHPPi) — الجرعة 1', en: 'DHPPi — dose 1' },
      { key: 'dhpp2', group: 'dhpp', weeks: 12, ar: 'الخماسي/السداسي (DHPPi) — الجرعة 2', en: 'DHPPi — dose 2' },
      { key: 'lepto1', group: 'lepto', weeks: 12, ar: 'اللبتوسبيرا — الجرعة 1', en: 'Leptospirosis — dose 1' },
      { key: 'dhpp3', group: 'dhpp', weeks: 16, ar: 'الخماسي/السداسي (DHPPi) — الجرعة 3', en: 'DHPPi — dose 3' },
      { key: 'lepto2', group: 'lepto', weeks: 16, ar: 'اللبتوسبيرا — الجرعة 2', en: 'Leptospirosis — dose 2' },
      { key: 'rabies1', group: 'rabies', weeks: 16, ar: 'داء الكلب (السعار) — الجرعة الأولى', en: 'Rabies — first dose' }
    ],
    recurring: [
      { key: 'dhppB', groups: ['dhpp', 'lepto'], months: 12, requiresPrimary: true, ar: 'المعزز السنوي (DHPPi + L)', en: 'Annual booster (DHPPi + L)' },
      { key: 'rabiesB', groups: ['rabies'], months: 12, requiresPrimary: true, ar: 'معزز داء الكلب السنوي', en: 'Annual rabies booster' },
      { key: 'deworm', groups: [], months: 3, startWeeks: 4, ar: 'مضاد الديدان الداخلية', en: 'Deworming' }
    ]
  },
  rabbit: {
    primary: [
      { key: 'rhd1', group: 'rhd', weeks: 10, ar: 'النزف الفيروسي (RHDV1/2)', en: 'RHDV1/2' }
    ],
    recurring: [
      { key: 'rhdB', groups: ['rhd'], months: 12, requiresPrimary: true, ar: 'معزز النزف الفيروسي السنوي', en: 'Annual RHDV booster' },
      { key: 'checkup', groups: [], months: 12, startWeeks: 8, ar: 'الفحص الدوري الشامل', en: 'Annual wellness check' }
    ]
  },
  bird: {
    primary: [],
    recurring: [
      { key: 'checkup', groups: [], months: 12, startWeeks: 8, ar: 'الفحص الدوري الشامل', en: 'Annual wellness check' },
      { key: 'deworm', groups: [], months: 6, startWeeks: 12, ar: 'مضاد الطفيليات', en: 'Parasite control' }
    ]
  },
  other: {
    primary: [],
    recurring: [
      { key: 'checkup', groups: [], months: 12, startWeeks: 8, ar: 'الفحص الدوري الشامل', en: 'Annual wellness check' },
      { key: 'deworm', groups: [], months: 6, startWeeks: 12, ar: 'مضاد الطفيليات', en: 'Parasite control' }
    ]
  }
};
const SPECIES = {
  cat: { icon: 'cat', color: 'tang', ar: 'قط', en: 'Cat' },
  dog: { icon: 'dog', color: 'brand', ar: 'كلب', en: 'Dog' },
  rabbit: { icon: 'rabbit', color: 'leaf', ar: 'أرنب', en: 'Rabbit' },
  bird: { icon: 'bird', color: 'sky', ar: 'طائر', en: 'Bird' },
  other: { icon: 'paw-print', color: 'sun', ar: 'أخرى', en: 'Other' }
};

/* ---------- 8) معرض الصور — استبدل الملفات داخل مجلد images بنفس الأسماء ---------- */
const GALLERY = [
  { src: 'images/clinic-front.jpg', ar: 'واجهة المركز في ماركا الشمالية', en: 'Our storefront in North Marka', span: 'col-span-2 row-span-2' },
  { src: 'images/waiting-area.jpg', ar: 'صالة الانتظار الخشبية', en: 'Wooden waiting lounge', span: 'row-span-2' },
  { src: 'images/reception.jpg', ar: 'جدار الشعار في الاستقبال', en: 'Logo wall at reception', span: 'row-span-2' },
  { src: 'images/exam-room.jpg', ar: 'غرفة الفحص المعقمة', en: 'Sterile exam room', span: 'row-span-2' },
  { src: 'images/grooming-room.jpg', ar: 'قسم الاستحمام والعناية', en: 'Bathing & grooming area', span: 'row-span-2' },
  { src: 'images/pharmacy-shelves.jpg', ar: 'ركن المستلزمات والإكسسوارات', en: 'Supplies & accessories corner', span: 'row-span-2' },
  { src: 'images/pet-hotel.jpg', ar: 'راحة ضيوفنا', en: 'Our guests, relaxed', span: 'row-span-2' },
  { src: 'images/treatment-rooms.jpg', ar: 'غرف المعالجة الزجاجية', en: 'Glass-walled treatment rooms', span: 'col-span-2' },
  { src: 'images/clinic-hall.jpg', ar: 'من داخل المركز', en: 'Inside the center', span: 'col-span-2' }
];

/* ---------- 9) المدونة ---------- */
const BLOG_CATS = [
  { id: 'vaccines', ar: 'التطعيمات', en: 'Vaccines', color: 'leaf' },
  { id: 'nutrition', ar: 'التغذية', en: 'Nutrition', color: 'sun' },
  { id: 'health', ar: 'صحة ووقاية', en: 'Health', color: 'brand' }
];

const POSTS = [
  {
    id: 'cat-vaccine-schedule', cat: 'vaccines', icon: 'syringe', color: 'leaf', minutes: 4, date: '2026-10-05',
    ar: {
      title: 'جدول تطعيمات القطط: دليل كامل لأصحاب القطط في الأردن',
      excerpt: 'متى تبدأ تطعيمات القطة الصغيرة؟ وما الفرق بين الجرعات الأساسية والمعززة؟ إليك الجدول المبسط.',
      body: `<p>التطعيم هو أهم خطوة لحماية قطتك من أمراض خطيرة ومعدية مثل الإنفلونزا القططية وفيروس البانلوكوبينيا (تسمم الدم القططي) وداء الكلب.</p>
<h3>الجدول الاسترشادي للقطط الصغيرة</h3>
<table><thead><tr><th>العمر</th><th>التطعيم</th></tr></thead><tbody>
<tr><td>6 – 8 أسابيع</td><td>الجرعة الأولى من الثلاثي القططي (FVRCP) + مضاد ديدان</td></tr>
<tr><td>10 – 12 أسبوعاً</td><td>الجرعة الثانية من الثلاثي</td></tr>
<tr><td>14 – 16 أسبوعاً</td><td>الجرعة الثالثة من الثلاثي + داء الكلب</td></tr>
<tr><td>بعد سنة</td><td>جرعات معززة، ثم حسب توصية الطبيب</td></tr></tbody></table>
<h3>نصائح مهمة</h3>
<ul><li>لا تُطعَّم القطة وهي مريضة أو مصابة بالإسهال — يفحصها الطبيب أولاً.</li>
<li>احتفظ بدفتر التطعيمات، فهو مطلوب عند السفر.</li>
<li>القطط المنزلية تحتاج التطعيم أيضاً، فالفيروسات قد تنتقل عبر الملابس والأحذية.</li></ul>
<p class="note">استخدم «ملف حيوانك» في موقعنا لحساب مواعيد تطعيمات قطتك تلقائياً وتلقي التذكيرات.</p>`
    },
    en: {
      title: 'Cat Vaccination Schedule: A Complete Guide for Cat Owners in Jordan',
      excerpt: 'When should kitten vaccines start, and what is the difference between primary and booster doses? Here is a simple schedule.',
      body: `<p>Vaccination is the most important step to protect your cat from serious contagious diseases such as cat flu, feline panleukopenia and rabies.</p>
<h3>Guideline schedule for kittens</h3>
<table><thead><tr><th>Age</th><th>Vaccine</th></tr></thead><tbody>
<tr><td>6 – 8 weeks</td><td>First FVRCP dose + deworming</td></tr>
<tr><td>10 – 12 weeks</td><td>Second FVRCP dose</td></tr>
<tr><td>14 – 16 weeks</td><td>Third FVRCP dose + rabies</td></tr>
<tr><td>After one year</td><td>Boosters, then as your vet recommends</td></tr></tbody></table>
<h3>Important tips</h3>
<ul><li>Never vaccinate a sick cat or one with diarrhea — the vet should examine it first.</li>
<li>Keep the vaccination booklet; it is required for travel.</li>
<li>Indoor cats need vaccines too — viruses can travel on clothes and shoes.</li></ul>
<p class="note">Use “Pet Profile” on our website to calculate your cat’s vaccine dates automatically and receive reminders.</p>`
    }
  },
  {
    id: 'dog-nutrition', cat: 'nutrition', icon: 'bone', color: 'sun', minutes: 5, date: '2026-09-20',
    ar: {
      title: 'التغذية السليمة للكلاب: ماذا يأكل كلبك وكم مرة؟',
      excerpt: 'دليل عملي لاختيار الطعام المناسب لعمر كلبك وحجمه، مع قائمة بالأطعمة الممنوعة تماماً.',
      body: `<p>التغذية المتوازنة أساس صحة الكلب وطول عمره، وهي تختلف حسب العمر والحجم ومستوى النشاط.</p>
<h3>عدد الوجبات حسب العمر</h3>
<ul><li><b>الجراء (حتى 6 أشهر):</b> 3 – 4 وجبات صغيرة يومياً.</li>
<li><b>من 6 أشهر إلى سنة:</b> 2 – 3 وجبات.</li>
<li><b>البالغون:</b> وجبتان يومياً بكميات حسب الوزن المكتوب على العبوة.</li></ul>
<h3>أطعمة ممنوعة على الكلاب</h3>
<ul><li>الشوكولاتة والكافيين.</li><li>العنب والزبيب.</li><li>البصل والثوم.</li>
<li>المحليات الصناعية مثل الزايليتول (موجود في بعض العلكة).</li><li>العظام المطبوخة لأنها تتفتت وقد تجرح الأمعاء.</li></ul>
<h3>نصائح ذهبية</h3>
<ul><li>وفّر ماءً نظيفاً طوال الوقت، خاصة في صيف الأردن.</li>
<li>غيّر نوع الطعام تدريجياً على مدى 7 أيام لتجنب اضطراب المعدة.</li>
<li>راقب وزن كلبك، فالسمنة تسبب مشاكل في المفاصل والقلب.</li></ul>
<p class="note">يساعدك فريقنا في الصيدلية على اختيار الطعام المناسب لسلالة كلبك وعمره.</p>`
    },
    en: {
      title: 'Healthy Nutrition for Dogs: What and How Often?',
      excerpt: "A practical guide to choosing the right food for your dog's age and size, plus a list of foods to avoid completely.",
      body: `<p>Balanced nutrition is the foundation of a dog's health and longevity, and it varies with age, size and activity level.</p>
<h3>Meals by age</h3>
<ul><li><b>Puppies (up to 6 months):</b> 3 – 4 small meals a day.</li>
<li><b>6 months to 1 year:</b> 2 – 3 meals.</li>
<li><b>Adults:</b> two meals a day, portioned by weight as shown on the pack.</li></ul>
<h3>Foods dogs must never eat</h3>
<ul><li>Chocolate and caffeine.</li><li>Grapes and raisins.</li><li>Onions and garlic.</li>
<li>Artificial sweeteners such as xylitol (found in some chewing gum).</li><li>Cooked bones, which splinter and can injure the gut.</li></ul>
<h3>Golden tips</h3>
<ul><li>Always provide fresh water, especially in Jordan's summer.</li>
<li>Switch foods gradually over 7 days to avoid stomach upset.</li>
<li>Watch your dog's weight — obesity causes joint and heart problems.</li></ul>
<p class="note">Our pharmacy team can help you choose the right food for your dog's breed and age.</p>`
    }
  },
  {
    id: 'pet-first-aid', cat: 'health', icon: 'cross', color: 'tang', minutes: 5, date: '2026-09-02',
    ar: {
      title: 'الإسعافات الأولية للحيوانات الأليفة: ماذا تفعل قبل الوصول إلى العيادة؟',
      excerpt: 'خطوات بسيطة قد تنقذ حياة حيوانك في حالات النزيف وضربة الشمس والتسمم.',
      body: `<p>في الحالات الطارئة، تصرّفك في الدقائق الأولى مهم جداً. القاعدة الأولى: <b>حافظ على هدوئك واتصل بالعيادة فوراً</b>.</p>
<h3>النزيف</h3>
<ul><li>اضغط على الجرح بقطعة قماش أو شاش نظيف لعدة دقائق دون رفعها.</li><li>إذا تشبّع الشاش بالدم أضف طبقة فوقه ولا تنزعه.</li></ul>
<h3>ضربة الشمس</h3>
<ul><li>انقل الحيوان إلى مكان ظليل وبارد.</li><li>بلّل جسمه بماء فاتر أو بارد قليلاً — <b>وليس مثلجاً</b>.</li><li>توجّه للعيادة حتى لو تحسّن، فقد تظهر مضاعفات لاحقاً.</li></ul>
<h3>التسمم</h3>
<ul><li>لا تحاول دفعه للتقيؤ إلا بتوجيه من الطبيب.</li><li>أحضر عبوة المادة التي تناولها معك.</li></ul>
<h3>الكسور والإصابات</h3>
<ul><li>قلّل حركة الحيوان قدر الإمكان واحمله على سطح مستوٍ.</li><li>الحيوان المتألم قد يعض حتى صاحبه، فتعامل معه بحذر.</li></ul>
<p class="note">في أي حالة طارئة، استخدم زر «طوارئ واتساب» في موقعنا للتواصل الفوري.</p>`
    },
    en: {
      title: 'Pet First Aid: What to Do Before You Reach the Clinic',
      excerpt: "Simple steps that can save your pet's life in cases of bleeding, heatstroke and poisoning.",
      body: `<p>In an emergency, what you do in the first minutes matters a lot. Rule number one: <b>stay calm and call the clinic immediately</b>.</p>
<h3>Bleeding</h3>
<ul><li>Press on the wound with a clean cloth or gauze for several minutes without lifting it.</li><li>If it soaks through, add another layer on top — don't remove the first.</li></ul>
<h3>Heatstroke</h3>
<ul><li>Move your pet to a cool, shaded place.</li><li>Wet the body with lukewarm or slightly cool water — <b>never ice-cold</b>.</li><li>Go to the clinic even if they seem better; complications can appear later.</li></ul>
<h3>Poisoning</h3>
<ul><li>Don't induce vomiting unless a vet tells you to.</li><li>Bring the product packaging with you.</li></ul>
<h3>Fractures and injuries</h3>
<ul><li>Keep movement to a minimum and carry the pet on a flat surface.</li><li>A pet in pain may bite even its owner, so handle with care.</li></ul>
<p class="note">In any emergency, use the “Emergency WhatsApp” button on our site to reach us instantly.</p>`
    }
  },
  {
    id: 'summer-heat', cat: 'health', icon: 'sun', color: 'sun', minutes: 3, date: '2026-07-14',
    ar: {
      title: 'حيوانك الأليف وحرّ الصيف في عمّان',
      excerpt: 'كيف تحمي قطك أو كلبك من الحر والجفاف وحروق الأرصفة الساخنة؟',
      body: `<p>درجات الحرارة المرتفعة في الصيف تشكّل خطراً حقيقياً على الحيوانات الأليفة، خاصة السلالات ذات الأنف القصير مثل الشيرازي والبولدوغ.</p>
<h3>نصائح عملية</h3>
<ul><li><b>لا تترك حيوانك في السيارة</b> ولو لدقائق — ترتفع حرارتها بسرعة كبيرة.</li>
<li>اجعل التمشية في الصباح الباكر أو بعد المغرب.</li>
<li>اختبر الإسفلت بظهر يدك لمدة 7 ثوانٍ؛ إن لم تحتمل الحرارة فهو حار جداً على أقدامه.</li>
<li>وفّر أكثر من وعاء ماء في أماكن ظليلة.</li></ul>
<h3>علامات الإجهاد الحراري</h3>
<ul><li>لهاث شديد وسيلان اللعاب.</li><li>خمول أو ترنّح.</li><li>احمرار اللثة أو تقيؤ.</li></ul>
<p class="note">إذا لاحظت هذه العلامات، اتبع خطوات الإسعاف الأولي وتواصل معنا فوراً.</p>`
    },
    en: {
      title: 'Your Pet and the Summer Heat in Amman',
      excerpt: 'How to protect your cat or dog from heat, dehydration and hot pavement burns.',
      body: `<p>High summer temperatures are a real danger for pets, especially short-nosed breeds such as Persians and bulldogs.</p>
<h3>Practical tips</h3>
<ul><li><b>Never leave your pet in the car</b>, even for minutes — it heats up very fast.</li>
<li>Walk early in the morning or after sunset.</li>
<li>Test the asphalt with the back of your hand for 7 seconds; if it's too hot for you, it's too hot for paws.</li>
<li>Provide several water bowls in shaded spots.</li></ul>
<h3>Signs of heat stress</h3>
<ul><li>Heavy panting and drooling.</li><li>Lethargy or stumbling.</li><li>Red gums or vomiting.</li></ul>
<p class="note">If you notice these signs, follow first-aid steps and contact us right away.</p>`
    }
  },
  {
    id: 'dental-care', cat: 'health', icon: 'sparkles', color: 'brand', minutes: 3, date: '2026-06-28',
    ar: {
      title: 'العناية بأسنان قطك وكلبك: أكثر من مجرد رائحة فم',
      excerpt: 'أمراض اللثة شائعة جداً بعد عمر 3 سنوات. تعرّف على العلامات وطرق الوقاية.',
      body: `<p>تُعد أمراض الأسنان واللثة من أكثر المشاكل شيوعاً لدى القطط والكلاب البالغة، وقد تؤثر على القلب والكلى إذا أُهملت.</p>
<h3>علامات تستدعي الفحص</h3>
<ul><li>رائحة فم كريهة.</li><li>لثة حمراء أو نازفة وتراكم جير بني.</li><li>صعوبة في المضغ أو الأكل من جهة واحدة.</li></ul>
<h3>الوقاية</h3>
<ul><li>نظّف الأسنان بفرشاة ومعجون مخصص للحيوانات — <b>لا تستخدم معجون الإنسان</b>.</li>
<li>استخدم ألعاب وأطعمة مخصصة لصحة الأسنان.</li><li>افحص الفم عند الطبيب مرة سنوياً على الأقل.</li></ul>`
    },
    en: {
      title: "Caring for Your Pet's Teeth: More Than Bad Breath",
      excerpt: 'Gum disease is very common after age 3. Learn the signs and how to prevent it.',
      body: `<p>Dental and gum disease is one of the most common problems in adult cats and dogs, and when neglected it can affect the heart and kidneys.</p>
<h3>Signs that need a check-up</h3>
<ul><li>Bad breath.</li><li>Red or bleeding gums and brown tartar.</li><li>Difficulty chewing or eating on one side.</li></ul>
<h3>Prevention</h3>
<ul><li>Brush with a pet toothbrush and pet toothpaste — <b>never use human toothpaste</b>.</li>
<li>Use dental toys and dental diets.</li><li>Have the mouth checked by a vet at least once a year.</li></ul>`
    }
  },
  {
    id: 'spay-neuter', cat: 'health', icon: 'heart-pulse', color: 'tang', minutes: 4, date: '2026-06-10',
    ar: {
      title: 'التعقيم والإخصاء: الفوائد والعناية بعد العملية',
      excerpt: 'لماذا ينصح الأطباء البيطريون بالتعقيم؟ وكيف تعتني بحيوانك بعد العملية؟',
      body: `<p>عملية التعقيم (للإناث) والإخصاء (للذكور) من أكثر العمليات شيوعاً، ولها فوائد صحية وسلوكية.</p>
<h3>الفوائد</h3>
<ul><li>منع الحمل غير المرغوب وتقليل أعداد الحيوانات المشردة.</li><li>تقليل خطر بعض الأورام والتهابات الرحم.</li><li>تقليل سلوكيات مثل الرش والهروب والعدوانية.</li></ul>
<h3>العناية بعد العملية</h3>
<ul><li>استخدم الطوق الواقي لمنع لعق الجرح.</li><li>قلّل القفز والنشاط لمدة 10 – 14 يوماً.</li><li>افحص الجرح يومياً وتواصل معنا عند ملاحظة احمرار أو إفرازات.</li></ul>
<p class="note">يحدد الطبيب العمر الأنسب للعملية حسب نوع حيوانك وسلالته.</p>`
    },
    en: {
      title: 'Spaying & Neutering: Benefits and Post-Op Care',
      excerpt: 'Why do vets recommend it, and how should you care for your pet after surgery?',
      body: `<p>Spaying (females) and neutering (males) are among the most common procedures, with both health and behavioral benefits.</p>
<h3>Benefits</h3>
<ul><li>Prevents unwanted litters and reduces stray populations.</li><li>Lowers the risk of some tumors and uterine infections.</li><li>Reduces behaviors such as spraying, roaming and aggression.</li></ul>
<h3>Post-op care</h3>
<ul><li>Use the protective cone to stop licking of the wound.</li><li>Limit jumping and activity for 10 – 14 days.</li><li>Check the incision daily and contact us if you notice redness or discharge.</li></ul>
<p class="note">Your vet will advise the best age for the procedure based on your pet's species and breed.</p>`
    }
  }
];
