'use client';

import TierBadge from './TierBadge';
import { formatGap, formatPercentile } from '@/lib/utils';
import { LapRecord } from '@/types';
import { ExternalLink } from 'lucide-react';

interface LeaderboardCardProps {
  record: LapRecord;
  showKartType?: boolean;
}

export default function LeaderboardCard({ record, showKartType = false }: LeaderboardCardProps) {
  return (
    <div className="bg-surface border border-surfaceHover rounded-lg p-4 hover:bg-surfaceHover transition-colors">
      {/* Top row: Position + Name + Tier */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Position with medal */}
          <div className="flex items-center">
            {record.position === 1 && (
              <span className="text-2xl mr-2">🏆</span>
            )}
            {record.position === 2 && (
              <span className="text-2xl mr-2">🥈</span>
            )}
            {record.position === 3 && (
              <span className="text-2xl mr-2">🥉</span>
            )}
            <span className="text-sm font-semibold text-white">
              {record.position}
            </span>
          </div>

          {/* Driver name */}
          <div className="text-sm font-medium text-white truncate">
            {record.driverName}
          </div>
        </div>

        {/* Tier badge */}
        <TierBadge tier={record.tier} size="sm" />
      </div>

      {/* Best time - prominent */}
      <div className="text-center py-3 mb-3 border-y border-surfaceHover">
        <div className="text-xs text-gray-400 mb-1">Best Time</div>
        <div className="text-3xl font-mono font-bold text-accent">
          {record.bestTimeStr}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Gap to P1 */}
        <div>
          <div className="text-xs text-gray-400 mb-1">Gap to P1</div>
          <div className="text-sm text-gray-300 font-medium">
            {formatGap(record.gapToP1)}
          </div>
        </div>

        {/* Percentile */}
        <div>
          <div className="text-xs text-gray-400 mb-1">Percentile</div>
          <div className="text-sm text-gray-300 font-medium">
            {formatPercentile(record.percentile)}
          </div>
        </div>

        {/* Interval */}
        <div>
          <div className="text-xs text-gray-400 mb-1">Interval</div>
          <div className="text-sm text-gray-300 font-medium">
            {formatGap(record.interval)}
          </div>
        </div>

        {/* Date */}
        <div>
          <div className="text-xs text-gray-400 mb-1">Date</div>
          <div className="text-sm text-gray-300 font-medium">
            {new Date(record.date).toLocaleDateString()}
          </div>
        </div>

        {/* Kart Type (if shown) */}
        {showKartType && (
          <div className="col-span-2">
            <div className="text-xs text-gray-400 mb-1">Kart Type</div>
            <div className="text-sm text-gray-300 font-medium">
              {record.kartType || 'N/A'}
            </div>
          </div>
        )}
      </div>

      {/* Profile link */}
      <a
        href={record.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-400 hover:text-primary flex items-center justify-center gap-1 transition-colors"
      >
        RaceFacer Profile
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
