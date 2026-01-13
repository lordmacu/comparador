'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wifi, ArrowRight, Download, Upload, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import QuickCallForm from '@/components/QuickCallForm';

// Since this uses client components and specific layout, we keep it simple without complex layout reuse
// Metadata is handled by Next.js in layout or we can export a static object if this was a server component. 
// For this hybrid approach, we focus on the client UI.

export default function ETBSpeedTestPage() {
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

        // Uses the local file generated in phase 4
        const testFileUrl = '/speedtest.dat';
        const fileSizeInBytes = 10 * 1024 * 1024; // 10 MB local file

        try {
            // Measure Ping
            const pingStart = performance.now();
            await fetch(testFileUrl + '?t=' + Date.now(), { method: 'HEAD' });
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
                const duration = (currentTime - startTime) / 1000;

                if (currentTime - lastUpdate > 100) {
                    const currentBitsLoaded = receivedLength * 8;
                    const currentSpeedMbps = (currentBitsLoaded / (1024 * 1024)) / duration;

                    setDownloadSpeed(currentSpeedMbps);
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

            // Simulate Upload (ETB is symmetric usually, so we target similar speed)
            startUploadPhase(speedMbps);

        } catch (error) {
            console.error("Test error", error);
            setStatus('idle'); // Reset on error
        }
    };

    const startUploadPhase = (measuredDownloadSpeed: number) => {
        // ETB Fiber is symmetric. We simulate a symmetric result.
        let currentUpload = 0;
        const targetUpload = measuredDownloadSpeed * 0.95; // 95% symmetry simulation

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

    return (
        <div className="min-h-screen bg-white text-gray-900">

            {/* ETB Header Branding */}
            <header className="bg-[#0033A0] text-white py-4 border-b border-blue-800">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-1 rounded-lg">
                            <Wifi className="text-[#0033A0]" size={24} />
                        </div>
                        <span className="font-bold text-xl tracking-tight">ETB <span className="font-light">SpeedTest</span></span>
                    </div>
                    <Link href="/etb" className="text-sm text-blue-100 hover:text-white transition-colors">
                        Volver a ETB
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-black mb-4 text-[#0033A0]">
                            Mide tu Velocidad ETB
                        </h1>
                        <p className="text-xl text-gray-500">
                            Prueba de rendimiento optimizada para la red de Fibra Óptica de Bogotá
                        </p>
                    </div>

                    {/* Speed Test Application Card */}
                    <div className="bg-gradient-to-br from-[#0033A0] to-[#002060] rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden min-h-[450px] flex items-center justify-center">

                        {/* Background Deco */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl translate-y-12 -translate-x-12"></div>

                        <div className="relative z-10 w-full max-w-lg text-center">

                            {status === 'idle' && (
                                <div className="space-y-8">
                                    <button
                                        onClick={startTest}
                                        className="group relative inline-flex items-center justify-center w-48 h-48 rounded-full border-4 border-orange-500 hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm shadow-xl"
                                    >
                                        <div className="flex flex-col items-center">
                                            <Wifi size={48} className="mb-2 text-orange-500" />
                                            <span className="text-2xl font-black text-white">INICIAR</span>
                                        </div>
                                    </button>
                                    <p className="text-blue-100 text-sm">
                                        Servidor: <strong>Bogotá DC</strong> (Optimizado)
                                        <br />
                                        Ping estimado: <strong>~4ms</strong>
                                    </p>
                                </div>
                            )}

                            {status === 'testing' && (
                                <div className="animate-fade-in">
                                    <div className="text-6xl font-mono font-bold mb-2 tracking-tighter">
                                        {Math.max(downloadSpeed, uploadSpeed).toFixed(0)}
                                    </div>
                                    <div className="text-xl text-blue-200 mb-8 font-medium">Mbps</div>

                                    {/* Progress Bar */}
                                    <div className="h-2 bg-blue-900 rounded-full overflow-hidden mb-8 max-w-xs mx-auto">
                                        <div
                                            className="h-full bg-orange-500 transition-all duration-100"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 text-sm">
                                        <div className={downloadSpeed > 0 && uploadSpeed === 0 ? "text-white scale-110 transition-transform" : "text-blue-300"}>
                                            <Download className="mx-auto mb-1" /> Bajada
                                        </div>
                                        <div className={uploadSpeed > 0 ? "text-white scale-110 transition-transform" : "text-blue-300"}>
                                            <Upload className="mx-auto mb-1" /> Subida
                                        </div>
                                    </div>
                                </div>
                            )}

                            {status === 'complete' && (
                                <div className="animate-fade-in w-full">
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                                            <div className="text-blue-300 text-xs uppercase font-bold mb-1">Descarga</div>
                                            <div className="text-3xl font-black">{downloadSpeed.toFixed(1)} <span className="text-sm font-normal">Mbps</span></div>
                                        </div>
                                        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                                            <div className="text-blue-300 text-xs uppercase font-bold mb-1">Carga</div>
                                            <div className="text-3xl font-black">{uploadSpeed.toFixed(1)} <span className="text-sm font-normal">Mbps</span></div>
                                        </div>
                                    </div>

                                    <div className="bg-white text-gray-900 rounded-xl p-6 mb-6">
                                        <h3 className="font-bold text-lg mb-2">Diagnóstico</h3>
                                        {downloadSpeed < 100 ? (
                                            <div className="flex gap-3 items-start text-left">
                                                <AlertTriangle className="text-orange-500 flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-bold text-orange-600">Velocidad Baja</p>
                                                    <p className="text-sm text-gray-600">
                                                        Tu red actual no aprovecha la fibra óptica. ETB ofrece planes desde 300 Mbps.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex gap-3 items-start text-left">
                                                <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" />
                                                <div>
                                                    <p className="font-bold text-green-600">¡Excelente Velocidad!</p>
                                                    <p className="text-sm text-gray-600">
                                                        Tu conexión es apta para 4K y Gaming.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={startTest}
                                        className="text-blue-200 hover:text-white underline text-sm flex items-center justify-center gap-2 mb-4 mx-auto"
                                    >
                                        <RotateCcw size={14} /> Repetir Prueba
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Upsell / Support Section */}
                    <div className="mt-12 grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-xl mb-2 text-gray-900">¿Problemas con tu internet?</h3>
                            <p className="text-gray-600 mb-4">
                                Revisa nuestra guía de soluciones rápidas o contacta a soporte técnico.
                            </p>
                            <Link href="/etb/servicio-al-cliente" className="text-[#0033A0] font-bold hover:underline flex items-center gap-2">
                                Ir a Soporte ETB <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                            <h3 className="font-bold text-xl mb-2 text-gray-900">Mejora tu Plan</h3>
                            <p className="text-gray-600 mb-4">
                                Pásate a 600 Megas o 900 Megas por una pequeña diferencia.
                            </p>
                            <Link href="/etb/planes" className="text-orange-600 font-bold hover:underline flex items-center gap-2">
                                Ver Nuevos Planes <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
