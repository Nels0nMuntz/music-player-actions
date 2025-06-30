import { useState } from "react";
import { TasksFilter } from "../../../src/features/tracks/filter-tracks/ui/TasksFilter";

export const FilterWrapper = ({ title }: { title: string }) => {
  const [filter, setFilter] = useState("");
  return (
    <TasksFilter
      title={title}
      filter={filter}
      onChange={(value) => setFilter(value)}
      testId="filter-button"
    />
  );
};