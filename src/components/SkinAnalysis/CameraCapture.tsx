import React, { useRef, useState, useCallback } from "react";
import { Camera, RefreshCw, Check, X, Upload } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface CameraCaptureProps {
  onCapture: (base64Image: string) => void;
  onCancel: () => void;
}

export default function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 1080 }, height: { ideal: 1080 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsReady(true);
      }
    } catch (err) {
      console.error("Camera access error:", err);
    }
  }, []);

  React.useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 400, 400);
        const dataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const retake = () => {
    setCapturedImage(null);
  };

  const confirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center">
      <div className="relative w-full aspect-square max-w-md mt-20 overflow-hidden bg-gray-900 flex items-center justify-center">
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover mirror"
            />
            <div className="absolute inset-0 border-2 border-white/30 rounded-full m-8 pointer-events-none" />
          </>
        ) : (
          <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
        )}
        <canvas ref={canvasRef} width={400} height={400} className="hidden" />
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />

      <div className="mt-12 flex items-center gap-8">
        {!capturedImage ? (
          <>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <Upload size={24} />
            </button>
            <button
              onClick={capture}
              disabled={!isReady}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform disabled:opacity-50"
            >
              <div className="w-16 h-16 border-2 border-black rounded-full" />
            </button>
            <button
              onClick={onCancel}
              className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={retake}
              className="flex flex-col items-center gap-2 text-white"
            >
              <div className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <RefreshCw size={24} />
              </div>
              <span className="text-xs">Retake</span>
            </button>
            <button
              onClick={confirm}
              className="flex flex-col items-center gap-2 text-white"
            >
              <div className="p-4 bg-rose-500 rounded-full hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20">
                <Check size={24} />
              </div>
              <span className="text-xs">Confirm</span>
            </button>
          </>
        )}
      </div>

      <p className="mt-8 text-white/60 text-sm px-8 text-center max-w-sm">
        {!capturedImage 
          ? "Scan with your camera or upload a photo for analysis." 
          : "Looking good! Proceed with this photo for analysis?"}
      </p>

      <style dangerouslySetInnerHTML={{ __html: `.mirror { transform: scaleX(-1); }` }} />
    </div>
  );
}
