import { redirect } from "next/navigation";

const ProjectPage = () => {
  return redirect("/project/1/tasks");
}
 
export default ProjectPage;