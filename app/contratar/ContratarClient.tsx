'use client';

import { useState } from 'react';
import { MapPin, Wifi, CheckCircle2, Phone, Mail, Calendar, ArrowRight, Shield, Zap } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: any;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Ingresa tu dirección',
    description: 'Validamos cobertura en tu zona',
    icon: MapPin,
  },
  {
    id: 2,
    title: 'Elige tu plan',
    description: 'Te recomendamos el mejor según tu uso',
    icon: Wifi,
  },
  {
    id: 3,
    title: 'Agenda tu instalación',
    description: 'Escoge el día y hora que prefieras',
    icon: Calendar,
  },
  {
    id: 4,
    title: 'Confirmación',
    description: 'Te llamamos para confirmar todos los detalles',
    icon: CheckCircle2,
  },
];

interface FormData {
  address: string;
  city: string;
  neighborhood: string;
  usage: string;
  speed: string;
  provider: string;
  name: string;
  phone: string;
  email: string;
  installDate: string;
  installTime: string;
  comments: string;
}

export default function ContratarClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const [coverageValid, setCoverageValid] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    address: '',
    city: 'Bogotá',
    neighborhood: '',
    usage: '',
    speed: '',
    provider: '',
    name: '',
    phone: '',
    email: '',
    installDate: '',
    installTime: '',
    comments: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateCoverage = () => {
    // Simulación de validación de cobertura
    if (formData.address && formData.neighborhood) {
      setCoverageValid(true);
      setCurrentStep(2);
      
      // Recomendación basada en uso
      const recommendation = getRecommendation(formData.usage);
      setRecommendedPlan(recommendation);
    }
  };

  const getRecommendation = (usage: string) => {
    const recommendations: Record<string, any> = {
      basico: {
        speed: '300 Mbps',
        provider: 'ETB',
        price: 42000,
        reason: 'Ideal para navegación básica y 1-2 personas',
      },
      medio: {
        speed: '500 Mbps',
        provider: 'Movistar',
        price: 89900,
        reason: 'Perfecto para streaming 4K y teletrabajo',
      },
      intenso: {
        speed: '900 Mbps',
        provider: 'ETB',
        price: 95000,
        reason: 'Ideal para gaming, múltiples dispositivos y descargas pesadas',
      },
    };

    return recommendations[usage] || recommendations.medio;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Tracking GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        currency: 'COP',
        value: recommendedPlan?.price || 50000,
        provider: formData.provider,
        form_name: 'contratar_complete',
        lead_type: 'conversion_funnel',
      });
    }

    alert('¡Solicitud enviada! Te llamaremos en menos de 15 minutos para confirmar tu instalación.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contrata tu Internet en 4 Pasos
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Proceso 100% digital. Te llamamos para confirmar. Instalación en 24-48 horas.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      currentStep >= step.id
                        ? 'bg-blue-600 text-white shadow-lg scale-110'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : (
                      <step.icon className="w-8 h-8" />
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <div className={`font-semibold ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 hidden md:block">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-8 left-1/2 w-full h-1 -ml-1/2 transition-all ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                    style={{ left: '50%', width: 'calc(100% - 4rem)', marginLeft: '2rem' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Dirección */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Paso 1: Tu Dirección</h2>
                    <p className="text-gray-600">Valida la cobertura en tu zona</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dirección completa *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Ej: Calle 72 #10-20 Apto 501"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad *</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="Bogotá">Bogotá</option>
                        <option value="Medellín">Medellín</option>
                        <option value="Cali">Cali</option>
                        <option value="Barranquilla">Barranquilla</option>
                        <option value="Cartagena">Cartagena</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Barrio *</label>
                      <input
                        type="text"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        placeholder="Ej: Chapinero"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={validateCoverage}
                    className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Validar Cobertura
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Step 2: Selección de Plan */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Paso 2: Tu Plan Ideal</h2>
                    <p className="text-gray-600">Basado en tu uso, te recomendamos</p>
                  </div>

                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-900">¡Cobertura disponible! ✓</h3>
                    </div>
                    <p className="text-gray-700">
                      Tenemos servicio en <strong>{formData.neighborhood}</strong>, {formData.city}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Cómo usarás tu internet? *
                    </label>
                    <select
                      name="usage"
                      value={formData.usage}
                      onChange={(e) => {
                        handleInputChange(e);
                        const recommendation = getRecommendation(e.target.value);
                        setRecommendedPlan(recommendation);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="basico">Navegación básica (1-2 personas)</option>
                      <option value="medio">Streaming HD + Teletrabajo (3-4 personas)</option>
                      <option value="intenso">Gaming + Streaming 4K + Múltiples dispositivos (5+ personas)</option>
                    </select>
                  </div>

                  {recommendedPlan && (
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <Zap className="w-12 h-12 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">Plan Recomendado</h3>
                          <div className="text-3xl font-black mb-2">{recommendedPlan.speed}</div>
                          <div className="text-xl mb-2">
                            ${recommendedPlan.price.toLocaleString('es-CO')}/mes
                          </div>
                          <div className="text-sm text-blue-100 mb-3">{recommendedPlan.reason}</div>
                          <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm inline-block">
                            {recommendedPlan.provider}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Prefieres otro operador?
                    </label>
                    <select
                      name="provider"
                      value={formData.provider}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Usar recomendación ({recommendedPlan?.provider})</option>
                      <option value="ETB">ETB</option>
                      <option value="Claro">Claro</option>
                      <option value="Movistar">Movistar</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Step 3: Datos de Contacto */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Paso 3: Agenda tu Instalación</h2>
                    <p className="text-gray-600">¿Cuándo te gustaría tener internet?</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="3001234567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fecha preferida *
                      </label>
                      <input
                        type="date"
                        name="installDate"
                        value={formData.installDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Horario preferido *
                      </label>
                      <select
                        name="installTime"
                        value={formData.installTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Selecciona horario</option>
                        <option value="8am-12pm">8:00 AM - 12:00 PM</option>
                        <option value="12pm-4pm">12:00 PM - 4:00 PM</option>
                        <option value="4pm-8pm">4:00 PM - 8:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Comentarios adicionales
                    </label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Ej: Apartamento en segundo piso, portería con código de acceso"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Revisar Solicitud
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Step 4: Confirmación */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Paso 4: Confirma tu Solicitud</h2>
                    <p className="text-gray-600">Revisa que todo esté correcto</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">📍 Dirección de Instalación</h3>
                      <p className="text-gray-700">
                        {formData.address}, {formData.neighborhood}, {formData.city}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="font-bold text-gray-900 mb-2">📶 Plan Seleccionado</h3>
                      <p className="text-gray-700">
                        {recommendedPlan?.speed} - {formData.provider || recommendedPlan?.provider}
                      </p>
                      <p className="text-2xl font-bold text-blue-600 mt-2">
                        ${recommendedPlan?.price.toLocaleString('es-CO')}/mes
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="font-bold text-gray-900 mb-2">👤 Datos de Contacto</h3>
                      <p className="text-gray-700">{formData.name}</p>
                      <p className="text-gray-700">{formData.phone}</p>
                      {formData.email && <p className="text-gray-700">{formData.email}</p>}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="font-bold text-gray-900 mb-2">📅 Instalación Programada</h3>
                      <p className="text-gray-700">
                        {new Date(formData.installDate).toLocaleDateString('es-CO', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-gray-700">{formData.installTime}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">¿Qué pasa ahora?</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            Te llamamos en menos de 15 minutos para confirmar
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            Validamos disponibilidad técnica en tu zona
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            Confirmamos fecha y hora de instalación
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            Técnico llega puntual con todo el equipo
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Confirmar y Enviar Solicitud
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Al confirmar aceptas que te contactemos para validar tu solicitud. No hay ningún compromiso de compra.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué contratar con nosotros?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Asesoría Experta</h3>
              <p className="text-gray-600">
                Nuestros asesores conocen todos los planes y te ayudan a elegir el mejor para ti
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Validación Instantánea</h3>
              <p className="text-gray-600">
                Verificamos cobertura real en tu dirección antes de comprometerte
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instalación Rápida</h3>
              <p className="text-gray-600">Coordinamos todo para que tengas internet en 24-48 horas</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
