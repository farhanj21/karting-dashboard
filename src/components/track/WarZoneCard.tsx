import { Flame } from 'lucide-react';

interface WarZoneCardProps {
  timeStart: number;
  timeEnd: number;
  driverCount: number;
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const milliseconds = Math.round((seconds % 1) * 1000);
  const secs = Math.floor(seconds);

  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
};

export default function WarZoneCard({ timeStart, timeEnd, driverCount }: WarZoneCardProps) {
  const timeRange = timeEnd - timeStart;

  return (
    <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Flame className="w-6 h-6 text-orange-500" />
        </div>
        <h3 className="text-xl font-display font-bold text-white">THE WAR ZONE</h3>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-400 mb-1">Time Range</div>
          <div className="text-2xl font-bold text-orange-400">
            {formatTime(timeStart)} - {formatTime(timeEnd)}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-400 mb-1">Drivers Stuck</div>
          <div className="text-3xl font-bold text-red-400">{driverCount} racers</div>
        </div>

        <div className="pt-3 border-t border-orange-500/20">
          <p className="text-sm text-gray-300">
            Breaking out of this {timeRange.toFixed(1)}s window moves you past{' '}
            <span className="font-bold text-orange-400">{driverCount} drivers!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
