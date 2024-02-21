"use client";

import { type ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { type MediaContent } from "@/lib/hooks/useRatingsData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  listItems: Map<string, MediaContent[]>;
}

function FilteredList({ className, listItems, ...props }: Props) {
  const defaultValue = Array.from(listItems.keys())[0] ?? "";
  const [selectedKey, setSelectedKey] = useState(
    Array.from(listItems.keys())[0] ?? "",
  );

  const onOptionChangeHandler = (newValue: string) => {
    setSelectedKey(newValue);
  };

  return (
    <div className={cn(className, "")} {...props}>
      <div className="flex w-full justify-center">
        <Select onValueChange={onOptionChangeHandler}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose a genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Genres</SelectLabel>
              {Array.from(listItems.keys()).map((option, index) => {
                return (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
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
