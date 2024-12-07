import React, { useState, useEffect } from 'react';
import { FaEye, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = async (isSearch = false) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://dummyjson.com/posts?limit=10&skip=${(page - 1) * 10}`
            );
            const result = await response.json();
            if (result.posts.length > 0) {
                setBlogs((prevBlogs) => (isSearch ? result.posts : [...prevBlogs, ...result.posts]));
            } else {
                setHasMore(false);
            }
        } catch (err) {
            toast.error('Failed to fetch posts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasMore) fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleSearch = async () => {
        if (!searchQuery) {
            toast.warning('Please enter a search query!');
            return;
        }
        setLoading(true);
        setPage(1);
        setHasMore(true);
        fetchPosts(true);
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100 &&
            !loading &&
            hasMore
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    return (
        <div className="">
            {/* Search Input */}
            <div className="flex justify-center mt-10">
                <input
                    aria-label="Search Blogs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-2 rounded-3xl lg:w-[30%] w-[50%] h-10 focus:outline-none placeholder:text-md caret-blue-500 pl-4"
                    placeholder="Search blogs..."
                />
                <button
                    aria-label="Search Button"
                    onClick={handleSearch}
                    className="ml-2 h-10 bg-black text-white px-5 py-2 rounded-3xl hover:bg-slate-700"
                >
                    Search
                </button>
            </div>

            {/* Loading Indicator */}
            {loading && <div className="text-gray-500 text-center mt-5">Loading...</div>}

            {/* Blog Posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 mt-6 mb-6">
                {!loading && blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <div
                            key={index}
                            className="bg-slate-200 border rounded-md shadow-md p-4 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-bold text-lg text-gray-700 mb-2">{blog.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {blog.body.slice(0, 100)}...
                                </p>
                            </div>

                            <div className="flex gap-4 text-gray-600 mt-2 border-t">
                                <div className="flex items-center gap-2">
                                    <FaEye /> <span>{blog.views}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaThumbsUp className="text-green-500" />{' '}
                                    <span>{blog.reactions?.likes || 0}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaThumbsDown className="text-red-500" />{' '}
                                    <span>{blog.reactions?.dislikes || 0}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && (
                        <div className="text-center text-gray-500 mt-10">No blogs found.</div>
                    )
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default BlogList;
