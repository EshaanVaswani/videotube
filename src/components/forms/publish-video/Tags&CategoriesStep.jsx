import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

import {
   setTagsCategory,
   nextStep,
   prevStep,
} from "@/store/reducers/videoFormReducer";

const CATEGORIES = [
   "Entertainment",
   "Education",
   "Gaming",
   "Music",
   "Sports",
   "News",
   "Technology",
   "Travel",
   "Food",
   "Lifestyle",
   "Other",
];

export const TagsCategoriesStep = () => {
   const dispatch = useDispatch();
   const { formData } = useSelector((state) => state.videoForm);

   const [tags, setTagsLocal] = useState(formData.tags || []);
   const [category, setCategoryLocal] = useState(formData.category || "");
   const [tagInput, setTagInput] = useState("");

   const handleAddTag = (e) => {
      if (e.key === "Enter" && tagInput.trim()) {
         e.preventDefault();
         if (!tags.includes(tagInput.trim())) {
            const newTags = [...tags, tagInput.trim()];
            setTagsLocal(newTags);
         }
         setTagInput("");
      }
   };

   const handleRemoveTag = (tagToRemove) => {
      const newTags = tags.filter((tag) => tag !== tagToRemove);
      setTagsLocal(newTags);
   };

   const handleCategoryChange = (value) => {
      setCategoryLocal(value);
   };

   const handleNext = () => {
      dispatch(setTagsCategory({ tags, category }));
      dispatch(nextStep());
   };

   return (
      <div className="space-y-6 h-full flex flex-col">
         <div>
            <h2 className="text-xl font-semibold">Tags & Category</h2>
            <p className="text-muted-foreground text-sm mt-1">
               Help viewers find your video
            </p>
         </div>

         <div className="space-y-6 flex-grow">
            {/* Category */}
            <div className="space-y-2">
               <Label>Category</Label>
               <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                     <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                     {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                           {cat}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
               <Label htmlFor="tags">Tags</Label>
               <Input
                  id="tags"
                  placeholder="Type a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
               />
               {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                     {tags.map((tag) => (
                        <Badge
                           key={tag}
                           variant="secondary"
                           className="flex items-center gap-1 pr-1"
                        >
                           {tag}
                           <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 hover:bg-muted rounded-full p-0.5"
                           >
                              <X className="h-3 w-3" />
                           </button>
                        </Badge>
                     ))}
                  </div>
               )}
               <p className="text-sm text-muted-foreground">
                  Press Enter to add a tag
               </p>
            </div>
         </div>

         <div className="flex justify-between">
            <Button
               variant="outline"
               type="button"
               onClick={() => dispatch(prevStep())}
            >
               <ArrowLeft className="mr-2 h-4 w-4" />
               Back
            </Button>
            <Button type="button" onClick={handleNext}>
               Next
               <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
         </div>
      </div>
   );
};
