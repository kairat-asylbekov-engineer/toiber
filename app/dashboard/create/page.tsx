import InvitationForm from "@/components/dashboard/InvitationForm";

export const metadata = {
  title: "Создать приглашение — ToiBer",
};

export default function CreatePage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-apple-gray-dark lg:text-2xl">
          Новое приглашение
        </h1>
        <p className="mt-0.5 text-sm text-apple-gray">
          Заполните данные и выберите оформление
        </p>
      </div>

      <InvitationForm />
    </>
  );
}
