"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useAppDispatch } from "@/app/store/hooks";
import { addToCart } from "@/features/cart/model/cart-slice";
import { cn } from "@/shared/lib/cn";

export function AddToCartButton({
  productId,
  compact = false,
}: {
  productId: string;
  compact?: boolean;
}) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    dispatch(addToCart(productId));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-[#294638] bg-[#294638] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d3529] hover:shadow-[0_9px_20px_#29463820] active:translate-y-0",
        compact
          ? "h-10 w-full px-3 text-[9px] font-bold sm:text-[10px]"
          : "h-13 px-6 text-xs font-semibold",
      )}
    >
      {added ? (
        <>
          <Check size={14} /> Добавлено
        </>
      ) : (
        <>
          <ShoppingBag size={14} />{" "}
          {compact ? "В корзину" : "Добавить в корзину"}
        </>
      )}
    </button>
  );
}
