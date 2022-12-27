import React, {ReactElement, useState} from "react";
import CenteredFormLayout from "../../components/layouts/CenteredFormLayout";
import {FaTimes} from "react-icons/fa"
import {useRouter} from "next/router";

import {IDesignerObj} from "../../types/types";
import toast,{Toaster} from "react-hot-toast"
import {useGetUserQuery, useRegisterDesignerMutation} from "../../api/userApi";
import {isDesigner} from "../../helpers/authorization.helper";

const RegisterDesigner = () => {
    const {data:userData} = useGetUserQuery();
    const [registerDesigner, {error}] = useRegisterDesignerMutation();

    const router = useRouter();

    if (userData && isDesigner(userData.user)){
        router.push("/dashboard/designer");
    }
    const initialState : IDesignerObj = {
        spName: "",
        jobTitle: "",
        skills: [],
        bio: "",
    }
    const [state, setState] = useState(initialState);
    const [tagInput, setTagInput] = useState("");

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
            const res = await registerDesigner(state).unwrap();
            if (userData && !error){
                toast.success('Designer Registered Successfully!');
                router.push("/")
            }
        }
        catch (e) {
            // @ts-ignore
            toast.error("Error: "+e.data.message);
            console.log(e)
        }
    }
    return(
        <div className="hero min-h-screen bg-base-200">
            <Toaster />
            <div className="hero-content flex-col lg:flex-row-reverse lg:gap-12">
                <div className="text-center lg:text-left lg:w-1/2">
                    <h1 className="text-5xl font-bold">Become Designer at DIM.<br />Register Yourself, Now!</h1>
                    <p className="py-6">If your got graphics designing skills, or wish to sell your digital assets, then fill the registration form, and Start providing your services as a graphic designer on this platform.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:mt-16">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Brand Name</span>
                            </label>
                            <input type="text" placeholder="Brand Name" className="input input-bordered" name="spName" value={state.spName} onChange={handleChange} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" placeholder="Your Speciality" className="input input-bordered" name="jobTitle" value={state.jobTitle} onChange={handleChange} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Skills</span>
                            </label>
                            <input className="input input-bordered" placeholder="Add Your Skills" name="skills" value={tagInput} onChange={handleChange} onBlur={handleTagsInput} onKeyDown={handleTagsInputKeyDown}  />
                            <div className=" flex flex-wrap gap-2 mt-5">
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Bio</span>
                            </label>
                            <textarea className="textarea textarea-bordered" placeholder="Your Professional Bio" name="bio" value={state.bio} onChange={handleChange}></textarea>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={handleSubmit}>Register Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

RegisterDesigner.getLayout = (page: ReactElement) => {
    return (
        <CenteredFormLayout>
            {page}
        </CenteredFormLayout>
    )
}

export default RegisterDesigner