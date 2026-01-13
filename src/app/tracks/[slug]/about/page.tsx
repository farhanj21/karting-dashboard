'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, MapPin, Video, Info, Ruler, Flag } from 'lucide-react';
import { Track } from '@/types';

// Static track data
const TRACK_DATA: Record<string, any> = {
  'sportzilla': {
    name: 'Sportzilla Formula Karting',
    location: 'Lahore, Pakistan',
    logo: '/logos/sportzilla.png',
    about: {
      layoutImage: 'https://via.placeholder.com/1200x600?text=Sportzilla+Track+Layout',
      description: 'Sportzilla Formula Karting is one of Lahore\'s premier karting venues, featuring a challenging outdoor circuit designed for competitive racing. The track offers an exciting mix of high-speed straights and technical corners, providing the perfect environment for both beginners and experienced racers.',
      details: {
        length: '1.1 km',
        width: '8-10 meters',
        corners: 12,
        surface: 'Asphalt',
        kartType: '270cc Racing Karts',
      },
      videos: [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
      ],
      mapLocation: {
        lat: 31.4697,
        lng: 74.2728,
        embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.2!2d74.2728!3d31.4697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI4JzExLjAiTiA3NMKwMTYnMjIuMSJF!5e0!3m2!1sen!2s!4v1234567890',
      },
    },
  },
  'apex-autodrome': {
    name: 'Apex Autodrome',
    location: 'Lahore, Pakistan',
    logo: '/logos/apex.png',
    about: {
      layoutImage: 'https://via.placeholder.com/1200x600?text=Apex+Autodrome+Track+Layout',
      description: 'Apex Autodrome is a state-of-the-art karting facility in Lahore, featuring a modern track design with excellent safety features. The circuit is known for its flowing layout that rewards smooth driving and racecraft, making it a favorite among local karting enthusiasts.',
      details: {
        length: '1.0 km',
        width: '8-12 meters',
        corners: 14,
        surface: 'Premium Asphalt',
        kartType: '270cc Sodikart',
      },
      videos: [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
      ],
      mapLocation: {
        lat: 31.5204,
        lng: 74.3587,
        embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890',
      },
    },
  },
};

export default function AboutTrackPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

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
            {track.logo && (
              <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={track.logo}
                  alt={`${track.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
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
            <div className="relative w-full aspect-video bg-background rounded-lg overflow-hidden">
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

        {/* Track Details */}
        {track.about?.details && (
          <div className="bg-surface border border-surfaceHover rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-bold text-white">Track Specifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {track.about.details.length && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Track Length</div>
                  <div className="text-lg font-semibold text-white">{track.about.details.length}</div>
                </div>
              )}
              {track.about.details.width && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Track Width</div>
                  <div className="text-lg font-semibold text-white">{track.about.details.width}</div>
                </div>
              )}
              {track.about.details.corners && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Number of Corners</div>
                  <div className="text-lg font-semibold text-white">{track.about.details.corners}</div>
                </div>
              )}
              {track.about.details.surface && (
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
              {(track.about.details.lapRecord || track.stats?.worldRecordStr) && (
                <div>
                  <div className="text-sm text-gray-400 mb-1">Track Record</div>
                  <div className="text-lg font-semibold text-accent">
                    {track.stats?.worldRecordStr || track.about.details.lapRecord}
                  </div>
                  {track.stats?.recordHolder && (
                    <div className="text-xs text-gray-500 mt-1">{track.stats.recordHolder}</div>
                  )}
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
