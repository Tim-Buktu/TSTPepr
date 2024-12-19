"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { PatchOption, UpcycleState } from "@/types/upcycle";
import { formatPrice } from "@/config/pants-config";
import { useRouter } from "next/navigation";
import { navigateToCheckout, formatToIDR } from "@/lib/checkout";

const PATCH_OPTIONS: PatchOption[] = [
  { id: "dinosaur", image: "/patches/dinosaur.png", price: 50000 },
  { id: "clover", image: "/patches/clover.png", price: 50000 },
  { id: "star", image: "/patches/star.png", price: 50000 },
  { id: "sparkles", image: "/patches/sparkles.png", price: 50000 },
  { id: "turtle", image: "/patches/turtle.png", price: 50000 },
  { id: "sun", image: "/patches/sun.png", price: 50000 },
  { id: "stars", image: "/patches/stars.png", price: 50000 },
  { id: "lips", image: "/patches/lips.png", price: 50000 },
];

interface DragPosition {
  x: number;
  y: number;
  scale: number;
}

export function UpcycleConfigurator() {
  const router = useRouter();
  const [state, setState] = useState<UpcycleState>({
    selectedPatch: null,
    customPatch: null,
  });
  const [position, setPosition] = useState<DragPosition | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePatchSelect = (patchId: string) => {
    setState({ selectedPatch: patchId, customPatch: null });
    setPosition(null);
    setUploadedImage(null);
  };

  const handleCustomPatchUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setUploadedImage(result);
          setState({ selectedPatch: null, customPatch: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Keep patch within bounds (48px is half of 96px)
    const maxX = rect.width - 48;
    const maxY = rect.height - 48;

    setPosition({
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
      scale: 0.5, // Set scale to 50%
    });
  };

  const handleDrop = () => {
    // We only need to prevent the default behavior
    // No need for the event parameter if we're not using it
  };

  const adjustPatchSize = (increase: boolean) => {
    if (!position) return;
    const newScale = increase
      ? Math.min(position.scale + 0.1, 1.0)
      : Math.max(position.scale - 0.1, 0.3);
    setPosition({ ...position, scale: newScale });
  };

  const calculateTotal = () => {
    if (!position) return 0;
    const basePrice = state.customPatch ? 70000 : 50000;
    return basePrice;
  };

  const handleBuyNow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!position) return;

      await navigateToCheckout(router, {
        productName: "Upcycled Custom Pants",
        price: calculateTotal(),
        quantity: 1,
        imageUrl: uploadedImage || "/pants-preview.jpg",
      });
    } catch (error: unknown) {
      console.error('Navigation error:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side - Preview */}
        <div className="hidden md:block relative">
          <div className="sticky top-24 w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="relative w-full max-w-xl mx-auto">
                <div
                  ref={previewRef}
                  className="aspect-[3/4] relative rounded-lg overflow-hidden bg-gray-50"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <Image
                    src="/preview.png"
                    alt="Pants Preview"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {/* Patch Preview */}
                  {(state.selectedPatch || uploadedImage) && position && (
                    <div
                      className="absolute transition-all duration-200"
                      style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        width: `${96 * position.scale}px`,
                        height: `${96 * position.scale}px`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Image
                        src={
                          uploadedImage ||
                          PATCH_OPTIONS.find(
                            (p) => p.id === state.selectedPatch
                          )?.image ||
                          ""
                        }
                        alt="Patch"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 pointer-events-none border border-gray-200 rounded-lg" />
              </div>
              {position && (
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={() => adjustPatchSize(false)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  >
                    Decrease Size
                  </button>
                  <button
                    onClick={() => adjustPatchSize(true)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  >
                    Increase Size
                  </button>
                </div>
              )}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Drag and drop patch to position
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Controls */}
        <div className="md:col-start-2">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-8">
              Customize Your Patch
            </h3>

            {/* Patch Selection */}
            <div className="mb-8">
              <h4 className="font-medium text-lg mb-6">
                Select and Drag a Patch
              </h4>
              <div className="grid grid-cols-4 gap-4">
                {PATCH_OPTIONS.map((patch) => (
                  <div
                    key={patch.id}
                    draggable
                    onClick={() => handlePatchSelect(patch.id)}
                    className={`p-3 rounded-xl border-2 transition-all cursor-grab active:cursor-grabbing ${
                      state.selectedPatch === patch.id
                        ? "border-burgundy-600 bg-burgundy-50"
                        : "border-gray-200 hover:border-burgundy-300"
                    }`}
                  >
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image
                        src={patch.image}
                        alt={patch.id}
                        fill
                        className="object-contain pointer-events-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">Rp 50.000/Patch</p>
            </div>

            {/* Custom Upload with Preview */}
            <div className="mb-8">
              <h4 className="font-medium text-lg mb-4">
                Upload Your Own Design
              </h4>
              {uploadedImage ? (
                <div className="mb-4">
                  <div
                    draggable
                    className="relative aspect-square w-32 mx-auto border-2 border-burgundy-600 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
                  >
                    <Image
                      src={uploadedImage}
                      alt="Uploaded design"
                      fill
                      className="object-contain pointer-events-none"
                    />
                  </div>
                  <div className="flex justify-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        setUploadedImage(null);
                        setState((prev) => ({ ...prev, customPatch: null }));
                        setPosition(null);
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label className="block mb-4">
                  <div className="w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-burgundy-300 transition-colors">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="mt-2 block text-sm text-gray-600">
                        Upload Image
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleCustomPatchUpload}
                    accept="image/*"
                  />
                </label>
              )}
              <p className="text-sm text-gray-600 text-center">
                Drag the uploaded image to position it on the preview
              </p>
              <p className="text-sm text-gray-600 mt-1 text-center">
                Rp 70.000/Custom Patch
              </p>
            </div>

            {/* Size Controls - Show when patch is placed */}
            {position && (
              <div className="mb-8">
                <h4 className="font-medium text-lg mb-4">Adjust Size</h4>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => adjustPatchSize(false)}
                    className="p-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-xl">-</span>
                  </button>
                  <span className="text-sm text-gray-600">
                    {Math.round(position.scale * 100)}%
                  </span>
                  <button
                    onClick={() => adjustPatchSize(true)}
                    className="p-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
              </div>
            )}

            {/* Price Summary */}
            {position && (
              <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-lg mb-4">Price Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Patch Type:</span>
                    <span>
                      {state.customPatch ? "Custom Upload" : "Standard"}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Buy Button */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!position}
              >
                Buy Now - {formatToIDR(calculateTotal())}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
