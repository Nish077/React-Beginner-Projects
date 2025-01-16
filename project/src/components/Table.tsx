import { useState } from 'react'
import { data } from '../utils/data'
import { BiSort } from 'react-icons/bi'
import { AiOutlineDown } from 'react-icons/ai'
import { MdSort } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
const Table = () => {

    const [projects, setProjects] = useState(data)
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: string;
    } | null>(null)

    const [filtersVisible, setFiltersVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [filters, setFilters] = useState({
        name: "",
        country: "",
        email: "",
        project: "",
        status: "",
    })


    const sortProjects = (key: string) => {
        let sortedProjects = [...projects];
        if (sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending") {
            sortedProjects.sort((a, b) => (a[key] > b[key] ? -1 : 1));
            setSortConfig({ key, direction: "descending" });
        } else {
            sortedProjects.sort((a, b) => (a[key] > b[key] ? 1 : -1));
            setSortConfig({ key, direction: "ascending" });
        }
        setProjects(sortedProjects);
    }

    const handleSortOption = (key: string) => {
        sortProjects(key);
        setDropdownVisible(false);
    }


    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    const handleStatusChange = (index: number, newStatus: string) => {
        const updateProjects = projects.map((project, i) =>
            i === index ? {
                ...project,
                status: newStatus,
                progress: newStatus === "Completed" ? "100%" : project.progress,
            } : project
        )
        setProjects(updateProjects);
        setStatusDropdownVisible(null);
    }

    const filteredProjects = projects.filter(
        (project) =>
            (searchQuery === "" ||
                Object.values(project).some((value) =>
                    value.toLowerCase().includes(searchQuery.toLowerCase())
                )) &&
            (filters.name === "" ||
                project.client.toLowerCase().includes(filters.name.toLowerCase())) &&
            (filters.country === "" ||
                project.country
                    .toLowerCase()
                    .includes(filters.country.toLowerCase())) &&
            (filters.email === "" ||
                project.email.toLowerCase().includes(filters.email.toLowerCase())) &&
            (filters.project === "" ||
                project.project
                    .toLowerCase()
                    .includes(filters.project.toLowerCase())) &&
            (filters.status === "" ||
                project.status.toLowerCase().includes(filters.status.toLowerCase()))
    );



    const itemsPerPage = 6

    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage

    const currentProjects = filteredProjects.slice(
        startIndex,
        startIndex + itemsPerPage
    )
    const [statusDropdownVisible, setStatusDropdownVisible] = useState<number | null>(null);

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);


    return (

        <div className="p-4 w-[93%] ml-[3.5rem]">
            <div className="flex items-center mb-5">
                <div className='relative'>
                    <button
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                        className='border border-gray-700 flex items-center mt-5 justify-center text-white p-2 rounded'>
                        <BiSort className='mr[0.3rem]' /> sort
                        <AiOutlineDown className='ml-2' />
                    </button>
                    {dropdownVisible && (
                        <div className=' absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg'>
                            {/* sorting options */}
                            <button
                                onClick={() => handleSortOption("client")}
                                className='px-4 py-2 text-white block w-full hover:bg-gray-700'>
                                Name
                            </button>
                            <button
                                onClick={() => handleSortOption("country")}
                                className='px-4 py-2 text-white block w-full hover:bg-gray-700'>
                                Country
                            </button>
                            <button
                                onClick={() => handleSortOption("date")}
                                className='px-4 py-2 text-white block w-full hover:bg-gray-700'>
                                Date
                            </button>
                        </div>
                    )};
                </div>
                {/* filter */}
                <div className='relative w-full ml-4'>
                    <button
                        onClick={() => setFiltersVisible(!filtersVisible)}
                        className="border border-gray-700 flex items-center justify-center text-white p-2 rounded"
                    >
                        <MdSort className="mr-[0.3rem]" />
                        Filters
                        <AiOutlineDown className="ml-2" />
                    </button>

                    {filtersVisible &&
                        <div className='absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg p-4'>
                            <div className='mb-4'>
                                <label className="block text-white">Filter by Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={filters.name}
                                    onChange={handleFilterChange}
                                    className="bg-gray-900 text-white rounded p-2 w-full"
                                />
                            </div>
                            <div className='mb-4'>
                                <label className="block text-white">Filter by Country:</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={filters.country}
                                    onChange={handleFilterChange}
                                    className="bg-gray-900 text-white rounded p-2 w-full"
                                />
                            </div>
                            <div className='mb-4'>
                                <label className="block text-white">Filter by Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={filters.email}
                                    onChange={handleFilterChange}
                                    className="bg-gray-900 text-white rounded p-2 w-full"
                                />
                            </div>
                            <div className='mb-4'>
                                <label className="block text-white">Filter by Projects:</label>
                                <input
                                    type="text"
                                    name="project"
                                    value={filters.project}
                                    onChange={handleFilterChange}
                                    className="bg-gray-900 text-white rounded p-2 w-full"
                                />
                            </div>
                            <label className="block text-white">Filter by Status:</label>
                            <div className='mb-4'>
                                <input
                                    type="text"
                                    name="status"
                                    value={filters.status}
                                    onChange={handleFilterChange}
                                    className="bg-gray-900 text-white rounded p-2 w-full"
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <table
                className='min-w-full table-auto rounded border border-gray-700 text-white shadow'>
                <thead>
                    <tr>
                        <th className="px-5 py-3 text-left">Image</th>
                        <th className="px-5 py-3 text-left">Name</th>
                        <th className="px-5 py-3 text-left">Country</th>
                        <th className="px-5 py-3 text-left">Email</th>
                        <th className="px-5 py-3 text-left">Project Name</th>
                        <th className="px-5 py-3 text-left">Task Progress</th>
                        <th className="px-5 py-3 text-left">Status</th>
                        <th className="px-5 py-3 text-left">Date</th>
                        <th className="px-5 py-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {currentProjects.map((project, index) => (
                        <tr className='border border-gray-700' key={index}>
                            <td className='px-4 py-2'>
                                <img src={project.image}
                                    alt={project.client}
                                    className="w-[3rem] h-[3rem] object-cover rounded-full" />
                            </td>
                            <td className="px-4 py-2">{project.client}</td>
                            <td className="px-4 py-2">{project.country}</td>
                            <td className="px-4 py-2">{project.email}</td>
                            <td className="px-4 py-2">{project.project}</td>

                            <td className="px-4 py-2">
                                <div className="w-24 h-2 bg-gray-700 rounded">
                                    <div
                                        className={`w-[${project.progress}] h-2 bg-green-500 rounded`}
                                    ></div>
                                </div>
                            </td>
                            <td className="px-4 py-2 w-[10rem]">
                                <span
                                    className={`bg-${project.status === "Completed" ? "green" : "yellow"
                                        }-500 p-1 rounded`}
                                >
                                    {project.status}
                                </span>
                            </td>

                            <td className='px-4 py-2 '>{project.date}</td>

                            <td className='px-4 py-2'><div
                                className='relative'>
                                <BsThreeDots className='cursor-pointer'
                                    onClick={() => setStatusDropdownVisible(index)
                                    } />
                                {statusDropdownVisible === index && (
                                    <div
                                        className='absolute top-full right-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg'>
                                        <button
                                            className='block px-4 py-2 text-white hover:bg-gray-700 w-full text-left'
                                            onClick={() => {
                                                handleStatusChange(index, "In Progress")
                                            }
                                            }>In Progress
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(index, "Completed")}
                                            className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left"
                                        >
                                            Completed
                                        </button>
                                    </div>
                                )}
                            </div></td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Pagination */}
            <div className="flex justify-end mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-gray-700 text-white rounded mr-2 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-white">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 bg-gray-700 text-white rounded ml-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Table