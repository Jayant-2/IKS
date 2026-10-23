import React, { useState, useEffect, useMemo } from 'react';
import { YouTubeVideoItem, VideoSubjectCategory } from '../types/iks';
import { 
  Play, 
  Search, 
  ExternalLink, 
  Filter, 
  Tag, 
  Check, 
  Video, 
  RotateCcw,
  Sparkles,
  Plus,
  X
} from 'lucide-react';

const INITIAL_VIDEOS: YouTubeVideoItem[] = [
  {
    id: 'EHyU7KNgkbI',
    url: 'https://youtu.be/EHyU7KNgkbI?si=bNTdqSGDy_B5Yn2Z',
    title: 'IKS Full Course in One Video | Indian Knowledge System Made Easy',
    category: 'Uncategorized',
    addedAt: 'Wisdom Roots',
  },
  {
    id: '4qy9fq1tg9s',
    url: 'https://youtu.be/4qy9fq1tg9s?si=__c52U9Zr7XKAHEv',
    title: 'Indian Knowledge System Unit 1 Complete One Shot | AKTU B.Tech',
    category: 'Uncategorized',
    addedAt: 'I Tech World',
  },
  {
    id: 'HecdyK_PsrU',
    url: 'https://youtu.be/HecdyK_PsrU?si=fhVL6Nhtgj5WL5Hf',
    title: 'Indian Knowledge System Unit-1 Complete OneShot | AKTU BTech',
    category: 'Uncategorized',
    addedAt: 'BTechPoly',
  },
  {
    id: '0DvrYSYnEmc',
    url: 'https://youtu.be/0DvrYSYnEmc?si=l2wpo6ibr6GCQcTJ',
    title: 'IKS || Contribution of Ancient India’s Mathematicians',
    category: 'Mathematics',
    addedAt: 'Wisdom Roots',
  },
  {
    id: 'j--V3DCT-I8',
    url: 'https://youtu.be/j--V3DCT-I8?si=kxcgTf7DnjCv9IQk',
    title: 'Indian Philosophical Systems | IKS Unit 1 Part 2',
    category: 'Philosophy',
    addedAt: 'Khushi Sharma',
  },
  {
    id: 'qCNpWj95Sew',
    url: 'https://youtu.be/qCNpWj95Sew?si=At_oatWbVzHQTtg-',
    title: 'Linguistics & Phonetics in Sanskrit | IKS Unit 2 Part 1',
    category: 'Literature',
    addedAt: 'Khushi Sharma',
  },
  {
    id: 'FmwQwV9W6PQ',
    url: 'https://youtu.be/FmwQwV9W6PQ?si=PRb47lBN02Qrv9tF',
    title: 'Pingala & the Binary System | IKS Unit 2 Part 2',
    category: 'Mathematics',
    addedAt: 'Khushi Sharma',
  },
  {
    id: 'HmZe744aKOk',
    url: 'https://youtu.be/HmZe744aKOk?si=Euaq4HMHSGunCnVE',
    title: 'Indian Mathematics & Mathematicians | IKS Unit 3 Part 1',
    category: 'Mathematics',
    addedAt: 'Khushi Sharma',
  },
];

const STORAGE_KEY = 'iks_video_learning_hub_videos_v3';

const SUBJECT_OPTIONS: VideoSubjectCategory[] = [
  'Uncategorized',
  'Mathematics',
  'Astronomy',
  'Philosophy',
  'Ayurveda',
  'Literature',
];

interface VideoLearningHubProps {
  standalone?: boolean;
}

