import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Users, 
  Shield, 
  Award,
  CheckCircle,
  Building2,
  Globe,
  Headphones
} from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Comparador Internet Colombia - Empresa Líder en Asesoría Telecomunicaciones',
  description: 'Somos la empresa líder en asesoría de telecomunicaciones en Colombia. Ayudamos a encontrar el mejor plan de internet desde 2020. Oficina en Bogotá, servicio nacional.',
  keywords: 'empresa telecomunicaciones Colombia, asesoría internet Bogotá, consultores internet Colombia, oficina internet Bogotá, empresa comparador internet',
  authors: [{ name: 'Comparador Internet Colombia' }],
  creator: 'Comparador Internet Colombia',
  publisher: 'Comparador Internet Colombia',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://comparadorinternet.co/empresa'
  },
  openGraph: {
    type: 'website',
    title: 'Comparador Internet Colombia - Empresa de Telecomunicaciones',
    description: 'Empresa líder en asesoría de internet en Colombia. Oficina en Bogotá, servicio nacional.',
    url: 'https://comparadorinternet.co/empresa',
    siteName: 'Comparador Internet Colombia',
    images: [
      {
        url: 'https://comparadorinternet.co/images/empresa-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Oficina Comparador Internet Colombia'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparador Internet Colombia - Empresa de Telecomunicaciones',
    description: 'Empresa líder en asesoría de internet en Colombia.',
    images: ['https://comparadorinternet.co/images/empresa-og.jpg']
  }
};

const businessHours = [
  { day: 'Lunes', hours: '8:00 AM - 6:00 PM' },
  { day: 'Martes', hours: '8:00 AM - 6:00 PM' },
  { day: 'Miércoles', hours: '8:00 AM - 6:00 PM' },
  { day: 'Jueves', hours: '8:00 AM - 6:00 PM' },
  { day: 'Viernes', hours: '8:00 AM - 6:00 PM' },
  { day: 'Sábado', hours: '9:00 AM - 2:00 PM' },
  { day: 'Domingo', hours: 'Cerrado' }
];

const stats = [
  { icon: Users, label: 'Familias Asesoradas', value: '15,000+' },
  { icon: Award, label: 'Años de Experiencia', value: '6+' },
  { icon: Shield, label: 'Satisfacción Cliente', value: '98%' },
  { icon: Globe, label: 'Ciudades Cubiertas', value: '50+' }
];

const services = [
  {
    icon: CheckCircle,
    title: 'Asesoría Personalizada',
    description: 'Análisis gratuito de necesidades y recomendaciones personalizadas para tu hogar o empresa.'
  },
  {
    icon: Phone,
    title: 'Gestión de Contratos',
    description: 'Te ayudamos con todo el proceso de contratación, instalación y configuración.'
  },
  {
    icon: Headphones,
    title: 'Soporte Post-Venta',
    description: 'Acompañamiento continuo para resolver dudas y optimizar tu servicio de internet.'
  },
  {
    icon: Building2,
    title: 'Soluciones Empresariales',
    description: 'Planes corporativos y soluciones de conectividad para PyMES y grandes empresas.'
  }
];

export default function EmpresaPage() {
  return (
    <main className="min-h-screen">
      {/* Schema.org LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Comparador Internet Colombia",
            "alternateName": "Internet Colombia",
            "description": "Empresa líder en asesoría de telecomunicaciones en Colombia. Ayudamos a encontrar el mejor plan de internet para hogares y empresas.",
            "url": "https://comparadorinternet.co",
            "telephone": "+57-315-464-5370",
            "email": "info@comparadorinternet.co",
            "foundingDate": "2020",
            "founder": {
              "@type": "Organization",
              "name": "Internet Colombia Group"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Carrera 11 # 93-07, Oficina 204",
              "addressLocality": "Bogotá",
              "addressRegion": "Cundinamarca",
              "postalCode": "110221",
              "addressCountry": "CO"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "4.6738",
              "longitude": "-74.0542"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "14:00"
              }
            ],
            "sameAs": [
              "https://www.facebook.com/ComparadorInternetColombia",
              "https://www.instagram.com/internetcolombia",
              "https://www.linkedin.com/company/comparador-internet-colombia"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            },
            "priceRange": "Gratis",
            "paymentAccepted": "Asesoría gratuita",
            "currenciesAccepted": "COP",
            "areaServed": {
              "@type": "Country",
              "name": "Colombia"
            },
            "serviceType": [
              "Asesoría en Telecomunicaciones",
              "Comparación de Planes de Internet",
              "Consultoría Tecnológica",
              "Soporte al Cliente"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Servicios de Asesoría Internet",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Asesoría Personalizada Internet",
                    "description": "Análisis gratuito y recomendaciones personalizadas"
                  },
                  "price": "0",
                  "priceCurrency": "COP"
                }
              ]
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm mb-6">
              🏢 EMPRESA COLOMBIANA
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Líderes en Asesoría de <span className="text-yellow-400">Telecomunicaciones</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Desde 2020 ayudamos a más de <strong>15,000 familias colombianas</strong><br/>
              a encontrar el plan de internet perfecto
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contacto" 
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                📞 Hablar con un Asesor
              </a>
              <a 
                href="/calculadora" 
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                📊 Usar Calculadora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-blue-100">
                    <stat.icon size={32} className="text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-6">
                  ¿Quiénes Somos?
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Somos la empresa líder en asesoría de telecomunicaciones en Colombia. 
                  Fundada en 2020, nos especializamos en ayudar a familias y empresas 
                  a encontrar el plan de internet perfecto según sus necesidades específicas.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Con más de 6 años de experiencia en el sector, hemos asesorado a más de 
                  15,000 clientes satisfechos en todo el país, manteniendo una calificación 
                  de satisfacción del 98%.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/guia-completa" 
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all text-center"
                  >
                    Ver Guía Completa
                  </Link>
                  <a 
                    href="#horarios" 
                    className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all text-center"
                  >
                    Ver Horarios de Atención
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-black mb-6 text-center">Nuestra Misión</h3>
                <blockquote className="text-lg text-gray-700 italic text-center leading-relaxed">
                  "Democratizar el acceso a información confiable sobre telecomunicaciones 
                  en Colombia, ayudando a cada familia a tomar la mejor decisión para su 
                  conectividad digital."
                </blockquote>
                <div className="flex justify-center mt-6">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} size={24} fill="currentColor" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 font-bold">4.8/5</span>
                  <span className="ml-2 text-gray-500">(127 reseñas)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
              Nuestros Servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-blue-100">
                      <service.icon size={32} className="text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contacto" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
              Visítanos o Contáctanos
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-black mb-6">Información de Contacto</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <MapPin size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Ubicación</h4>
                      <p className="text-gray-600">
                        Carrera 11 # 93-07, Oficina 204<br/>
                        Chapinero, Bogotá - Colombia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-green-100">
                      <Phone size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Teléfono</h4>
                      <a 
                        href="tel:+573154645370" 
                        className="text-green-600 hover:text-green-700 font-bold text-lg"
                      >
                        +57 315 464 5370
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-100">
                      <Mail size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Email</h4>
                      <a 
                        href="mailto:info@comparadorinternet.co" 
                        className="text-purple-600 hover:text-purple-700 font-bold"
                      >
                        info@comparadorinternet.co
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Clock size={20} />
                    Horarios de Atención
                  </h4>
                  <div id="horarios" className="space-y-2">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium">{schedule.day}:</span>
                        <span className={schedule.day === 'Domingo' ? 'text-red-600' : 'text-gray-600'}>
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-black mb-6">Solicita Asesoría Gratuita</h3>
                <QuickCallForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
              Encuéntranos en Bogotá
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.3654788395623!2d-74.05663992507896!3d4.673813642998345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b0a5c7f5f5f%3A0x5f5f5f5f5f5f5f5f!2sCarrera%2011%20%2393-07%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2sus!4v1704729600000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Comparador Internet Colombia - Chapinero, Bogotá"
              ></iframe>
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-600 mb-4">
                📍 Nos ubicamos en el corazón de Chapinero, zona empresarial de Bogotá
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://goo.gl/maps/YOUR_GOOGLE_MAPS_LINK" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
                >
                  Ver en Google Maps
                </a>
                <a 
                  href="https://wa.me/573154645370?text=Hola%2C%20quiero%20agendar%20una%20cita%20en%20su%20oficina" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-all"
                >
                  Agendar Cita por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            ¿Listo para Encontrar tu Internet Ideal?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Únete a más de 15,000 familias que ya encontraron su plan perfecto con nosotros
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/calculadora" 
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📊 Usar Calculadora Gratis
            </Link>
            <Link 
              href="/guia-completa" 
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📖 Ver Guía Completa
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}