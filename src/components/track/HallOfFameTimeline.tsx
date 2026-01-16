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
    <div className="space-y-4">
      {records.map((record, index) => {
        const isFirst = index === 0;
        const isLast = index === records.length - 1;
        const date = new Date(record.dateBroken);

        return (
          <div key={`${record.driverSlug}-${record.dateBroken}`} className="relative">
            {/* Connecting Line */}
            {!isLast && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20" />
            )}

            {/* Timeline Item */}
            <div className="flex gap-4 items-start">
              {/* Icon */}
              <div
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                  record.isCurrent
                    ? 'bg-gradient-to-br from-yellow-500 to-amber-600'
                    : 'bg-gradient-to-br from-primary to-primary/60'
                } shadow-lg`}
              >
                {record.isCurrent ? (
                  <Crown className="w-6 h-6 text-white" />
                ) : (
                  <Medal className="w-6 h-6 text-white" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 bg-surface border border-surfaceHover rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold text-white">{record.driverName}</h4>
                    {record.isCurrent && (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/30">
                        Current WR
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    {format(date, 'MMM dd, yyyy')}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Record Time</div>
                    <div className="text-2xl font-bold text-accent">{record.recordTimeStr}</div>
                  </div>

                  <div className="h-px sm:h-8 sm:w-px bg-surfaceHover sm:mx-2" />

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Reign Duration</div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold text-white">
                        {record.daysReigned} {record.daysReigned === 1 ? 'day' : 'days'}
                      </div>
                      {/* Visual bar for days reigned */}
                      <div className="hidden sm:block flex-1 max-w-[200px] h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            record.isCurrent
                              ? 'bg-gradient-to-r from-yellow-500 to-amber-600'
                              : 'bg-gradient-to-r from-primary to-primary/60'
                          }`}
                          style={{
                            width: `${Math.min((record.daysReigned / Math.max(...records.map((r) => r.daysReigned))) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
