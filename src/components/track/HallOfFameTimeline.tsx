import { Crown, Medal } from 'lucide-react';
import { format } from 'date-fns';

interface WorldRecord {
  driverName: string;
  driverSlug: string;
  profileUrl?: string;
  recordTime: number;
  recordTimeStr: string;
  dateBroken: string;
  daysReigned: number;
  isCurrent: boolean;
}

interface HallOfFameTimelineProps {
  records: WorldRecord[];
}

export default function HallOfFameTimeline({ records }: HallOfFameTimelineProps) {
  return (
    <div className="space-y-2">
      {records.map((record, index) => {
        const date = new Date(record.dateBroken);

        return (
          <div
            key={`${record.driverSlug}-${record.dateBroken}`}
            className={`group relative flex items-center gap-4 px-4 py-3 rounded-lg border transition-all ${
              record.isCurrent
                ? 'bg-yellow-500/5 border-yellow-500/30 hover:border-yellow-500/50'
                : 'bg-surface/50 border-surfaceHover hover:border-primary/30'
            }`}
          >
            {/* Rank/Icon */}
            <div className="flex items-center justify-center w-8 h-8 shrink-0">
              {record.isCurrent ? (
                <Crown className="w-5 h-5 text-yellow-400" />
              ) : (
                <Medal className="w-5 h-5 text-gray-500" />
              )}
            </div>

            {/* Driver Name */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white truncate">{record.driverName}</span>
                {record.isCurrent && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium text-yellow-400 bg-yellow-500/10 rounded border border-yellow-500/20">
                    WR
                  </span>
                )}
              </div>
            </div>

            {/* Record Time */}
            <div className="text-right shrink-0">
              <div className="text-lg font-bold text-accent">{record.recordTimeStr}</div>
            </div>

            {/* Reign Duration */}
            <div className="hidden sm:flex items-center gap-2 shrink-0 w-28">
              <div className="text-sm text-gray-400">
                {record.daysReigned}d
              </div>
              <div className="flex-1 h-1 bg-background rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    record.isCurrent ? 'bg-yellow-500' : 'bg-primary/60'
                  }`}
                  style={{
                    width: `${Math.min((record.daysReigned / Math.max(...records.map((r) => r.daysReigned))) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Date */}
            <div className="hidden md:block text-sm text-gray-500 shrink-0 w-24 text-right">
              {format(date, 'MMM dd, yy')}
            </div>
          </div>
        );
      })}
    </div>
  );
}
