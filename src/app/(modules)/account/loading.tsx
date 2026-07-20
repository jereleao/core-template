import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("Commom");
  return (
    <div className="flex size-full flex-col items-center gap-6 border-t p-4">
      <p className="m-4 font-semibold md:text-2xl">{t("loading")}</p>
    </div>
  );
}
