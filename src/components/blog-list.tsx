"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, Filter, Search, X } from "lucide-react";
import type { Blog } from "@/lib/blogs";

interface BlogListProps {
  initialBlogs: Blog[];
}

export default function BlogList({ initialBlogs }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allTags = useMemo(() => {
    const tags = initialBlogs.flatMap((blog) => blog.meta.tags || []);
    return [...new Set(tags)].sort();
  }, [initialBlogs]);

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesSearch =
        searchQuery === "" ||
        blog.meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.meta.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        blog.meta.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        (blog.meta.tags &&
          selectedTags.some((tag) => blog.meta.tags?.includes(tag)));

      return matchesSearch && matchesTags;
    });
  }, [initialBlogs, searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => {
    setSelectedTags([]);
    setSearchQuery("");
    setIsFilterOpen(false);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex gap-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            type="search"
            placeholder="Search blogs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="relative"
              suppressHydrationWarning
            >
              <Filter size={20} />
              {selectedTags.length > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
                >
                  {selectedTags.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filter by Tags</h4>
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="h-auto p-1 text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <Separator />
              <div className="space-y-2">
                {allTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <motion.button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`flex items-center justify-between w-full px-2 py-1 text-sm rounded-md hover:bg-accent transition-colors ${
                        isSelected ? "text-primary" : "text-foreground"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{tag}</span>
                      {isSelected && <Check size={16} />}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </motion.div>

      {/* Selected Tags Display */}
      <AnimatePresence>
        {selectedTags.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {selectedTags.map((tag) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  />
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog List */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AnimatePresence>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="block"
                  title={`Blog - ${blog.meta.title}`}
                >
                  <Card
                    className="border-none pl-0 hover:bg-accent/50 transition-colors duration-200
                             dark:hover:bg-accent/30 cursor-pointer shadow-none rounded-none"
                  >
                    <CardContent className="my-auto flex justify-between py-2 my-2 pl-0 rounded-none">
                      <div className="flex flex-col justify-center text-left">
                        <CardTitle
                          className="text-lg font-bold text-2xl mb-1
                                            group-hover:text-primary
                                            dark:group-hover:text-primary-foreground"
                        >
                          {blog.meta.title}
                        </CardTitle>

                        <CardDescription className="text-muted-foreground flex flex-wrap items-center gap-2">
                          <span>{blog.meta.date}</span>
                          <span className="text-xs">•</span>
                          <span>{blog.readTime} min read</span>

                          {blog.meta.tags && blog.meta.tags.length > 0 && (
                            <>
                              <span className="text-xs">•</span>
                              <span className="text-xs">
                                {blog.meta.tags.join(", ")}
                              </span>
                            </>
                          )}
                        </CardDescription>
                      </div>
                    </CardContent>
                    <hr />
                  </Card>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center text-muted-foreground py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No blogs found matching your search criteria.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