export const VideoLearningHub: React.FC<VideoLearningHubProps> = ({ standalone = false }) => {
  const [videos, setVideos] = useState<YouTubeVideoItem[]>(() => {
    if (typeof window === 'undefined') return INITIAL_VIDEOS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('iks_video_learning_hub_videos_v1');
      if (stored) {
        const parsed: YouTubeVideoItem[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge missing videos so new additions are always available while preserving any customizations
          const existingIds = new Set(parsed.map((v) => v.id));
          const missing = INITIAL_VIDEOS.filter((v) => !existingIds.has(v.id));
          if (missing.length === 0) return parsed;
          return [...parsed, ...missing];
        }
      }
    } catch (e) {
      console.error('Failed to load stored YouTube videos', e);
    }
    return INITIAL_VIDEOS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [thumbnailErrors, setThumbnailErrors] = useState<Record<string, boolean>>({});
  
  // Custom video submission state
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState<VideoSubjectCategory>('Uncategorized');
  const [addFormError, setAddFormError] = useState('');

  // Persist video list whenever categories or titles change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    } catch (e) {
      console.error('Failed to persist video hub data', e);
    }
  }, [videos]);

  const handleCategoryChange = (videoId: string, newCategory: VideoSubjectCategory) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, category: newCategory } : v))
    );
  };

  const handleStartEditTitle = (video: YouTubeVideoItem) => {
    setEditingVideoId(video.id);
    setEditingTitle(video.title);
  };

  const handleSaveTitle = (videoId: string) => {
    if (editingTitle.trim()) {
      setVideos((prev) =>
        prev.map((v) => (v.id === videoId ? { ...v, title: editingTitle.trim() } : v))
      );
    }
    setEditingVideoId(null);
  };

  const handleResetToDefault = () => {
    if (confirm('Reset all videos back to verified default state?')) {
      setVideos(INITIAL_VIDEOS);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('iks_video_learning_hub_videos_v1');
    }
  };

  const extractYouTubeId = (url: string): string | null => {
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/;
    const match = url.trim().match(regExp);
    if (match && match[1]) {
      return match[1];
    }
    // Check if user entered raw 11-char ID
    if (/^[\w-]{11}$/.test(url.trim())) {
      return url.trim();
    }
    return null;
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setAddFormError('');
    const extractedId = extractYouTubeId(newVideoUrl);
    if (!extractedId) {
      setAddFormError('Please enter a valid YouTube link or 11-character video ID');
      return;
    }
    if (videos.some((v) => v.id === extractedId)) {
      setAddFormError('This video is already in your learning hub');
      return;
    }
    const cleanTitle = newVideoTitle.trim() || `IKS Study Video (${extractedId})`;
    const cleanUrl = newVideoUrl.includes('http') ? newVideoUrl.trim() : `https://youtu.be/${extractedId}`;
    
    const newVideo: YouTubeVideoItem = {
      id: extractedId,
      url: cleanUrl,
      title: cleanTitle,
      category: newVideoCategory,
      addedAt: 'User Added'
    };

    setVideos((prev) => [newVideo, ...prev]);
    setNewVideoUrl('');
    setNewVideoTitle('');
    setNewVideoCategory('Uncategorized');
    setIsAddFormOpen(false);
  };

  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchesCategory =
        selectedCategory === 'All' || v.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [videos, searchQuery, selectedCategory]);

  return (
    <section className={`w-full bg-[#171717] ${standalone ? 'py-6' : 'py-14 border-t border-white/[0.06]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-[#21F1A8] mb-1.5">
              <Video className="w-3.5 h-3.5" />
              <span>Dedicated Resource Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Video Learning Hub
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1 max-w-xl font-body">
              Explore authentic Indic educational videos on YouTube. Assign topics to Mathematics, Astronomy, Philosophy, Ayurveda, or Literature as you verify them.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddFormOpen(!isAddFormOpen)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#171717] bg-[#21F1A8] hover:bg-[#21F1A8]/90 transition-all py-1.5 px-3 rounded-lg shadow-sm"
            >
              {isAddFormOpen ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{isAddFormOpen ? 'Close Form' : 'Add Video'}</span>
            </button>
            <button
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#888888] hover:text-[#21F1A8] transition-colors py-1.5 px-2.5 rounded-lg border border-white/[0.08] hover:border-[#21F1A8]/40"
              title="Reset video groups to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Collapsible Add Video Form */}
        {isAddFormOpen && (
          <form
            onSubmit={handleAddVideo}
            className="mb-8 p-5 bg-[#1b1b1b] border border-[#21F1A8]/30 rounded-2xl shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#21F1A8] font-bold">
                <Plus className="w-4 h-4" />
                <span>Add YouTube Learning Resource</span>
              </div>
              <span className="text-[11px] font-mono text-[#888888]">
                Supports youtu.be / youtube.com links or 11-char IDs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="md:col-span-1">
                <label className="block text-[11px] font-mono text-[#A0A0A0] mb-1">
                  YouTube URL or Video ID *
                </label>
                <input
                  type="text"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="https://youtu.be/..."
                  required
                  className="w-full px-3 py-2 bg-[#171717] border border-white/10 rounded-lg text-xs text-white placeholder:text-[#555] focus:outline-none focus:border-[#21F1A8]"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-[11px] font-mono text-[#A0A0A0] mb-1">
                  Video Title (Optional)
                </label>
                <input
                  type="text"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  placeholder="E.g., Vedic Mathematics Fundamentals"
                  className="w-full px-3 py-2 bg-[#171717] border border-white/10 rounded-lg text-xs text-white placeholder:text-[#555] focus:outline-none focus:border-[#21F1A8]"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-[11px] font-mono text-[#A0A0A0] mb-1">
                  Subject Category
                </label>
                <select
                  value={newVideoCategory}
                  onChange={(e) => setNewVideoCategory(e.target.value as VideoSubjectCategory)}
                  className="w-full px-3 py-2 bg-[#171717] border border-white/10 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-[#21F1A8]"
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {addFormError && (
              <div className="text-xs text-rose-400 font-mono mb-3">
                {addFormError}
              </div>
            )}

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddFormOpen(false)}
                className="px-3 py-1.5 text-xs text-[#888888] hover:text-white font-mono"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-[#171717] bg-[#21F1A8] hover:bg-[#21F1A8]/90 rounded-lg transition-all"
              >
                Save to Learning Hub
              </button>
            </div>
          </form>
        )}

        {/* Search & Subject Filter Bar */}
        <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-4 sm:p-5 mb-8 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#21F1A8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos by title or ID (e.g., Learning Video 1, Mathematics)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#171717] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#21F1A8] transition-all min-h-[44px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Subject Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="font-mono text-[#777777] text-[11px] whitespace-nowrap mr-1">
              Filter:
            </span>
            {['All', ...SUBJECT_OPTIONS].map((cat) => {
              const count =
                cat === 'All'
                  ? videos.length
                  : videos.filter((v) => v.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium min-h-[36px] flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-[#21F1A8] text-[#171717] font-bold shadow-sm'
                      : 'bg-[#242424] text-[#A0A0A0] hover:text-white border border-white/[0.06]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat ? 'bg-[#171717]/20 text-[#171717]' : 'bg-[#171717] text-[#888888]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Responsive Video Cards Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => {
              const hasError = thumbnailErrors[video.id];
              const thumbnailSrc = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

              return (
                <div
                  key={video.id}
                  className="bg-[#1f1f1f] border border-white/[0.08] hover:border-[#21F1A8]/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-xl group hover:-translate-y-0.5"
                >
                  {/* Clickable Card Header / Thumbnail linking to YouTube */}
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-video w-full bg-[#171717] overflow-hidden flex items-center justify-center block group/thumb"
                    aria-label={`Watch ${video.title} on YouTube`}
                  >
                    {!hasError ? (
                      <img
                        src={thumbnailSrc}
                        alt={`YouTube thumbnail for ${video.title}`}
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                        onError={() =>
                          setThumbnailErrors((prev) => ({ ...prev, [video.id]: true }))
                        }
                      />
                    ) : (
                      /* Fallback styled container if thumbnail fails */
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#242424] text-[#888888] p-4 text-center">
                        <Video className="w-10 h-10 text-[#21F1A8] mb-2" />
                        <span className="text-xs font-mono text-white font-semibold">
                          {video.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#666666] mt-1">
                          YouTube ID: {video.id}
                        </span>
                      </div>
                    )}

                    {/* Play Badge Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#21F1A8] text-[#171717] flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Category Pill Tag on Thumbnail */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#171717]/85 backdrop-blur-md text-[#21F1A8] border border-[#21F1A8]/30 shadow">
                        {video.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-[#CCCCCC] flex items-center gap-1">
                        <ExternalLink className="w-3 h-3 text-[#21F1A8]" />
                        <span>YouTube</span>
                      </span>
                    </div>
                  </a>

                  {/* Card Content & Interactive Assignment */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div>
                      {/* Title with edit capability */}
                      {editingVideoId === video.id ? (
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="flex-1 px-2.5 py-1 text-sm bg-[#171717] border border-[#21F1A8] rounded text-white font-heading"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveTitle(video.id);
                              if (e.key === 'Escape') setEditingVideoId(null);
                            }}
                          />
                          <button
                            onClick={() => handleSaveTitle(video.id)}
                            className="p-1.5 text-xs text-[#171717] bg-[#21F1A8] rounded font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-base font-heading font-bold text-white group-hover:text-[#21F1A8] transition-colors line-clamp-2">
                            {video.title}
                          </h3>
                          <button
                            onClick={() => handleStartEditTitle(video)}
                            className="text-[10px] font-mono text-[#777777] hover:text-[#21F1A8] whitespace-nowrap pt-0.5"
                            title="Rename video title once verified"
                          >
                            Rename
                          </button>
                        </div>
                      )}

                      <div className="text-[11px] font-mono text-[#888888] truncate mb-3">
                        ID: <span className="text-[#CCCCCC]">{video.id}</span>
                      </div>

                      {/* Interactive Subject Assignment Control */}
                      <div className="pt-2 border-t border-white/[0.06]">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-[#888888] font-mono text-[11px] flex items-center gap-1">
                            <Tag className="w-3 h-3 text-[#21F1A8]" />
                            <span>Assign Topic:</span>
                          </span>
                          <span className="text-[10px] font-mono text-[#21F1A8]">
                            {video.category === 'Uncategorized' ? 'Pending Verification' : 'Assigned'}
                          </span>
                        </div>

                        <select
                          value={video.category}
                          onChange={(e) =>
                            handleCategoryChange(
                              video.id,
                              e.target.value as VideoSubjectCategory
                            )
                          }
                          aria-label={`Assign category for ${video.title}`}
                          className="w-full bg-[#171717] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#21F1A8] transition-all cursor-pointer min-h-[40px]"
                        >
                          {SUBJECT_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Action Button: "▶ Watch Video" */}
                    <div className="pt-3 border-t border-white/[0.06]">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#171717] bg-[#21F1A8] hover:bg-[#21F1A8]/90 active:scale-95 rounded-xl shadow-md shadow-[#21F1A8]/20 transition-all min-h-[44px] cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>▶ Watch Video</span>
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-[#1f1f1f] border border-white/[0.08] rounded-2xl p-10 text-center max-w-md mx-auto">
            <Video className="w-8 h-8 text-[#555555] mx-auto mb-2" />
            <h4 className="text-base font-heading font-bold text-white mb-1">
              No videos found matching your filter
            </h4>
            <p className="text-xs text-[#888888] mb-4">
              Try searching for "Learning Video" or switch back to the "All" subject filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#171717] bg-[#21F1A8] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Instructions / Privacy Note */}
        <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#888888] font-mono gap-2">
          <div>
            Clicking any card opens the original YouTube link in a new tab.
          </div>
          <div className="text-[#21F1A8]">
            Category assignments are stored locally on your device.
          </div>
        </div>

      </div>
    </section>
  );
};
