"use client";

import { useFetchCategory } from "@/data/categories/useCategoryList";
// import { useStyle } from "@/utils/helper";

export default function CategoryList() {
  //   const { styles } = useStyle();
  const { data: categoryList } = useFetchCategory();
  console.log("categoryList", categoryList);

  return (
    <div>
      lssit <h1>dfkj</h1>
    </div>
  );
}
