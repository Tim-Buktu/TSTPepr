"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import {
  fabricOptions,
  volumeOptions,
  cutOptions,
  buttonOptions,
  type PantsConfig,
  formatPrice,
} from "@/config/pants-config";

export function PantsConfigurator() {
  const [config, setConfig] = useState<PantsConfig>({
    fabric: "linen",
    volume: "wide",
    cut: "middle",
    button: "button",
  });

  const [measurements, setMeasurements] = useState({
    height: "",
    weight: "",
  });

  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const height = parseFloat(measurements.height) / 100; // convert cm to m
    const weight = parseFloat(measurements.weight);

    if (height > 0 && weight > 0) {
      const bmiValue = weight / (height * height);
      setBmi(parseFloat(bmiValue.toFixed(1)));
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const getConfigId = (option: keyof PantsConfig): string => {
    const optionMap = {
      fabric: fabricOptions,
      volume: volumeOptions,
      cut: cutOptions,
      button: buttonOptions,
    };
    return (
      optionMap[option].find((opt) => opt.value === config[option])?.id || "1"
    );
  };

  const getImageSrc = () => {
    const fabricId = getConfigId("fabric");
    const volumeId = getConfigId("volume");
    const cutId = getConfigId("cut");
    const buttonId = getConfigId("button");

    return `/pants-config/final/${fabricId}-${volumeId}-${cutId}-${buttonId}.png`;
  };

  const cycleOption = (option: keyof PantsConfig) => {
    const optionMap = {
      fabric: fabricOptions,
      volume: volumeOptions,
      cut: cutOptions,
      button: buttonOptions,
    };

    const currentIndex = optionMap[option].findIndex(
      (opt) => opt.value === config[option]
    );
    const nextIndex = (currentIndex + 1) % optionMap[option].length;

    setConfig((prev) => ({
      ...prev,
      [option]: optionMap[option][nextIndex].value,
    }));
  };

  const getCurrentFabric = () => {
    return fabricOptions.find((opt) => opt.value === config.fabric);
  };

  const calculateTotalCost = () => {
    const currentFabric = getCurrentFabric();
    if (!currentFabric?.price) return 0;

    const fabricCost = currentFabric.price;
    const multiplier = bmi && bmi > 28 ? 1.5 : 1.2;
    const baseCost = 200000;

    return Math.round(fabricCost * multiplier + baseCost);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side - Preview (Fixed) */}
        <div className="hidden md:block relative">
          <div className="sticky top-32 w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="relative w-full aspect-[3/4] flex items-center justify-center">
                <Image
                  src={getImageSrc()}
                  alt="Pants Configuration"
                  fill
                  className="rounded-lg object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">Preview</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Preview (Shows only on mobile) */}
        <div className="md:hidden bg-white rounded-2xl shadow-lg p-6">
          <div className="relative aspect-[3/4]">
            <Image
              src={getImageSrc()}
              alt="Pants Configuration"
              fill
              className="rounded-lg object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Right Side - Scrollable Controls */}
        <div className="md:col-start-2">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-8">
              Customize Your Pants
            </h3>

            {/* Measurements Section */}
            <div className="mb-10 p-6 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-lg mb-6">Your Measurements</h4>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={measurements.height}
                      onChange={(e) => {
                        setMeasurements((prev) => ({
                          ...prev,
                          height: e.target.value,
                        }));
                        setBmi(null);
                      }}
                      className="w-full px-4 py-2.5 border rounded-lg"
                      placeholder="175"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={measurements.weight}
                      onChange={(e) => {
                        setMeasurements((prev) => ({
                          ...prev,
                          weight: e.target.value,
                        }));
                        setBmi(null);
                      }}
                      className="w-full px-4 py-2.5 border rounded-lg"
                      placeholder="70"
                    />
                  </div>
                </div>
                <button
                  onClick={calculateBMI}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Calculate BMI
                </button>
                {bmi !== null && (
                  <div className="text-center p-4 bg-white rounded-lg space-y-2 shadow-sm">
                    <p className="font-medium text-lg">Your BMI: {bmi}</p>
                    <p className="text-gray-600">{getBMICategory(bmi)}</p>
                    <p className="text-sm text-gray-500">
                      {bmi > 28
                        ? "* Additional fabric (50%) will be needed"
                        : "* Additional fabric (20%) will be needed"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Fabric Selection */}
            <div className="mb-10">
              <h4 className="font-medium text-lg mb-6">Select Fabric</h4>
              <div className="grid grid-cols-2 gap-4">
                {fabricOptions.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() =>
                      setConfig((prev) => ({
                        ...prev,
                        fabric: fabric.value as PantsConfig['fabric'],
                      }))
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      config.fabric === fabric.value
                        ? "border-burgundy-600 bg-burgundy-50"
                        : "border-gray-200 hover:border-burgundy-300"
                    }`}
                  >
                    <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                      <Image
                        src={fabric.image || "/placeholder.jpg"}
                        alt={fabric.label}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-lg">{fabric.label}</p>
                      <p className="text-gray-600">
                        {formatPrice(fabric.price || 0)}/meter
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Controls */}
            <div className="space-y-6 mb-10">
              <h4 className="font-medium text-lg mb-4">Style Options</h4>
              {/* Other Controls */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Volume</span>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-center capitalize">
                    {config.volume}
                  </span>
                  <button
                    onClick={() => cycleOption("volume")}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Cut</span>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-center capitalize">
                    {config.cut}
                  </span>
                  <button
                    onClick={() => cycleOption("cut")}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Button</span>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-center capitalize">
                    {config.button}
                  </span>
                  <button
                    onClick={() => cycleOption("button")}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-lg mb-4">Cost Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Base Cost:</span>
                  <span>{formatPrice(200000)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Fabric Cost:</span>
                  <span>
                    {formatPrice(getCurrentFabric()?.price || 0)}/meter
                  </span>
                </div>
                {bmi && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Fabric Multiplier:</span>
                    <span>{bmi > 28 ? "1.5x" : "1.2x"}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total Estimated Cost:</span>
                    <span className="text-burgundy-600">
                      {formatPrice(calculateTotalCost())}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buy Button */}
            <button className="w-full bg-black text-white py-4 px-8 rounded-xl text-lg font-medium hover:bg-gray-800 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
