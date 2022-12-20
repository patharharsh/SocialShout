import UploadPostForm from "../../components/Forms/uploadPostForm";
import Layout from "../../layout";

const UploadPost = ( props ) => {
    return(
        <>
            <Layout userData={props.userData} >
                <UploadPostForm  userData={props.userData} />
            </Layout>
        </>
    )
}

export default UploadPost;