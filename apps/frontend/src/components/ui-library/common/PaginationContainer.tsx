"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  takeByPage: number;
  visiblePageCount: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = ({
  currentPage,
  totalCount,
  takeByPage,
  visiblePageCount,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / takeByPage);
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(visiblePageCount / 2),
      totalPages - visiblePageCount + 1
    )
  );
  const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const prevPage = Math.max(1, currentPage - visiblePageCount);
  const nextPage = Math.min(totalPages, currentPage + visiblePageCount);

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === currentPage}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination className="my-4">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(1);
              }}
              className="mr-2"
            >
              <ChevronDoubleLeftIcon />
            </PaginationLink>
          </PaginationItem>
        )}

        {hasPrevPage && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(prevPage);
              }}
            />
          </PaginationItem>
        )}

        {renderPageNumbers()}

        {hasNextPage && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(nextPage);
              }}
            />
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPages);
              }}
              className="ml-2"
            >
              <ChevronDoubleRightIcon />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationContainer;
