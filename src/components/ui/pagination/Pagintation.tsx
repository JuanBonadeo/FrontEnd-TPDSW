'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SkipBack } from 'lucide-react';
import { generatePaginationNumbers } from '@/utils/generatePaginationNumbers';

interface Props {
  totalPages: number;
}

type PageItem = number | string;

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();


  const paramsSnapshot = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);
  const pageString = paramsSnapshot.get('page') ?? '1';

  const currentPage = Number.isNaN(+pageString) ? 1 : Math.max(1, +pageString);

  // En cliente no usamos redirect(); normalizamos por router.push
  useEffect(() => {
    if (Number.isNaN(+pageString) || currentPage < 1) {
      router.push(pathname);
    }
  }, [currentPage, pageString, pathname, router]);

  const allPages: PageItem[] = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: PageItem) => {
    const p = new URLSearchParams(paramsSnapshot.toString());

    if (pageNumber === '...') {
      // Mantener en la misma página
      return `${pathname}?${p.toString()}`;
    }

    if (typeof pageNumber === 'number' && pageNumber <= 0) {
      return `${pathname}`;
    }

    if (typeof pageNumber === 'number' && pageNumber > totalPages) {
      return `${pathname}?${p.toString()}`;
    }

    p.set('page', String(pageNumber));
    return `${pathname}?${p.toString()}`;
  };

  const linkBase =
    'page-link relative block py-1.5 px-3 rounded outline-none transition-all duration-300 focus:shadow-none';

  return (
    <div className="flex justify-center text-center mt-10 mb-32">
      <nav aria-label="Pagination">
        <ul className="flex list-style-none items-center gap-1">
          {/* Prev */}
          {
            currentPage > 1 && (
              <li className="page-item">
                <Link
                  href={createPageUrl(Math.max(1, currentPage - 1))}
                  className={`${linkBase} text-primary hover:bg-gray-200`}
                  aria-label="Página anterior"
                >
                  <SkipBack size={22} />
                </Link>
              </li>
            )}

          {/* Pages */}
          {allPages.map((page, index) => {
            // Usar index para hacer keys únicas cuando hay múltiples "..."
            const key = page === '...' ? `ellipsis-${index}` : String(page);
            const isActive = page === currentPage;

            if (page === '...') {
              return (
                <li className="page-item" key={key}>
                  <span className={`${linkBase} text-primary select-none cursor-default`}>…</span>
                </li>
              );
            }

            return (
              <li className="page-item" key={key}>
                <Link
                  href={createPageUrl(page)}
                  className={
                    linkBase +
                    ' ' +
                    (isActive
                      ? 'bg-primary shadow-md '
                      : 'text-primary hover:bg-gray-200')
                  }
                  aria-current={isActive ? 'page' : undefined}
                >
                  {page}
                </Link>
              </li>
            );
          })}

          {/* Next (ícono rotado) */}
          {currentPage < totalPages && (
            <li className="page-item">
              <Link
                href={createPageUrl(Math.min(totalPages, currentPage + 1))}
                className={`${linkBase} text-primary hover:bg-gray-200`}
                aria-label="Página siguiente"
              >
                <SkipBack size={22} className="rotate-180" />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
