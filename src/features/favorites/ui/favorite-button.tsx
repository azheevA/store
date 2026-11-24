"use client";

import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { toggleFavorite } from "@/features/favorites/model/favorites-slice";

export function FavoriteButton({ productId }: { productId: string }) {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) =>
    state.favorites.ids.includes(productId),
  );
  return (
    <button
      type="button"
      onClick={() => dispatch(toggleFavorite(productId))}
      aria-pressed={active}
      aria-label={active ? "Убрать из избранного" : "Добавить в избранное"}
      className="grid h-12 w-12 place-items-center rounded-full border border-[#dfe6dc] bg-white text-[#344c3c] transition hover:border-[#789477] hover:bg-[#f1f5ef]"
    >
      <Heart
        size={18}
        strokeWidth={1.4}
        fill={active ? "currentColor" : "none"}
      />
    </button>
  );
}
