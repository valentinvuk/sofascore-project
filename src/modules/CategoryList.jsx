import { useCallback, useEffect, useState } from "react";
import { CategoryCard } from "../modules/CategoryCard";
import { fetchCategoryList } from "../api/categoryList";
import { useParams } from "react-router";

export function CategoryList() {
  const [list, setList] = useState([]);
  const { sport, offset } = useParams();

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetchCategoryList(sport, offset);
        setList(res.categories);
      } catch (err) {
        console.log(err);
      }
    }
    fetchList();

    return () => setList([]);
  }, [sport, offset]);

  const renderCategories = useCallback(() => {
    if (list?.length) {
      return list

        .sort((a, b) => b.category.priority - a.category.priority)
        .map((category) => (
          <CategoryCard
            key={category.category.id}
            category={category.category}
            offset={offset}
          />
        ));
    } else {
      return <p className="loading main">Loading...</p>;
    }
  }, [list, offset]);

  return <div className="category-list">{renderCategories()}</div>;
}
