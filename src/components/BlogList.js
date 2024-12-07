import React, { useState } from 'react';
import { FaEye, FaThumbsUp, FaThumbsDown, FaSearch } from 'react-icons/fa';
import { dummyBlogs } from '../data/dummyBlogs';


const BlogList = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const blogs = dummyBlogs;


  // Filtering Logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.trim().toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter ? blog.category === selectedFilter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="flex flex-wrap justify-center items-center mt-6 gap-4 px-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-[60%] md:w-[45%] lg:w-[30%]">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <FaSearch className="text-md" />
          </span>
          <input
            aria-label="Search Blogs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 rounded-3xl w-full h-10 pl-10 pr-4 focus:outline-none placeholder:text-md"
            placeholder="Start typing to search"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border-2 rounded-3xl h-10 px-4 focus:outline-none w-full sm:w-auto"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Travel">Travel</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>
      </div>


      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 mt-6 mb-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-slate-100 border rounded-md shadow-md p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-lg text-gray-700 mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{blog.body}</p>
              </div>
              <div className="flex gap-4 text-gray-600 mt-2 border-t pt-2">
                <div className="flex items-center gap-2">
                  <FaEye /> <span>{blog.views}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaThumbsUp className="text-green-500" /> <span>{blog.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaThumbsDown className="text-red-500" /> <span>{blog.dislikes}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">No blogs found.</div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
