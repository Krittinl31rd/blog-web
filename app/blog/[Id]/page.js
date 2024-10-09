
import axios from "axios";

const fetchBlogs = async (Id) => {
    try {
        const resp = await axios.get(`${process.env.STRAPI_BASE_URL}/api/blogs/${Id}?populate=thumbnail,author`)
        return resp.data.data
    } catch (error) {
        console.log(error)
        return []
    }
}


export default async function Page({ params }) {
    const blogId = params.Id
    const blog = await fetchBlogs(blogId);

    return <div className='container mx-auto'>
        <img width="100px"
            src={`${process.env.STRAPI_BASE_URL}${blog.attributes.thumbnail.data.attributes.formats.thumbnail.url}`}></img>
        <div>
            {blog.attributes.title}
        </div>
        <div>
            author by: {blog.attributes.author.data.attributes.name}
        </div>
    </div>
}