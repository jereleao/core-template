import LoginForm from "~/app/(auth)/login/_components/login-form";
import { Modal } from "../modal";

export default async function PostModal() {
  return (
    <Modal>
      <LoginForm />
    </Modal>
  );
}
