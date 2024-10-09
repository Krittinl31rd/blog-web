import axios from "axios";
import Link from 'next/link'
import { cookies, headers } from "next/headers";

const fetchSpecialBlogs = async () => {
    try {
        const token = cookies().get('token')
        const resp = await axios.get(`${process.env.STRAPI_BASE_URL}/api/special-blogs`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.value}`,
            }
        })
        return resp.data.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export default async function Page() {
    const blogs = await fetchSpecialBlogs();
    const headerList = headers();
    const user = JSON.parse(headerList.get('user'))
    return (
        <div className='container mx-auto'>
            Welcome, {user.username} | {user.email}
            <div className='grid grid-cols-4 gap-2'>
                {
                    blogs.map((blog, index) => (
                        <div className='flex flex-col' key={index}>
                            <div className='text-3xl'>{blog.attributes.title}</div>
                            <div>{blog.attributes.description}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}