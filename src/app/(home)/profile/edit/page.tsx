import { Title } from "@/components/ui/title/Title";
import { EditProfileClient } from "./EditProfileClient";

export default function EditProfilePage() {
  return (
    <div className="container px-4 py-4 mx-auto gap-10">
      <Title title={"Editar Perfil"} size="3xl"/>
      <EditProfileClient />
    </div>
  );
}