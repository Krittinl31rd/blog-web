import axios from "axios";
import Link from 'next/link'

const fetchBlogs = async () => {
  try {
    const resp = await axios.get(`${process.env.STRAPI_BASE_URL}/api/blogs`)
    return resp.data.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function Page() {
  const blogs = await fetchBlogs();
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-4 gap-2'>
        {
          blogs.map((blog, index) => (
            <div className='flex flex-col' key={index}>
              <div className='text-3xl'>{blog.attributes.title}</div>
              <div>{blog.attributes.description}</div>
              <Link className='bg-blue-300 p-4 rounded-lg hover:bg-blue-400' href={`/blog/${blog.id}`}>See more</Link >
            </div>
          ))
        }
      </div>
    </div>
  )
}