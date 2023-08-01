import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";

type Item = {
  name: string;
  quantity: number;
  isSelected: boolean;
};

export default function App() {
  const [items, setItems] = useState<Item[]>([
    { name: "item 1", quantity: 1, isSelected: false },
    { name: "item 2", quantity: 2, isSelected: false },
    { name: "item 3", quantity: 4, isSelected: false },
    { name: "item 4", quantity: 2, isSelected: false },
    { name: "item 5", quantity: 3, isSelected: false },
    { name: "item 6", quantity: 4, isSelected: false },
    { name: "item 7", quantity: 5, isSelected: false },
    { name: "item 8", quantity: 9, isSelected: false },
  ]);

  const [ latestChange, setLatestChange ] = useState<Item | null>(null);
  const [ latestChangeIndex, setLatestChangeIndex ] = useState<number>(0);

  useEffect(() => {
    for (const item of items) {
      console.log(item);
    }
    console.log("------------------");
  }, [items]);

  const debouncedItems = useDebounce(items, 1000);
  const deboundLatestChangeIndex = useDebounce(latestChangeIndex, 1000);

  useEffect(() => {
    const latestSelected = debouncedItems[deboundLatestChangeIndex];
    setLatestChange(latestSelected || null);
  }, [debouncedItems, deboundLatestChangeIndex]);

  const handleSelectItem = (index: number) => {
    const updatedItems = items;
    updatedItems[latestChangeIndex] = { ...updatedItems[latestChangeIndex], isSelected: false };
    
    setLatestChangeIndex(index);
    updatedItems[index] = { ...updatedItems[index], isSelected: true };

    setItems(updatedItems);
  };

  return (
    <div className="p-4">
      <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Item List</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={item.isSelected}
                  onChange={() => handleSelectItem(index)}
                />
                <span>{item.name}</span>
              </div>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
        <br/>
        <p className="text-gray-600">Latest changing of isSelected: {latestChange?.name}</p>
      </div>
    </div>
  );
}
