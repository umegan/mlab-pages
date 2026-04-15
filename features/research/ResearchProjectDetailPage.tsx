import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { getAllPublications } from '../achievements/data/loader';
import type { Publication } from '../achievements/types';
import { getResearchProjectById } from './projects';

function buildPublicationSearchTarget(publication: Publication): string {
  return [
    publication.title,
    publication.abstract,
    publication.venue,
    publication.project,
    publication.authors,
    publication.tags?.join(' '),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export const ResearchProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    return <Navigate to="/research" replace />;
  }

  const project = getResearchProjectById(projectId);
  if (!project) {
    return <Navigate to="/research" replace />;
  }

  const relatedPublications = useMemo(() => {
    const allPublications = getAllPublications();
    const idSet = new Set(project.relatedPublicationIds ?? []);
    const keywords = (project.relatedPublicationKeywords ?? [])
      .map((keyword) => keyword.trim().toLowerCase())
      .filter(Boolean);

    const scored = allPublications
      .map((publication) => {
        const text = buildPublicationSearchTarget(publication);
        const matchedKeywordCount = keywords.reduce((count, keyword) => {
          return text.includes(keyword) ? count + 1 : count;
        }, 0);
        const idBonus = idSet.has(publication.id) ? 100 : 0;
        const score = idBonus + matchedKeywordCount;
        return { publication, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.publication.year !== a.publication.year) return b.publication.year - a.publication.year;
        return a.publication.title.localeCompare(b.publication.title, 'ja');
      });

    return scored.slice(0, 8).map((entry) => entry.publication);
  }, [project.relatedPublicationIds, project.relatedPublicationKeywords]);

  const details = project.detail;
  const hasGrantInfo = Boolean(details?.grantTitle || details?.grantNumber || details?.grantCategory);

  return (
    <div className="min-h-screen pt-20 bg-[#F9F5F0]">
      <div className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[#344F1F]/10 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <Button asChild variant="outline" className="mb-6 border-[#344F1F]/20 text-[#344F1F]">
            <Link to="/research" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              研究一覧へ戻る
            </Link>
          </Button>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#344F1F] mb-3">{project.title}</h1>
          {details?.subtitle && <p className="text-lg text-[#344F1F]/80">{details.subtitle}</p>}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <section className="bg-white border border-[#344F1F]/15 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#344F1F] mb-4">プロジェクト概要</h2>
          <p className="text-[#344F1F]/85 leading-relaxed">{project.description}</p>
        </section>

        {details ? (
          <>
            {(hasGrantInfo || (details.references && details.references.length > 0)) && (
              <section className="bg-white border border-[#344F1F]/15 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[#344F1F] mb-6">
                  {hasGrantInfo ? '研究課題情報' : '関連リンク'}
                </h2>
                {hasGrantInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-[#344F1F]/70 mb-1">研究課題</p>
                      <p className="text-[#344F1F] font-semibold">{details.grantTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#344F1F]/70 mb-1">研究課題/領域番号</p>
                      <p className="text-[#344F1F] font-semibold">{details.grantNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#344F1F]/70 mb-1">研究種目</p>
                      <p className="text-[#344F1F] font-semibold">{details.grantCategory}</p>
                    </div>
                  </div>
                )}
                {details.references && details.references.length > 0 && (
                  <div className={`${hasGrantInfo ? 'mt-6' : ''} flex flex-wrap gap-3`}>
                    {details.references.map((reference) => (
                      <Button
                        key={reference.url}
                        asChild
                        variant="outline"
                        className="border-[#F4991A] text-[#F4991A] hover:bg-[#F4991A] hover:text-white"
                      >
                        <a href={reference.url} target="_blank" rel="noopener noreferrer">
                          {reference.label}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </section>
            )}

            {details.keywords && details.keywords.length > 0 && (
              <section className="bg-white border border-[#344F1F]/15 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[#344F1F] mb-5">キーワード</h2>
                <div className="flex flex-wrap gap-2">
                  {details.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1.5 bg-[#F2EAD3] text-[#344F1F] text-sm font-medium rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {details.overview && (
              <section className="bg-white border border-[#344F1F]/15 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[#344F1F] mb-4">研究開始時の概要</h2>
                <p className="text-[#344F1F]/85 leading-relaxed">{details.overview}</p>
              </section>
            )}

            {details.progress && (
              <section className="bg-white border border-[#344F1F]/15 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[#344F1F] mb-4">研究実績の概要</h2>
                <p className="text-[#344F1F]/85 leading-relaxed whitespace-pre-line">{details.progress}</p>
              </section>
            )}
          </>
        ) : (
          <section className="bg-white border border-[#344F1F]/15 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#344F1F] mb-4">詳細情報</h2>
            <p className="text-[#344F1F]/80">このプロジェクトの詳細情報は現在準備中です。</p>
          </section>
        )}

        <section className="bg-white border border-[#344F1F]/15 rounded-2xl p-8">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <h2 className="text-2xl font-bold text-[#344F1F]">関連業績</h2>
            <Button asChild variant="outline" className="border-[#344F1F]/20 text-[#344F1F]">
              <Link to="/achievements">業績一覧を見る</Link>
            </Button>
          </div>
          {relatedPublications.length > 0 ? (
            <div className="space-y-4">
              {relatedPublications.map((publication) => (
                <article
                  key={publication.id}
                  className="border border-[#344F1F]/10 rounded-xl p-4 hover:border-[#F4991A]/60 transition-colors"
                >
                  <p className="text-sm text-[#344F1F]/60 mb-1">{publication.year}</p>
                  <h3 className="text-[#344F1F] font-bold mb-1">{publication.title}</h3>
                  <p className="text-sm text-[#344F1F]/80 mb-2">{publication.venue}</p>
                  <p className="text-sm text-[#344F1F]/70">{publication.authors}</p>
                  {publication.link && publication.link.trim() !== '' && (
                    <a
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-sm text-[#F4991A] hover:underline"
                    >
                      外部リンク
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="text-[#344F1F]/75">関連業績は現在準備中です。</p>
          )}
        </section>
      </div>
    </div>
  );
};
