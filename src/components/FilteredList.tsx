import { type ChangeEvent, useState } from "react";
import { cn } from "~/lib/utils";
import { type MediaContent } from "~/hooks/useChartData";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  listItems: Map<string, MediaContent[]>;
}

function FilteredList({ className, listItems, ...props }: Props) {
  const defaultValue = Array.from(listItems.keys())[0] ?? "";
  const [selectedKey, setSelectedKey] = useState(
    Array.from(listItems.keys())[0] ?? "",
  );

  const onOptionChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(event.target.value);
  };

  return (
    <div className={cn(className, "")} {...props}>
      <div className="flex w-full justify-center">
        <select onChange={onOptionChangeHandler} defaultValue={defaultValue}>
          <option>Choose a genre</option>
          {Array.from(listItems.keys()).map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
      </div>
      <ol>
        {listItems.get(selectedKey)?.map((movie, index) => {
          return (
            <li key={index} className="flex justify-between">
              <span>{movie.title}</span>
              <span>{movie.userRating}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default FilteredList;
