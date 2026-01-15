'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, MapPin, Video, Info, Ruler, Flag, Trophy } from 'lucide-react';
import { Track } from '@/types';

// Static track data
const TRACK_DATA: Record<string, any> = {
  'sportzilla-formula-karting': {
    name: 'Sportzilla Formula Karting Club',
    location: 'Bedian Road, Lahore, Pakistan',
    logo: '/tracks/sportzilla-formula-karting.png',
    about: {
      layoutImage: '/tracks/sportzilla-layout.png',
      description: 'Sportzilla Formula Karting is one of Lahore\'s premier karting venues, featuring a challenging outdoor circuit designed for competitive racing. The track offers an exciting mix of high-speed straights and technical corners, providing the perfect environment for both beginners and experienced racers.',
      details: {
        length: '800m',
        width: '8-10 meters',
        corners: 13,
        surface: 'Cemented',
        kartType: 'Sprint, Championship & Pro Karts',
      },
      videos: [
        'https://www.youtube.com/embed/0l0YKYczZCc',
        'https://www.youtube.com/embed/MczLVx0ZN7A',
      ],
      mapLocation: {
              lat: 31.4265328,
              lng: 74.4826657,
              embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.8!2d74.4800854!3d31.4265328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391909e81df2bc71%3A0xf87288cf5260450b!2sSportzilla%20Formula%20Karting%20Club%20%26%20Sports%20Arena!5e0!3m2!1sen!2s!4v1700000000000",
            },
    },
  },
  'apex-autodrome': {
    name: 'Apex Autodrome',
    location: 'Lahore, Pakistan',
    logo: '/tracks/apex-autodrome.png',
    about: {
      layoutImage: '/tracks/apex-layout.png',
      description: 'Pakistan\'s premier indoor Go-Karting & immersive Gaming Arcade. For the first time, we bring together the adrenaline-pumping thrill of the most advanced and high-speed Italian karts - Apex Autodrome strikes the perfect balance between speed and control.',
      details: {
        length: '500m',
        width: '8-12 meters',
        corners: 8,
        surface: 'Premium Asphalt',
        kartType: 'TB Italy Karts',
      },
      videos: [
        'https://www.youtube.com/embed/ymK6WVsTjIk',
        'https://www.youtube.com/embed/zSNKQYIKRV0',
      ],
      mapLocation: {
              lat: 31.3588467,
              lng: 74.1830835,
              embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.7!2d74.1805032!3d31.3588467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918558572063d93%3A0xb70e74c0053298ef!2sApex%20Autodrome!5e0!3m2!1sen!2s!4v1700000000000",
            },
    },
  },
  '2f2f-formula-karting': {
    name: '2F2F Formula Karting Lahore',
    location: 'Lahore, Pakistan',
    logo: '/tracks/2f2f-formula-karting.png',
    about: {
      layoutImage: '/tracks/2f2f-layout.png',
      description: 'Pakistan\'s Largest International Level Go Karting Track Located in Garrison Sports Arena, Adjacent to Askari X in Lahore. This is the Second Track of 2F2F Formula Karting Pakistan, The First Track is in Lake View Park in Islamabad.',
      details: {
        length: '1.2km',
        width: '8-10 meters',
        corners: 13,
        surface: 'Asphalt Road',
        kartType: 'RX8',
      },
      videos: ['https://www.youtube.com/embed/VWDUqCEZTQo', 'https://www.youtube.com/embed/Gbod4z8LHQ4'],
      mapLocation: {
              lat: 31.540781,
              lng: 74.4153437,
              embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1617.0642646972913!2d74.4153437!3d31.540781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190f1c1e13b4dd%3A0x3640559c8a822e8!2s2F2F%20Formula%20Karting!5e0!3m2!1sen!2s!4v1700000000000",
            },
    },
  },
  '2f2f-formula-karting-islamabad': {
    name: '2F2F Formula Karting Islamabad',
    location: 'Islamabad, Pakistan',
    logo: '/tracks/2f2f-formula-karting-islamabad.png',
    about: {
      layoutImage: '/tracks/2f2f-layout.png',
      description: 'The first location of 2F2F Formula Karting Pakistan, situated in Lake View Park in Islamabad. This track features SR5 karts and provides an exciting karting experience in Pakistan\'s capital city.',
      details: {
        length: '1.2km',
        width: '8-10 meters',
        corners: 13,
        surface: 'Asphalt Road',
        kartType: 'SR5',
      },
      videos: ['https://www.youtube.com/embed/cymEdVyg_xk', 'https://www.youtube.com/embed/NDzHrceaDic'],
      mapLocation: {
        lat: 33.7199375,
        lng: 73.1323125,
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d408.5761182124575!2d73.1323125!3d33.7199375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfc101451c4a5d%3A0x74f31dfefb6112da!2s2F2F%20Formula%20Karting!5e0!3m2!1sen!2s!4v1700000000000",
      },
    },
  },
};

