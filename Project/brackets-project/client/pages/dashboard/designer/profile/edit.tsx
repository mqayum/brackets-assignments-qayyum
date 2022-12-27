import React, {ReactElement, useEffect, useState} from "react";
import Image from "next/image"
import DashboardLayout from "../../../../components/layouts/DashboradLayout";
import {useGetDesignerQuery, useUpdateDesignerMutation, useUpdateDesLogoMutation} from "../../../../api/spApi";
import {FiUpload} from "react-icons/fi"
import {useRouter} from "next/router";
import toast from "react-hot-toast";
import {BACKEND_URL} from "../../../../config/constants";
import {FaTimes} from "react-icons/fa";
import DesignerDashboard from "../index";

const DesignerProfile = () => {
    const {data, isSuccess} = useGetDesignerQuery();

    const [updateDesigner, {error}] = useUpdateDesignerMutation()

    const [updateDesLogo, {error:uploadError}] = useUpdateDesLogoMutation();

    const [state, setState] = useState({
        spName: "",
        jobTitle: "",
        skills: [""],
        bio: ""
    })
    const [tagInput, setTagInput] = useState("");

    useEffect(()=>{
        if (isSuccess){
            setState(data.sp);
            // setTagInput(data.sp.skills)
        }
    },[data])


    const router = useRouter();
    const clickUploadButton = () => {
        if (window !== undefined && document !== undefined){
            document.getElementById("logo")?.click();
        }
    }

    if (isSuccess){
        const designer = data.sp

        const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
            const name = event.target.name;
            let value = event.target.value;
            if (name==="skills")
                setTagInput(value)
            else
                setState({ ...state, [name]: value });
        };
        const handleTagsInput = () => {
            let skillsArray = state.skills;
            const tags = tagInput.split(",").filter((tag:string)=>tag).map((tag)=>tag.trim());
            skillsArray = Array.from(new Set([...skillsArray, ...tags]).values());
            setState({ ...state, skills: skillsArray });
            setTagInput("");
        }
        const handleTagsInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key == "Enter"){
                handleTagsInput();
            }
        }

        const removeSkill = (skill:string) => {
            const newArr = state.skills.filter((s)=> s !== skill)
            setState({...state, skills:newArr})
        }
        const handleSubmit = async () => {
            try {
                const res = await updateDesigner({data:state, spId:designer.id}).unwrap();
                if (!error){
                    toast.success(" Designer Profile Updated Successfully.");
                    router.push("/dashboard/designer/profile")
                }
            }
            catch (e) {
                // @ts-ignore
                toast.error("Error: "+e.data.message);
                console.log(e)
            }
        }
        const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
            try {
                const formData = new FormData();
                const files = e.target.files;
                // @ts-ignore
                formData.append("brandLogo", files[0]);

                const uploadRes = await updateDesLogo({formData, spId:designer.id});
                if (!uploadError)
                    toast.success("Business Logo Updated Successfully.");
            }
            catch (e) {
                // @ts-ignore
                toast.error("Error: "+e.data.message);
                console.log(e)
            }
        }
        return (
            <>
                <div className="card flex justify-between items-center bg-base-100 px-10">

                        <figure>
                            {designer.brandLogo ?
                                <Image src={`${BACKEND_URL}/${designer.brandLogo}`} width={150} height={150} className="mask mask-circle" alt="Profile Image"/>:
                                <Image src={`${BACKEND_URL}/avatar.png`} width={150} height={150} className="mask mask-circle" alt="Profile Image"/>}
                        </figure>
                        <div className="card-title flex flex-col text-3xl mt-5">
                            <span>{designer.spName}</span>
                            <div className="px-4 py-2 flex gap-2">
                                <button className="btn btn-primary flex gap-2" onClick={clickUploadButton}>
                                    <FiUpload />
                                    Upload Profile Image
                                </button>
                                <input type="file" accept="image/*" hidden={true} id="logo" name="brandLogo" onChange={uploadImage} />
                            </div>
                        </div>
                        <div className="card-body">
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-1 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Brand Name</div>
                                    <div className="px-4 py-2">
                                        <input type="text" placeholder="Brand Name" name="spName" value={state.spName} onChange={handleChange} className="input input-sm input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Job Title</div>
                                    <div className="px-4 py-2">
                                        <input type="text" placeholder="Job Title" name="jobTitle" value={state.jobTitle} onChange={handleChange} className="input input-sm input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Skills</div>
                                    <div className="px-4 py-2 grid grid-cols-1">
                                        <input type="text" placeholder="Skills" name="skills" value={tagInput} onChange={handleChange} onBlur={handleTagsInput} onKeyDown={handleTagsInputKeyDown} className="input input-sm input-bordered w-full max-w-xs" />
                                        <div className="flex flex-wrap gap-2 mt-5">
                                            {state.skills.map((skill, index)=>{
                                                return (
                                                    <div className="inline-block flex justify-center badge badge-primary gap-2 " key={index}>
                                                        {skill}
                                                        <button onClick={()=>removeSkill(skill)} >
                                                            <FaTimes className="hover:fill-red-400 hover:transition" />
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Biography</div>
                                    <div className="px-4 py-2">
                                        <input type="text" placeholder="Biography" name="bio" value={state.bio} onChange={handleChange} className="input input-sm input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleSubmit}
                            className="btn btn-outline btn-primary">Update Profile
                        </button>
                    </div>

                </div>
            </>
        )
    }

}
DesignerProfile.getLayout = (page:ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
DesignerProfile.requiredRole = "DESIGNER"

export default DesignerProfile