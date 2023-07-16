import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import './MultiRange.css';

interface MultiRangeProps {
    min: number;
    max: number;
    step: number;
    color?: string;
}

export default function MultiRange({ min, max, step, color='bg-green-300' }: MultiRangeProps) {

    const progressRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    function handleMax(event: ChangeEvent<HTMLInputElement>): void {
        const value = Math.max(+event.target.value, minValue + 1);
        setMaxValue(value);
        event.target.value = value.toString();
    }

    function handleMin(event: ChangeEvent<HTMLInputElement>): void {
        const value = Math.min(+event.target.value, maxValue - 1);
        setMinValue(value);
        event.target.value = value.toString();
    }

    useEffect(() => {
        if (progressRef.current) {

            const minPercent = getPercent(minValue);
            const maxPercent = getPercent(maxValue);

            progressRef.current.style.left = `${minPercent}%`;
            progressRef.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minValue, maxValue, max, step, getPercent]);

  return (
    <div className="mb-4 mt-4">
        <div className="slider relative h-1 rounded-md bg-gray-300">
            <div className={`progress absolute h-1 ${color} rounded`} ref={progressRef}></div>
        </div>

        <div className="relative">
        <input
            onChange={handleMin}
            type="range"
            value={minValue}
            min={min}
            max={max}
            step={step}
            className={`absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none`}
        />
        <input
            onChange={handleMax}
            type="range"
            value={maxValue}
            min={min}
            max={max}
            step={step}
            className={`absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none`}
        />
        </div>
    </div>
  )
}
