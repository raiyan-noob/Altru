import React from 'react';

export function EventCardSkeleton() {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-base-300 w-full"></div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-base-300 rounded-full w-24"></div>
          <div className="h-4 bg-base-300 rounded w-16"></div>
        </div>
        <div className="h-6 bg-base-300 rounded w-4/5"></div>
        <div className="h-4 bg-base-300 rounded w-3/5"></div>
        <div className="space-y-1.5 pt-2">
          <div className="h-3 bg-base-300 rounded w-full"></div>
          <div className="h-3 bg-base-300 rounded w-5/6"></div>
        </div>
        <div className="pt-4 border-t border-base-200 flex items-center justify-between">
          <div className="h-4 bg-base-300 rounded w-28"></div>
          <div className="h-9 bg-base-300 rounded-xl w-24"></div>
        </div>
      </div>
    </div>
  );
}

export function EventDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-pulse">
      <div className="h-80 bg-base-300 rounded-3xl w-full"></div>
      <div className="space-y-4">
        <div className="h-8 bg-base-300 rounded-lg w-3/4"></div>
        <div className="flex gap-4">
          <div className="h-5 bg-base-300 rounded w-32"></div>
          <div className="h-5 bg-base-300 rounded w-40"></div>
        </div>
        <div className="h-24 bg-base-300 rounded-xl w-full"></div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-base-200">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-base-300 rounded-xl"></div>
          <div className="space-y-1">
            <div className="h-4 bg-base-300 rounded w-40"></div>
            <div className="h-3 bg-base-300 rounded w-24"></div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="h-6 bg-base-300 rounded-full w-20"></div>
      </td>
      <td className="py-4 px-4">
        <div className="h-4 bg-base-300 rounded w-28"></div>
      </td>
      <td className="py-4 px-4">
        <div className="h-4 bg-base-300 rounded w-32"></div>
      </td>
      <td className="py-4 px-4 text-right">
        <div className="h-8 bg-base-300 rounded-lg w-20 inline-block"></div>
      </td>
    </tr>
  );
}