export default function AboutTrackPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [kartRecords, setKartRecords] = useState<Array<{
    kartType: string;
    worldRecord: string;
    recordHolder: string;
  }>>([]);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const response = await fetch(`/api/tracks/${slug}`);
        const data = await response.json();
        if (data.success) {
          // Merge API data with static about data
          const staticData = TRACK_DATA[slug];
          const mergedTrack = {
            ...data.track,
            about: staticData?.about || null,
          };
          setTrack(mergedTrack);
        }
      } catch (error) {
        console.error('Error fetching track:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrack();
  }, [slug]);

  // Fetch kart records for all tracks
  useEffect(() => {
    async function fetchKartRecords() {
      if (!track || !track.kartTypes || track.kartTypes.length === 0) {
        return;
      }

      try {
        // Filter out LR5 for 2F2F Lahore track
        const kartTypesToShow = slug === '2f2f-formula-karting'
          ? track.kartTypes.filter(kt => kt !== 'LR5')
          : track.kartTypes;

        const records = await Promise.all(
          kartTypesToShow.map(async (kartType: string) => {
            const response = await fetch(
              `/api/tracks/${slug}/leaderboard?kartType=${kartType}&limit=1`
            );
            const data = await response.json();

            if (data.success && data.records.length > 0) {
              const record = data.records[0];
              return {
                kartType,
                worldRecord: record.bestTimeStr,
                recordHolder: record.driverName,
              };
            }

            return {
              kartType,
              worldRecord: 'N/A',
              recordHolder: 'Unknown',
            };
          })
        );

        setKartRecords(records);
      } catch (error) {
        console.error('Error fetching kart records:', error);
      }
    }

    fetchKartRecords();
  }, [track, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading track information...</p>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Track not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-surface sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/tracks/${slug}`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
              <Image
                src={`/tracks/${slug}.png`}
                alt={`${track.name} logo`}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-display font-bold text-white">
                About {track.name}
              </h1>
              <p className="text-sm text-gray-400">{track.location}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Track Layout Image */}
        {track.about?.layoutImage && (
          <div className="bg-surface border border-surfaceHover rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Flag className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-white">Track Layout</h2>
            </div>
            <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden">
              <Image
                src={track.about.layoutImage}
                alt={`${track.name} track layout`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* Description */}
        {track.about?.description && (
          <div className="bg-surface border border-surfaceHover rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-white">About the Track</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{track.about.description}</p>
          </div>
        )}

        {/* Kart Records - Show for tracks with multiple kart types */}
        {kartRecords.length > 0 && (
          <div className="bg-surface border border-surfaceHover rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-white">Track Records by Kart Type</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kartRecords.map((record) => (
                <div
                  key={record.kartType}
                  className="bg-background/50 rounded-lg p-4 border border-surfaceHover"
                >
                  <div className="text-sm text-gray-400 mb-2">{record.kartType}</div>
                  <div className="text-2xl font-bold text-accent mb-1">
                    {record.worldRecord}
                  </div>
                  <div className="text-sm text-gray-500">{record.recordHolder}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Track Details */}
        {track.about?.details && (
          <div className="bg-surface border border-surfaceHover rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-white">Track Specifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {track.about.details.length && track.about.details.length !== 'TBD' && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Track Length</div>
                  <div className="text-lg font-semibold text-white">{track.about.details.length}</div>
                </div>
              )}
              {track.about.details.width && track.about.details.width !== 'TBD' && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Track Width</div>
                  <div className="text-lg font-semibold text-white">{track.about.details.width}</div>
                </div>
              )}
              {track.about.details.corners && track.about.details.corners !== 0 && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Number of Corners</div>
                  <div className="text-lg font-semibold text-white">{track.about.details.corners}</div>
                </div>
              )}
              {track.about.details.surface && track.about.details.surface !== 'TBD' && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Surface Type</div>
                  <div className="text-lg font-semibold text-white">{track.about.details.surface}</div>
                </div>
              )}
              {track.about.details.kartType && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Kart Type</div>
                  <div className="text-lg font-semibold text-white">{track.about.details.kartType}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Videos */}
        {track.about?.videos && track.about.videos.length > 0 && (
          <div className="bg-surface border border-surfaceHover rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-white">Track Videos</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {track.about.videos.map((videoUrl, index) => (
                <div key={index} className="relative w-full aspect-video bg-background rounded-lg overflow-hidden">
                  <iframe
                    src={videoUrl}
                    title={`${track.name} video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Location */}
        {track.about?.mapLocation && (
          <div className="bg-surface border border-surfaceHover rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-white">Location</h2>
            </div>
            {track.about.mapLocation.embedUrl ? (
              <div className="relative w-full h-96 bg-background rounded-lg overflow-hidden">
                <iframe
                  src={track.about.mapLocation.embedUrl}
                  title={`${track.name} location`}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : (
              <div className="text-gray-400">
                Coordinates: {track.about.mapLocation.lat}, {track.about.mapLocation.lng}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!track.about && (
          <div className="bg-surface border border-surfaceHover rounded-xl p-12 text-center">
            <Info className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-white mb-2">No additional information available</h3>
            <p className="text-gray-400">
              Track details, layout images, and videos will be added soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
