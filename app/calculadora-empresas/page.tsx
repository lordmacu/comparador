'use client';

import { useState } from 'react';
import Link from 'next/link';
import QuickCallForm from '@/components/QuickCallForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import LastUpdated from '@/components/LastUpdated';
import {
  Calculator, Users, Wifi, Monitor, Server, Video, Briefcase,
  Building, TrendingUp, CheckCircle, AlertCircle, CreditCard,
  Phone, Cloud, Shield, Camera
} from 'lucide-react';

export default function CalculadoraEmpresasPage() {
  const [empleados, setEmpleados] = useState(10);
  const [usos, setUsos] = useState<string[]>([]);
  const [tipoNegocio, setTipoNegocio] = useState<string>('oficina');
  const [resultado, setResultado] = useState<{
    velocidadMin: number;
    velocidadRec: number;
    planTipo: string;
    razon: string;
    necesitaIPFija: boolean;
    necesitaSLA: boolean;
    planes: Array<{ nombre: string; velocidad: string; precio: string; caracteristicas: string[]; link: string; destacado?: boolean }>;
  } | null>(null);

  const tiposNegocio = [
    { id: 'oficina', label: 'Oficina / Coworking', icon: Building, multiplicador: 1.2 },
    { id: 'local', label: 'Local Comercial / Tienda', icon: CreditCard, multiplicador: 1.0 },
    { id: 'restaurante', label: 'Restaurante / Cafetería', icon: Monitor, multiplicador: 1.1 },
    { id: 'consultorio', label: 'Consultorio / Clínica', icon: Shield, multiplicador: 1.3 },
    { id: 'hotel', label: 'Hotel / Hostal', icon: Briefcase, multiplicador: 1.5 },
  ];

  const usosDisponibles = [
    { id: 'pos', label: 'Punto de Venta / Datáfono', icon: CreditCard, mbps: 10, requiereIPFija: false },
    { id: 'facturacion', label: 'Facturación Electrónica DIAN', icon: Server, mbps: 15, requiereIPFija: true },
    { id: 'videoconferencias', label: 'Videoconferencias (Teams/Zoom)', icon: Video, mbps: 30, requiereIPFija: false },
    { id: 'voip', label: 'Telefonía IP / VoIP', icon: Phone, mbps: 20, requiereIPFija: true },
    { id: 'cloud', label: 'Software en la Nube (ERP/CRM)', icon: Cloud, mbps: 25, requiereIPFija: false },
    { id: 'camaras', label: 'Cámaras de Seguridad IP', icon: Camera, mbps: 40, requiereIPFija: true },
    { id: 'servidor', label: 'Servidor Local / VPN', icon: Server, mbps: 50, requiereIPFija: true },
    { id: 'backup', label: 'Respaldos en la Nube', icon: TrendingUp, mbps: 35, requiereIPFija: false },
  ];

  const toggleUso = (usoId: string) => {
    setUsos(prev =>
      prev.includes(usoId)
        ? prev.filter(u => u !== usoId)
        : [...prev, usoId]
    );
  };

  const calcularVelocidad = () => {
    const tipoSeleccionado = tiposNegocio.find(t => t.id === tipoNegocio);
    const multiplicador = tipoSeleccionado?.multiplicador || 1;

    // Cálculo base por empleado (más exigente que hogares)
    let velocidadBase = empleados * 15;

    // Sumar velocidad por uso
    let velocidadPorUsos = 0;
    let requiereIPFija = false;

    usos.forEach(usoId => {
      const uso = usosDisponibles.find(u => u.id === usoId);
      if (uso) {
        velocidadPorUsos += uso.mbps;
        if (uso.requiereIPFija) requiereIPFija = true;
      }
    });

    // Aplicar multiplicador del tipo de negocio
    const velocidadTotal = (velocidadBase + velocidadPorUsos) * multiplicador;

    // Velocidad mínima y recomendada
    const velocidadMin = Math.ceil(velocidadTotal / 50) * 50;
    const velocidadRec = Math.ceil(velocidadMin * 1.4 / 100) * 100;

    // Determinar si necesita SLA
    const necesitaSLA = empleados > 15 || usos.includes('servidor') || usos.includes('voip') || usos.includes('facturacion');

    // Determinar tipo de plan
    let planTipo = 'PyME Básico';
    if (velocidadRec >= 500 || necesitaSLA) {
      planTipo = 'Empresarial con SLA';
    } else if (velocidadRec >= 300 || requiereIPFija) {
      planTipo = 'PyME Avanzado';
    }

    // Razón
    let razon = '';
    if (velocidadRec <= 200) {
      razon = `Negocio pequeño con ${empleados} empleados. Suficiente para operación básica, navegación y comunicaciones.`;
    } else if (velocidadRec <= 300) {
      razon = `Negocio mediano con necesidades digitales moderadas. Recomendamos IP fija si manejas facturación electrónica o VPN.`;
    } else if (velocidadRec <= 500) {
      razon = `Operación intensiva digital. Necesitas conexión estable para ${usos.length} servicios críticos simultáneos.`;
    } else {
      razon = `Operación empresarial exigente. Recomendamos canal dedicado o semi-dedicado con SLA para garantizar disponibilidad.`;
    }

    // Planes sugeridos
    const planes = [];

    if (velocidadRec <= 200) {
      planes.push(
        { nombre: 'Emprendedor ETB', velocidad: '200 Mbps', precio: '$89.900/mes', caracteristicas: ['IP Dinámica', 'Soporte en horario laboral', 'Instalación gratis'], link: '/etb', destacado: false },
        { nombre: 'PyME Claro', velocidad: '200 Mbps', precio: '$95.900/mes', caracteristicas: ['Router empresarial', 'Soporte telefónico preferencial'], link: '/claro', destacado: true },
        { nombre: 'Negocio Movistar', velocidad: '200 Mbps', precio: '$92.000/mes', caracteristicas: ['WiFi Mesh incluido', 'App de gestión'], link: '/movistar', destacado: false }
      );
    } else if (velocidadRec <= 300) {
      planes.push(
        { nombre: 'Negocios ETB', velocidad: '300 Mbps', precio: '$119.900/mes', caracteristicas: ['1 IP Fija incluida', 'Soporte prioritario', 'Fibra simétrica'], link: '/etb', destacado: false },
        { nombre: 'PyME Pro Claro', velocidad: '300 Mbps', precio: '$129.900/mes', caracteristicas: ['1 IP Fija', 'Respuesta < 24h', 'Router WiFi 6'], link: '/claro', destacado: true },
        { nombre: 'Empresas Movistar', velocidad: '300 Mbps', precio: '$125.000/mes', caracteristicas: ['IP Fija', 'Portal empresarial', 'Soporte dedicado'], link: '/movistar', destacado: false }
      );
    } else if (velocidadRec <= 500) {
      planes.push(
        { nombre: 'Corporativo ETB', velocidad: '500 Mbps', precio: '$169.900/mes', caracteristicas: ['1 IP Fija', 'SLA 99.5%', 'Soporte en sitio < 8h'], link: '/etb', destacado: false },
        { nombre: 'Negocios Pro Claro', velocidad: '500 Mbps', precio: '$179.900/mes', caracteristicas: ['IP Fija', 'Priorización de tráfico', 'Ingeniero asignado'], link: '/claro', destacado: true },
        { nombre: 'Fusión Empresas Movistar', velocidad: '600 Mbps', precio: '$185.000/mes', caracteristicas: ['2 IP Fijas', 'Líneas móviles incluidas', 'SLA garantizado'], link: '/movistar', destacado: false }
      );
    } else {
      planes.push(
        { nombre: 'Dedicado ETB', velocidad: '1 Gbps', precio: 'Desde $350.000/mes', caracteristicas: ['Canal 1:1', 'SLA 99.9%', 'Soporte NOC 24/7', 'Múltiples IPs'], link: '/internet-empresas-pymes#planes-dedicados', destacado: false },
        { nombre: 'Empresarial Premium Claro', velocidad: '1 Gbps', precio: 'Desde $380.000/mes', caracteristicas: ['Reuso 1:4', 'Backup 4G incluido', 'SLA 99.7%'], link: '/claro', destacado: true },
        { nombre: 'Corporativo Movistar', velocidad: '1 Gbps', precio: 'Desde $400.000/mes', caracteristicas: ['Fibra dedicada', 'Gerente de cuenta', 'SLA premium'], link: '/movistar', destacado: false }
      );
    }

    setResultado({
      velocidadMin,
      velocidadRec,
      planTipo,
      razon,
      necesitaIPFija: requiereIPFija,
      necesitaSLA,
      planes
    });

    setTimeout(() => {
      document.getElementById('resultado')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-blue-400/30">
            <Building className="w-4 h-4" />
            <span>Herramienta para Empresas</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Calculadora de Internet Empresarial
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Descubre qué velocidad y tipo de plan necesita tu negocio según empleados, tipo de empresa y servicios que usas
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">PyMEs</div>
              <div className="text-sm text-slate-300">1-50 empleados</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">IP Fija</div>
              <div className="text-sm text-slate-300">Cuando la necesitas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">SLA</div>
              <div className="text-sm text-slate-300">Garantía de servicio</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold">2026</div>
              <div className="text-sm text-slate-300">Precios actuales</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Empresas', url: 'https://comparadorinternet.co/internet-empresas-pymes' },
            { name: 'Calculadora Empresarial', url: 'https://comparadorinternet.co/calculadora-empresas' }
          ]}
        />

        <LastUpdated
          date="2026-01-21"
          nextReview="2026-02-21"
          message="Algoritmo actualizado con tarifas empresariales enero 2026"
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Calculadora */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              Calcula el Internet Ideal para tu Negocio
            </h2>

            {/* Tipo de Negocio */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                1. ¿Qué tipo de negocio tienes?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {tiposNegocio.map((tipo) => {
                  const Icon = tipo.icon;
                  const isSelected = tipoNegocio === tipo.id;
                  return (
                    <button
                      key={tipo.id}
                      onClick={() => setTipoNegocio(tipo.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                      <div className={`text-sm font-medium ${isSelected ? 'text-blue-900' : 'text-slate-600'}`}>
                        {tipo.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Número de Empleados */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                2. ¿Cuántos empleados usan internet?
              </label>
              <div className="flex items-center gap-6">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={empleados}
                  onChange={(e) => setEmpleados(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="bg-slate-900 text-white rounded-xl px-6 py-3 text-xl font-bold min-w-[100px] text-center">
                  {empleados}
                </div>
              </div>
              <div className="flex justify-between text-sm text-slate-500 mt-2">
                <span>1 empleado</span>
                <span>50+ empleados</span>
              </div>
            </div>

            {/* Usos Empresariales */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-blue-600" />
                3. ¿Qué servicios usa tu negocio? (Selecciona todos)
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {usosDisponibles.map((uso) => {
                  const Icon = uso.icon;
                  const isSelected = usos.includes(uso.id);
                  return (
                    <button
                      key={uso.id}
                      onClick={() => toggleUso(uso.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <div className="flex-1">
                          <div className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                            {uso.label}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>+{uso.mbps} Mbps</span>
                            {uso.requiereIPFija && (
                              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-medium">
                                Requiere IP Fija
                              </span>
                            )}
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botón Calcular */}
            <button
              onClick={calcularVelocidad}
              disabled={usos.length === 0}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                usos.length === 0
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {usos.length === 0 ? 'Selecciona al menos un servicio' : 'Calcular Plan Recomendado'}
            </button>
          </div>

          {/* Resultado */}
          {resultado && (
            <div id="resultado" className="mt-8 bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-2xl p-8 text-white">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-green-500/30">
                  <CheckCircle className="w-4 h-4" />
                  Análisis Completado
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  Recomendación para tu Negocio
                </h3>
                <p className="text-slate-300">
                  {tiposNegocio.find(t => t.id === tipoNegocio)?.label} con {empleados} empleados
                </p>
              </div>

              {/* Métricas principales */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="text-sm text-slate-400 mb-2">Velocidad Mínima</div>
                  <div className="text-3xl font-bold text-white mb-1">{resultado.velocidadMin} Mbps</div>
                  <div className="text-sm text-slate-400">Para operación básica</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg">
                  <div className="text-sm text-blue-100 mb-2">Velocidad Recomendada</div>
                  <div className="text-3xl font-bold mb-1">{resultado.velocidadRec} Mbps</div>
                  <div className="text-sm text-blue-100">Para óptimo rendimiento</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="text-sm text-slate-400 mb-2">Tipo de Plan</div>
                  <div className="text-xl font-bold text-white mb-1">{resultado.planTipo}</div>
                  <div className="text-sm text-slate-400">Categoría sugerida</div>
                </div>
              </div>

              {/* Alertas de IP Fija y SLA */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {resultado.necesitaIPFija && (
                  <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                    <Server className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-amber-200">Necesitas IP Fija</div>
                      <div className="text-sm text-amber-300/80">
                        Tus servicios (facturación, VPN, cámaras) requieren IP pública fija para funcionar correctamente.
                      </div>
                    </div>
                  </div>
                )}
                {resultado.necesitaSLA && (
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
                    <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-blue-200">Recomendamos SLA</div>
                      <div className="text-sm text-blue-300/80">
                        Tu operación es crítica. Un SLA te garantiza disponibilidad y tiempos de respuesta.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Razón */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                  ¿Por qué esta recomendación?
                </h4>
                <p className="text-slate-300">{resultado.razon}</p>
              </div>

              {/* Planes Sugeridos */}
              <h4 className="text-2xl font-bold mb-6">Planes Empresariales Recomendados</h4>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {resultado.planes.map((plan, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-6 transition-all ${
                      plan.destacado
                        ? 'bg-white text-slate-900 shadow-xl scale-105'
                        : 'bg-white/10 border border-white/10'
                    }`}
                  >
                    {plan.destacado && (
                      <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
                        RECOMENDADO
                      </div>
                    )}
                    <h5 className={`text-lg font-bold mb-2 ${plan.destacado ? 'text-slate-900' : 'text-white'}`}>
                      {plan.nombre}
                    </h5>
                    <div className={`text-2xl font-bold mb-1 ${plan.destacado ? 'text-blue-600' : 'text-blue-400'}`}>
                      {plan.velocidad}
                    </div>
                    <div className={`text-lg mb-4 ${plan.destacado ? 'text-slate-600' : 'text-slate-300'}`}>
                      {plan.precio}
                    </div>
                    <ul className="space-y-2 mb-4">
                      {plan.caracteristicas.map((car, i) => (
                        <li key={i} className={`text-sm flex items-center gap-2 ${plan.destacado ? 'text-slate-600' : 'text-slate-300'}`}>
                          <CheckCircle className={`w-4 h-4 ${plan.destacado ? 'text-green-600' : 'text-green-400'}`} />
                          {car}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={plan.link}
                      className={`block text-center font-semibold py-2 px-4 rounded-lg transition-colors ${
                        plan.destacado
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                    >
                      Ver Plan
                    </Link>
                  </div>
                ))}
              </div>

              {/* CTA de Contacto */}
              <div className="bg-white rounded-xl p-6 text-slate-900">
                <h4 className="font-bold text-lg mb-4 text-center">
                  ¿Necesitas una Cotización Personalizada?
                </h4>
                <p className="text-center text-slate-600 mb-4">
                  Nuestros asesores empresariales te envían propuestas de ETB, Claro y Movistar según tu ubicación
                </p>
                <QuickCallForm buttonColor="#1e40af" provider="Empresas" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sección Educativa */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            ¿Qué Diferencia el Internet Empresarial del Residencial?
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Los planes de hogar no están diseñados para operaciones comerciales. Conoce las diferencias clave.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="font-bold text-lg text-red-900 mb-4">Internet Residencial</h3>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  Reuso 1:10 o 1:20 (compartes con vecinos)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  IP dinámica (cambia frecuentemente)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  Soporte en 24-72 horas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  Sin SLA ni garantías de disponibilidad
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  Velocidad de subida limitada
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-lg text-green-900 mb-4">Internet Empresarial</h3>
              <ul className="space-y-3 text-green-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Reuso bajo (1:4) o dedicado (1:1)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  IP Fija pública incluida
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Soporte prioritario en 4-8 horas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  SLA con compensación por caídas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Velocidad simétrica (subida = bajada)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-slate-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Preguntas Frecuentes sobre Internet Empresarial
          </h2>
          <div className="space-y-4">
            {[
              {
                q: '¿Cuándo necesito IP Fija?',
                a: 'Necesitas IP Fija si: usas facturación electrónica DIAN, tienes cámaras de seguridad IP que quieres ver remotamente, manejas un servidor local, necesitas VPN para acceso remoto, o usas telefonía VoIP.'
              },
              {
                q: '¿Qué es un SLA y por qué lo necesito?',
                a: 'SLA (Service Level Agreement) es un contrato que garantiza disponibilidad mínima (ej: 99.5%) y tiempos de respuesta ante fallas. Si tu internet se cae, el operador está obligado a reparar en horas, no días. Es crítico si tu negocio depende del internet para facturar.'
              },
              {
                q: '¿Qué diferencia hay entre reuso 1:1 y 1:10?',
                a: 'El reuso indica cuántos clientes comparten tu canal. En reuso 1:10, compartes con 9 clientes más (típico residencial). En reuso 1:1 (dedicado), toda la velocidad es exclusiva para ti. Para operaciones críticas, busca mínimo 1:4.'
              },
              {
                q: '¿Puedo usar internet residencial para mi negocio pequeño?',
                a: 'Técnicamente sí, pero no es recomendable si: facturas electrónicamente, recibes pagos con datáfono frecuentemente, o tienes más de 5 empleados. Una caída de internet puede costarte más que la diferencia mensual del plan empresarial.'
              },
              {
                q: '¿Los precios incluyen IVA?',
                a: 'Los precios mostrados son de referencia y generalmente no incluyen IVA para planes empresariales. Solicita cotización formal para conocer el precio exacto según tu ubicación y necesidades.'
              }
            ].map((faq, index) => (
              <details key={index} className="bg-white rounded-xl shadow-sm border border-slate-200">
                <summary className="p-4 cursor-pointer font-semibold hover:bg-slate-50 rounded-xl">
                  {faq.q}
                </summary>
                <div className="p-4 pt-0 text-slate-700">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Links a otras páginas */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Soluciones por Tipo de Negocio
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/internet-oficinas-bogota" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group">
              <Building className="w-10 h-10 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">Internet para Oficinas</h3>
              <p className="text-slate-600 text-sm">Soluciones para oficinas y coworkings en Bogotá</p>
            </Link>
            <Link href="/internet-locales-comerciales" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group">
              <CreditCard className="w-10 h-10 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">Locales Comerciales</h3>
              <p className="text-slate-600 text-sm">Internet para tiendas, boutiques y comercios</p>
            </Link>
            <Link href="/internet-restaurantes-bogota" className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 group">
              <Monitor className="w-10 h-10 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">Restaurantes y Cafés</h3>
              <p className="text-slate-600 text-sm">Conectividad para hostelería y food service</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para Conectar tu Negocio?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Recibe cotizaciones de los 3 principales operadores empresariales en Bogotá
          </p>
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <QuickCallForm buttonColor="#3b82f6" provider="Empresas" />
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculadora de Internet Empresarial',
            description: 'Herramienta para calcular qué velocidad y tipo de plan de internet necesita tu empresa o PyME en Colombia',
            url: 'https://comparadorinternet.co/calculadora-empresas',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'COP'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '420'
            }
          }),
        }}
      />
    </div>
  );
}
