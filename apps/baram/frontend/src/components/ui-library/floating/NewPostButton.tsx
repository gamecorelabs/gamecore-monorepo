import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function NewPostButton({ link }: { link?: string }) {
  return (
    <div className="fixed bottom-6 right-0 px-6 z-100">
      <div className="flex justify-end">
        <Link
          href="/posts/new"
          className="bg-indigo-100 hover:bg-indigo-200 text-white p-3 rounded-full shadow-lg"
          aria-label="글쓰기"
        >
          <PencilSquareIcon className="h-4 w-4 text-gray-500" />
        </Link>
      </div>
    </div>
  );
}
