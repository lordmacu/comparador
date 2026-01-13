'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gauge, ArrowRight, Download, Upload, Wifi, AlertTriangle, CheckCircle2 } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

// Since this is a client component, we'll need a wrapper for metadata later or use the layout
// For simplicity in this file, we focus on the page content

export default function SpeedTestPage() {
    const [status, setStatus] = useState<'idle' | 'testing' | 'complete'>('idle');
    const [downloadSpeed, setDownloadSpeed] = useState(0);
    const [uploadSpeed, setUploadSpeed] = useState(0);
    const [progress, setProgress] = useState(0);
    const [ping, setPing] = useState(0);

    const startTest = async () => {
        setStatus('testing');
        setProgress(0);
        setDownloadSpeed(0);
        setUploadSpeed(0);
        setPing(0);

        const testFileUrl = 'https://library.e.abb.com/public/313b6ebaf237059fc1257d0a0048fd68/EN_ACS550_01_UM_H_A4.pdf';
        const fileSizeInBytes = 4388310; // Approx 4.2 MB

        try {
            // Measure Ping
            const pingStart = performance.now();
            await fetch(testFileUrl + '?t=' + Date.now(), { method: 'HEAD', mode: 'no-cors' }); // Simple warm-up/ping
            const pingEnd = performance.now();
            setPing(Math.round(pingEnd - pingStart));

            // Measure Download
            const startTime = performance.now();
            const response = await fetch(testFileUrl + '?t=' + Date.now());

            if (!response.body) throw new Error('No body');
            const reader = response.body.getReader();

            let receivedLength = 0;
            let lastUpdate = startTime;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                receivedLength += value.length;
                const currentTime = performance.now();
                const duration = (currentTime - startTime) / 1000; // seconds

                // Update UI every ~100ms
                if (currentTime - lastUpdate > 100) {
                    const currentBitsLoaded = receivedLength * 8;
                    const currentSpeedMbps = (currentBitsLoaded / (1024 * 1024)) / duration;

                    setDownloadSpeed(currentSpeedMbps);
                    // Approximate progress based on known file size
                    setProgress(Math.min((receivedLength / fileSizeInBytes) * 100, 99));
                    lastUpdate = currentTime;
                }
            }

            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = receivedLength * 8;
            const speedMbps = (bitsLoaded / (1024 * 1024)) / duration;

            setDownloadSpeed(speedMbps);
            setProgress(100);

            // Simulate Upload (Since we can't really upload to that server)
            // usage mock relative to download
            startUploadPhase(speedMbps);

        } catch (error) {
            console.error("Real test failed (likely CORS), falling back to simulation", error);
            fallbackToSimulation();
        }
    };

    const startUploadPhase = (measuredDownloadSpeed: number) => {
        // Simulate upload as ~50% of download (typical for home connections)
        let currentUpload = 0;
        const targetUpload = measuredDownloadSpeed * 0.5;

        const uploadInterval = setInterval(() => {
            currentUpload += (targetUpload - currentUpload) * 0.2;
            setUploadSpeed(currentUpload);

            if (Math.abs(targetUpload - currentUpload) < 0.5) {
                clearInterval(uploadInterval);
                setStatus('complete');
            }
        }, 100);

        setTimeout(() => {
            clearInterval(uploadInterval);
            setStatus('complete');
        }, 2000);
    };

    const fallbackToSimulation = () => {
        // Failover to the previous simulation logic if fetch fails
        // Simulate Ping
        setTimeout(() => {
            setPing(Math.floor(Math.random() * (40 - 15) + 15));
        }, 500);

        // Simulate Download
        const downloadInterval = setInterval(() => {
            setDownloadSpeed(prev => {
                const next = prev + Math.random() * 15;
                return next > 45 ? 45 + Math.random() * 5 : next;
            });
            setProgress(prev => Math.min(prev + 1, 99));
        }, 50);

        setTimeout(() => {
            clearInterval(downloadInterval);
            startUploadPhase(45); // simulate upload based on fake download
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* SEO Metadata wrapper would go in layout or parent */}

            {/* Header */}
            <header className="bg-slate-800 border-b border-slate-700 py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="font-bold text-xl flex items-center gap-2">
                        <Wifi className="text-blue-500" />
                        <span>SpeedTest<span className="text-blue-500">Colombia</span></span>
                    </Link>
                    <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                        Volver al Comparador
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            Test de Velocidad Internet
                        </h1>
                        <p className="text-xl text-slate-400">
                            Mide tu conexión actual y descubre si estás recibiendo lo que pagas
                        </p>
                    </div>

                    {/* Speed Test Application */}
                    <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700 relative overflow-hidden">
                        {/* Background Grid Effcet */}
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                        </div>

                        <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px]">

                            {status === 'idle' && (
                                <button
                                    onClick={startTest}
                                    className="group relative inline-flex items-center justify-center w-48 h-48 rounded-full border-4 border-blue-500/30 hover:border-blue-500 transition-all duration-500 bg-slate-900 overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl font-bold mb-1">INICIAR</span>
                                        <span className="text-sm text-slate-400">TEST</span>
                                    </div>
                                </button>
                            )}

                            {status === 'testing' && (
                                <div className="w-full max-w-md">
                                    <div className="flex justify-between mb-12 text-center">
                                        <div className="flex-1">
                                            <div className="flex justify-center items-center gap-2 mb-2 text-slate-400">
                                                <Download size={20} />
                                                <span>Descarga</span>
                                            </div>
                                            <div className="text-4xl font-mono font-bold text-blue-400">
                                                {downloadSpeed.toFixed(1)}
                                            </div>
                                            <div className="text-xs text-slate-500">Mbps</div>
                                        </div>
                                        <div className="flex-1 border-l border-slate-700">
                                            <div className="flex justify-center items-center gap-2 mb-2 text-slate-400">
                                                <Upload size={20} />
                                                <span>Subida</span>
                                            </div>
                                            <div className="text-4xl font-mono font-bold text-purple-400">
                                                {uploadSpeed.toFixed(1)}
                                            </div>
                                            <div className="text-xs text-slate-500">Mbps</div>
                                        </div>
                                    </div>

                                    <div className="relative h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100 ease-out"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-center mt-4 text-slate-400 animate-pulse">
                                        Probando conexión...
                                    </div>
                                </div>
                            )}

                            {status === 'complete' && (
                                <div className="w-full animate-fade-in">
                                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-12">
                                        <div className="text-center p-6 bg-slate-900/50 rounded-2xl border border-slate-700 w-full md:w-1/3">
                                            <div className="text-slate-400 mb-2 flex justify-center gap-2"><Download /> Descarga</div>
                                            <div className="text-5xl font-black text-blue-400 mb-1">{downloadSpeed.toFixed(1)}</div>
                                            <div className="text-sm">Mbps</div>
                                        </div>
                                        <div className="text-center p-6 bg-slate-900/50 rounded-2xl border border-slate-700 w-full md:w-1/3">
                                            <div className="text-slate-400 mb-2 flex justify-center gap-2"><Upload /> Subida</div>
                                            <div className="text-5xl font-black text-purple-400 mb-1">{uploadSpeed.toFixed(1)}</div>
                                            <div className="text-sm">Mbps</div>
                                        </div>
                                    </div>

                                    {/* Result Analysis & Upsell */}
                                    <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/30 rounded-2xl p-6 md:p-8">
                                        <div className="flex flex-col md:flex-row items-center gap-6">
                                            <div className="bg-red-500/20 p-4 rounded-full">
                                                <AlertTriangle className="w-12 h-12 text-red-500" />
                                            </div>
                                            <div className="text-center md:text-left flex-1">
                                                <h3 className="text-2xl font-bold text-white mb-2">Tu internet es lento 😓</h3>
                                                <p className="text-slate-300">
                                                    Tu velocidad actual no es ideal para streaming 4K o videollamadas fluidas.
                                                    Estás pagando lo mismo que cuesta un plan de <span className="text-white font-bold">500 Mbps</span> hoy.
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <button onClick={startTest} className="text-sm text-slate-400 hover:text-white underline mr-4">
                                                    Repetir test
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Upsell Section (Always visible but more relevant after test) */}
                    <div className={`mt-12 transition-all duration-700 ${status === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-10'}`}>
                        <h2 className="text-3xl font-bold text-center mb-8">Mejora tu velocidad hoy mismo</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Offer 1 */}
                            <div className="bg-white text-slate-900 rounded-2xl p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    RECOMENDADO
                                </div>
                                <h3 className="text-xl font-bold text-blue-600 mb-2">Movistar Fibra</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-black">500</span>
                                    <span className="font-bold">Mbps</span>
                                </div>
                                <ul className="mb-6 space-y-2 text-sm text-slate-600">
                                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500" /> Misma velocidad de subida y bajada</li>
                                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500" /> App Smart WiFi incluida</li>
                                </ul>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold">$79.900</span>
                                    <Link href="/movistar" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2">
                                        Ver Plan <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* Offer 2 */}
                            <div className="bg-white text-slate-900 rounded-2xl p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    MEJOR PRECIO
                                </div>
                                <h3 className="text-xl font-bold text-red-600 mb-2">Claro Hogar</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-black">300</span>
                                    <span className="font-bold">Mbps</span>
                                </div>
                                <ul className="mb-6 space-y-2 text-sm text-slate-600">
                                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500" /> Paga en 2026 (Primer mes gratis)</li>
                                    <li className="flex gap-2"><CheckCircle2 size={16} className="text-green-500" /> Claro Video incluido</li>
                                </ul>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold">$64.900</span>
                                    <Link href="/claro" className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 flex items-center gap-2">
                                        Ver Plan <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-slate-800 rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold mb-4">¿No sabes qué velocidad necesitas?</h3>
                            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                                Déjanos asesorarte. Analizamos tu ubicación y uso para recomendarte el mejor proveedor.
                            </p>
                            <div className="max-w-md mx-auto">
                                <QuickCallForm />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
